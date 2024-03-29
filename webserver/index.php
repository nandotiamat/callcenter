<?php

declare(strict_types=1);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once('vendor/autoload.php');
error_reporting(E_ALL);
ini_set('display_errors', "1");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
session_start();
include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

function queryToDB($query)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "callcenter";
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Connessione fallita");
    }
    $result = mysqli_query($conn, $query);

    if (!$result) {
        exit("Errore: impossibile eseguire la query" . mysqli_error($conn));
    }

    mysqli_close($conn);

    return $result;
}

if (isset($_GET["type"])) {

    if ($_GET["type"] == "fetch-session") {
        if (! preg_match('/Bearer\s(\S+)/', apache_request_headers()["Authorization"], $matches)) {
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
            exit;
        }
        $jwt = $matches[1];
        if (! $jwt) {
            // No token was able to be extracted from the authorization header
            header('HTTP/1.0 400 Bad Request');
            exit;
        }
        try {
            $secret_Key  = '68V0zWFrS72GbpPreidkQFLfj4v9m3Ti+DXc8OB0gcM=';
            $token = JWT::decode($jwt, new Key($secret_Key, 'HS512'));
            $decoded_array = (array) $token;
        } catch(Exception $e) {
            $arr = ["jwt-validate" => false, "error" => "Invalid session."];
            echo json_encode($arr);
            exit;
        }
        $now = new DateTimeImmutable();
        $serverName = "localhost";

        if ($token->iss !== $serverName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp())
        {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
        $query = "SELECT * FROM `utente` WHERE Username='".$decoded_array["userName"]."';";
        $result = queryToDB($query);
        while ($row = $result->fetch_assoc()) {
            $myArray[] = $row;
        }
        $arr = ["jwt-validate" => true, "user" => $myArray[0]];
        echo json_encode($arr);
    }

    if ($_GET["type"] == "user-login") {
        $data = $_GET["data"];
        $decodedData = json_decode($data, true);
        $query = "SELECT * FROM `utente` WHERE Username='" . $decodedData["username"] . "' AND Password='" . $decodedData["password"] . "'";
        $result = queryToDB($query);
        if (mysqli_num_rows($result) == 0) {
            http_response_code(401);
            $arr = array("error" => "wrong credentials");
            echo json_encode($arr);
        } else {
            while ($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }

            
            $userDecoded = $myArray[0];

            // CREATE JWT
            $secret_Key  = '68V0zWFrS72GbpPreidkQFLfj4v9m3Ti+DXc8OB0gcM=';
            $date   = new DateTimeImmutable();
            $expire_at     = $date->modify('+1 year')->getTimestamp();      // Add 1 Year
            $domainName = "localhost";
            $username   = $userDecoded["username"];                                           // Retrieved from filtered POST data
            $request_data = [
                'iat'  => $date->getTimestamp(),         // Issued at: time when the token was generated
                'iss'  => $domainName,                       // Issuer
                'nbf'  => $date->getTimestamp(),         // Not before
                'exp'  => $expire_at,                           // Expire
                'userName' => $username,                     // User name
            ];


            // $_SESSION["user"] = $user;
            $encodedJWT = JWT::encode(
                $request_data,
                $secret_Key,
                'HS512'
            );
            
            $arrayObject = array("user" => $userDecoded, "jwt" => $encodedJWT);
            // echo json_encode($_SESSION["user"]);
            echo json_encode($arrayObject);
        }
    }
    
    // fetch random client
    if ( $_GET["type"] == "get-random-client"){

        $query = "SELECT id, name, surname, date_of_birth, phone_number FROM `cliente` ORDER BY RAND() LIMIT 1;";
        $result = queryToDB($query);
        echo json_encode(mysqli_fetch_object($result));

    }
    
    // fetch random product
    if ( $_GET["type"] == "get-random-product"){
        $query = "SELECT product_id, name, description, corporate_id FROM `prodotto` ORDER BY RAND() LIMIT 1;";
        $result = queryToDB($query);
        echo json_encode(mysqli_fetch_object($result));
    }

    // get product given the id
    if ( $_GET["type"] == "get-product") {
    	if (isset($_GET["id"])) {
	    $query = "SELECT * FROM `prodotto` WHERE product_id=".$_GET["id"].";";
	    $result = queryToDB($query);
	    echo json_encode(mysqli_fetch_object($result));
        }
    }

    // fetch corporate given its id
    if ( $_GET["type"] == "get-corporate"){
        if (isset($_GET["corporateid"])) {        
    	    $query = "SELECT name FROM azienda WHERE corporate_id=".$_GET["corporateid"].";";
       	    $result = queryToDB($query);
            echo json_encode(mysqli_fetch_object($result));
        }
    }
    
    // get number of total clients available
    if ($_GET["type"] == "get-clients-number") {
    	$query = "SELECT COUNT(*) FROM cliente;";
   	$result = queryToDb($query);
    	echo json_encode(mysqli_fetch_object($result));
    }
    
    // get number of total phone call executed by user 
    if ($_GET["type"] == "get-executed-phonecall-number") {
    	$query = "SELECT COUNT(*) FROM telefonata WHERE user_id=".$_GET["id"].";";
   	$result = queryToDb($query);
    	echo json_encode(mysqli_fetch_object($result));
    }
    
    // get number of total phone call executed by user that turned out into a sale
    if ($_GET["type"] == "get-positive-outcomes-number") {
    	$query = "SELECT COUNT(*) FROM telefonata WHERE user_id=".$_GET["id"]." AND was_sold=1;";
   	$result = queryToDb($query);
    	echo json_encode(mysqli_fetch_object($result));
    }

    // get number of total phone call executed by user that turned out into a sale
    if ($_GET["type"] == "get-negative-outcomes-number") {
    	$query = "SELECT COUNT(*) FROM telefonata WHERE user_id=".$_GET["id"]." AND was_sold=0;";
   	$result = queryToDb($query);
    	echo json_encode(mysqli_fetch_object($result));
    }
    
    // get phonecalls info made by a specific user
    if ($_GET["type"] == "get-phonecalls") {
    	if(isset($_GET["id"])) {
	    $query = "SELECT call_id, cliente.name, cliente.surname, outcome, was_sold, date, azienda.name AS corporate_name, prodotto.name AS product_name, cliente.phone_number FROM telefonata INNER JOIN cliente ON telefonata.client_id=cliente.id INNER JOIN prodotto ON telefonata.product_id=prodotto.product_id INNER JOIN azienda ON prodotto.corporate_id=azienda.corporate_id WHERE user_id=".$_GET["id"].";";
	    $result = queryToDb($query);
	    echo '[';
            for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
                echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
            }
            echo ']';
    	}
    }
    
    // get all users
    if ($_GET["type"] == "get-all-users") {
    	$query = "SELECT * FROM utente ORDER BY is_admin DESC, user_id ASC;";
    	$result = queryToDb($query);
	echo '[';
	for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
	    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
	}
	echo ']';
    }
    
    // get all products info 
    if ($_GET["type"] == "get-all-products") {
	    $query = "SELECT prodotto.name AS product_name, description, product_id, prodotto.corporate_id, azienda.name AS corporate_name FROM prodotto INNER JOIN azienda ON prodotto.corporate_id = azienda.corporate_id;";
	    $result = queryToDb($query);
	    echo '[';
	    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
		echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
	    }
	    echo ']';
    
    }
    
    // get all corporations
    if ($_GET["type"] == "get-all-corporations") {
    	$query = "SELECT * FROM azienda";
	    $result = queryToDb($query);
	    echo '[';
	    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
		echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
	    }
	    echo ']';
    }
    
    // get all clients
    if ($_GET["type"] == "get-all-clients") {
    	$query = "SELECT * FROM cliente";
	    $result = queryToDb($query);
	    echo '[';
	    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
		echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
	    }
	    echo ']';
    }
    
    
}

// $method = $_SERVER['REQUEST_METHOD'];
// switch($method) {
//     case "GET":
//         $sql = "SELECT * FROM users";
//         $path = explode('/', $_SERVER['REQUEST_URI']);
//         if(isset($path[3]) && is_numeric($path[3])) {
//             $sql .= " WHERE id = :id";
//             $stmt = $conn->prepare($sql);
//             $stmt->bindParam(':id', $path[3]);
//             $stmt->execute();
//             $users = $stmt->fetch(PDO::FETCH_ASSOC);
//         } else {
//             $stmt = $conn->prepare($sql);
//             $stmt->execute();
//             $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
//         }

//         echo json_encode($users);
//         break;
//     case "POST":
//         $user = json_decode( file_get_contents('php://input') );
//         $sql = "INSERT INTO users(id, name, email, mobile, created_at) VALUES(null, :name, :email, :mobile, :created_at)";
//         $stmt = $conn->prepare($sql);
//         $created_at = date('Y-m-d');
//         $stmt->bindParam(':name', $user->name);
//         $stmt->bindParam(':email', $user->email);
//         $stmt->bindParam(':mobile', $user->mobile);
//         $stmt->bindParam(':created_at', $created_at);

//         if($stmt->execute()) {
//             $response = ['status' => 1, 'message' => 'Record created successfully.'];
//         } else {
//             $response = ['status' => 0, 'message' => 'Failed to create record.'];
//         }
//         echo json_encode($response);
//         break;

//     case "PUT":
//         $user = json_decode( file_get_contents('php://input') );
//         $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
//         $stmt = $conn->prepare($sql);
//         $updated_at = date('Y-m-d');
//         $stmt->bindParam(':id', $user->id);
//         $stmt->bindParam(':name', $user->name);
//         $stmt->bindParam(':email', $user->email);
//         $stmt->bindParam(':mobile', $user->mobile);
//         $stmt->bindParam(':updated_at', $updated_at);

//         if($stmt->execute()) {
//             $response = ['status' => 1, 'message' => 'Record updated successfully.'];
//         } else {
//             $response = ['status' => 0, 'message' => 'Failed to update record.'];
//         }
//         echo json_encode($response);
//         break;

//     case "DELETE":
//         $sql = "DELETE FROM users WHERE id = :id";
//         $path = explode('/', $_SERVER['REQUEST_URI']);

//         $stmt = $conn->prepare($sql);
//         $stmt->bindParam(':id', $path[3]);

//         if($stmt->execute()) {
//             $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
//         } else {
//             $response = ['status' => 0, 'message' => 'Failed to delete record.'];
//         }
//         echo json_encode($response);
//         break;
// }
