<?php

class Request {
  public static function data() {
    return file_get_contents('php://input');
  }

  public static function json() {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
      case 'PUT':
      case 'POST':
        return self::parseContentType();
        break;
      case 'GET':
        return $_GET;
        break;
      default:
        throw new Exception("Unknow request method: {$method}");
        break;
    }
  }

  private static function parseContentType() {
    $type = $_SERVER["CONTENT_TYPE"];

    switch($type) {
      case 'application/x-www-form-urlencoded': 
        return $_POST;
        break;
      case 'application/json':
        return json_decode(file_get_contents('php://input'), true);
        break;
    }
  }
}

class Response {
  const OK = "ok";
  const ERROR = "error";

  public static function toJson($data, $status = Response::OK) {
    header("Content-Type", "application/json");

    if ($status === Response::ERROR) {
      http_response_code(401);
    }

    // a form for return data
    $form = [
      "status" => $status,
      "data" => $data
    ];

    echo json_encode($form);
  }
}