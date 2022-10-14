<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data)){

        $user_id = addslashes($data->data->user_id);
        $name = addslashes($data->data->name);
        $surname = addslashes($data->data->surname);
        $birthday = addslashes($data->data->birthday);
        $username = $data->data->username;
        $salary = $data->data->salary;
        $is_admin = $data->data->is_admin;

        $query = "UPDATE utente 
                  SET name='$name',surname='$surname', date_of_birth='$birthday', username='$username', salary='$salary', is_admin='$is_admin'
                  WHERE user_id = '$user_id';";

        $result = queryToDB($query);

        if ( $result == 1) {
            echo "1" ;
        }
    }


?>
