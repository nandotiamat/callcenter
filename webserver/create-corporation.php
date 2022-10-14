<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("index.php");

    $data = json_decode(file_get_contents("php://input"));
    
    if(isset($data)) {
    
	    $corporate_name = addslashes($data->data->name);
	    
	    $query = "INSERT INTO azienda (corporate_id, name) VALUES (NULL, '$corporate_name');";
	    $result = queryToDB($query);
	    if ( $result == 1 ){
		echo "1";
	    }	else {
	    	echo "-1";
	    }
    }
?>
