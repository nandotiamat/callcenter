<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data)){
	
	
    	$corporate_name= addslashes($data->data->name);
    	$corporate_id = addslashes($data->data->corporate_id);
    	
        $query = "UPDATE azienda 
                  SET name='$corporate_name'
                  WHERE corporate_id = '$corporate_id';";

        $result = queryToDB($query);

        if ( $result == 1) {
            echo "1" ;
        }
    }


?>
