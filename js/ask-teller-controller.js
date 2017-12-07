$(document).ready(function(){



	// Main Variables 

	var main_link = 'http://lek.ots.co.th/a-duangHTML-v4/';
	var post_teller = "tellers";
	var post_attach = "attached";





	// preloader
	setTimeout(function(){
		$('body').addClass('loaded');
	},400);





	// active navbar 
	$('.navbar-collection').addClass('navbar-fixed-top');

	// Check and force login sesstion
	setTimeout(function() {

		var loginStatus = $('.nav-login-btn');
		if(loginStatus.hasClass('active')) {

			$('.login-register--collection').addClass('active');
			$('.all-login-btn--collection').addClass('active');

		}

	});





	// ---------------------------------------------- GET Tellers choices -------------------------------------------------

	var json_tellers = {"tellers1" : post_teller};
	json_tellers = $(this).serialize() + "&" + $.param(json_tellers);

	// var json_tellers = 'tellers1=' + post_teller;
	CallGetService(json_tellers, main_link + 'web_client_service/ask_teller_client_service.php', false, function(msg) {


		var allTellers = msg;
		console.log(allTellers);
		var tellersLength = allTellers.length;

		for (var i = 0; i < tellersLength; i++) {

			var eachPackage = allTellers[i];
			var userId = eachPackage.user.userId;
			var userName = eachPackage.user.nickname;
			var userImage = eachPackage.user.profileImageUrl;
			var userSignature = eachPackage.user.signature;

			var createTellerList = document.createElement("div");
			createTellerList.className = 'each-teller-select-collection each-teller-select-collection'+ userId +'';
			createTellerList.innerHTML = 
				'<input type="radio" id="teller_'+ userId +'" name="select" value="'+ userId +'">' + 
				'<label class="label-selection" for="teller_'+ userId +'" value="'+ userId +'">' +
				'<div class="each-img-teller-collection">' + 
				'</div>' +
				'<h2 class="each-teller-name">' + userName + '</h2>' +
				'</label>';

			document.getElementById('list-teller-collection').appendChild(createTellerList);
			$('.each-teller-select-collection'+ userId +'').not(':first').remove();


			//  ------- Adding Tellers Value to hidden input ---------
			$('.label-selection').click(function() {

				var teller_id = $(this).attr('value');
				$('.teller_selected').val(teller_id);
				$('.package_selected').val("");

			});


			//  ------- Calculating Tellers's div width ----------
			if ($(window).width() > 1240) {
				
				var listTellerCollectionWidth = $('.list-teller-collection').width();
				var tellersWidth = Math.round(listTellerCollectionWidth / 3.5);

		        $('.each-teller-select-collection').css( 'width', tellersWidth + 'px');

			}
		}

		// ---------- Dynamic Packages -------------
		$('.label-selection').click(function(){

			var tellersId = $(this).attr('value');
			$('.each-package-specific-select-collection').remove();

			$.each(allTellers, function(i, items) {

				var packagesId = items.id;
				var packagesTitle = items.title;
				var packagesDetail = items.detail;
				var packagesPrice = items.price;
				var packagesType = items.type;
				var userId = items.user.userId;

				if (tellersId == userId) {

					var createPackage = document.createElement('div');
					createPackage.className = "each-package-select-collection each-package-specific-select-collection";
					createPackage.innerHTML =
						'<input type="radio" id="package_' + packagesId + '" userID="'+ userId +'" class="package" target="#package-' + packagesId + '" name="select_package" value="package_' + packagesId + '">' +
		                '<label class="package_label_selection" for="package_' + packagesId + '" value="'+ packagesId +'">' +
		                '<div class="package-status"></div>' +
		                '<h2 class="package-name">' + packagesTitle + '</h2>' +
		                '<p class="package-price">' + packagesPrice + '</p>' +
		                '</label>';

		            document.getElementById('list-packages-collection').appendChild(createPackage);

		            $('.package_label_selection').click(function() {

		            	var package_id = $(this).attr('value');
		            	$(".package_selected").val(package_id);

		            });

				}
			});

		});
	});









	// ---------------------------------------------- Attaching file function -------------------------------------------------

	$('#attach_pic_info').change(function(e) {

		var attachPicNumber = $('.each-upload-collection').length;

		if (attachPicNumber >= 5) {

			alert("Sorry, attached images are limited 5 images.");

		} else {
	
			$.ajax({
				url: 'http://lek.ots.co.th/a-duangHTML-v4/web_client_service/upload_info_pic_asking.php',
				type: 'POST',
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

					var createAttachPic = document.createElement('div');
					createAttachPic.className = 'each-upload-collection';
					createAttachPic.setAttribute("value", data);
					createAttachPic.innerHTML = 
						'<div class="remove-upload-pic-collect">' +
						'<a href="#" class="remove-upload-pic" delete-target = "'+ data +'">' +
						'<i class="fa fa-times" aria-hidden="true"></i>' +
						'</a>' +
						'</div>' +
						'<img class="show-upload-image img attach-image-show" src="http://lek.ots.co.th/a-duangHTML-v4/upload/infoImage/'+ data +'" value="'+ data +'">';
					
					document.getElementById('collect-upload-info-pic').appendChild(createAttachPic);	

					// $('#attach_pic_info').attr('value', data);
					var warningStatus = $('.attaach-pic-info-status').text().replace("ยังไม่ได้แนบรูปมา", "แนบรุปเรียบร้อยแล้ว");
					$('.attaach-pic-info-status').text(warningStatus);

					// delete attach image 
					$('.remove-upload-pic').on("click", function(e){
						var img_delete_target = $(this).attr("delete-target");
						var img_file = img_delete_target;
						console.log(img_file);

						var delete_collection = $('.each-upload-collection').attr('value');
						$('.each-upload-collection').each(function(){
							if($(this).attr('value') == img_file) {

								$.ajax({
									url: '/a-duangHTML-v4/web_client_service/delete_attach_client_service.php',
									type: 'POST',
									data: {"imageFile":img_file},
									success: function(result) {
										// do something

									}
								});

								$(this).remove();
							}
						});
						e.preventDefault();
					});

				}
			});

		}

		e.preventDefault();
	});








	// ---------------------------------------------- Attaching PaySlip file function -------------------------------------------------

	$('#attach_payslip').change(function(e) {


		var slipPicNumber = $('.each-slip-collection').length;

		if (slipPicNumber >= 1) {

			alert("Sorry, the payslip is limited 1 image.");

		} else {

			$.ajax({

				url: 'http://lek.ots.co.th/a-duangHTML-v4/web_client_service/upload_slip_asking.php',
				type: 'POST',
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

						console.log(data);
					var createSlipPic = document.createElement('div');
					createSlipPic.className = "each-slip-collection";
					createSlipPic.setAttribute("value", data);
					createSlipPic.innerHTML = 
						'<div class="remove-upload-pic-collect">' +
						'<a href="#" class="remove-upload-pic" delete-target = "'+ data +'">' +
						'<i class="fa fa-times" aria-hidden="true"></i>' +
						'</a>' +
						'</div>' +
						'<img class="show-upload-image img slip-image-show" src="http://lek.ots.co.th/a-duangHTML-v4/upload/paySlip/'+ data +'" value="'+ data +'">';
					document.getElementById('collect-slip-pic').appendChild(createSlipPic);
					var warningStatus = $('.slip-status').text().replace("รอรับหลักฐานการโอน", "อัพโหลดหลักฐานการโอนเงินเรียบร้อย");
					$('.slip-status').text(warningStatus);


					// delete attach image 
					$('.remove-upload-pic').on("click", function(e){
						var img_delete_target = $(this).attr("delete-target");
						var img_file = img_delete_target;
						console.log(img_file);

						var delete_collection = $('.each-silp-collection').attr('value');

						$('.each-slip-collection').each(function(){

							if($(this).attr('value') == img_file) {


								$.ajax({
									url: '/a-duangHTML-v4/web_client_service/delete_attach_client_service.php',
									type: 'POST',
									data: {"slipFile":img_file},
									success: function(result) {
										// do something

									}
								});

								$(this).remove();
							}
						});
						e.preventDefault();
					});

				}, 
				error: function (error) {

				}

			});

		}

		e.preventDefault();
	});








	// ---------------------------------------------- Sendin Question function -------------------------------------------------

	$('.submit-button').click(function(){

		var select_teller = $('.teller_selected').val();
		var select_package = $('.package_selected').val();
		var lineName = $('#line_name').val();
		var name = $('#name_last').val();
		var nickName = $('#nick_name').val();
		var age = $('#age_field').val();
		console.log(age);
		var question = $('#q_field').val();
		var attachPic = [];
		var paySlip = $('.slip-image-show').attr('src');
		$('.attach-image-show').each(function(){
			var picSrc = $(this).attr('src');
			attachPic.push(picSrc);
		});

		var question_Data = {
			"select_teller1" : select_teller,
			"select_package1" : select_package,
			"lineName1" : lineName,
			"name1" : name,
			"nickname1" : nickName,
			"age1" : age,
			"question1" : question,
			"attachPic1" : attachPic,
			"paySlip1" : paySlip
		};

		var value = $.cookie("accessToken");

		question_Data = $(this).serialize() + "&" + $.param(question_Data);

		console.log(question_Data);
		if (value == null) {
			
			alert("Please Login Your Account First!!");
		
		} else if (select_teller == "" || select_package == "" || lineName == "" || name == "" || nickName =="" || age == "" || question == "" || paySlip == "") {

			alert("Please fill all fields first!!")

		}else {


			CallGetService(question_Data, main_link+'web_client_service/ask_teller_client_service.php', false, function(msg) {

				window.location.href = 'inbox-question';
				// console.log(msg);
			});

		}

	});



	// ---------------------------------------------- Main GET CallBack function -------------------------------------------------

	function CallGetService (data, url, async, callBack) {

		$.ajax ({
			type: 'POST',
			dataType: 'json',
			url: url,
			data: data,
			success: function(msg) {

				return callBack(msg);

			},
			error: function(error) {

				console.log(error);

			}
		});

	}

});