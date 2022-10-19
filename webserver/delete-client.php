<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));


    $id = $data->id;

    $query = "DELETE FROM `cliente` WHERE id = '$id'";
    $result = queryToDB($query);
    if ( $result == 1 ){
        echo "Query inviata con successo";
    }   
?>
