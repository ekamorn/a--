<?php
	if (isset($_POST['imageFile'])) {
		$imageFile = $_POST['imageFile'];
		echo $imageFile;

		$imagePath = "../upload/infoImage/".$imageFile;
		unlink($imagePath);
	}

	if (isset($_POST['slipFile'])) {
		$slipFile = $_POST['slipFile'];

		echo $slipFile;
		$slipPath = "../upload/paySlip/".$slipFile;
		unlink($slipPath);
	}

	if (isset($_POST['attachFile'])) {
		$attachFile = $_POST['attachFile'];

		echo $attachFile;
		$attachPath = "../upload/attach_answer/".$attachFile;
		unlink($attachPath);
	}
?>