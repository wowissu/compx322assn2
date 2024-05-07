<?php

/**
 * Class Request
 * Provides static methods to handle HTTP request data.
 */
class Request {
  
  /**
   * Retrieve request data from the request body.
   *
   * @return string The request body content.
   */
  public static function data() {
    return file_get_contents('php://input');
  }

  /**
   * Retrieve request data as JSON format based on request method and content type.
   *
   * @return mixed|array The request data.
   * @throws Exception If the request method is unknown.
   */
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
        throw new Exception("Unknown request method: {$method}");
        break;
    }
  }

  /**
   * Parse request data based on content type.
   *
   * @return mixed|array The parsed request data.
   */
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

/**
 * Class Response
 * Provides methods to handle HTTP responses.
 */
class Response {
  const OK = "ok";
  const ERROR = "error";

  /**
   * Send response data as JSON format.
   *
   * @param mixed $data The data to be sent in the response.
   * @param string $status The status of the response (default is Response::OK).
   * @return void
   */
  public static function toJson($data, $status = Response::OK) {
    header("Content-Type: application/json; charset=utf-8");

    if ($status === Response::ERROR) {
      http_response_code(401);
    }

    // Constructing the response format
    $response = [
      "status" => $status,
      "data" => $data
    ];

    // Sending the JSON-encoded response
    echo json_encode($response);
  }
}
