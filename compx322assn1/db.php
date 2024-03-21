<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

class DBconnection {

  private $host = "learn-mysql.cms.waikato.ac.nz";
  private $database = "zs284";
  private $username = "zs284";
  private $password = "my525041sql";  

  public $db;

  public function __construct()
  {
    $this->host = getenv("HOST") ?: $this->host;
  }

  public function connect() {
    try {
      $this->db = new PDO("mysql:host={$this->host};dbname={$this->database}", $this->username, $this->password);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch(PDOException $e) {
      http_response_code(500);
      throw new Exception("Connection failed: " . $e->getMessage());
    }

    return $this;
  }
}

?>
