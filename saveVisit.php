<?php
	header('Access-Control-Allow-Origin: *');
	include 'login.php';

	$connect = mysqli_connect($host, $db_username, $db_password, $db_name);

	
	$_SERVER['REMOTE_ADDR'];

	// {"data": {"date": {"ip": "", "ip2": ""}}}


	function addVisitToTotalCount() {
		global $connect;
		function getCurrentVisitData($connect) {

			$query = "SELECT * FROM mementoMoriUserCount WHERE 1 = 1";

			$result = mysqli_query($connect, $query);

			if ($rows = mysqli_fetch_array($result)) {
				return json_decode($rows['visitData'], true);
			}
		}

		function addNewUniqueVisit() {
			$query = "UPDATE mementoMoriUserCount SET uniqueVisitNumber = visitNumber + 1";
	
			$result = mysqli_query($connect, $query);
		}

		$currentVisitData = getCurrentVisitData($connect);

		if ($currentRque)

		$query = "UPDATE mementoMoriUserCount SET visitData = $newVisitData + 1";

		$result = mysqli_query($connect, $query);
	}

	function addVisitData() {
		global $connect;

		$query = "UPDATE mementoMoriUserCount SET visitNumber = visitNumber + 1";

		$result = mysqli_query($connect, $query);
	}

	addVisitToTotalCount();
	addVisitData();

	mysqli_close($connect);
?>