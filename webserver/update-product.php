<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data)){

    	$product_id= addslashes($data->data->product_id);
    	$product_name = addslashes($data->data->name);
    	$corporate_id = addslashes($data->data->corporate_id);
    	$description = addslashes($data->data->description);

        $query = "UPDATE prodotto 
                  SET name='$product_name', description='$description', corporate_id='$corporate_id'
                  WHERE product_id = '$product_id';";

        $result = queryToDB($query);

        if ( $result == 1) {
            echo "1" ;
        }
    }


?>
