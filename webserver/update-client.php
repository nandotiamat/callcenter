<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data)){

        $id = addslashes($data->data->id);
        $name = addslashes($data->data->name);
        $surname = addslashes($data->data->surname);
        $birthday = addslashes($data->data->birthday);
        $phone_number = $data->data->phone_number;
        $query = "UPDATE cliente SET name='$name',surname='$surname', date_of_birth='$birthday', phone_number='$phone_number' WHERE id='$id';";

        $result = queryToDB($query);

        if ( $result == 1) {
            echo "1";
        } else {
       	    echo "0";
        }
    }


?>
