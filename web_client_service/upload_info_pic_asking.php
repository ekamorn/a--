<?php
// info attach
if($_FILES["attach_pic_info"]['error'] > 0) {
		echo "Return Code: ".$_FILES["attach_pic_info"]['error']. "<br>";
	} 
else {
		$newfilename = time() . '_' . rand(100, 999) . '.' . end(explode(".",$_FILES["attach_pic_info"]["name"]));
		 move_uploaded_file($_FILES["attach_pic_info"]["tmp_name"],"../upload/infoImage/" . $newfilename);
		// echo "success <br>";
		echo $newfilename;
}

?>