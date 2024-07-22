# Blogging Application

## Prerequisite
You need to have MongoDB installed. Run the `mongosh` command, which will show you the path of MongoDB. Copy this path and add it in the connection code of the database inside the `api` folder in the `index.js` file. Create the database there and you are all set.

## How to Run This App
Create two terminals:

### In the 1st Terminal
1. Navigate to the `api` folder:
    ```bash
    cd ./api/
    ```
2. Start the API server:
    ```bash
    npm run start
    ```

### In the 2nd Terminal
1. Navigate to the `blog-ui` folder:
    ```bash
    cd ./blog-ui
    ```
2. Start the UI server:
    ```bash
    npm run start
    ```

Then your application will start.
