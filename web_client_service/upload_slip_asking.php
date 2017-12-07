<?php
// payslip
$target_dir = "../upload/paySlip/";
$target_file = $target_dir . basename($_FILES["attach_payslip"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// check image file
$check = getimagesize($_FILES["attach_payslip"]["tmp_name"]);
if($check !== false) {
    // echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
} else {
    // echo "File is not an image.";
    $uploadOk = 0;
}

if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpg" && $imageFileType != "gif") {
	// echo "Sorry, only image files are allowed";
}

if ($uploadOk == 0) {
	// echo "you file was not uploaded";
} else {
	$newfilename = time() . '_' . rand(100, 999) . '.' . end(explode(".",$_FILES["attach_payslip"]["name"]));
	if (move_uploaded_file($_FILES["attach_payslip"]["tmp_name"],"../upload/paySlip/" . $newfilename)) {
		echo $newfilename;
	} else {
		echo "Sorry, uploading fail!!";
	}
}
?>