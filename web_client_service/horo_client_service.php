<?php

	// ------------------------------- Global Variables ---------------------------------

	$id_param 		  = isset($_POST['param_id1'])?trim($_POST['param_id1']):null;
	$horo_type 		  = isset($_POST['param_type1'])?trim($_POST['param_type1']):null;
	$id_article_param = isset($_POST['param_article_id1'])?trim($_POST['param_article_id1']):null;





	// ------------------------------- Daily Horo Function ---------------------------------

	if (isset($id_param) && $horo_type == "daily-link") {

		$daily_url = 'http://aduang-svc-dev.azurewebsites.net/horoscopes/daily/'.$id_param;

		$daily_horo = gettingData($daily_url, "", "", "GET");
		echo $daily_horo;
		// echo $horo_type;
		
	}




	// ------------------------------- Weekly Horo Function ---------------------------------

	if (isset($id_param) && $horo_type == "weekly-link") {

		$weekly_url = 'http://aduang-svc-dev.azurewebsites.net/horoscopes/weekly/'.$id_param;

		$weekly_horo = gettingData($weekly_url, "", "", "GET");
		echo $weekly_horo;
	}




	// ------------------------------- Monthly Horo Function ---------------------------------

	if (isset($id_param) && $horo_type == "monthly-link") {

		$monthly_url = 'http://aduang-svc-dev.azurewebsites.net/horoscopes/monthly/'.$id_param;

		$monthly_horo = gettingData($monthly_url, "", "", "GET");
		echo $monthly_horo;
	}



	// ------------------------------- Article Horo Function ---------------------------------

	if (isset($id_article_param)) {

		$article_url = 'http://aduang-svc-dev.azurewebsites.net/articles/general';

		$article_horo = gettingData($article_url, "", "", "GET");
		echo $article_horo;
	}



	// ------------------------------- CURL Function ---------------------------------

	function gettingData ($url, $headers, $body, $method) {

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($ch);
		curl_close($ch);

		return $result;
	}

?>