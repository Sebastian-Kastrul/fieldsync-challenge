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
        }
        catch ( error ) {
            console.error("Error connecting to PostgreSQL", error);
        }
        // close connection
        await pool.end();
    }
};