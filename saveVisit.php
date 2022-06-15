<?php
	header('Access-Control-Allow-Origin: *');
	include 'login.php';

	$connect = mysqli_connect($host, $db_username, $db_password, $db_name);

	function addVisitToTotalCount() {
		global $connect;

		function getCurrentVisitData($connect) {
			$query = "SELECT * FROM mementomori_user_data WHERE 1 = 1";

			$result = mysqli_query($connect, $query);

			if ($rows = mysqli_fetch_array($result)) {
				return json_decode($rows['data_visits'], true);
			}
		}

		function addNewUniqueVisit($connect) {
			$query = "UPDATE mementomori_user_data SET unique_visits = unique_visits + 1";
	
			$result = mysqli_query($connect, $query);
		}

		$currentVisitData = getCurrentVisitData($connect);
		$today = date('d-m-Y');
		$userIp = $_SERVER['REMOTE_ADDR'];

		if (!isset($currentVisitData[$userIp])) {
			$currentVisitData[$userIp] = array('total' => 1);
		}

		if (isset($currentVisitData[$userIp][$today])) {
			$currentVisitData[$userIp][$today] ++;
			$currentVisitData[$userIp]['total'] ++;
		}
		else {
			$currentVisitData[$userIp][$today] = 1;
			addNewUniqueVisit($connect);
		}

		$newVisitData = json_encode($currentVisitData, true);

		$query = "UPDATE mementomori_user_data SET data_visits = '$newVisitData'";

		$result = mysqli_query($connect, $query);
	}

	function addVisitData() {
		global $connect;

		$query = "UPDATE mementomori_user_data SET total_visits = total_visits + 1";

		$result = mysqli_query($connect, $query);
	}

	addVisitToTotalCount();
	addVisitData();

	mysqli_close($connect);
?>