<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data)){

        $name = addslashes($data->data->name);
        $surname = addslashes($data->data->surname);
        $birthday = addslashes($data->data->birthday);
        $phone_number = $data->data->phone_number;

        $query = "INSERT INTO cliente(id, name, surname, date_of_birth, phone_number) VALUES (NULL, '$name','$surname','$birthday','$phone_number');";
        $result = queryToDB($query);
        if ( $result == 1) {
            echo "1" ;
        } else {
            echo "0";
	}
    }


?>
