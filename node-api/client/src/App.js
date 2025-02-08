import logo from './fieldsync_logo.jpeg';
import { getExternalUsersApi, saveUsersApi, fetchUsersApi } from './Api';
import './App.css';
import React, { useEffect, useState } from "react";
/*
Component Name: App
Description: Root component. Functions as the model by holding essential states
  to pass to subcomponents as props. 
*/
function App() {
  // set default state to home
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState(null);
  const [status, setStatus] = useState(null);
  // onclick page change handler
  const handlePageChange = ( newPageState ) => {
    setStatus(null);
    if( newPageState == "fetch" ) {
      // clear user data
      setUsers(null);
    }
    setPage(newPageState);
  }
  //onClick handlers
  // getExternalUsers: call API to get users data from external website
  const getExternalUsers = async (event) => {
    const newUserData = await getExternalUsersApi();
    if( newUserData ) {
      setUsers(newUserData);
      setStatus("User data updated.");
    } else {
      setStatus("No user data found.");
    }
  }
  // saveUsers: call API to save current users data to DB
  const saveUsers = (event) => {
    if( users ) {
      saveUsersApi( users );
      setStatus("User data saved.");
    } else {
      setStatus("No user data to save. Use the Home Page to get user data.")
    }
  }
  // fetchUsers: call API to fetch all users from DB, inform user if none found.
  const fetchUsers = async (event) => {
    const newUserData = await fetchUsersApi();
    if( newUserData ) {
      setUsers(newUserData);
      setStatus("User data updated.");
    } else {
      setStatus("No user data found.");
    }
  }
  // render correct page based on page state
  if( page == "home"){
    return (
      <Page title="Home Page"
            buttonText="Download Users from External API"
            handlePageChange={ handlePageChange }
            users={ users }
            setUsers={ setUsers }
            status = { status }
            onClickHandler={getExternalUsers}/>
    );
  } else if ( page == "save" ) {
    return (
      <Page title="Save Page"
            buttonText="Save Users to Internal Database"
            handlePageChange={ handlePageChange }
            users={ users }
            status = { status }
            onClickHandler={saveUsers}/>
    )
  } else if ( page == "fetch" ) {
    return(
      <Page title="Fetch Page"
            buttonText="Fetch Users from Internal Database"
            handlePageChange={ handlePageChange }
            users={ users }
            status = { status }
            onClickHandler={fetchUsers}/>
    )
  }
}
/*
Component Name: Page
Description: Generic Page template is populated based on the pagge state to display
the Home, Save, or Fetch utility.
*/
function Page({title, buttonText, onClickHandler, users, status, handlePageChange}) {
  return(
    <div className="body">
      <HeaderArea content={title} />
      <NavigationArea handlePageChange={handlePageChange} />
      <button className="submit" onClick={onClickHandler}>{buttonText}</button>
      <StatusArea status = { status } />
      <UserTable users={ users } />
    </div>
  );
}
/*
Component Name: HeaderArea
Description: Leaf component for the display of a simple header, including page
  title and FieldSync logo.
*/
function HeaderArea( {content} ) {
  return(
    <div className = "header">
      <img src={logo}></img>
      <h1>{ content }</h1>
    </div>
  )
}
/*
Component Name: NavigationArea
Description: Leaf component for the navigation bar. inherits handlePageChange to
  manage nagication on-click responses.
*/
function NavigationArea({handlePageChange}) {
  return(
    <div className = "navigation">
        <h2>Navigation: </h2>
        <button onClick={() => handlePageChange('home')}>Home</button>
        <button onClick={() => handlePageChange('save')}>Save</button>
        <button onClick={() => handlePageChange('fetch')}>Fetch</button>
    </div>
  )
}
/*
Component Name: StatusArea
Description: Leaf Component to populate with status messages, e.g., no data
  found in database or similar.
*/
function StatusArea( {status} ) {
  if( status === null ) {
    return(
      <div>
      </div>
    )
  } else {
    return(
      <div className = "status">
        <p>{status}</p>
      </div>
    )
  }
}
/*
Component Name: UserTable
Description: maps an arbitrary number of users (stored in users state) to an
  HTML table. If there is no user data, displays a welcome / instruction message
  instead.
*/
function UserTable({users}) {
  if( users === null){
    return(
      // Intro text before the user has done anything.
      <p>Welcome. Use the navigation bar to navigate between the Home,
        Save, and Fetch utilities.
        <ul>
          <li>The Home utility fetches user data from an external website.</li>
          <li>The Save utility saves the current user table to the database.</li>
          <li>The Fetch utility fetches all saved user data from the database.</li>
        </ul>
      </p>
    )
  } else {
    return(
      // map content of users stat onto a table
      <div className="userTable">
        <table className="userTable">
          <thead>
            <tr>
              <th>Name:</th>
              <th>Company:</th>
              <th>Email:</th>
              <th>Phone:</th>
            </tr>
          </thead>
          <tbody>
            {users.map( user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.company.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
export default App;
