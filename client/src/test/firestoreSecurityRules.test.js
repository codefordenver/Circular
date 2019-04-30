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
  const alice = authedApp({ uid: 'alice' });
  const bob = authedApp({ uid: 'bob' });
  const guest = authedApp(null);
  const alicesCampaign = alice.collection('campaigns').doc('alicesCampaign');
  const unauthedCampaign = guest.collection('campaigns').doc('unauthedCampaign');
  const signature = alice
    .collection('campaigns')
    .doc('alicesCampaign')
    .collection('signatures')
    .doc('alice');

  beforeEach(async () => {
    await alice
      .collection('users')
      .doc('alice')
      .set({ createdCampaignId: null });

    await alicesCampaign.set({
      campaignId: 'alicesCampaign',
      campaignCreatorId: 'alice',
      address: 'Glendale'
    });

    await alice
      .collection('users')
      .doc('alice')
      .set({
        displayName: 'alice',
        createdCampaignId: 'alicesCampaign',
        signedCampaignId: null
      });

    await signature.set({
      uid: 'alice',
      signerMessage: 'Yay recycling!'
    });
  });

  /*
   * ============
   *  User Rules
   * ============
   */

  describe('user document rules', () => {
    // User can read, update, or delete their own data
    // Signature user data is stored in campaigns/signatures

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
          guest
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
          guest
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
            .update({ displayName: 'Bob' })
        );
      });

      it('should not allow unauthenticated guests to update users data', async () => {
        await firebase.assertFails(
          guest
            .collection('users')
            .doc('alice')
            .update({ displayName: 'Anonymous' })
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
          guest
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
        await firebase.assertFails(unauthedCampaign.set({ campaignCreatorId: 'alice' }));
      });

      it('should prevent users from creating more than one campaign', async () => {
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
        await firebase.assertSucceeds(alicesCampaign.get());
      });
    });

    describe('update data', () => {
      // Only authenticated users and campaign owner can update campaign

      it('should require users to log in before updating a campaign', async () => {
        await firebase.assertFails(
          guest
            .collection('campaigns')
            .doc('alicesCampaign')
            .update({ address: 'Denver' })
        );
      });

      it('should only allow campaign owner to update campaign', async () => {
        await firebase.assertFails(
          bob
            .collection('campaigns')
            .doc('alicesCampaign')
            .update({ address: 'Denver' })
        );

        await firebase.assertSucceeds(alicesCampaign.set({ address: 'Denver' }, { merge: true }));
      });

      it('should require users to log in before signing a campaign', async () => {
        const registeredUser = guest.collection('users').doc('alice');

        await firebase.assertFails(registeredUser.update({ signedCampaignId: 'alicesCampaign' }));
      });
    });

    describe('delete data', () => {
      // Only authenticated users and campaign owner can delete campaign

      it('should only allow campaign owner to delete campaign', async () => {
        await firebase.assertSucceeds(alicesCampaign.delete());
      });

      it('should not allow user to delete campaign they do not own', async () => {
        await firebase.assertFails(
          bob
            .collection('campaigns')
            .doc('alicesCampaign')
            .delete()
        );
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
          const signature2 = unauthedCampaign.collection('signatures').doc('signature1');

          await firebase.assertFails(signature2.set({ uid: 'signature1' }));
        });

        it('should prevent users from signing more than one campaign', async () => {
          await alice
            .collection('users')
            .doc('alice')
            .set({ signedCampaignId: 'alicesCampaign' }, { merge: true });

          const signature3 = alice
            .collection('campaigns')
            .doc('bobsCampaign')
            .collection('signatures')
            .doc('alice');

          await firebase.assertFails(
            signature3.set({
              uid: 'alice',
              signerMessage: 'Yay recycling!'
            })
          );
        });
      });

      describe('read data', () => {
        // Anyone can read signatures, including unauthenticated users

        it('should allow anyone to read campaign signatures', async () => {
          const signatures = guest
            .collection('campaigns')
            .doc('campaign1')
            .collection('signatures');

          await firebase.assertSucceeds(signatures.get());
        });
      });

      describe('update data', () => {
        // Only authenticated users can update their own signature

        it('should only allow signature owner to update signature data', async () => {
          // await signature.set({
          //   uid: 'alice',
          //   signerMessage: 'Yay recycling!'
          // });

          await firebase.assertSucceeds(
            signature.set({ signerMessage: 'I really like recycling!' }, { merge: true })
          );

          await firebase.assertFails(
            bob
              .collection('campaigns')
              .doc('alicesCampaign')
              .collection('signatures')
              .doc('alice')
              .set({ signerMessage: 'I hate recycling!' }, { merge: true })
          );
        });
      });

      describe('delete data', () => {
        // Only authenticated users can delete their own signature

        it('should only allow signature owner to delete signature', async () => {
          await firebase.assertFails(
            bob
              .collection('campaigns')
              .doc('alicesCampaign')
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
        // const db = authedApp({ uid: 'alice' });

        await firebase.assertFails(
          alice
            .collection('wasteProviders')
            .doc('wasteProvider1')
            .set({ name: 'wasteProvider1' })
        );
      });
    });

    describe('read data', () => {
      it('should allow anyone to read waste provider data', async () => {
        // const alice = authedApp(null);
        const wasteProvider = alice.collection('wasteProviders').doc('wasteProvider1');

        await firebase.assertSucceeds(wasteProvider.get());
      });
    });

    describe('update data', () => {
      it('should not allow anyone to update waste provider data', async () => {
        // const alice = authedApp({ uid: 'alice' });

        await firebase.assertFails(
          alice
            .collection('wasteProviders')
            .doc('wasteProvider1')
            .update({ name: 'wasteProvider1' })
        );
      });
    });

    describe('delete data', () => {
      it('should not allow anyone to delete waste providers', async () => {
        // const alice = authedApp({ uid: 'alice' });

        await firebase.assertFails(
          alice
            .collection('wasteProviders')
            .doc('wasteProvider1')
            .delete()
        );
      });
    });
  });
});
