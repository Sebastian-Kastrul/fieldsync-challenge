// configure DB access
const { Pool } = require('pg'); // connection pool
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    password: 'password',
    database: 'userData',
    port: 5434
});

module.exports = {
    // test function for DB access:
    accessDB: async function accessDB() {
        console.log("Access DB");
        try {
            const client = await pool.connect();

            // test Query
            const response = await client.query('SELECT current_user;');
            console.log("DB Connection Dump: ");
            // dump response
            const responseLength = response.rows.length;
            var responseIndex = 0
            for( responseIndex; responseIndex < responseLength; responseIndex++ ) {
                console.log(response.rows[responseIndex]);
            }
            await client.release();
        }
        catch ( error ) {
            console.error("Error connecting to PostgreSQL", error);
        }
        // close connection
    },
    saveUsers: async function saveUsers( userData ) {
        // extract desired data
        const ids = userData.map( user => user.id );
        const names = userData.map(user => user.name);
        const companies = userData.map(user => user.company.name);
        const emails = userData.map(user => user.email);
        const numbers = userData.map(user => user.phone)

        // build query with placeholders to avoid injection
        const values = [];
        // assemble placeholder string and values array
        const placeholders = ids.map((_, i) => {
            // add object to array, return index references
            values.push(ids[i], names[i], companies[i], emails[i], numbers[i]);
            return`($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`;
        }).join(", "); // join array, delimit with ,
        const query = 
            `INSERT INTO "User" (userId, name, company, email, phone_number)
             VALUES ${placeholders};`

        // execute query
        try {
            const client = await pool.connect();
            await client.query(query, values);
            console.log("User data saved successfully.");
            client.release();
        } catch (err) {
            console.error("Error saving user data: ", err);
        }
    }
};