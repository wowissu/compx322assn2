<?php

require_once 'db.php';
require_once 'http.php';

function main (PDO $db) {
  header("Content-Type: application/json");

  $stmt = $db->query("SELECT * FROM newtopics;");
  $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);

  return Response::toJson($topics);
}

$conn = new DBconnection();
$conn->connect();
main($conn->db);





