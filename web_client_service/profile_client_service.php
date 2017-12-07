<?php


	// ------------------------------- Global Variables -------------------------------

	$profile_url  = 'http://aduang-svc-dev.azurewebsites.net/user/me/profile';
	$me_url 	  = 'http://aduang-svc-dev.azurewebsites.net/user/me';
	
	$accessToken  = $_POST['accessToken1']?trim($_POST['accessToken1']):null;
	$firstName 	  = $_POST['firstName1']?trim($_POST['firstName1']):null;
	$lastName 	  = $_POST['lastName1']?trim($_POST['lastName1']):null;
	$nickName	  = $_POST['nickName1']?trim($_POST['nickName1']):null;
	$birthDate    = $_POST['birthDay1']?trim($_POST['birthDay1']):null;
	$gender 	  = $_POST['gender1']?trim($_POST['gender1']):null;
	$email 		  = $_POST['email1']?trim($_POST['email1']):null;
	$mobileNum	  = $_POST['mobileNumber1']?trim($_POST['mobileNumber1']):null;
	$profileImage = $_POST['profileImage1']?trim($_POST['profileImage1']):null;

	$headers 	 = array("Authorization: Token token=\"$accessToken\"",
					 "Ookbee-Appcode: HORO_401",
					 "Accept: application/json",
					 "Content-Type: application/json");
	





	// ------------------------------- GETTING Default Data -------------------------------

	if (isset($accessToken)) {

		$getDefault = gettingData ($me_url, $headers, "", "GET");

		echo $getDefault;
	}




	// ------------------------------- GETTING Default Data -------------------------------

	if (isset($firstName) || isset($lastName) || isset($nickName) || isset($birthDate) || isset($gender) || isset($email) || isset($mobileNum) || isset($profileImage)) {

		if ($firstName == null) {

			$firstName = "";
		} 
		if ($lastName == null) {

			$lastName = "";
		}

		if ($nickName == null) {

			$nickName = "";
		}

		if ($birthDate == null) {

			$birthDate = "";
		}

		if ($gender == null) {

			$gender = "";
		}

		if ($email == null) {

			$email = "";
		}

		if ($mobileNum == null) {

			$mobileNum = "";
		}

		if ($profileImage == null) {

			$profileImage = "";
		}


		$firstName_patch = array("value" => $firstName,
								 "path"  => "firstname",
								 "op"    => "replace");

		$lastName_patch  = array("value" => $lastName,
								 "path"  => "lastname",
								 "op"    => "replace");

		$nickName_patch = array("value"  => $nickName,
								"path"   => "nickname",
								"op" 	 => "replace");

		$birthDate_patch = array("value" => $birthDate,
								 "path"  => "dateOfBirth",
								 "op" 	 => "replace");

		$gender_patch	= array("value"  => $gender,
								"path" 	 => "gender",
								"op"	 => "replace");

		$email_patch 	= array("value"  => $email,
								"path"   => "email",
								"op"	 => "replace");

		$mobileNum_patch = array("value" => $mobileNum,
								 "path"  => "mobilePhoneNumber",
								 "op"    => "replace");

		$profile_patch	= array("value"  => $profileImage,
								"path"   => "profileimageUrl",
								"op"	 => "replace");

		$body_patch		= array($firstName_patch,
							    $lastName_patch,
							    $nickName_patch,
							    $birthDate_patch,
							    $gender_patch,
							    $email_patch,
							    $mobileNum_patch,
							    $profile_patch);

		$body_patch		= json_encode($body_patch);
		// echo $body_patch;

		$accessToken_patch = $_COOKIE['accessToken'];

		$headers_patch 	 = array("Authorization: Token token=\"$accessToken_patch\"",
					 "Ookbee-Appcode: HORO_401",
					 "Accept: application/json",
					 "Content-Type: application/json");

		$patch_data = gettingData ($profile_url, $headers_patch, $body_patch, "PATCH");
		echo json_encode("success");
	}







	// ------------------------------- GETTING Data Function -------------------------------


	function gettingData ($url, $headers, $body, $method) {

		$ch = curl_init();
		$url = $url;

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($ch);
		echo $result;
		curl_close($ch);

		// return $result;
	}


	
	// ------------------------------- Upoload User Profile Image -------------------------------

	if($_FILES['upload-image-profile']['error'] > 0) {

		echo "Return Code: ".$_FILES['upload-image-profile']['error']. "<br>";
	
	} else if (isset($_FILES['upload-image-profile'])) {

		$newfilename = time() . '_' . rand(100, 999) . '.' . end(explode(".", $_FILES["upload-image-profile"]["name"]));

		move_uploaded_file($_FILES['upload-image-profile']['tmp_name'], "../upload/profile/" . $newfilename);

		echo $newfilename;
	}


	
?>