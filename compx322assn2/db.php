<?php

// Setting error reporting for debugging
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

class DBconnection {

  // Database connection parameters
  private $host = "learn-mysql.cms.waikato.ac.nz";
  // private $host = "mysql";          // Default host
  private $database = "zs284";      // Database name
  private $username = "zs284";      // Username
  private $password = "my525041sql"; // Password  

  public $db;  // Database connection object

  public function __construct()
  {
    // Overriding host if HOST environment variable is set
    $this->host = getenv("HOST") ?: $this->host;
  }

  // Method to establish database connection
  public function connect() {
    try {
      // Creating a new PDO instance for database connection
      $this->db = new PDO("mysql:host={$this->host};dbname={$this->database};charset=utf8", $this->username, $this->password);
      
      // Setting PDO attributes
      $this->db->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, true);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch(PDOException $e) {
      // Handling connection errors
      http_response_code(500);  // Setting HTTP response code to 500 (Internal Server Error)
      throw new Exception("Connection failed: " . $e->getMessage());  // Throwing an exception with error message
    }

    return $this; // Returning $this for method chaining
  }
}

?>
