<?php

$questionID = $_POST['questionId1'];
$accessToken = $_COOKIE['accessToken'];
$url = 'http://aduang-svc-dev.azurewebsites.net/questions/inbox/'.$questionID.'/read';

$ch = curl_init($url);

$headers = array("Authorization: Token token=\"$accessToken\"",
				 "Ookbee-Appcode: HORO_401",
				 "Content-Type: application/json");

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, "");
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$sending_id = curl_exec($ch);
echo $sending_id;
curl_close($ch);
?>