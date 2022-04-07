<?php
	header('Access-Control-Allow-Origin: *');
	include 'login.php';

	$connect = mysqli_connect($host, $db_username, $db_password, $db_name);

	$queryGetData = "SELECT * FROM mementoMoriUserCount WHERE 1 = 1";

    $resultGetData = mysqli_query($connect, $queryGetData);

	if ($rows = mysqli_fetch_array($result)) {
		$requestNumber = $rows['visitNumber'];
	}

	$_SERVER['REMOTE_ADDR'];

	{"data": {"date": {"ip": "", "ip2": ""}}}

    $query = "UPDATE mementoMoriUserCount SET visitNumber =  + 1";

    $result = mysqli_query($connect, $query);

	mysqli_close($connect);
?>