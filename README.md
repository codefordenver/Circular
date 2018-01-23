
# Denver Re:Imagine

## Install Dependencies

1. Install [node 8.3](https://nodejs.org/) and [yarn 1.2.1](https://yarnpkg.com)
2. Clone the repo
3. Run `yarn install` in the root of the repo
4. create a backend/config/dev.js file by getting one from another developer or getting keys for
    - googleClientId
    - googleClientSecret:
    - mongoURI
    - cookieKey
    - redirectDomain (usually `http://localhost:3000`)
5. create a client/.env.local file also from another developer or adding a line like
    - REACT_APP_GOOGLE_MAPS_KEY=GOGLKEY

## Local Development

Run `yarn dev` in the root directory to run the server and client with live reloading

## Linting
Run `yarn lint -- --fix` in the root repo.

It is highly recommended that you configure your editor to display eslint errors

## Debugging instructions for Node
1. Kill your server
2. Open package.json in the root
3. Within "scripts", and within the key of "start", add `--inspect` so that the line looks like "start": "node --inspect backend/index.js"
4. In the node file you want to debug, add a `debugger`
5. Open a new tab in your terminal, and run the backend server separately with `yarn start`
6. Start your frontend server again with `yarn dev`
7. Open a new tab in your browser, and navigate to [Chrome's inspect page](chrome://inspect)
8. On the Chrome inspect page, click "Open dedicated DevTools for Node"
9. Perform the function in your app running locally and you should hit your debugger
10. You can then play around in the debugger in your inspect window!

## Checkout the database
We use mLab to host our dev and production databases so even when we are running our servers locally, we're all sharing the same remote development database. To query the database during local development, ask Danny to get you a login to our mLab account. Once you've signed in, you can the instructions to get into the database with this shell prompt command: `mongo ds243335.mlab.com:43335/reimagine-dev -u <user> -p <password>`

## End to End testing with cypress
In order to run and develop cypress tests, first run:
```sh
yarn test-dev
```
This spins up the app with an in-memory mongodb.

Then run:
```sh
yarn cypress open
```
This will open the cypress GUI for selecting and running tests. From here you can run the `example_spec` which is a demo of all the cypress functionality, or you can run other tests developed against specifically for this project.

Tests are written in the [cypress/integration](cypress/integration) directory.
