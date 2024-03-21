<?php

class DBconnection {
  private $servername = "mysql";
  private $database = "zs284";
  private $username = "zs284";
  private $password = "my525041sql";
  public PDO $db;

  public function connect() {
    try {
      $this->db = new PDO("mysql:host={$this->servername};dbname={$this->database}", $this->username, $this->password);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch(PDOException $e) {
      http_response_code(500);
      throw new Exception("Connection failed: " . $e->getMessage());
    }

    return $this;
  }
}

?>
