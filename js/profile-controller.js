$(document).ready(function() {

	setTimeout(function() {

		$('body').addClass('loaded');
	}, 400);





	// ------------------------------------------- Global Variables ----------------------------------

	var main_link = 'http://lek.ots.co.th/a-duangHTML-v4';
	var sublink_1 = '/web_client_service/profile_client_service.php';
	var user_profile_img = $('.profile-image').attr('src');
	var value = $.cookie("accessToken");
	var getting_data = {
											"accessToken1" : value
	};



	// ------------------------------------------- GETTING USER DATA ----------------------------------
	getting_data = $(this).serialize() + "&" + $.param(getting_data);

	CallService(getting_data, main_link + sublink_1, false, function(msg) {

		// console.log(msg);
		var firstname_place = msg.firstname;
		var lastname_place = msg.lastname;
		var date_of_birth_place = msg.dateOfBirth;
		var get_new_date = new Date(date_of_birth_place);
		var get_date = get_new_date.getDate();
		var get_month = get_new_date.getMonth();
		get_month = get_month + 1;
		var get_year = get_new_date.getFullYear();
		var nickname_place = msg.nickname;
		var gender_place = msg.gender;
		var profile_image_place = msg.profileImageUrl;
		var email_place = msg.email;
		var mobile_place = msg.mobilePhoneNumber;




		if (firstname_place == null) {

			$('#firstname-field').attr('placeholder', "Firstname");
			$('#lastname-field').attr('placeholder', lastname_place); 
			$('#nickname-field').attr('placeholder', nickname_place);
			$('#email-field').attr('placeholder', email_place);
			$('#mobile-field').attr('placeholder', mobile_place);
			$('#profile-image').attr('src', profile_image_place);

		} else if (lastname_place == null) {

			$('#lastname-field').attr('placeholder', "Lastname");
			$('#firstname-field').attr('placeholder', firstname_place);
			$('#nickname-field').attr('placeholder', nickname_place);
			$('#email-field').attr('placeholder', email_place);
			$('#mobile-field').attr('placeholder', mobile_place);
			$('#profile-image').attr('src', profile_image_place);

		} else if (profile_image_place == null) {

			$("#profile-image").attr('src', main_link + '/image/v02/fon.png');
			$('#firstname-field').attr('placeholder', firstname_place);
			$('#lastname-field').attr('placeholder', lastname_place); 
			$('#nickname-field').attr('placeholder', nickname_place);
			$('#email-field').attr('placeholder', email_place);
			$('#mobile-field').attr('placeholder', mobile_place);
		
		} else if (mobile_place == null) {

			$('#mobile-field').attr('placeholder', "Mobile Number");
			$('#firstname-field').attr('placeholder', firstname_place);
			$('#lastname-field').attr('placeholder', lastname_place); 
			$('#nickname-field').attr('placeholder', nickname_place);
			$('#email-field').attr('placeholder', email_place);
			$('#profile-image').attr('src', profile_image_place);
		
		} else if (firstname_place != null || lastname_place != null || profile_image_place != null || mobile_place != null) {

			$('#firstname-field').attr('placeholder', firstname_place);
			$('#lastname-field').attr('placeholder', lastname_place); 
			$('#nickname-field').attr('placeholder', nickname_place);
			$('#email-field').attr('placeholder', email_place);
			$('#mobile-field').attr('placeholder', mobile_place);
			$('#profile-image').attr('src', profile_image_place);
		}

	});






	// ------------------------------------------- Main Upload and Delete User Profile Image Function ----------------------------------

	$('.upload-image-profile').change(function(e) {

		// var get_image_data = new FormData($(this).closest('form').get(0));


		$.ajax({
			url: main_link + "/web_client_service/profile_client_service.php",
			type: "POST",
			data: new FormData($(this).closest('form').get(0)),
			contentType: false,
			cache: false,
			processData: false,
			beforeSend: function() {
				$('body').removeClass('loaded');
			},
			complete: function() {
				$('body').addClass('loaded');
			},
			success: function(data) {
				$("#profile-image").attr('src', main_link + '/upload/profile/' + data);
			}, 
			error: function(error) {
				console.log(error);
			}
		});



		e.preventDefault();
	});







	// ------------------------------------------- User Info Update Function ----------------------------------

	$('.generic-save').click(function() {


			var firsName_value = $('#firstname-field').val();
			var lastName_value = $('#lastname-field').val();
			var nickName_value = $('#nickname-field').val();
			var birthDay_value = $('#date-field').val();
			var isoDate 			 = new Date(birthDay_value);
			isoDate = isoDate.toISOString();
			var gender_value 	 = $('.gender-selection:checked').val();
			var email_value 	 = $('#email-field').val();
			var mobile_number  = $('#mobile-field').val();
			var profile_image  = $('#profile-image').attr('src');

			var json_patch_data = {
															"firstName1" 		: firsName_value,
															"lastName1" 		: lastName_value,
															"nickName1"			: nickName_value,
															"birthDay1" 		: isoDate,
															"gender1" 			: gender_value,
															"email1" 			  : email_value,
															"mobileNumber1" : mobile_number, 
															"profileImage1" : profile_image
			};


			json_patch_data = $(this).serialize() + "&" + $.param(json_patch_data);
			CallService(json_patch_data, main_link + sublink_1, false, function(msg) {

				// console.log(msg);
				window.location.href = main_link + '/ask-teller';
			});
	});

	// check radio button





	// ------------------------------------------- Upload Profile Image Function ----------------------------------

	function uploadProfile(getData) {


		CallService(getData, main_link + sublink_1, false, function(msg) {


			var upload_image = msg;
			$('#profile-image').attr('src', main_link + "upload/profile/" + msg); 
			// console.log(upload_image);
		});

		return getData
	}








	// ------------------------------------------- POST Patch User Profile Function ----------------------------------






	
	// ------------------------------------------- Main CallService Function ----------------------------------

	function CallService(data , url, async, callBack) {

		$.ajax({

			type: 'POST',
			url: url,
			dataType: 'json',
			data: data,
			beforeSend: function() {

			},
			complete: function() {

			},
			success: function(msg) {

				return callBack(msg);
			},
			error: function(error) {

				console.log(error);
			}
		});

	}
});