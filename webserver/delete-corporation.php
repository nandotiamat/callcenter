<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));


    $id = $data->id;

    $query = "DELETE FROM azienda WHERE corporate_id = '$id'";
    $result = queryToDB($query);
    if ( $result == 1 ){
        echo "1";
    }	else {
    	echo "-1";
    }
?>
