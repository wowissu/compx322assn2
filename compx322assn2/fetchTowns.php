<?php
/**
 * Require the necessary files for the script.
 */
require_once './db.php';
require_once './http.php';

/**
 * Main function to fetch data from the database and return a JSON response.
 *
 * @param PDO $db The PDO database connection object.
 */
function main(PDO $db) {
    header("Content-Type: application/json"); // Setting response header to indicate JSON content type

    // Querying the database to fetch data from the 'town' table
    $stmt = $db->query("SELECT * FROM town;");
    $topics = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetching all rows as associative arrays

    // Converting fetched data to JSON format using Response class and returning it
    Response::toJson($topics);
}

// Creating a new database connection instance
$conn = new DBconnection();
$conn->connect(); // Establishing connection to the database

// Calling the main function with the established database connection
echo main($conn->db);
