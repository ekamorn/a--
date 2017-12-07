<?php

	

	// ----------------------------- Asking Tellers Section ------------------------------


	$tellers = isset($_POST["tellers1"])?trim($_POST["tellers1"]):null;
	$url = null;

	if (isset($tellers)) {

		$url = 'http://aduang-svc-dev.azurewebsites.net/services';
		$ch = curl_init();

		$headers = array('Accept: application/json',
						 'Content-Type: application/x-www-form-urlencoded');

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($ch);
		echo $result;
		curl_close($ch);

	}





	// ----------------------------- Sending Question Section ------------------------------

	$select_teller = isset($_POST['select_teller1'])?trim($_POST['select_teller1']):null;
	$select_package = isset($_POST['select_package1'])?trim($_POST['select_package1']):null;
	$lineName = isset($_POST['lineName1'])?trim($_POST['lineName1']):null;
	$name = isset($_POST['name1'])?trim($_POST['name1']):null;
	$nickname = isset($_POST['nickname1'])?trim($_POST['nickname1']):null;
	$age = isset($_POST['age1'])?trim($_POST['age1']):null;
	$question = isset($_POST['question1'])?trim($_POST['question1']):null;	
	// $paySlip = isset($_POST['paySlip1'])?trim($_POST['paySlip1']):null;

	if (isset($_POST['attachPic1']) && $_POST['attachPic1'] != "") {
	
		$attachPic = $_POST['attachPic1'];

	} else {

		$attachPic = array();	
	}


	if (isset($_POST['paySlip1']) && $_POST['paySlip1'] != "") {

		$paySlip = $_POST['paySlip1'];

	} else {

		$paySlip = array();

	}


	if (isset($question)) {


		$accessToken = $_COOKIE['accessToken'];
		// echo $select_teller;

		$url = 'http://aduang-svc-dev.azurewebsites.net/questions/manual';
		$ch = curl_init($url);

		$headers = array("Authorization: Token token=\"$accessToken\"",
						 "Ookbee-Appcode: HORO_401",
						 "Accept: application/json",
						 "Content-Type: application/json");

		$jsonQuestion = array('serviceId' => $select_package,
							  'info' => $lineName,
							  'question' => $question,
							  'imageUrl' => $attachPic,
							  'transferSlipImgUrl' => $paySlip);

		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($jsonQuestion));
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$sending_question = curl_exec($ch);
		echo $sending_question;
		curl_close($ch);

	}

?>