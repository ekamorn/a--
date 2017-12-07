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



	// Hover Effect
	$('upload-attach-file').hover(function(e){

		$('.attach-file-button').toggleClass('active');

		e.preventDefault();
	});











	// ---------------------------------------------- Outbox function -------------------------------------------------

	var raw_outbox = "outbox";
	var post_outbox = "outbox1=" + raw_outbox;

	CallService(post_outbox, main_link + 'web_client_service/inbox_outbox_client_service.php', false, function(msg) {


		createBigLinks(msg);
	});














	// ---------------------------------------------- Create Links function -------------------------------------------------

	function createBigLinks (data) {

		var allOutbox = data;
		console.log(allOutbox);
		var outboxLength = allOutbox.length;


		createLinks(outboxLength);

		return data;
	}





	function createLinks (dataLength) {

		for (var i = 0; i < dataLength; i++) {

			var questionId         = allOutbox[i].id;
			var questionText 	   = allOutbox[i].text;
			var questionImage 	   = allOutbox[i].imageUrls;
			var questionCreateDate = allOutbox[i].createdDate;
			var questionExpireDate = allOutbox[i].expriedDate;
			var questionReadStatus = allOutbox[i].isRead;
			var questionStatus 	   = allOutbox[i].status;
			var userNickname 	   = allOutbox[i].owner.nickname;
			var userImage 		   = allOutbox[i].owner.profileImageUrl;
			var userSignature 	   = allOutbox[i].owner.signature;
			var answerId 		   = allOutbox[i].answerId;
			var isReadStatus 	   = allOutbox[i].isRead;
			var answerType 		   = allOutbox[i].type;


			// getDate
			var aDate 		= new Date(Date.parse(questionCreateDate));
			var d 	  		= aDate.getDate();
			var h 	  		= aDate.getHours();
			var m 	  		= aDate.getMinutes();
			var currentDate = new Date();
			var cD 			= currentDate.getDate();
			var cH 			= currentDate.getHours();
			var cM 			= currentDate.getMinutes();

			var previousDay    = cD - d;
			var previousHour   = cH - h;
			var previousMinute = cM - m;


			if (previousDay >= 1) {

				var pastTime = previousDay + " วันก่อน";
			
			} else if (previousDay == 0 && previousHour == 0 && previousMinute >= 0) {

				var pastTime = cM - m + " นาทีก่อน";
			
			} else if (previousDay == 0 && previousHour >= 0 && previousHour < 1 && previousMinute > 0) {
			
				var pastTime = cM - m + " นาทีก่อน";
			
			} else if (previousDay == 0 && previousHour > 0) {
			
				var pastTime = cH - h + " ชั่วโมงก่อน";						
			
			}


			// --------- Create Links --------
			var createOwnOutbox = document.createElement('li');
			var status;
			var statusClass;

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

				createOwnOutbox.className = "item question-list-item even-number";

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


		}

		return dataLength;
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