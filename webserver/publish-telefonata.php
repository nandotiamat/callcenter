<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data)){

	$client_id = addslashes($data->data->client_id);
        $corporate_id = addslashes($data->data->corporate);
        $description = addslashes($data->data->description);
        $product_id = addslashes($data->data->product_id);
        $was_sold = $data->data->was_sold;
        $user_id = $data->data->user_id;
	
	
	$query = "INSERT INTO `telefonata`(`call_id`, `user_id`, `client_id`, `product_id`, `date`, `outcome`, `was_sold`) VALUES (NULL,'$user_id','$client_id', '$product_id', current_timestamp(),'$description', $was_sold)";
	$result = queryToDb($query);

        if ( $result == 1 ){
            echo "Query inviata con successo";
        }   

    }

?>
