<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>a ดวง</title>
	<meta name="description" content="aดวง แม่หมอพิมพ์ฟ้า แม่หมอแอเรียล แม่หมอGigoh แม่หมอINKLIST ดูดวง ดวง ทำนายฝัน ดูดวงไพ่ยิบซี ดูดวงฟรี ดวงวันนี้ ดูดวงแม่นๆ ดูดวงเนื้อคู่ ดูดวงความรัก ดูดวงรายวัน ดูดวงรายปักษ์ ดูดวงรายเดือน ดูดวงรายปี">
	<meta name="keywords" content="aดวง แม่หมอพิมพ์ฟ้า แม่หมอแอเรียล แม่หมอGigoh แม่หมอINKLIST ดูดวง ดวง ทำนายฝัน ดูดวงไพ่ยิบซี ดูดวงฟรี ดวงวันนี้ ดูดวงแม่นๆ ดูดวงเนื้อคู่ ดูดวงความรัก ดูดวงรายวัน ดูดวงรายปักษ์ ดูดวงรายเดือน ดูดวงรายปี">
	<meta property="og:image" content="http://lek.ots.co.th/a-duangHTML-final/image/ag.png">
	<meta property="og:url" content="http://lek.ots.co.th/a-duangHTML-final/index">
	<meta property="og:title" content="aดวง ดูดวงกับแม่หมอ ดูดวงไพ่ยิบซี">
	<meta property="og:description" content="aดวง แม่หมอพิมพ์ฟ้า แม่หมอแอเรียล แม่หมอGigoh แม่หมอINKLIST ดูดวง ดวง ดูดวงไพ่ยิบซี ดูดวงฟรี ดวงวันนี้ ดูดวงแม่นๆ ดูดวงเนื้อคู่ ดูดวงความรัก ดูดวงรายวัน ดูดวงรายเดือน ดูดวงรายปี">
	<meta property="og:type" content="website">
	<meta name="author" content="Ookbee co., Ltd.">

	<!-- Chrome theme -->
	<meta name="theme-color" content="#2b3143">
	<!-- window phone theme -->
	<meta name="msapplication-navbutton-color" content="#2b3143">
	<!-- iOS safari -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

	<!-- Tab icon -->
	<link rel="icon" type="image/png" href="image/tab_icon_2.png" sizes="32*32">

	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" type="text/css" href="bootstrap-4.0.0-beta-dist/css/bootstrap.min.css">

	<!-- owl carousel core CSS -->
	<link rel="stylesheet" type="text/css" href="OwlCarousel2-2.2.1/dist/assets/owl.carousel.min.css">
	<link rel="stylesheet" type="text/css" href="OwlCarousel2-2.2.1/dist/assets/owl.theme.default.min.css">

	<!-- DB Airy font style -->
	<link rel="stylesheet" type="text/css" href="fonts/stylesheet.css">

	<!-- navbar controller -->
	<link rel="stylesheet" type="text/css" href="css/navbar-custom.css">

	<!-- custom css -->
	<link rel="stylesheet" type="text/css" href="css/ask-teller-custom.css">

	<!-- footer css -->
	<link rel="stylesheet" type="text/css" href="css/footer.css">

	<!-- Line and Facebook font icon -->
	<link rel="stylesheet" type="text/css" href="icomoon/style.css">

	<!-- Font Awesome Font Icon -->
	<link rel="stylesheet" type="text/css" href="vendor/font-awesome-4.7.0/css/font-awesome.min.css">
</head>
<body>
	<div id="all-wrap">
		<!-- Preload Wrapper -->
		<div id="loader-wrapper">
			<div id="loader-collection">
				<div id="loader-pic">
					<img src="image/v02/a-duang.png" class="image-loader">
				</div>
				<div id="loader-running">
					<div id="loader">
						<div class="loader-section"></div>
					</div>
				</div>
			</div>
		</div>

		<?php
		include 'navbar.php';
		?>

		<!-- content cover section -->
		<div class="all-wrapper-section">
			<div class="container-fluid my-container">
				<!-- link collection -->
				<div class="link-collection">
					<ul class="link-list-collection">
						<li class="link-list">
							<a href="#">
								หน้าหลัก
							</a>
						</li>
						<li> // </li>
						<li>
							<a href="#" class="active">ดูดวงกับแม่หมอ</a>
						</li>
					</ul>
				</div>

				<!-- ask horo collection -->
				<div class="ask-horo-collection">
					
					<!-- ask horo head collection -->
					<div class="ask-horo-head-collection">
						<p class="ask-horo-head">ดูดวงแม่นๆ<span>กับแม่หมอ</span></p>
					</div>

					<!-- teller radio button list -->
					<div class="all-list-teller-collection">
						<div class="big-head-teller-collection">
							<p class="big-head-teller big-teller">เลือกดูดวงกับแม่หมอ</p>
						</div>

						<!-- all list teller -->
						<div class="list-teller-collection" id="list-teller-collection">
								
							<!-- Render Code Here -->

							<input type="hidden" class="teller_selected" name="teller_selected" value="">
						</div>
					</div>

					<!-- all packages horo -->
					<div class="all-list-packages-collection" id="all-list-packages-collection">
						<div class="big-head-teller-collection">
							<p class="big-head-teller big-package">เลือกแพ็คเกจดูดวง</p>
						</div>

						<!-- all list packages -->
						<div class="list-packages-collection" id="list-packages-collection">
							<input type="hidden" class="package_selected" id="package_selected" name="package_selected" value="">
			
							<!-- each packages button -->
							<div class="each-package-select-collection">
								<input type="radio" id="package_01" name="select_package" value="package_01" checked>
								<label class="package_label_selection" for="package_01" value="package_01">
									<div class="package-status"></div>
									<h2 class="package-name">ดูดวง 5 คำถาม</h2>
									<p class="package-price">300 บาท</p>
								</label>
							</div>

							<div class="each-package-select-collection">
								<input type="radio" id="package_02" name="select_package" value="package_02">
								<label class="package_label_selection" for="package_02" value="package_02">
									<div class="package-status"></div>
									<h2 class="package-name">ดูดวง 10 คำถาม</h2>
									<p class="package-price">500 บาท</p>
								</label>
							</div>
						</div>
					</div>

					<!-- all form text for question -->
					<div class="all-field-collection">
						<div class="big-head-teller-collection">
							<p class="big-head-teller big-head-input-form">ชื่อที่โชว์ใน Line</p>
						</div>

						<!-- all field line name -->
						<div class="list-field-collection">
							
							<!-- each field -->
							<div class="each-field-collection">
								<input type="text" class="each-field" id="line_name" name="field_line_name" placeholder="ชื่อที่โชว์ใน Line">
							</div>
						</div>
					</div>

					<!-- all form text for question -->
					<div class="all-field-collection">
						<div class="big-head-teller-collection">
							<p class="big-head-teller big-head-input-form">ชื่อ-นามสกุล</p>
						</div>

						<!-- all field name -->
						<div class="list-field-collection">
							
							<!-- each field -->
							<div class="each-field-collection">
								<input type="text" class="each-field" id="name_last" name="field_name_last" placeholder="ชื่อ-นามสกุล (ex. อะดวง น่ารัก)">
							</div>
						</div>
					</div>

					<!-- all form text for question -->
					<div class="all-field-collection all-nick-age-collection">
						<div class="row">
							<div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 all-nick-collection">
								<div class="big-head-teller-collection">
									<p class="big-head-teller big-head-input-form">
										ชื่อเล่น
									</p>
								</div>

								<!-- all field nick -->
								<div class="list-field-collection list-nick-age-collection">
									<div class="each-field-collection">
										<input type="text" class="each-field" id="nick_name" name="field_nick_name" placeholder="ชื่อเล่น">
									</div>
								</div>
							</div>

							<div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 all-age-collection">
								<div class="big-head-teller-collection">
									<p class="big-head-teller big-head-input-form">
										อายุ
									</p>
								</div>

								<!-- all field age -->
								<div class="list-field-collection list-nick-age-collection">
									<div class="each-field-collection">
										<input type="text" class="each-field" id="age_field" name="field_age" placeholder="อายุ">
									</div>
								</div>
							</div>

						</div>
					</div>

					<!-- all form text for question -->
					<div class="all-field-collection all-question-collection">
						<div class="big-head-teller-collection">
							<p class="big-head-teller big-head-input-form">
								คำถามตามแพ็คเกจที่เลือกไว้
							</p>
						</div>

						<!-- all field questions -->
						<div class="list-field-collection list-question-collection">
							<div class="each-field-collection">
								<!-- <input type="text" class="each-field" id="question_field_1" name="field_questions" placeholder="คำถามที่ 1"> -->
								<textarea class="each-field" id="q_field" name="field_questions" placeholder="สามารถใส่คำถามได้ที่นี่เลยน้า" rows="5"></textarea>
							</div>
						</div>

					</div>

					<!-- all form text for question -->
					<div class="all-field-collection ">
						<div class="big-head-teller-collection">
							<p class="big-head-teller big-head-input-form">
								ข้อมูลอื่นๆ
							</p>
						</div>

						<div class="list-field-collection list-info-collection">
							<div class="each-field-collection">
								<input type="text" class="each-field" id="other_info" name="field_info" placeholder="ข้อมูลอื่นๆ เช่น รูปที่ส่งมามีสถานะเป็นแฟน คนที่คุย ">
							</div>

							<div class="each-field-collection">
								<p class="attach-head-file attach-head-file2">
									**แนบรูปสำหรับข้อมูล**
								</p>
								<div class="upload-info-pic-wrapper">
									<form action="web_client_service/upload_info_pic_asking.php" method="post" class="form_fotogaleria" enctype="multipart/form-data">
										<button class="upload-info-button">Upload a file</button>
										<input type="file" class="attach-pic-info" id="attach_pic_info" name="attach_pic_info">
									</form>
							
									<p class="attach-status attaach-pic-info-status">
										ยังไม่ได้แนบรูปมา
									</p>
									<div class="collect-upload-info-pic" id="collect-upload-info-pic">
										
										<!-- Render Code Here -->

									</div>
								</div>
								
							</div>
						</div>
					</div>

					<!-- all form upload payslip -->
					<div class="all-field-collection">
						<img src="image/v02/k_bank_logo.png" class="img-responsive bank-logo">
						<p class="attach-head-file attach-head-slip">
							ลูกหมอสามารถโอนเงินผ่านธนาคารกสิกรไทย<br>
หมายเลขบัญชี 101-2452-1-xx
						</p>
						<p class="attach-status warn-slip">**และส่งหลักฐานการโอนด้านล่าง**</p>
						<div class="payslip-pic-wrapper">
							<form action="web_client_service/upload_slip_asking.php" method="post" class="form_fotogaleria" enctype="multipart/form-data">
								<button class="upload-info-button">Upload Payslip</button>
								<input type="file" class="attach_pic_info" id="attach_payslip" name="attach_payslip" >
							</form>
							<p class="attach-status slip-status">รอรับหลักฐานการโอน</p>
							<div class="collect-upload-info-pic" id="collect-slip-pic">	
							</div>
						</div>

						<div class="submit-button-wrapper">
							<input type="submit" class="submit-button" name="submit-question" value="ส่งคำถาม">
						</div>
					</div>

				</div>

			</div>
		</div>

		<?php
		include 'footer.php';
		?>
	</div>

	<!-- jQuery Core js -->
	<script src="js/jquery-3.2.1.min.js"></script>
	<!-- Popper Core Js -->
	<script src="vendor/popper/popper.min.js"></script>
	<!-- Bootstrap Core Js -->
	<script src="bootstrap-4.0.0-beta-dist/js/bootstrap.min.js"></script>
	<!-- jQuery easing scrolling Core Js -->
	<script src="vendor/jquery-easing/jquery.easing.min.js"></script>
	<!-- jquery cookie -->
 	<script src="vendor/jquery-cookie-master/src/jquery.cookie.js"></script>
	<!-- Navbar Controller Js -->
	<script src="js/navbar-controller.js"></script>
	<!-- Owl Carousel Core Js -->
	<script src="OwlCarousel2-2.2.1/dist/owl.carousel.min.js"></script>
	<!-- Login Controller -->
	<script src="js/login_regis_controller.js"></script>
	<!-- Ask Teller Controller -->
	<script src="js/ask-teller-controller.js"></script>
	<!-- Notification Controller -->
	<script src="js/noti-question-controller.js"></script>

</body>
</html>