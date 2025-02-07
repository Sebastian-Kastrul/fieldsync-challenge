import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

function Home({handlePageChange}) {
  return(
    <div>
      <h1>Home Page</h1>
      <NavigationArea handlePageChange={handlePageChange} />
    </div>
  )
}

function Save({handlePageChange}) {
  return(
    <div>
      <h1>Save Page</h1>
      <NavigationArea handlePageChange={handlePageChange} />
    </div>
  )
}

function Fetch({handlePageChange}) {
  return(
    <div>
      <h1>Fetch Page</h1>
      <NavigationArea handlePageChange={handlePageChange} />
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

function App() {
  // set default state to home
  const [page, setPage] = useState("home");
  // onclick page change handler
  const handlePageChange = ( newPageState ) => {
    setPage(newPageState);
  }
  // render correct page based on page state
  if( page == "home"){
    return (
      <Home handlePageChange={ handlePageChange }/>
    );
  } else if ( page == "save" ) {
    return (
      <Save handlePageChange={ handlePageChange }/>
    )
  } else if ( page == "fetch" ) {
    return(
      <Fetch handlePageChange={ handlePageChange}/>
    )
  }
}

export default App;
