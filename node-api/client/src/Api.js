export async function getExternalUsersApi() {
    try {
        // make request to node server
        const response = await fetch('http://localhost:3000/api/external-users');
        const data = await response.json();
        // check for error response
        if( "error" in data )
        {
          // no user data found
          return null;
        } else {
          return data;
        }
      } catch (err) {
        console.error("Error fetching user data: ", err);
      }
}
export async function saveUsersApi( users ) {
    const userData = JSON.stringify(users);
    fetch('http://localhost:3000/api/save-users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData
    })
      .then(response => response.json())
      .catch(error => console.error('Error fetching data:', error))
}
export async function fetchUsersApi() {
    try {
        const response = await fetch('http://localhost:3000/api/fetch-users');
        const data = await response.json();
        // check for error response for no data found
        if( "error" in data ) {
          console.log("error block enetered")
          return null;
        } else { // else set users
          return data;
        }
      } catch (err) {
        console.error("Error fetching user data", err );
      }
}