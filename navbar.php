<script type="text/javascript">


	// This Function is called with the results from FB.getLoginStatus().
	function statusChangeCallBack(response) {

		console.log("statusChangeCallBack");
		console.log(response);


		if (response.status === 'connected') {

			// Logged into A-duang and Facebook
			var facebook_accessToken = response.authResponse.accessToken;
			var facebook_userId = response.authResponse.userID;
			// FB.api('/me', function(response) {
	      
	  //   var  facebook_name = response;
	  //   console.log(facebook_name);
	  //   });
			
			var post_facebook = {
													 "facebook_token1": facebook_accessToken,
													 "facebook_userId1": facebook_userId
													};

			post_facebook = $(this).serialize() + "&" + $.param(post_facebook);
			
			console.log(facebook_accessToken);
			console.log(facebook_userId);

			postingFacebookToken(post_facebook);
		
		} else {

			// Do some function here.
				FB.login(function(response) {
			  console.log(response);
				var facebook_accessToken = response.authResponse.accessToken;
				var facebook_userId = response.authResponse.userID;

				var post_facebook = {
													 "facebook_token1": facebook_accessToken,
													 "facebook_userId1": facebook_userId
													};

				post_facebook = $(this).serialize() + "&" + $.param(post_facebook);

				console.log(facebook_accessToken);
				console.log(facebook_userId);

				postingFacebookToken(post_facebook);


			}, {"data":
						[
							{
								"permission" : "email",
								"status" : "granted"
							}
						]});
		}
	}


	// This function is called when someone finished with the login
	function checkLoginState() {
		FB.getLoginStatus(function(response) {
			statusChangeCallBack(response);
		});


	}


	window.fbAsyncInit = function() {
		FB.init({

			appId 	: 	'1790866304469860' ,
			cookie  : 	true,
			xfbml		: 	true,
			version	: 	'v2.7'
		});


  };

  //  Facebook SDK Initialize
	(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  
  // POST accessToken to service
  function postingFacebookToken (tokenFacebook) {

  	$.ajax({
  		type: 'POST',
  		dataType: 'json',
  		data: tokenFacebook,
  		url: 'http://lek.ots.co.th/a-duangHTML-v4/web_client_service/login_regis_client_service.php',	
  		beforeSend: function() {

  			$('body').removeClass('loaded');
  		}, 
  		complete: function() {

  			$('body').addClass('loaded');
  		},
  		success: function(result) {

  			// console.log(result);
				location.reload();
  		}, 
  		error: function(error) {

  			console.log(error);
  		}
  	});

  	return tokenFacebook;
  }
</script>

<!-- navbar collection -->
<div class="navbar-collection">
	<nav class="navbar navbar-expand-lg navbar-light navbar-custom" id="mainNav">
		<div class="container-fluid">
			<a class="navbar-brand" href="index">
				<img src="image/v02/tab_icon_3.png" class="img-responsive img-navbrand">
			</a>

			<div class="collapse navbar-collapse navbar-left" id="navbar-left-collection">
				<ul class="navbar-nav mr-auto navbar-list-left">
					<li class="navbar-item">
						<a href="#" class="navbar-link">
							ดูดวง
						</a>
					</li>
					<li class="navbar-item">
						<a href="#" class="navbar-link">
							ไพ่ยิปซี
						</a>
					</li>
					<li class="navbar-item">
						<a href="#" class="navbar-link">
							บทความ
						</a>
					</li>
					<li class="navbar-item">
						<a href="#" class="navbar-link">
							Quiz
						</a>
					</li>
				</ul>
			</div>

			<div class="collapes navbar-collapse navbar-right" id="navbar-right-collection">
				<ul class="navbar-nav ml-auto navbar-list-right">
					<li class="navbar-item">
						<a href="#" class="navbar-link nav-login-btn active">
							เข้าสู่ระบบ
						</a>

						<a href="#" class="navbar-link nav-login-btn2">
							<div class="user-info-collection">
								<div class="user-info-pic-collection" id="user-info-pic-collection">
									<img class="user-info-pic" src="image/v02/fon.png">
									<!-- Inbox Outbox Notification -->
									<!-- <div class="count-noti-collection">
										<span class="count-noti">1</span>
									</div> -->
								</div>
								<p class="user-info-name"></p>
								<i class="fa fa-caret-down user-info-caret-down" aria-hidden="true"></i>
							</div>
						</a>

						<!-- list link collection -->
						<div class="navbar-user-mom-link--collection">
							<div class="navbar-user-big-link--collection">
								<div class="navbar-user-link--collection">
			
									<a href="#">
										หน้าส่วนตัว
									</a>
									<a class="all-inbox-link" href="inbox-question">
										กล่องคำถาม
									</a>
									<a href="#">
										เขียนบทความ
									</a>
									<a href="#">
										สร้าง Quiz
									</a>
									<a class="logout-btn" href="ask-teller">
										ออกจากระบบ
									</a>	
								</div>	
							</div>
						</div>
						
						
					</li>
				</ul>
			</div>
		</div>
	</nav>
</div>

<!-- login & resgister popup -->
<div class="login-register--collection">
	
	<!-- login & register box -->
	<div class="login-register--box">
		<a href="#" class="close-login--popup">
			<i class="fa fa-times" aria-hidden="true"></i>
		</a>

		<div class="login-logo--collection">
			<img src="image/v02/tab_icon_3.png" class="img-responsive img-login--logo">
		</div>

		<!-- all login button collection -->
		<div class="all-btn--collection all-login-btn--collection">
			<div class="login-facebook-btn--collection login-btn">
				<a class="login-facebook-btn" href="#" onclick="checkLoginState();">
					ลงชื่อเข้าใช้ด้วย Facebook
				</a>
			</div>

			<div class="login-ookbee-btn--collection login-btn">
				<a class="login-ookbee-btn" href="#">
					ลงชื่อเข้าใช้ด้วย Ookbee ID
				</a>
			</div>

			<div class="register-btn--collection login-btn">
				<a class="register-login-btn" href="#">
					สมัครสมาชิก Ookbee ID
				</a>
			</div>

		</div>

		<!-- all form ookbee login collection -->
		<div class="all-btn--collection all-form-login--collection">
			
			<div class="suggestion-text--collection">
				<p class="suggestion-text suggestion-text-bd">
					เข้าสู่ระบบ
				</p>
				<p class="suggestion-text">
					คุณสามารถเข้าสู่ระบบโดยใช้ <br>บัญชีเดียวกับ Ookbee, Tunwalai
				</p>
			</div>

			<!-- login form -->
			<div class="form-login form--collection">
				<input type="email" id="login-email" class="form-control ookbee-input--form" name="" placeholder="อีเมล">

				<input type="password" id="login-password" class="form-control ookbee-input--form" name="" placeholder="รหัสผ่าน">

				<input type="submit" id="login-submit" class="btn btn-default ookbee-input--btn" name="" value="เข้าสู่ระบบ">
				<a class="forget-password--btn" href="#">ลืมรหัสผ่าน</a>
			</div>


			<!-- forgot password form -->
			<div class="form-forgot-password form--collection">
				<input type="email" class="form-control ookbee-input--form" name="" placeholder="กรุณาใส่ Email">
				<input type="submit" class="btn btn-default ookbee-input--btn" name="" value="ส่งอีเมล">
			</div>
		</div>

		<!-- all form ookbee register collection -->
		<div class="all-btn--collectino all-form-register--collection">
			
			<div class="form-register form--collection">
				<input type="text" class="form-control ookbee-input--form regis-name" name="" placeholder="ชื่อผู้ใช้งาน">

				<input type="password" class="form-control ookbee-input--form regis-password" name="" placeholder="รหัสผ่าน">

				<input type="password" class="form-control ookbee-input--form regis-re-password" name="" placeholder="ยืนยันรหัสผ่าน">

				<input type="email" class="form-control ookbee-input--form regis-email" name="" placeholder="อีเมล">

				<input type="submit" class="btn btn-default ookbee-input--btn regis-send-btn" id="regis-send-btn" value="ลงทะเบียน">
			</div>
		</div>

	</div>
</div>