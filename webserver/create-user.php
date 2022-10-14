<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data)){

        $name = addslashes($data->data->name);
        $surname = addslashes($data->data->surname);
        $username = $data->data->username;
        $birthday = addslashes($data->data->birthday);
        $salary = $data->data->salary;
        $is_admin = $data->data->is_admin;
        $password = $data->data->password;

        $query = "INSERT INTO utente(name, surname, date_of_birth, salary, is_admin, username, password, user_id) VALUES ('$name','$surname','$birthday','$salary','$is_admin','$username','$password', NULL);";
        $result = queryToDB($query);
        if ( $result == 1) {
            echo "1" ;
        } else {
            echo "0";
	}
    }


?>
