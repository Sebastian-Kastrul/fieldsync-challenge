# FieldSync Full-Stack API Challenge
## Overview
This simple application implements a React frontend, a Node.js backend, and a PostgreSQL database. The purpose of this application is to demonstrate full-stack functionality. The following sections will cover:
- How to run the application locally
- The architecture of the application
### How to Install
### Architecture
This section will cover the high-level architectural design of the application. The architecture is broken up by major component, being:
- The React Frontend
- The Node.js Backend
- the PostgreSQL database
#### React Frontend
The React Frontend acts as the view for the application. Source code of interest is located in `App.js`, `App.css` and in `Api.js` in the `client/src` directory. In production, an optimized build is found in `client/build`.
##### App.js
App.js is the main React file that defines the SPA. What follows is an overview of the React components in App.js:

| **Component**  | **Description**                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App            | Entry point to the application. Also defines most states and the on-click handlers, which invoke Api.js to make calls to the Node.js server. Renders one of three pages depending on the page state.                                                                                                                                                    |
| Page           | Generic page template used for the three page displays, being Home, Save, and Fetch.<br>- The Home Page allows you to retrieve placeholder User data from an external website.<br>- The Save Page allows you to save retrieved User data to the internal database.<br>- The Fetch Page retrieves and User data already stored in the internal database. |
| HeaderArea     | Leaf component used to display the page title and the FieldSync logo                                                                                                                                                                                                                                                                                    |
| NavigationArea | Leaf component used to display the navigation bar                                                                                                                                                                                                                                                                                                       |
| StatusArea     | Leaf component used to display status messages                                                                                                                                                                                                                                                                                                          |
| UserTable      | Leaf component used to display currently loaded user data from the database or the external website. Programatically displays any arbitrary number of users.                                                                                                                                                                                            |
##### Api.js
Api.js acts as the client-side portion of the api interface between the React app and the node.js server. Here is a brief description of the API calls:

| **Function**        | **API Endpoint** | **Description**                                                                                  |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| getExternalUsersApi | /external-users  | Asks the node.js server to retrieve users from external website. Returns null if no users found. |
| saveUsersApi        | /save-users      | Posts current users state data to the node.js server for storage in database.                    |
| fetchUsers          | /fetch-users     | Asks the node.js server to retrieve users from the database. Returns null if no users are found. |
##### app.css
app.css defines the style for the React application:
- Chose a simple, monochromatic color scheme that is pleasing but not distracting
- Implemented a responsive flexbox design to make the React app usable on most screen sizes

#### Node.js Backend
The Node.js backend functions primarily as an API between the React app, the PostgreSQL database, and the external website. The node.js server and the API endpoints that the React client can call are defined in `server.js`. The API calls that the server uses to access the Postgres database are located in `databaseAPI.js`.
##### server.js
The node.js server uses express to handle incoming requests. `server.js` handles the following API endpoints, which the React client can call:

| **API Endpoint** | **Description**                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /external-users  | Gets user data from 'https://jsonplaceholder.typicode.com/users'  and returns it to the client.                                                                                                                                      |
| /save-users      | Receives user data from the React client, then calls saveUsers from `databaseAPI.js` to store them in the PostgreSQL database.                                                                                                       |
| /fetch-users     | Calls fetchUsers from `databaseAPI.js` to retrieve user data from the PostreSQL database. returns the user data to the React client, or an error code if no data was found. (Response is still OK- error code used for UI rendering) |

#### PostgreSQL Database
The PostgreSQL database is a simple database containing a single table "User." Here are the column definitions for "User":

| **Column**   | **Definition**                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId       | Serial vallue used as the primary key. Serial was selected to match to data from 'https://jsonplaceholder.typicode.com/users and because distributed uniqueness is not needed in this case. |
| name         | TEXT, not null. The name of the user.                                                                                                                                                       |
| company      | TEXT, not null. The name of the company the user works for.                                                                                                                                 |
| email        | TEXT, not null. The user's email address.                                                                                                                                                   |
| phone_number | TEXT, not null. The user's phone number.                                                                                                                                                    |
