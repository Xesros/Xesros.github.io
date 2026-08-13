# AdminDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## How to (Enhanced Version)
This project relies on the MEAN stack, so installation of each is integral to operation. 
* The versions used in this project are:
    * Angular/cli@22.1.2
    * bootstrap@5.3.8
    * express-generator@4.16.1
    * jquery@4.0.0
    * node 24.14.0
    * npm 12.12.1
    * postman (latest version is fine).
1. After downloading the files, there is still some configuration to be made to run locally. While having the necessary services running. Navigate to the project's root folder in a terminal.
    1. The first thing to do is to seed the database. 
        * This is done by running the script: node .\app_server\models\seed 
    2. Next is to configure the .env file. If not present, create the file and add the line "JWT_Secret=yoursecretcodehere"
        * This is for creating a token for the security middleware.
        * Add users with postman by loading a post request to http://localhost:3000/api/register follow the user schema. 
        * If you are unsure if the changes are working, Test with postman to the routes http://localhost:3000/api/login
2. With data loaded and the user registered, start the express server by navigating to the root folder and enter 'npm start'
    1. This will initial the backend for data routing and handle api calls between the frontend and the database.
3. In a separate terminal window, navigate to the root folder and enter the app_admin folder. Here enter 'ng serve' to build and run the angular frontend in developer mode.
4. Now in your web browser, navigate to http://localhost:4200/. This is for local hosting, otherwise the application can be configured to on a different address. 
5. At this point you will see the main dashboard. There should already be entries loaded into the list as on start up the app calls for data. Without logging in, you are capable of reading data.
6. Click log in and enter your credentials. 
    * When logged in you are now capable of creating entries, editing entries, and deleting entries.
    * These components/funcitonality are hidden until the user logs in.
7. Click on add animal to create a new entry. Be sure to fill all data entries. 
8. Navigate to your entry with the paginator on the top right of the list to get to the end.
9. As a logged in user, you can click on entries to access the edit and delete page.
    * This allows you to change data of document present in the database. Hit save to save changes or delete to remove the document from the collection.

* As you navigate through the pages, the map will automatically update to load the location on it as markers. 
* Sometimes, the login may bug out UI wise. Clicking the log in button again should refresh the page state.

