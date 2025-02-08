import logo from './fieldsync_logo.jpeg';
import './App.css';
import React, { useEffect, useState } from "react";

function Home({handlePageChange, users, setUsers, status, setStatus}) {
  // getExternalUsers API call handler
  const getExternalUsers = async (event) => {
    try {
      // make request to node server
      const response = await fetch('http://localhost:3000/api/external-users');
      const data = await response.json();
      // check for error response
      if( "error" in data )
      {
        // no user data found
        setStatus("No user data found.")
      } else {
        // user data found
        setUsers( data );
      }
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  }
  return(
    <div class="body">
      <HeaderArea content="Home Page" />
      <NavigationArea handlePageChange={handlePageChange} />
      <button class="submit" onClick={getExternalUsers}>Download Users from 
            External API</button>
      <StatusArea status = { status } setStatus = { setStatus } />
      <UserTable users={ users } />
    </div>
  )
}

function Save({handlePageChange, users, status, setStatus}) {
  const saveUsers = (event) => {
    const userData = JSON.stringify(users);
    console.log(userData);
    fetch('http://localhost:3000/api/save-users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData
    })
      .then(response => response.json())
      .catch(error => console.error('Error FFFetching data:', error));
  }
  return(
    <div class="body">
      <HeaderArea content="Save Page" />
      <NavigationArea handlePageChange={handlePageChange} />
      <button class="submit" onClick={saveUsers}>Save Users to Internal 
          Database</button>
      <StatusArea status = { status } setStatus = { setStatus } />
      <UserTable users={ users } />
    </div>
  )
}

function Fetch({handlePageChange, users, setUsers, status, setStatus}) {
  const fetchUsers = async (event) => {
    try {
      const response = await fetch('http://localhost:3000/api/fetch-users');
      const data = await response.json();
      // check for error response for no data found
      if( "error" in data ) {
        console.log("error block enetered")
        setStatus("No user data found in database.")
      } else { // else set users
        setUsers(data);
      }
    } catch (err) {
      console.error("Error fetching user data", err );
    }
  }

  return(
    <div class="body">
      <HeaderArea content="Fetch Page" />
      <NavigationArea handlePageChange={handlePageChange} />
      <button class="submit" onClick={fetchUsers}>Fetch Users from Internal 
        Database</button>
      <StatusArea status = { status } setStatus = { setStatus } />
      <UserTable users={ users } />
    </div>
  )
}
function HeaderArea( {content} ) {
  return(
    <div class = "header">
      <img src={logo}></img>
      <h1>{ content }</h1>
    </div>
  )
}

function NavigationArea({handlePageChange}) {
  return(
    <div class = "navigation">
        <h2>Navigation: </h2>
        <button onClick={() => handlePageChange('home')}>Home</button>
        <button onClick={() => handlePageChange('save')}>Save</button>
        <button onClick={() => handlePageChange('fetch')}>Fetch</button>
    </div>
  )
}

function StatusArea( {status, setStatus} ) {
  if( status === null ) {
    return(
      <div>
      </div>
    )
  } else {
    return(
      <div class = "status">
        <p>{status}</p>
      </div>
    )
  }
}

function UserTable({users}) {
  if( users === null){
    return(
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
      <div class="userTable">
        <table class="userTable">
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

function App() {
  // set default state to home
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState(null);
  const [status, setStatus] = useState(null);

  // onclick page change handler
  const handlePageChange = ( newPageState ) => {
    setStatus(null);
    setPage(newPageState);
  }
  // render correct page based on page state
  if( page == "home"){
    return (
      <Home handlePageChange={ handlePageChange }
            users={ users }
            setUsers={ setUsers }
            status = { status }
            setStatus = { setStatus }/>
    );
  } else if ( page == "save" ) {
    return (
      <Save handlePageChange={ handlePageChange } users={ users }
            status = { status }
            setStatus = { setStatus }/>
    )
  } else if ( page == "fetch" ) {
    return(
      <Fetch handlePageChange={ handlePageChange}
             users={ users }
             setUsers={ setUsers }
             status = { status }
             setStatus = { setStatus }/>
    )
  }
}

export default App;
