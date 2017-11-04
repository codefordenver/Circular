make sure node is updated
yarn in client and top directory

#### Debugging instructions for Node
1. Open package.json in the root
2. Within "scripts", and within the key of "start", add `--inspect` so that the line looks like "start": "node --inspect backend/index.js"
3. In the node file you want to debug, add a `debugger`
4. Open a new tab in your terminal, and run the backend server separately with `yarn start`
5. Open a new tab in your browser, and navigate to [Chrome's inspect page](chrome://inspect)
6. On the Chrome inspect page, click "Open dedicated DevTools for Node"
7. Perform the function in your app running locally and you should hit your debugger
8. You can then play around in the debugger in your inspect window! 
