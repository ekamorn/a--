$(document).ready(function (){



	// ------------------------- Main Variables ------------------

	var main_link = 'http://lek.ots.co.th/a-duangHTML-v4/';
	var sub_link1 = 'web_client_service/horo_client_service.php';





	// -------------------------Set Timeout Loaded Function ------------------

	setTimeout(function() {

		$('body').addClass('loaded');
	}, 2000);




	// ------------------------ Get Parameter in URL -----------------------

	$.urlParam = function(name) {

		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

		return results[1] || 0;
	}

	var param_id 	 = $.urlParam('id');
	var param_length = $.urlParam('length');
	var param_type   = $.urlParam('type');

	console.log(param_id);
	console.log(param_length);





	// ------------------------ Weekly Horo Display (Get Parameter in URL) -----------------------

	var weekly_id = {
					"param_id1" : param_id,
					"param_type1" : param_type
	};

	weekly_id = $(this).serialize() + "&" + $.param(weekly_id);

	PostService(weekly_id, main_link + sub_link1, false, function(msg) {


		console.log(msg);
		var creator_nickname  = msg.creator.nickname;
		var creator_profile   = msg.creator.profileImageUrl;
		var creator_signature = msg.creator.signature;
		var weekly_cover      = msg.imageUrl;
		var head_title        = msg.title;
		var head_description  = msg.discription;
		var contents_length   = msg.contents.length;
		var all_contents;
		var cover_contents;
		var weekly_content;
		var weekly_content_length;

		for (var i = 0; i < contents_length; i++) {

			all_contents   		  = msg.contents[param_length];
			cover_contents        = all_contents.imageUrl;
			weekly_content        = all_contents.contents;
			weekly_content_length = all_contents.contents.length;

		}

		console.log(all_contents);

		$('.article-creator-head-name').html(creator_nickname);
		$('.img-creator').attr('src', creator_profile);
		$('.creator-info').html(creator_signature);

		var create_horo       = document.createElement('div');
		create_horo.className = 'article-all-content--collection';
		create_horo.id        = 'article-all-content--collection'; 
		create_horo.innerHTML = 
			'<img class="img-responsive img-content" src="'+ weekly_cover +'">' +
			'<p class="head-content">' + head_title + '</p>' +
			'<img class="img-responsive img-content" src="'+ cover_contents +'">';


		document.getElementById('article-content-section').appendChild(create_horo);

		for (var k = 0; k < weekly_content_length; k++) {

			var each_weekly_title    = weekly_content[k].title;
			console.log(each_weekly_title);
			var each_weekly_contents = weekly_content[k].text;

			create_horo_contents = document.createElement('div');
			create_horo_contents.className = 'content-collection';
			create_horo_contents.innerHTML = 
				'<p class="content-content">' + each_weekly_title + '</p>' +
				'<p class="content-content">' + each_weekly_contents + '</p>';

			document.getElementById('article-all-content--collection').appendChild(create_horo_contents);
		}

	});








	// -------------------------------------------- CallBack POST Service Function ---------------------------

	function PostService (data, url, async, callBack) {

		$.ajax({
			type: 'POST',
			url: url,
			dataType: 'json',
			data: data,
			success: function(msg) {

				return callBack(msg);
			}, 
			error: function(error) {

			}
		});
	}

});