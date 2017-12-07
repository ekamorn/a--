<?php
	
	$accessTokenCookie = $_COOKIE['accessToken'];

	if(isset($accessTokenCookie)) {

		$url_userInfo = "http://aduang-svc-dev.azurewebsites.net/user/me";
	 	$ch_userInfo = curl_init($url_userInfo);

	 	$headers_userInfo = array("Authorization: Token token=\"$accessTokenCookie\"",
	 							  "Ookbee-Appcode: HORO_401",
	 							  "Accept: application/json",
					 			  "Content-Type: application/json");

	 	curl_setopt($ch_userInfo, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch_userInfo, CURLOPT_HTTPHEADER, $headers_userInfo);
		curl_setopt($ch_userInfo, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_userInfo, CURLOPT_RETURNTRANSFER, true);  

	    $result_user = curl_exec($ch_userInfo);
		echo $result_user;
		curl_close($ch_userInfo);
	}
?>