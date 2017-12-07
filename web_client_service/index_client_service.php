<?php
	
	// ------------------------------- Global Variables -------------------------------
	
	$daily_url   = 'http://aduang-svc-dev.azurewebsites.net/horoscopes/daily';
	$weekly_url  = 'http://aduang-svc-dev.azurewebsites.net/horoscopes/weekly';
	$monthly_url = 'http://aduang-svc-dev.azurewebsites.net/horoscopes/monthly';
	$yearly_url  = 'http://aduang-svc-dev.azurewebsites.net/horoscopes/yearly';
	$article_url = 'http://aduang-svc-dev.azurewebsites.net/articles/general';


	$accessToken = $_COOKIE['accessToken'];

	$headers	 = array("Authorization: Token token=\"$accessToken\"",
						 "Ookbee-Appcode: HORO_401",
						 "Accept: application/json",
						 "Content-Type: application/json");


	$daily_horo   = isset($_POST['daily1'])?trim($_POST['daily1']):null;
	$weekly_horo  = isset($_POST['weekly1'])?trim($_POST['weekly1']):null;
	$monthly_horo = isset($_POST['monthly1'])?trim($_POST['monthly1']):null;
	$yearly_horo  = isset($_POST['yearly1'])?trim($_POST['yearly1']):null;
	$article_horo = isset($_POST['article1'])?trim($_POST['article1']):null;





	// ------------------------------- Daily Horo Function --------------------------------

	if (isset($daily_horo)) {

		$daily_display = gettingData($daily_url, $headers, "", "GET");
		echo $daily_display;
	}	


	// ------------------------------- Weekly Horo Function --------------------------------


	if (isset($weekly_horo)) {
		$weekly_display = gettingData($weekly_url, $headers, "", "GET");
		echo $weekly_display;
	}



	// ------------------------------- Monthly Horo Function --------------------------------

	if (isset($monthly_horo)) {

		$monthly_display = gettingData($monthly_url, $headers, "", "GET");
		echo $monthly_display;
	}


	// ------------------------------- Yearly Horo Function --------------------------------

	// if (isset($yearly_horo)) {

	// 	$yearly_display = gettingData($yearly_url, $headers, "", "GET");
	// 	echo $yearly_display;
	// }





	// ------------------------------- Article Horo Function --------------------------------

	if (isset($article_horo)) {

		$article_display = gettingData($article_url, $headers, "", "GET");
		echo $article_display;
	}





	// ------------------------------- Getting Data Function -------------------------------

	function gettingData($url, $headers, $body, $method) {

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($ch);
		echo $result;
		curl_close($ch);
	}
?>