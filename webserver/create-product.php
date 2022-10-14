<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));

    if (isset($data)) {
	    $product_name = addslashes($data->data->name);
	    $corporate_id = addslashes($data->data->corporate_id);
	    $description = addslashes($data->data->description);

	    $query = "INSERT INTO prodotto (product_id, name, description, corporate_id) VALUES (NULL, '$product_name','$description','$corporate_id')";
	    $result = queryToDB($query);
	    if ( $result == 1 ){
		echo "1";
	    }	else {
	    	echo "-1";
	    }
    }
?>
