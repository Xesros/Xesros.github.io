# Shelter_Dashboard

## About
This goal of this project is build a web application that provides a data dashboard interface to workers at an animal shelter. The dashboard must pull data from a Mongo database. Users are expected to navigate the pages for data they need for their tasks.

## Differences - Enhancements
###### Software Design and Engineering
The main difference between the two projects is the software stack that is used to develop them. The original uses python and mongodb that has been configured through the command line. The new project uses the MEAN (MongoDB, Express, Angular, Node.js) stack. The database for this project has not been preconfigured and instead is seeded plus configured with known schemas and validators in the project. The different software programs of the suite allow me to better structure the components of the data dashboard into modular components with explicit functionality. Angular components are grouped properly into HTML, CSS, and script files. The dashboard no longer directly connects to the database and, instead, makes calls to an express server to fulfill data requests. Node.js provides me with all the necessary dependencies and runs the express server. 
Continuing, the map and chart components are shifted to the side of the list to favor wider screens. Although, I should properly make the dashboard more flexible in handling the placement of components. 
###### Databases
As mentioned before the database configuration is handled differently. The application handles data integrity with established seeding, schemas and validators in forms for user input. The next main enhancement for databases has to do with performance. The previous iteration would query the database for every record at once. This collection has 10,000 records. There is a stutter of around 300ms. This stutter would only grow as more records are added. In order to balance this load, I implemented server side pagination. This way the front end would query for a limited set of records to reduce the load. The average request, on my machine, has time of 8ms. This smoothes the experience of navigating different pages.

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

