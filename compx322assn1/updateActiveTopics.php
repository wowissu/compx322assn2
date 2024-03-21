<?php

require_once 'db.php';
require_once 'http.php';

function main (PDO $db) {
  $topic_ids = Request::json();
  $q = $db->prepare('UPDATE newtopics SET active = :active WHERE id = :id');

  foreach ($topic_ids as $_key => $id) {
    $q->execute([
      "active" => "1",
      "id" => $id
    ]);
  }

  return Response::toJson(null);
}

$conn = new DBconnection();
$conn->connect();
main($conn->db);

