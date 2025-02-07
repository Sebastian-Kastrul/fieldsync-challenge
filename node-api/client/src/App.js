import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

function Home({handlePageChange, users, setUsers}) {
  // getExternalUsers API call handler
  const getExternalUsers = (event) => {
    fetch('http://localhost:3000/api/external-users')
      .then(response => response.json())
      .then(data =>setUsers(data))
      .catch(error => console.error('Error FFFetching data:', error));
  }
  return(
    <div>
      <h1>Home Page</h1>
      <NavigationArea handlePageChange={handlePageChange} />
      <button onClick={getExternalUsers}>Download Users from External API</button>
      <UserTable users={ users } />
    </div>
  )
}

function Save({handlePageChange, users}) {
  return(
    <div>
      <h1>Save Page</h1>
      <NavigationArea handlePageChange={handlePageChange} />
      <UserTable users={ users } />
    </div>
  )
}

function Fetch({handlePageChange, users, setUsers}) {
  return(
    <div>
      <h1>Fetch Page</h1>
      <NavigationArea handlePageChange={handlePageChange} />
      <UserTable users={ users } />
    </div>
  )
}

function NavigationArea({handlePageChange}) {
  return(
    <div class = "navigation">
        <button onClick={() => handlePageChange('home')}>Home</button>
        <button onClick={() => handlePageChange('save')}>Save</button>
        <button onClick={() => handlePageChange('fetch')}>Fetch</button>
    </div>
  )
}

function UserTable({users}) {
  console.log(users);
  if( users === null){
    return(
      <p>Press download to retrieve external users</p>
    )
  } else {
    return(
      <div class="userTable">
        <ul>
          {users.map( user => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Company: {user.company.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
}

function App() {
  // set default state to home
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState(null);

  // onclick page change handler
  const handlePageChange = ( newPageState ) => {
    setPage(newPageState);
  }
  // render correct page based on page state
  if( page == "home"){
    return (
      <Home handlePageChange={ handlePageChange }
            users={ users }
            setUsers={ setUsers }/>
    );
  } else if ( page == "save" ) {
    return (
      <Save handlePageChange={ handlePageChange } users={ users }/>
    )
  } else if ( page == "fetch" ) {
    return(
      <Fetch handlePageChange={ handlePageChange}
             users={ users }
             setUsers={ setUsers }/>
    )
  }
}

export default App;
