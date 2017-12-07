<?php
	
// set value from answer form
$answer_field = isset($_POST['answer_field'])?trim($_POST['answer_field']):null;
// $each_attach = isset($_POST['each_attach'])?trim($_POST['answer_field']):null;
$questionId = isset($_POST['question_id'])?trim($_POST['question_id']):null;
$accessToken = $_COOKIE['accessToken'];


if (isset($_POST['each_attach']) && $_POST['each_attach'] != "") {
	
	$each_attach = $_POST['each_attach'];

} else {

	$each_attach = array();

} 
 
$url = 'http://aduang-svc-dev.azurewebsites.net/questions/'.$questionId.'/answer';

$ch = curl_init($url);

$headers = array("Authorization: Token token=\"$accessToken\"",
				 "Ookbee-Appcode: HORO_401",
				 "Content-Type: application/json");

$arrayAnswer = array("content" => $answer_field,
					"imageUrls" => $each_attach);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($arrayAnswer));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$sending_answer = curl_exec($ch);
echo $sending_answer;
curl_close($ch);
?>