$(document).ready(function(){

	var main_link = 'http://lek.ots.co.th/a-duangHTML-v4/';

	// Check COOKIE
	var value = $.cookie("accessToken");

	// isset COOKIE
	if (value != null) {

		// login function
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url:  main_link +'web_client_service/cookie_filter_login.php',
			success: function(result) {

				// console.log(result);
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

			}, error: function (error) {
				console.log(error);
			}
		});

	} else if (value == null && window.location.href != main_link + 'ask-teller') {


		// have no access Token and current page is another page
		window.location.href = main_link + 'ask-teller';
		// console.log("lek");

	} else {


		// have no access Token and current page is ask-teller
		// console.log('yah');

	}

	// Login Section
	$('#login-submit').click(function() {

		var email = $('#login-email').val();
		var password = $('#login-password').val();
		var dataLogin = 'email1=' + email + '&password1=' + password;

		if (email == "" || password == "") {
			
			alert ("Please, fill email or password.");
		
		} else {

			CallService(dataLogin, main_link+'web_client_service/login_regis_client_service.php', false, function(msg) {

				var userData = msg;
				console.log(userData);
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

			});

		}
	});


	// Register Section
	$('#regis-send-btn').click(function(){

		var regis_name = $('.regis-name').val();
		var regis_password = $('.regis-password').val();
		var regis_re_password = $('.regis-re-password').val();
		var regis_email = $('.regis-email').val();

		var dataRegis = 'regis_name1=' + regis_name + '&regis_password1=' + regis_password + '&regis_email1=' + regis_email;
	
		if (regis_name == '' || regis_password == '' || regis_re_password == '' || regis_email == '') {

			alert ("Please, fill all fields");

		} else if (regis_password != regis_re_password) {

			alert ("Oh!!, Password and re-password are not matched");

		} 
		else {

			CallRegisService(dataRegis, main_link+'web_client_service/login_regis_client_service.php', false, function(msg) {

				var rawRegis = msg;
				console.log(rawRegis);
				location.reload();
				
			});

		}
	});



	// Logout sesstion
	$('.logout-btn').click(function() {

		$.removeCookie("accessToken", {path: '/'});
		$.removeCookie("refreshToken", {path: '/'});

	});



	// Main function for POSTING login and register
	function CallService(data, url, async, callBack) {

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: url,
			data: data,
			beforeSend: function (jqXHR, settings) {

				$('body').removeClass('loaded');

			}, 
			complete: function (jqXHR, settings) {

				$('body').addClass('loaded');

			}, 
			success: function (msg) {

				return callBack(msg);

			}, 
			error: function (error) {

				console.log(error);
				alert('Wrong Username or Password');

			}
		});
	}



	function CallRegisService (data, url, async, callBack) {

		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			beforeSend: function (jqXHR, settings) {

				$('body').removeClass('loaded');

			}, 
			complete: function (jqXHR, settings) {

				$('body').addClass('loaded');

			}, 
			success: function (msg) {

				return callBack(msg);
			}, 
			error: function (error) {

				console.log(error);
				alert('Wrong Username or Password');

			}
		});
	}




	
});