<?php

	

	// ------------------------------------ Getting Value from Ajax Script --------------------------------------

	$accessToken = isset($_POST['ask_access1'])?trim($_POST['ask_access1']):null;
	$accessToken_answer = isset($_POST['ask_ans_noti'])?trim($_POST['ask_ans_noti']):null;
	// $accessToken_all = isset($_POST['ask_all_noti1'])?trim($_POST['ask_all_noti1']):null;






	// ------------------------------------ Getting Asking Notification function --------------------------------------


	if (isset($accessToken)) {



		$url_question = 'http://aduang-svc-dev.azurewebsites.net/questions/outbox?length=20';

		$headers_question = array("Authorization: Token token=\"$accessToken\"",
	 							  "Ookbee-Appcode: HORO_401",
	 							  "Accept: application/json",
					 			  "Content-Type: application/x-www-form-urlencoded");

		$ch_question = curl_init();

		curl_setopt($ch_question, CURLOPT_URL, $url_question);
		curl_setopt($ch_question, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch_question, CURLOPT_HTTPHEADER, $headers_question);
		curl_setopt($ch_question, CURLOPT_POSTFIELDS, "");
		curl_setopt($ch_question, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_question, CURLOPT_RETURNTRANSFER, true);

		$result_question = curl_exec($ch_question);
		echo $result_question;
		curl_close($ch_question);
	}





	// ------------------------------------ Getting Answer Notification function --------------------------------------


	if (isset($accessToken_answer)) {

		$url_question = 'http://aduang-svc-dev.azurewebsites.net/questions/inbox?type=0&status=0';

		$headers_answer = array("Authorization: Token token=\"$accessToken_answer\"",
	 							  "Ookbee-Appcode: HORO_401",
	 							  "Accept: application/json",
					 			  "Content-Type: application/x-www-form-urlencoded");

		$ch_answer = curl_init();

		curl_setopt($ch_answer, CURLOPT_URL, $url_question);
		curl_setopt($ch_answer, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch_answer, CURLOPT_HTTPHEADER, $headers_answer);
		curl_setopt($ch_answer, CURLOPT_POSTFIELDS, "");
		curl_setopt($ch_answer, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_answer, CURLOPT_RETURNTRANSFER, true);

		$result_answer = curl_exec($ch_answer);
		echo $result_answer;
		curl_close($ch_answer);

	}








	// ------------------------------------ Getting All Notification function --------------------------------------

	// if (isset($accessToken_all)) {

	// 	$url_all = 'http://aduang-svc-dev.azurewebsites.net/questions';

	// 	$header_all = array("Authorization: Token token=\"$accessToken_all\"",
	//  							  "Ookbee-Appcode: HORO_401",
	//  							  "Accept: application/json",
	// 				 			  "Content-Type: application/x-www-form-urlencoded");

	// 	$ch_all = curl_init();

	// 	curl_setopt($ch_all, CURLOPT_URL, $url_all);
	// 	curl_setopt($ch_all, CURLOPT_CUSTOMREQUEST, "GET");
	// 	curl_setopt($ch_all, CURLOPT_HTTPHEADER, $header_all);
	// 	curl_setopt($ch_all, CURLOPT_POSTFIELDS, "");
	// 	curl_setopt($ch_all, CURLOPT_FOLLOWLOCATION, 1);
	// 	curl_setopt($ch_all, CURLOPT_RETURNTRANSFER, true);

	// 	$result_all = curl_exec($ch_all);
	// 	echo $result_all;
	// 	curl_close($ch_all);
	// }

?>