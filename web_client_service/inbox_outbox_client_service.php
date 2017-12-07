<?php

	
	// ----------------------------------- Urls --------------------------------
	
	$url_outbox = 'http://aduang-svc-dev.azurewebsites.net/questions/outbox?length=15';
	$url_inbox_waiting = 'http://aduang-svc-dev.azurewebsites.net/questions/inbox?type=0&status=0';
	$url_inbox_done = 'http://aduang-svc-dev.azurewebsites.net/questions/inbox/done';
	$url_answer = 'http://aduang-svc-dev.azurewebsites.net/answer/';
	
	$accessToken = $_COOKIE['accessToken'];



	
	// ----------------------------------- Main Outbox --------------------------------

	$main_outbox = isset($_POST['outbox1'])?trim($_POST['outbox1']):null;

	if(isset($main_outbox)) {

		$ch = curl_init();

		$headers = array("Authorization: Token token=\"$accessToken\"",
					 "Ookbee-Appcode: HORO_401",
					 "Accept: application/json",
					 "Content-Type: application/json");

		curl_setopt($ch, CURLOPT_URL, $url_outbox);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($ch);
		echo $result;
		curl_close($ch);

	}




	// ----------------------------------- Main Inbox --------------------------------

	$main_inbox = isset($_POST['inbox1'])?trim($_POST['inbox1']):null;

	if (isset($main_inbox)) {

		$ch_inbox = curl_init();

		$headers = array("Authorization: Token token=\"$accessToken\"",
					 "Ookbee-Appcode: HORO_401",
					 "Accept: application/json",
					 "Content-Type: application/json");

		curl_setopt($ch_inbox, CURLOPT_URL, $url_inbox_waiting);
		curl_setopt($ch_inbox, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch_inbox, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch_inbox, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_inbox, CURLOPT_RETURNTRANSFER, true);

		$inbox_result = curl_exec($ch_inbox);
		echo $inbox_result;
		curl_close($ch_inbox);
	}






	// -------------------- Get Answer following by Question ID --------------------------

	$answer_id = isset($_POST['AnswerId1'])?trim($_POST['AnswerId1']):null;

	if (isset($answer_id)) {

		$ch_answer = curl_init();
		$url_answer = 'http://aduang-svc-dev.azurewebsites.net/answer/'.$answer_id;

		$test_url = json_encode($url_answer);
		// echo $test_url;

		$headers = array("Authorization: Token token=\"$accessToken\"",
					 "Ookbee-Appcode: HORO_401",
					 "Accept: application/json",
					 "Content-Type: application/json");

		curl_setopt($ch_answer, CURLOPT_URL, $url_answer);
		curl_setopt($ch_answer, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch_answer, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch_answer, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_answer, CURLOPT_RETURNTRANSFER, true);

		$answer_result = curl_exec($ch_answer);
		echo $answer_result;
		curl_close($ch_answer);
	}





	// -------------------- POST isRead Outbox --------------------------

	$is_read = isset($_POST['questionId1'])?trim($_POST['questionId1']):null;

	if (isset($is_read)) {

		$ch_read = curl_init();
		$url_read = 'http://aduang-svc-dev.azurewebsites.net/questions/outbox/'.$is_read.'/read';

		$headers_read = array("Authorization: Token token=\"$accessToken\"",
					 "Ookbee-Appcode: HORO_401",
					 "Accept: application/json",
					 "Content-Type: application/json");


		curl_setopt($ch_read, CURLOPT_URL, $url_read);
		curl_setopt($ch_read, CURLOPT_POST, 1);
		curl_setopt($ch_read, CURLOPT_HTTPHEADER, $headers_read);
		curl_setopt($ch_read, CURLOPT_POSTFIELDS, "");
		curl_setopt($ch_read, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_read, CURLOPT_RETURNTRANSFER, true);

		$read_result = curl_exec($ch_read);
		echo $answer_result;
		curl_close($ch_read);
	}

?>