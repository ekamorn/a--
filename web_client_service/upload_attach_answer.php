<?php

if ($_FILES["upload-attach-file"]["error"] > 0) {
	echo "Return Code: ".$_FILES["upload-attach-file"]["error"]. "<br>";
} else {
	$newfilename = time() . '_' . rand(100, 999) . '.' . end(explode(".",$_FILES["upload-attach-file"]["name"]));

	move_uploaded_file($_FILES["upload-attach-file"]["tmp_name"], "../upload/attach_answer/".$newfilename);

	echo $newfilename;
}
?>