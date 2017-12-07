<?php

	// Generate DeviceID
	function GUID() {
		if (function_exists('com_create_guid()') === true) {
			return trim(com_create_guid(), '{}');
		}

		return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X',  mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
	}

	// check login field
	$email_login = isset($_POST['email1'])?trim($_POST['email1']):null;
	$password_login = isset($_POST['password1'])?trim($_POST['password1']):null;


	// check regis field
	$email_regis = isset($_POST['regis_email1'])?trim($_POST['regis_email1']):null;
	$name_regis = isset($_POST['regis_name1'])?trim($_POST['regis_name1']):null;
	$password_regis = isset($_POST['regis_password1'])?trim($_POST['regis_password1']):null;


	// check login Facebook field
	$facebook_accessToken = isset($_POST['facebook_token1'])?trim($_POST['facebook_token1']):null;
	$facebook_userId = isset($_POST['facebook_userId1'])?trim($_POST['facebook_userId1']):null;



	if (isset($email_login) && isset($password_login)) {
		
		
		$deviceId = GUID();

		// echo $email_login;

		// login session
		$url_login = 'http://obg-accountssvc-dev.azurewebsites.net/auth';

		// Initiate cURL
		$ch = curl_init($url_login);

		// headers array for Auth Rest Api Keys
		$headers = array('Ookbee-Appcode: HORO_401',
						 'Ookbee-Auth-Rest-Api-Key: AREr1DBX6EZEf/f2Vsm4YsiZ86ZsNP5mxCWkW/COdEM3AEFEVUFOR180MDI=',
						 'Accept: application/json',
						 'Content-Type: application/x-www-form-urlencoded');

		$jsonBody = array('platform' => 'website',
						  'deviceId' => 'devw/HORO_401',
						  'appCode'  => 'HORO_401',
						  'ookbeeId' => $email_login,
						  'password' => $password_login);

		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($jsonBody));
		// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  

		$result =  curl_exec($ch);
		// echo $result;
		curl_close($ch);


		// login to a ดวง 
		if (isset($result)) {

			$data = json_decode($result, true);
			$accessToken = $data['data']['accessToken'];
			$expireToken = $data['data']['accessTokenExpiresDate'];
			$refreshToken = $data['data']['refreshToken'];

			setcookie("accessToken", $accessToken, strtotime($expireToken), "/");
			setcookie("refreshToken", $refreshToken, strtotime($expireToken), "/");
			setcookie("yourDeviceId", $deviceId, strtotime($expireToken), "/");

			// request userInfo Login
			$url_userInfo = "http://aduang-svc-dev.azurewebsites.net/user/me";
		 	$ch_userInfo = curl_init($url_userInfo);

		 	$headers_userInfo = array("Authorization: Token token=\"$accessToken\"",
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
	}




	// Register to a ดวง 
  if (isset($email_regis) && isset($password_regis) && isset($name_regis)) {

		$deviceId = GUID();


		$url_regis =  'http://obg-accountssvc-dev.azurewebsites.net/register';
		$ch_regis = curl_init($url_regis);

		$headers_register = array('Ookbee-Appcode: HORO_401',
														 'Ookbee-Auth-Rest-Api-Key: AREr1DBX6EZEf/f2Vsm4YsiZ86ZsNP5mxCWkW/COdEM3AEFEVUFOR180MDI=',
														 'Accept: application/json',
														 'Content-Type: application/x-www-form-urlencoded');

		$jsonRegis = array('platform' => 'website',
						  'deviceId' => 'devw/HORO_401',
						  'appCode'  => 'HORO_401',
						  'emailAddress' => $email_regis,
						  'password' => $password_regis,
							'firstName' => $name_regis);

		curl_setopt($ch_regis, CURLOPT_POST, 1);
		curl_setopt($ch_regis, CURLOPT_HTTPHEADER, $headers_register);
		curl_setopt($ch_regis, CURLOPT_POSTFIELDS, http_build_query($jsonRegis));
		curl_setopt($ch_regis, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_regis, CURLOPT_RETURNTRANSFER, true);

		$result_regis = curl_exec($ch_regis);
		echo $result_regis;
		curl_close($ch_regis);



		if (isset($result_regis)) {

			$url_login2 = 'http://obg-accountssvc-dev.azurewebsites.net/auth';
			// Initiate cURL
			$ch2 = curl_init($url_login2);

			// headers array for Auth Rest Api Keys
			$headers2 = array('Ookbee-Appcode: HORO_401',
							 'Ookbee-Auth-Rest-Api-Key: AREr1DBX6EZEf/f2Vsm4YsiZ86ZsNP5mxCWkW/COdEM3AEFEVUFOR180MDI=',
							 'Accept: application/json',
							 'Content-Type: application/x-www-form-urlencoded');

			$jsonBody2 = array('platform' => 'website',
							  'deviceId' => 'devw/HORO_401',
							  'appCode'  => 'HORO_401',
							  'ookbeeId' => $email_regis,
							  'password' => $password_regis);

			curl_setopt($ch2, CURLOPT_POST, 1);
			curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers2);
			curl_setopt($ch2, CURLOPT_POSTFIELDS, http_build_query($jsonBody2));
			// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);  

			$result2 =  curl_exec($ch2);
			echo $result2;
			curl_close($ch2);


			// login to a ดวง 
			if (isset($result2)) {

				$data2 = json_decode($result2, true);
				$accessToken2 = $data2['data']['accessToken'];
				$expireToken2 = $data2['data']['accessTokenExpiresDate'];
				$refreshToken2 = $data2['data']['refreshToken'];

				// echo $accessToken2;
				// request userInfo Login
				$url_userInfo2 = "http://aduang-svc-dev.azurewebsites.net/user/auth";
			 	$ch_userInfo2 = curl_init($url_userInfo2);

			 	$headers_userInfo2 = array("Authorization: Token token=\"$accessToken2\"",
			 							  "Ookbee-Appcode: HORO_401",
			 							  "Accept: application/json",
							 			  "Content-Type: application/x-www-form-urlencoded");

			 	curl_setopt($ch_userInfo2, CURLOPT_POST, 1);
				curl_setopt($ch_userInfo2, CURLOPT_HTTPHEADER, $headers_userInfo2);
				curl_setopt($ch_userInfo2, CURLOPT_POSTFIELDS, "");
				curl_setopt($ch_userInfo2, CURLOPT_FOLLOWLOCATION, 1);
				curl_setopt($ch_userInfo2, CURLOPT_RETURNTRANSFER, true);  

			    $result_user2 = curl_exec($ch_userInfo2);
				echo $result_user2;
				curl_close($ch_userInfo2);



				if ($result_user2 == "") {

					$url_user_regis_login = 'http://aduang-svc-dev.azurewebsites.net/user/me';
					$ch_user_regis_login = curl_init();

					setcookie("accessToken", $accessToken2, strtotime($expireToken2), "/");
					setcookie("refreshToken", $refreshToken2, strtotime($expireToken2), "/");
					
					$headers_userInfo3 = array("Authorization: Token token=\"$accessToken2\"",
			 							  "Ookbee-Appcode: HORO_401",
			 							  "Accept: application/json",
							 			  "Content-Type: application/x-www-form-urlencoded");

					curl_setopt($ch_user_regis_login, CURLOPT_URL, $url_user_regis_login);
					curl_setopt($ch_user_regis_login, CURLOPT_CUSTOMREQUEST, "GET");
					curl_setopt($ch_user_regis_login, CURLOPT_HTTPHEADER, $headers_userInfo3);
					curl_setopt($ch_user_regis_login, CURLOPT_POSTFIELDS, "");
					curl_setopt($ch_user_regis_login, CURLOPT_FOLLOWLOCATION, 1);
					curl_setopt($ch_user_regis_login, CURLOPT_RETURNTRANSFER, true);

					$result_user3 = curl_exec($ch_user_regis_login);
					echo $result_user3;
					curl_close($ch_user_regis_login);
				}
			}
		}

	}







	// --------------------- Login Facebook Function -----------------------

	if (isset($facebook_accessToken) && isset($facebook_userId)) {


		$ch_facebook_login = curl_init();
		$url_facebook	= "http://obg-accountssvc-dev.azurewebsites.net/auth/facebook";

		$headers_facebook = array('Ookbee-Appcode: HORO_401',
															 'Ookbee-Auth-Rest-Api-Key: AREr1DBX6EZEf/f2Vsm4YsiZ86ZsNP5mxCWkW/COdEM3AEFEVUFOR180MDI=',
															 'Accept: application/json');

		$jsonFacebook = array('facebookAccessToken' => $facebook_accessToken,
													'platform' => 'website',
													'deviceId' => 'devw/HORO_401',
													'facebookAppId' => '1790866304469860',
													'appCode' => 'HORO_401',
													'reauthenticate' => 'false');

		curl_setopt($ch_facebook_login, CURLOPT_URL, $url_facebook);
		curl_setopt($ch_facebook_login, CURLOPT_POST, 1);
		curl_setopt($ch_facebook_login, CURLOPT_HTTPHEADER, $headers_facebook);
		curl_setopt($ch_facebook_login, CURLOPT_POSTFIELDS, http_build_query($jsonFacebook));
		curl_setopt($ch_facebook_login, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch_facebook_login, CURLOPT_RETURNTRANSFER, true);

		$result_facebook = curl_exec($ch_facebook_login);
		// echo $result_facebook;
		curl_close($ch_facebook_login);


		if (isset($result_facebook)) {

			$data_facebook = json_decode($result_facebook, true);
			$accessToken_facebook = $data_facebook['data']['accessToken'];
			$refreshToken_facebook = $data_facebook['data']['refreshToken'];
			$exprieToken_facebook = $data_facebook['data']['accessTokenExpiresDate'];

			$url_fb_login = 'http://aduang-svc-dev.azurewebsites.net/user/auth';
			$ch_fb = curl_init();

			$headers_userInfo2 = array("Authorization: Token token=\"$accessToken_facebook\"",
		 							   "Ookbee-Appcode: HORO_401",
		 							   "Accept: application/json",
						 			   "Content-Type: application/x-www-form-urlencoded");

			curl_setopt($ch_fb, CURLOPT_URL, $url_fb_login);
			curl_setopt($ch_fb, CURLOPT_POST, 1);
			curl_setopt($ch_fb, CURLOPT_HTTPHEADER, $headers_userInfo2);
			curl_setopt($ch_fb, CURLOPT_POSTFIELDS, "");
			curl_setopt($ch_fb, CURLOPT_FOLLOWLOCATION, 1);
			curl_setopt($ch_fb, CURLOPT_RETURNTRANSFER, true);

			$return_facebook = curl_exec($ch_fb);
			// echo $return_facebook;
			curl_close($ch_fb);

			


			if ($return_facebook == "") {

				setcookie("accessToken", $accessToken_facebook, strtotime($exprieToken_facebook), "/");
				setcookie("refreshToken", $refreshToken_facebook, strtotime($exprieToken_facebook), "/");

				$fb_userInfo_url = "http://aduang-svc-dev.azurewebsites.net/user/me";

				$ch_fb_login = curl_init();

				$header_fb_login = $headers_userInfo2 = array("Authorization: Token token=\"$accessToken_facebook\"",
		 							   "Ookbee-Appcode: HORO_401",
		 							   "Accept: application/json",
						 			   "Content-Type: application/json");

				curl_setopt($ch_fb_login, CURLOPT_URL, $fb_userInfo_url);
				curl_setopt($ch_fb_login, CURLOPT_CUSTOMREQUEST, "GET");
				curl_setopt($ch_fb_login, CURLOPT_HTTPHEADER, $header_fb_login);
				curl_setopt($ch_fb_login, CURLOPT_POSTFIELDS, "");
				curl_setopt($ch_fb_login, CURLOPT_FOLLOWLOCATION, 1);
				curl_setopt($ch_fb_login, CURLOPT_RETURNTRANSFER, true);

				$retrn_fb_login = curl_exec($ch_fb_login);
				// echo $retrn_fb_login;
				curl_close($ch_fb_login);


				if(isset($retrn_fb_login)) {

					// path profile Pics 
					$path_profile = 'http://aduang-svc-dev.azurewebsites.net/user/me/profile';

					$ch_patch = curl_init();

					$header_fb_patch = array("Authorization: Token token=\"$accessToken_facebook\"",
			 							   "Ookbee-Appcode: HORO_401",
			 							   "Accept: application/json",
							 			   "Content-Type: application/json");

					$each_body_patch = array("value" => "https://graph.facebook.com/".$facebook_userId."/picture?type=large",
											 "path" => "profileImageUrl",
											 "op" => "replace");

					// $each_body_patch = json_encode($each_body_patch);
					$body_patch = array($each_body_patch);
					$body_patch = json_encode($body_patch);
					echo $body_patch;
					

					curl_setopt($ch_patch, CURLOPT_URL, $path_profile);
					curl_setopt($ch_patch, CURLOPT_CUSTOMREQUEST, "PATCH");
					curl_setopt($ch_patch, CURLOPT_HTTPHEADER, $header_fb_patch);
					curl_setopt($ch_patch, CURLOPT_POSTFIELDS, $body_patch);
					curl_setopt($ch_patch, CURLOPT_FOLLOWLOCATION, 1);
					curl_setopt($ch_patch, CURLOPT_RETURNTRANSFER, true);

					$return_fb_patch = curl_exec($ch_patch);
					echo $return_fb_patch;
					curl_close($ch_patch); 
				}
			}
		}
	}

?>