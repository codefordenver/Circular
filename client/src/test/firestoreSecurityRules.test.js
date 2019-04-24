const firebase = require('@firebase/testing'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');

/*
 * ============
 *    Setup
 * ============
 */
const projectName = 're-imagine';
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectName}:ruleCoverage.html`;

const rules = fs.readFileSync('firestore.rules', 'utf8');

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ projectId: projectName, auth }).firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({
    projectId: projectName
  });
});

beforeAll(async () => {
  await firebase.loadFirestoreRules({
    projectId: projectName,
    rules
  });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

describe('Denver Re-Imagine app Firestore security rules', () => {
  /*
   * ============
   *  User Rules
   * ============
   */

  describe('user document rules', () => {
    // User can read, update, or delete their own data
    // Signature user data is stored in campaigns/signatures

    const alice = authedApp({ uid: 'alice', displayName: 'alice' });
    const bob = authedApp({ uid: 'bob' });
    const db = authedApp(null);

    describe('create data', () => {
      it('should allow authenticated user to create profile', async () => {
        await firebase.assertSucceeds(
          bob
            .collection('users')
            .doc('bob')
            .set({
              displayName: 'Bob',
              email: 'bob@email.com'
            })
        );
      });

      it('should not allow users to create another users profile', async () => {
        await firebase.assertFails(
          alice
            .collection('users')
            .doc('bob')
            .set({
              displayName: 'Bob',
              email: 'bob@email.com'
            })
        );
      });

      it('should not allow unauthenticated guests to create profile', async () => {
        await firebase.assertFails(
          db
            .collection('users')
            .doc('bob')
            .set({
              displayName: 'Bob',
              email: 'bob@email.com'
            })
        );
      });
    });

    describe('read data', () => {
      it('should only allow users to read their own data', async () => {
        await firebase.assertSucceeds(
          alice
            .collection('users')
            .doc('alice')
            .get()
        );
      });

      it('should not allow users to read other users data', async () => {
        await firebase.assertFails(
          bob
            .collection('users')
            .doc('alice')
            .get()
        );
      });

      it('should not allow unauthenticated guests to read users data', async () => {
        await firebase.assertFails(
          db
            .collection('users')
            .doc('alice')
            .get()
        );
      });
    });

    describe('update data', () => {
      it('should only allow users to update their own data', async () => {
        // Update doesn't work here. Pass 'merge: true' to
        //  '.set' method to do a true update of record instead of full overwrite
        await firebase.assertSucceeds(
          alice
            .collection('users')
            .doc('alice')
            .set(
              {
                displayName: 'Alice'
              },
              { merge: true }
            )
        );
      });

      it('should not allow users to update other users data', async () => {
        await firebase.assertFails(
          bob
            .collection('users')
            .doc('alice')
            .update({
              displayName: 'Bob'
            })
        );
      });

      it('should not allow unauthenticated guests to update users data', async () => {
        await firebase.assertFails(
          db
            .collection('users')
            .doc('alice')
            .update({
              displayName: 'Anonymous'
            })
        );
      });
    });

    describe('delete data', () => {
      it('should only allow users to delete their own data', async () => {
        await firebase.assertSucceeds(
          alice
            .collection('users')
            .doc('alice')
            .delete()
        );
      });

      it('should not allow users to delete other users data', async () => {
        await firebase.assertFails(
          bob
            .collection('users')
            .doc('alice')
            .delete()
        );
      });

      it('should not allow unauthenticated guests to delete users data', async () => {
        await firebase.assertFails(
          db
            .collection('users')
            .doc('alice')
            .delete()
        );
      });
    });
  });

  /*
   * ================
   *  Campaign Rules
   * ================
   */

  describe('campaign document rules', () => {
    describe('create data', () => {
      // Only authenticated users can create a campaign and only one campaign

      it('should require users to log in before creating a campaign', async () => {
        const db = authedApp(null);
        const campaign = db.collection('campaigns').doc('campaign1');
        await firebase.assertFails(campaign.set({ campaignCreatorId: 'alice' }));
      });

      it('should prevent users from creating more than one campaign', async () => {
        const alice = authedApp({ uid: 'alice' });

        await firebase.assertSucceeds(
          alice
            .collection('users')
            .doc('alice')
            .set({ createdCampaignId: 'campaign1' })
        );

        const campaign2 = alice.collection('campaigns').doc('campaign2');
        await firebase.assertFails(campaign2.set({ campaignCreatorId: 'alice' }));
      });
    });

    describe('read data', () => {
      // Anyone can read campaigns, including unauthenticated users

      it('should allow anyone to read campaigns', async () => {
        const db = authedApp(null);
        const campaign = db.collection('campaigns').doc('campaign1');
        await firebase.assertSucceeds(campaign.get());
      });
    });

    describe('update data', () => {
      // Only authenticated users and campaign owner can update campaign

      it('should only allow campaign owner to update campaign', async () => {
        const db = authedApp({ uid: 'alice' });
        const alice = db.collection('users').doc('alice');
        const campaign1 = db.collection('campaigns').doc('campaign1');

        // User createdCampaignId must be set to null before saving campaign
        await alice.set({ createdCampaignId: null });
        await campaign1.set({ address: 'Glendale' });
        await alice.set({ createdCampaignId: 'campaign1' });

        await firebase.assertSucceeds(campaign1.set({ address: 'Denver' }, { merge: true }));
      });

      it('should not allow user to update campaign they do not own', async () => {
        const bob = authedApp({ uid: 'bob' });
        const campaign1 = bob.collection('campaigns').doc('campaign1');
        await firebase.assertFails(
          campaign1.update({
            address: 'Denver'
          })
        );
      });

      it('should require users to log in before signing a campaign', async () => {
        const db = authedApp(null);
        const user = db.collection('users').doc('alice');
        await firebase.assertFails(user.set({ signedCampaignId: 'alice' }));
      });
    });

    describe('delete data', () => {
      // Only authenticated users and campaign owner can delete campaign

      it('should only allow campaign owner to delete campaign', async () => {
        const alice = authedApp({ uid: 'alice' });
        const campaign1 = alice.collection('campaigns').doc('campaign1');

        await alice
          .collection('users')
          .doc('alice')
          .set({ createdCampaignId: 'campaign1' });

        await firebase.assertSucceeds(campaign1.delete());
      });

      it('should not allow user to delete campaign they do not own', async () => {
        const bob = authedApp({ uid: 'bob' });
        const campaign1 = bob.collection('campaigns').doc('campaign1');
        await firebase.assertFails(campaign1.delete());
      });
    });

    /*
     * ==========================
     *  Campaign Signature Rules
     * ==========================
     */

    describe('campaign signatures document rules', () => {
      describe('create data', () => {
        // Only authenticated users can sign a campaign and only one campaign

        it('should require users to log in before signature data can be created', async () => {
          const db = authedApp(null);

          const signature = db
            .collection('campaigns')
            .doc('campaign1')
            .collection('signatures')
            .doc('signature1');

          await firebase.assertFails(signature.set({ uid: 'signature1' }));
        });

        it('should prevent users from signing more than one campaign', async () => {
          const db = authedApp({ uid: 'alice' });
          const alice = db.collection('users').doc('alice');
          await alice.set({ signedCampaignId: 'campaign1' });

          const signature = db
            .collection('campaigns')
            .doc('campaign1')
            .collection('signatures')
            .doc('alice');

          await firebase.assertFails(
            signature.set({
              uid: 'alice',
              signerMessage: 'Yay recycling!'
            })
          );
        });
      });

      describe('read data', () => {
        // Anyone can read signatures, including unauthenticated users

        it('should allow anyone to read campaign signatures', async () => {
          const db = authedApp(null);
          const signatures = db
            .collection('campaigns')
            .doc('campaign1')
            .collection('signatures');

          await firebase.assertSucceeds(signatures.get());
        });
      });

      describe('update data', () => {
        // Only authenticated users can update their own signature

        it('should only allow signature owner to update signature data', async () => {
          const alice = authedApp({ uid: 'alice' });
          const bob = authedApp({ uid: 'bob' });

          const signature = alice
            .collection('campaigns')
            .doc('campaign1')
            .collection('signatures')
            .doc('alice');

          await alice
            .collection('users')
            .doc('alice')
            .set({ signedCampaignId: null });

          await signature.set({
            uid: 'alice',
            signerMessage: 'Yay recycling!'
          });

          await firebase.assertSucceeds(
            signature.set({ signerMessage: 'I really like recycling!' }, { merge: true })
          );

          await firebase.assertFails(
            bob
              .collection('campaigns')
              .doc('campaign1')
              .collection('signatures')
              .doc('alice')
              .set({ signerMessage: 'I hate recycling!' }, { merge: true })
          );
        });
      });

      describe('delete data', () => {
        // Only authenticated users can delete their own signature

        it('should only allow signature owner to delete signature', async () => {
          const alice = authedApp({ uid: 'alice' });
          const bob = authedApp({ uid: 'bob' });

          const signature = alice
            .collection('campaigns')
            .doc('campaign1')
            .collection('signatures')
            .doc('alice');

          await alice
            .collection('users')
            .doc('alice')
            .set({ signedCampaignId: null });

          await signature.set({
            uid: 'alice',
            signerMessage: 'Yay recycling!'
          });

          await firebase.assertFails(
            bob
              .collection('campaigns')
              .doc('campaign1')
              .collection('signatures')
              .doc('alice')
              .delete()
          );

          await firebase.assertSucceeds(signature.delete());
        });
      });
    });
  });

  /*
   * ======================
   *  Waste Provider Rules
   * ======================
   */

  describe('waste provider document rules', () => {
    // Anyone can read waste providers, including unauthenticated users
    // No one can write waste provider data at this time

    describe('create data', () => {
      it('should not allow anyone to create waste providers', async () => {
        const db = authedApp({ uid: 'alice' });

        await firebase.assertFails(
          db
            .collection('wasteProviders')
            .doc('wasteProvider1')
            .set({ name: 'wasteProvider1' })
        );
      });
    });

    describe('read data', () => {
      it('should allow anyone to read waste provider data', async () => {
        const db = authedApp(null);
        const wasteProvider = db.collection('wasteProviders').doc('wasteProvider1');

        await firebase.assertSucceeds(wasteProvider.get());
      });
    });

    describe('update data', () => {
      it('should now allow anyone to update waste provider data', async () => {
        const db = authedApp({ uid: 'alice' });

        await firebase.assertFails(
          db
            .collection('wasteProviders')
            .doc('wasteProvider1')
            .update({ name: 'wasteProvider1' })
        );
      });
    });

    describe('delete data', () => {
      it('should now allow anyone to delete waste providers', async () => {
        const db = authedApp({ uid: 'alice' });

        await firebase.assertFails(
          db
            .collection('wasteProviders')
            .doc('wasteProvider1')
            .delete()
        );
      });
    });
  });
});
