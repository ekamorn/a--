$(document).ready(function(){

	var main_link = '/a-duangHTML-v4/';

	// Check COOKIE
	var value = $.cookie("accessToken");


	// isset COOKIE
	if (value != "") {

		// login function
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/a-duangHTML-v4/web_client_service/cookie_filter_login.php',
			success: function(result) {

				var userData = result;
				var firstname = userData.firstname;
				var lastname = userData.lastname;
				var email = userData.email;
				var nickname = userData.nickname;
				var gender = userData.gender;
				var lavel = userData.lavel;
				var ookbeeNumber = userData.ookbeeNumber;
				var userProfileImage = userData.profileImageUrl;

				if (userProfileImage == null) {
					userProfileImage = "../a-duangHTML-v4/image/v02/fon.png";
				}

				$('.nav-login-btn').removeClass('active');
				$('.nav-login-btn2').addClass('active');
				$('.user-info-name').append(nickname);
				$('.user-info-pic').attr('src', userProfileImage);

				// close popup
				$('.login-register--collection').removeClass('active');
		        $('.all-btn--collection').removeClass('active');
		        $('.all-login-btn--collection').removeClass('active');
		        $('.all-form-login--collection').removeClass('active');
		        $('.form-login').removeClass('active');
		        $('.all-form-register--collection').removeClass('active');
		        $('.form-register').removeClass('active');
		        $('.form-forget-password').removeClass('active');

			}
		});

	} else if (value == "" && window.location != main_link +'ask-teller') {

		window.location.href = main_link + 'ask-teller';

	}
});