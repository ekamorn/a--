$(document).ready(function() {


	// Main Variables

	var main_link = 'http://lek.ots.co.th/a-duangHTML-v4/';
	var allOutbox = null;
	var allInbox = null;
	var create_answer = document.createElement('div');
	var keepActiveLink;



	// Preloader 

	setTimeout(function() {

		$('body').addClass('loaded');

	}, 400);





	// Hover Effact

	$('upload-attach-file').hover(function(e){

		$('.attach-file-button').toggleClass('active');

		e.preventDefault();
	});







	// ---------------------------------------------- Outbox function -------------------------------------------------


	var raw_outbox = "outbox";
	var post_outbox = "outbox1=" + raw_outbox;

	CallService(post_outbox, main_link + 'web_client_service/inbox_outbox_client_service', false, function(msg) {


		allOutbox = msg;
		var allLength = msg.length;
		console.log(allOutbox);


		if (allLength > 0) {

			createLinks(allLength);
			createInfoQuestion(0);


		} else {

			alert("Outbox is empty");
		}




		$('.outbox-question').click(function(e) {

			$('.categories').removeClass('active');
			$(this).addClass('active');
			$('.content-collection').remove();
			$('.answer-collection').remove();
			$('.question-list-item').remove();

			if (allLength > 0) {

				createLinks(allLength);
				createInfoQuestion(0);
			} else {
				alert ("Outbox is empty");
			}

			e.preventDefault();
		});

	});









	// ---------------------------------------------- Inbox function -------------------------------------------------


	var raw_inbox = "inbox";
	var post_inbox = "inbox1=" + raw_inbox;

	CallService(post_inbox, main_link + 'web_client_service/inbox_outbox_client_service.php', false, function(msg) {

		allInbox = msg;
		console.log(allInbox);
		var allLengthInbox = allInbox.length;

		$('.inbox-question').click(function(e) {

			$('.categories').removeClass('active');
			$(this).addClass('active');
			$('.content-collection').remove();
			$('.answer-collection').remove();
			$('.question-list-item').remove();


			if (allLengthInbox > 0) {

				createInboxLink(allLengthInbox);
				createInboxInfoQuestion(0);

			} else {

				alert("Inbox Question is empty.");

			}

			e.preventDefault();
		});

	});










	// ---------------------------------------------- Create Inbox Links function -------------------------------------------------

	function createInboxLink (dataLength) {

		for (var i = 0; i < dataLength; i++) {

			var inboxQuestionId = allInbox[i].id;
			var inboxQuestionText = allInbox[i].text;
			var inboxQuestionImages = allInbox[i].imageUrls;
			var inboxQuestionCreatedDate = allInbox[i].createdDate;
			var inboxQuestionExpriedDate = allInbox[i].expiredDate;
			var inboxQuestionServiceId = allInbox[i].service.id;
			var inboxQuestionServiceTitle = allInbox[i].service.title;
			var inboxQuestionServiceDetail = allInbox[i].service.detail;
			var inboxQuestionServiceType = allInbox[i].service.type;
			var inboxQuestionStatus = allInbox[i].isRead;
			var inboxQuestionOwnerName = allInbox[i].owner.nickname;
			var inboxQuestionOwnerProfileImage = allInbox[i].owner.profileImageUrl;
			var inboxQuestionOwnerUserId = allInbox[i].owner.userId;	
			var questionStatus = allInbox[i].status;

			if (inboxQuestionOwnerProfileImage == null) {
				inboxQuestionOwnerProfileImage = "../a-duangHTML-v4/image/v02/fon.png";
			}


			// getDate
			var aDate = new Date(Date.parse(inboxQuestionCreatedDate));
			var d = aDate.getDate();
			var h = aDate.getHours();
			var m = aDate.getMinutes();
			var currentDate = new Date();
			var cD = currentDate.getDate();
			var cH = currentDate.getHours();
			var cM = currentDate.getMinutes();

			var previousDay = cD - d;
			var previousHour = cH - h;
			var previousMinute = cM - m;
			if (previousDay >= 1) {
				var pastTime = previousDay + " วันก่อน";
			} else if (previousDay == 0 && previousHour == 0 && previousMinute > 0) {
				var pastTime = cM - m + " นาทีก่อน";
			} else if (previousDay == 0 && previousHour >= 0 && previousHour < 1 && previousMinute > 0) {
				var pastTime = cM - m + " นาทีก่อน";
			} else if (previousDay == 0 && previousHour > 0) {
				var pastTime = cH - h + " ชั่วโมงก่อน";						
			}

			// Create Links
			var createOwnOutbox = document.createElement('li');
			var status = null;
		  	var statusClass = null;
		  	if (questionStatus == 0) {
		  	
		  		status = "รอแม่หมอตอบคำถาม";
		  		statusClass = "pending";

		  	} else if (questionStatus == 1) {
		  	
		  		status = "แม่หมอตอบคำถามแล้ว";
		  		statusClass = "answered";

		  	} else if (questionStatus == 2) {

		  		status = "แม่หมอปฏิเสธตอบคำถาม";
		  		statusClass = "rejected	";

		  	} else if (questionStatus == 3) {

		  		status = "คำถามหมดอายุ";
		  		statusClass = "expired";

		  	} else if (questionStatus == 4) {

		  		status = "รอตรวจสอบสลิป";
		  		statusClass = "check-slip";
		  	}


			if ((i%2) == 0) {
			  createOwnOutbox.className = 'item question-list-item even-number';
			} else {
			  createOwnOutbox.className = 'item question-list-item';
			}


			createOwnOutbox.innerHTML =
				  '<a href="#" class="question inboxx-question" targetValue="'+ i +'" questionId="'+ inboxQuestionId +'">' + 
					'<div class="collection-user-image">' +
					'<image src="'+ inboxQuestionOwnerProfileImage +'" class="img-mini-user">' +
					'</div>' +
					'<div class="collection-user-name">' +
					'<div class="word-wrapper">' +
					'<p class="question-user-name">' + inboxQuestionOwnerName + '</p>' +
					'<p class="example-question">' + inboxQuestionText + '</p>' +
					'</div>' +
					'</div>' +
					'<div class="collection-time">' +
					'<p class="question-time">' + pastTime + '</p>' + 
					'<div class="status-collection '+ statusClass +'">' +
					'<p class="question-status" value="'+ inboxQuestionStatus +'">' + status + '</p>' +
					'</div>' +
					'</div>' +
					'</a>';

			document.getElementById('list-question').appendChild(createOwnOutbox);

			$('.question:first').addClass('active');

			$('.inboxx-question').click(function(e) {

				var idQuestion = $(this).attr('questionId');
				var stringId = {'questionId1' : idQuestion};
				stringId = $(this).serialize() + "&" + $.param(stringId);


				// $.ajax({
				// 	url:'/a-duangHTML-v4/web_client_service/sendQuestionStatus.php',
				// 	type: 'POST',
				// 	data: stringId,
				// 	dataType: 'json',
				// 	success: function(data) {
				// 		console.log(data);
				// 	}, error: function(error) {
				// 		console.log(error);
				// 	}
				// });

				$('.question').removeClass('active');
				$(this).addClass('active');
				$('.content-collection').remove();
				var target_question = $(this).attr('targetValue');
				createInboxInfoQuestion(target_question);

				e.preventDefault();

			});
		}
		return dataLength;
	}











	// ---------------------------------------------- Create Inbox Info function -------------------------------------------------


	function createInboxInfoQuestion (length) {

		var userImage = allInbox[length].owner.profileImageUrl;
		var userNickname = allInbox[length].owner.nickname;
		var questionCreateDate = allInbox[length].createdDate;
		var questionText = allInbox[length].text;
		var questionId = allInbox[length].id;
		var questionImage = allInbox[length].imageUrls;

		if (userImage == null) {
			userImage = "../a-duangHTML-v4/image/v02/fon.png";
		}

		// getDate
		var aDate = new Date(Date.parse(questionCreateDate));
		var d = aDate.getDate();
		var h = aDate.getHours();
		var m = aDate.getMinutes();
		var currentDate = new Date();
		var cD = currentDate.getDate();
		var cH = currentDate.getHours();
		var cM = currentDate.getMinutes();

		var previousDay = cD - d;
		var previousHour = cH - h;
		var previousMinute = cM - m;
		if (previousDay >= 1) {
			var pastTime = previousDay + " วันก่อน";
		} else if (previousDay == 0 && previousHour == 0 && previousMinute > 0) {
			var pastTime = cM - m + " นาทีก่อน";
		} else if (previousDay == 0 && previousHour >= 0 && previousHour < 1 && previousMinute > 0) {
			var pastTime = cM - m + " นาทีก่อน";
		} else if (previousDay == 0 && previousHour > 0) {
			var pastTime = cH - h + " ชั่วโมงก่อน";						
		}


		var infoQuestion = document.createElement('div');
		infoQuestion.className = 'content-collection';
		infoQuestion.innerHTML =
			'<div class="head-content-collection">' +
			'<div class="head-image-collection">' +
			'<img class="img-each-user" src="'+ userImage +'">' +
			'</div>' +
			'<div class="name-time-collection">' +
			'<p class="content-name-user">' + userNickname + '</p>' +
			'<p class="content-time-user">' + pastTime + '</p>' +
			'</div>' +
			'</div>' +
			'<div class="body-content-collection">' + 
			'<p class="body-content-head">คำถาม</p>' +
			'<p class="body-content">' + questionText + '</p>' +
			'</div>' + 
			'<div class="other-content-collection" id="'+ questionId +'">' + 
			// '<img class="other-image" src="'+ eachQuestionImage +'">' +
			'</div>' +
			'<div class="answer-question-collection">' +
			'<div class="answer-question">' +
			'<textarea placeholder="ตอบคำถามดูดวง" rows="5" class="answer-field"></textarea>' +
			'</div>' +
			'<div class="answer-button-collection">' +
			'<div class="attach-file-button">' +
			'<div class="attach-display-collection" id="attach-display-collection">' +
			'</div>' +
			'<div class="attach-file-wrapper">' +
			'<form action="web_client_service/upload_attach_answer.php" method="post" entype="multipart/form-data">' +
			'<button class="attach-file-button">แนบไฟล์</button>' +
			'<input type="file" class="upload-attach-file" id="upload-attach-file" name="upload-attach-file">' +
			'</form>' +
				'</div>' +
			'<div class="send-answer-wrapper">' +
			'<button class="send-answer-button" id="send-answer-button">ส่งคำตอบ</button>' + 
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';

			document.getElementById('third-collection-inbox').appendChild(infoQuestion);

			for (var j = 0; j < questionImage.length; j++) {
				var eachQuestionImage = questionImage[j];

				var createOtherPics = document.createElement('img');
				createOtherPics.className = 'other-image';
				createOtherPics.setAttribute('src', eachQuestionImage);
				document.getElementById(questionId).appendChild(createOtherPics);

			}

			function createAnswerAttach(attach) {
				var attachAnswer = document.createElement('div');
				attachAnswer.className = "each-attach-answer-collection";
				attachAnswer.setAttribute('value', attach);
				attachAnswer.innerHTML = 
					'<div class="remove-upload-pic-collect">' +
					'<a href="#" class="remove-upload-pic" delete-target = "'+ attach +'">' +
					'<i class="fa fa-times" aria-hidden="true"></i>' +
					'</a>' +
					'</div>' +
					'<img class="each-attach-answer" src="http://lek.ots.co.th/a-duangHTML-v4/upload/attach_answer/'+ attach +'">';

				document.getElementById('attach-display-collection').appendChild(attachAnswer);

				return attach;
			
			}

			// ---------------------------- upload attach pics ----------------------------

			$('#upload-attach-file').change(function() {

				$.ajax({
					url: main_link + 'web_client_service/upload_attach_answer.php',
					type: 'POST',
					data: new FormData($(this).closest('form').get(0)),
					contentType: false,
					cache: false,
					processData: false,
					beforeSend: function() {

					}, 
					complete: function() {

					}, 
					success: function(data) {

						console.log(data);
						createAnswerAttach(data);



						// ----------------------- delete attach file ------------------------

						$('.remove-upload-pic').click(function(e) {

							var img_delete_target = $(this).attr('delete-target');
							var img_file = img_delete_target;
							console.log(img_file);

							var delete_collection = $('.each-attach-answer-collection').attr('value');
							$('.each-attach-answer-collection').each(function() {

								if ($(this).attr('value') == img_file) {

									$.ajax({

										type: 'POST',
										url: main_link + 'web_client_service/delete_attach_client_service.php',
										data: {"attachFile": img_file},
										success: function(data) {

											console.log(data);
										}

									});

									$(this).remove();	
								}

							});

							e.preventDefault()
						});
					}

				});
			});


			// ----------------- Posting Answer ------------------
			$('#send-answer-button').click(function() {


				var answer_field = $('.answer-field').val();
				var each_attach = [];
				$('.each-attach-answer').each(function() {
					var attachSrc = $(this).attr('src');
					each_attach.push(attachSrc);
				});


				var answer_data = {
					"answer_field" : answer_field,
					"each_attach" : each_attach,
					"question_id" : questionId
				};

				answer_data = $(this).serialize() + "&" + $.param(answer_data);
				console.log(answer_data);

				if (answer_field == "") {

					alert("Please, fill all fields first!!");
				
				} else {
					console.log(answer_data);
					$.ajax({
						type: 'POST',
						url: '/a-duangHTML-v4/web_client_service/sending_answer_client_service.php',
						dataType: 'json',
						data: answer_data,
						cache: false,
						beforeSend: function() {

						},
						complete: function() {

						},
						success: function(result) {
							console.log(result);
							location.reload();
						}, 
						error: function(error) {
							console.log(error);
						}
					});
				}
			});

			return length;
	}











	// ---------------------------------------------- Create Links function -------------------------------------------------

	function createLinks (dataLength) {


		for(var i = 0; i < dataLength; i++) {

			var questionId = allOutbox[i].id;
			var questionText = allOutbox[i].text;
			var questionImage = allOutbox[i].imageUrls;
			var questionCreateDate = allOutbox[i].createdDate;
			var questionExpireDate = allOutbox[i].expiredDate;
			var questionReadStatus = allOutbox[i].isRead;
			var userNickname = allOutbox[i].owner.nickname;
			var userImage = allOutbox[i].owner.profileImageUrl;
			var userSignature = allOutbox[i].owner.signature;
			var answerId = allOutbox[i].answerId;
			var questionStatus = allOutbox[i].status;
			var isReadStatus = allOutbox[i].isRead;

			// getDate
			var aDate = new Date(Date.parse(questionCreateDate));
			var d = aDate.getDate();
			var h = aDate.getHours();
			var m = aDate.getMinutes();
			var currentDate = new Date();
			var cD = currentDate.getDate();
			var cH = currentDate.getHours();
			var cM = currentDate.getMinutes();

			var previousDay = cD - d;
			var previousHour = cH - h;
			var previousMinute = cM - m;
			if (previousDay >= 1) {
				var pastTime = previousDay + " วันก่อน";
			} else if (previousDay == 0 && previousHour == 0 && previousMinute > 0) {
				var pastTime = cM - m + " นาทีก่อน";
			} else if (previousDay == 0 && previousHour >= 0 && previousHour < 1 && previousMinute > 0) {
				var pastTime = cM - m + " นาทีก่อน";
			} else if (previousDay == 0 && previousHour > 0) {
				var pastTime = cH - h + " ชั่วโมงก่อน";						
			}

			// Create Links
			  var createOwnOutbox = document.createElement('li');
			  var status = null;
			  var statusClass = null;
			  if (questionStatus == 0) {
			  	
			  	status = "รอแม่หมอตอบคำถาม";
			  	statusClass = "pending";

			  } else if (questionStatus == 1) {
			  	
			  	status = "แม่หมอตอบคำถามแล้ว";
			  	statusClass = "answered";

			  } else if (questionStatus == 2) {

			  	status = "แม่หมอปฏิเสธตอบคำถาม";
			  	statusClass = "rejected	";

			  } else if (questionStatus == 3) {

			  	status = "คำถามหมดอายุ";
			  	statusClass = "expired";
			  
			  } else if (questionStatus == 4) {

			  	status = "รอตรวจสอบสลิป";
			  	statusClass = "check-slip";
			  }

			  if ((i%2) == 0) {
			  	createOwnOutbox.className = 'item question-list-item even-number';
			  } else {
			  	createOwnOutbox.className = 'item question-list-item';
			  }


			if (userImage == null) {
				userImage = "../a-duangHTML-v4/image/v02/fon.png";
			}

		  createOwnOutbox.innerHTML =
			  '<a href="#" class="question" targetValue="'+ i +'" questionId="'+ questionId +'">' + 
				'<div class="collection-user-image">' +
				'<image src="'+ userImage +'" class="img-mini-user">' +
				'</div>' +
				'<div class="collection-user-name">' +
				'<div class="word-wrapper">' +
				'<p class="question-user-name">' + userNickname + '</p>' +
				'<p class="example-question">' + questionText + '</p>' +
				'</div>' +
				'</div>' +
				'<div class="collection-time">' +
				'<p class="question-time">' + pastTime + '</p>' + 
				'<div class="status-collection '+ statusClass +'">' +
				'<p class="question-status">' + status + '</p>' +
				'</div>' +
				'</div>' +
				'</a>';

			document.getElementById('list-question').appendChild(createOwnOutbox);

			$('.question:first').addClass('active');
			$('.question').each(function(){
				if ($(this).attr('questionId') == keepActiveLink) {
				
					$(this).addClass('active');
				
				}
			});
		
			$('.question').click(function(e) {


				$('.question').removeClass('active');
				$(this).addClass('active');
				$('.content-collection').remove();
				$('.answer-collection').remove();
				var target_question = $(this).attr('targetValue');
				createInfoQuestion(target_question);
				keepActiveLink = $(this).attr('questionId');

				e.preventDefault();
			});
		}

		return dataLength;
	}





	



	// ---------------------------------------------- Create Info Question function -------------------------------------------------

	function createInfoQuestion (length) {

		var userImage = allOutbox[length].owner.profileImageUrl;
		var userNickname = allOutbox[length].owner.nickname;
		var questionCreateDate = allOutbox[length].createdDate;
		var questionText = allOutbox[length].text;
		var questionId = allOutbox[length].id;
		var questionImage = allOutbox[length].imageUrls;
		var answerId = allOutbox[length].answerId;

		// getDate
		var aDate = new Date(Date.parse(questionCreateDate));
		var d = aDate.getDate();
		var h = aDate.getHours();
		var m = aDate.getMinutes();
		var currentDate = new Date();
		var cD = currentDate.getDate();
		var cH = currentDate.getHours();
		var cM = currentDate.getMinutes();

		var previousDay = cD - d;
		var previousHour = cH - h;
		var previousMinute = cM - m;
		if (previousDay >= 1) {
			var pastTime = previousDay + " วันก่อน";
		} else if (previousDay == 0 && previousHour == 0 && previousMinute > 0) {
			var pastTime = cM - m + " นาทีก่อน";
		} else if (previousDay == 0 && previousHour >= 0 && previousHour < 1 && previousMinute > 0) {
			var pastTime = cM - m + " นาทีก่อน";
		} else if (previousDay == 0 && previousHour > 0) {
			var pastTime = cH - h + " ชั่วโมงก่อน";						
		}


		if (userImage == null) {
			userImage = "../a-duangHTML-v3/image/v02/fon.png";
		}

		var infoQuestion = document.createElement('div');
		infoQuestion.className = 'content-collection';
		infoQuestion.innerHTML =
			'<div class="head-content-collection">' +
			'<div class="head-image-collection">' +
			'<img class="img-each-user" src="'+ userImage +'">' +
			'</div>' +
			'<div class="name-time-collection">' +
			'<p class="content-name-user">' + userNickname + '</p>' +
			'<p class="content-time-user">' + pastTime + '</p>' +
			'</div>' +
			'</div>' +
			'<div class="body-content-collection">' + 
			'<p class="body-content-head">คำถาม</p>' +
			'<p class="body-content">' + questionText + '</p>' +
			'</div>' + 
			'<div class="other-content-collection" id="'+ questionId +'">' + 
			'</div>' +
			'</div>';
			document.getElementById('third-collection-inbox').appendChild(infoQuestion);

			for (var j = 0; j < questionImage.length; j++) {
				var eachQuestionImage = questionImage[j];

				var createOtherPics = document.createElement('img');
				createOtherPics.className = 'other-image';
				createOtherPics.setAttribute('src', eachQuestionImage);
				document.getElementById(questionId).appendChild(createOtherPics);

			}

			var ansId = answerId;
			var post_ansId = "AnswerId1=" + ansId;

			if (ansId != 0) {
				$.ajax ({
					url: main_link + 'web_client_service/inbox_outbox_client_service.php',
					type: 'POST',
					dataType: 'json',
					data: post_ansId,
					success: function(result) {

						var allAnswer = result;
						var answerContent = allAnswer.content;
						var answerImages = allAnswer.imageUrls;
						var answerCreate = allAnswer.createdDate;
						var answerUserId = allAnswer.user.userId;
						var answerUserNickname = allAnswer.user.nickname;
						var answerUserProfile = allAnswer.user.profileImageUrl;
						var answerUserSignature = allAnswer.user.signature;


						// getDate
						var aDate = new Date(Date.parse(answerCreate));
						var d = aDate.getDate();
						var h = aDate.getHours();
						var m = aDate.getMinutes();
						var currentDate = new Date();
						var cD = currentDate.getDate();
						var cH = currentDate.getHours();
						var cM = currentDate.getMinutes();

						var previousDay = cD - d;
						var previousHour = cH - h;
						var previousMinute = cM - m;
						if (previousDay >= 1) {
							var pastTime = previousDay + " วันก่อน";
						} else if (previousDay == 0 && previousHour == 0 && previousMinute > 0) {
							var pastTime = cM - m + " นาทีก่อน";
						} else if (previousDay == 0 && previousHour >= 0 && previousHour < 1 && previousMinute > 0) {
							var pastTime = cM - m + " นาทีก่อน";
						} else if (previousDay == 0 && previousHour > 0) {
							var pastTime = cH - h + " ชั่วโมงก่อน";						
						}


						if (answerUserProfile == null) {
							answerUserProfile = "../a-duangHTML-v4/image/v02/fon.png";
						}


						// ---------- Create Answer Section ------------

						create_answer.className = 'answer-collection';
						create_answer.innerHTML = 
						'<div class="head-content-collection">' +
						'<div class="head-image-collection">' +
						'<img class="img-each-user img-user-answer" src="'+ answerUserProfile +'">' +
						'</div>' +
						'<div class="name-time-collection">' +
						'<p class="content-name-user">' + answerUserNickname + '</p>' +
						'<p class="content-time-user">' + pastTime + '</p>' +
						'</div>' +
						'</div>' +
						'<div class="body-content-collection">' +
						'<p class="body-content-head">คำตอบ</p>' +
						'<p class="body-content">' + answerContent + '</p>' +
						'</div>' +
						'<div class="other-content-collection" id="'+ answerId +'">' +
						'</div>';

						document.getElementById("third-collection-inbox").appendChild(create_answer);

						for (var k = 0; k < answerImages.length; k++) {

							var eachAnswerImage = answerImages[k];

							var createAnswerPic = document.createElement('img');
							createAnswerPic.className = "other-image";
							createAnswerPic.setAttribute('src', eachAnswerImage);
							document.getElementById(answerId).appendChild(createAnswerPic);

						}

					}, 
					error: function(error) {
						console.log(error);
					}
				});
			}


			return length;
	}











	// ---------------------------------------------- Main CallBack function -------------------------------------------------

	function CallService (data, url, async, callBack) {

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