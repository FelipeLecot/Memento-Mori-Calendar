<?php
	header('Access-Control-Allow-Origin: *');
	include 'login.php';

	$connect = mysqli_connect($host, $db_username, $db_password, $db_name);

    $query = "UPDATE mementoMoriUserCount SET visitNumber = visitNumber + 1";

    $result = mysqli_query($connect,$query);

	mysqli_close($connect);
?>