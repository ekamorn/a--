$(document).ready(function() {

	// -------------------------------------- Main Variables --------------------------------------

	var main_link = 'http://lek.ots.co.th/a-duangHTML-v4/';
	var question_link = main_link + 'web_client_service/noti_question.php';
	var value_post = $.cookie('accessToken');

	var value_answer = $.cookie('accessToken');
	var value_all = $.cookie('accessToken');







	// -------------------------------------- Get All Notification Service --------------------------------------


	if (value_post != null) {

			var ask_noti = {
							"ask_access1" : value_post
			};

			var ask_ans_noti = {
							"ask_ans_noti" : value_post
			};


			var ask_noti = $(this).serialize() + "&" + $.param(ask_noti);
			var ask_ans_noti = $(this).serialize() + "&" + $.param(ask_ans_noti);

			var ansData = 0;
			var askData = 0;







			// ------------------ Get Asking Notification Service ----------------------


			CallService(ask_noti, question_link, false, function(msg) {

				var allData = msg;
				var answerType;
				var answerId;
				var isRead;
				var status;
				var create_all_noti = document.createElement('div');
				create_all_noti.className = "count-noti-collection";


				for (i = 0; i < allData.length; i ++) {

					answerType = allData[i].type;
					answerId = allData[i].answerId;
					isRead = allData[i].isRead;
					status = allData[i].status;

					if (answerType == 0 && answerId != 0 && isRead == false && status == 1) {
						
						askData += 1;
						$('.categories-asking').text("ถามคำถาม (" + askData + ")");

					} 
				}




				// ------------------ Get Answer Notification Service ----------------------
				CallService(ask_ans_noti, question_link, false, function(msg) {

					var allAnsData = msg;
					console.log(allAnsData);
					ansData = allAnsData.length;

					if (ansData > 0) {

						$('.categories-answer').text("ตอบคำถาม (" + ansData + ")");

					}

					var all_noti = askData + ansData;
					// console.log(all_noti);

					if (all_noti > 0) {

						$('.count-noti').text(all_noti);

						create_all_noti.innerHTML = 
						'<span class="count-noti">' + all_noti + '</span>';
						document.getElementById('user-info-pic-collection').appendChild(create_all_noti);
						
						$('.all-inbox-link').addClass('active');
					}

				});


			});

		}

	setInterval(function() {

		if (value_post != null) {

			var ask_noti = {
							"ask_access1" : value_post
			};

			var ask_ans_noti = {
							"ask_ans_noti" : value_post
			};


			var ask_noti = $(this).serialize() + "&" + $.param(ask_noti);
			var ask_ans_noti = $(this).serialize() + "&" + $.param(ask_ans_noti);

			var ansData = 0;
			var askData = 0;







			// ------------------ Get Asking Notification Service ----------------------


			CallService(ask_noti, question_link, false, function(msg) {

				var allData = msg;
				var answerType;
				var answerId;
				var isRead;
				var status;
				var create_all_noti = document.createElement('div');
				create_all_noti.className = "count-noti-collection";


				for (i = 0; i < allData.length; i ++) {

					answerType = allData[i].type;
					answerId = allData[i].answerId;
					isRead = allData[i].isRead;
					status = allData[i].status;

					if (answerType == 0 && answerId != 0 && isRead == false && status == 1) {
						
						askData += 1;
						$('.categories-asking').text("ถามคำถาม (" + askData + ")");

					} 
				}




				// ------------------ Get Answer Notification Service ----------------------
				CallService(ask_ans_noti, question_link, false, function(msg) {

					var allAnsData = msg;
					// console.log(allAnsData);
					ansData = allAnsData.length;

					if (ansData > 0) {

						$('.categories-answer').text("ตอบคำถาม (" + ansData + ")");

					}

					var all_noti = askData + ansData;
					// console.log(all_noti);

					if (all_noti > 0) {

						$('.count-noti').text(all_noti);

						create_all_noti.innerHTML = 
						'<span class="count-noti">' + all_noti + '</span>';
						document.getElementById('user-info-pic-collection').appendChild(create_all_noti);
						
						$('.all-inbox-link').addClass('active');
					}

				});


			});

		}
	}, 20000)

	

	















	// -------------------------------------- Main Call Service --------------------------------------


	function CallService(data, url, async, callBack) {

		$.ajax({

			type: 'POST',
			data: data,
			url: url,
			dataType: 'json',
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