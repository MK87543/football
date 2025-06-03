// Import MySQL module
const mysql = require('mysql2');

// Database connection configuration
const databaseConnection = mysql.createConnection({
    host: "192.168.0.215",       // Remote database server
    user: "appuser",             // Database username
    password: "AppUserPass456!", // Database password
    database: "appdb"            // Target database name
});

// Establish database connection
databaseConnection.connect(handleConnection);

function handleConnection(error) {
    if (error) {
        throw new Error('Connection failed: ' + error.message);
    }
    
    console.log("Successfully connected to database!");
    myQuery();
}

function myQuery() {
    const createTableQuery = `
        create table if not exists test_table (
            id int not null auto_increment,
            name varchar(255) not null,
            created_at datetime default current_timestamp,
            primary key (id)
        ) engine=InnoDB;
    `;

    databaseConnection.query(createTableQuery, handleQuery);
}

function handleQuery(error, result) {
    if (error) {
        throw new Error('failed: ' + error.message);
    }

    console.log("successfully:", result);
    databaseConnection.end(() => console.log("Database connection closed"));
}
