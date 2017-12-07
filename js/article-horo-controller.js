$(document).ready(function() {


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

	var param_id = $.urlParam('id');





	// ------------------------ Article Horo Display (Get Parameter in URL) -----------------------

	var article_id = {
					  "param_article_id1" : param_id
	};

	article_id = $(this).serialize() + "&" + $.param(article_id);

	PostService(article_id, main_link + sub_link1, false, function(msg) {

		console.log(msg);
		var all_article        		 = msg;
		var article_length 			 = all_article.length;

		for (var i =0; i < article_length; i++) {

			var each_article 			 = all_article[i];
			var each_article_id    		 = each_article.id;
			var each_article_title 		 = each_article.title;
			var each_article_text  		 = each_article.text;
			var each_article_cover       = each_article.imageUrl;
			var each_article_description = each_article.description; 
			var creator_nickname		 = each_article.creator.nickname;
			var creator_profile			 = each_article.creator.profileImageUrl;
			var creator_signature		 = each_article.creator.signature;

			if (creator_profile == null) {

				creator_profile = main_link + 'image/tab_icon.png';
			}

			if (param_id == each_article_id) {

				$('.article-creator-head-name').html(creator_nickname);
				$('.img-creator').attr('src', creator_profile);
				$('.creator-info').html(creator_signature);

				var create_article_horo 	  = document.createElement('div');
				create_article_horo.className = 'article-all-content--collection';
				create_article_horo.id 		  = 'article-all-content--collection';
				create_article_horo.innerHTML = 
					'<img class="img-responsive img-content" src="'+ each_article_cover +'">' +
					'<p class="head-content">' + each_article_title + '</p>' +
					'<div class="content-collection">' +
					'<p class="content-content">' + each_article_text + '</p>' +
					'</div>';

				document.getElementById('article-content-section').appendChild(create_article_horo);
			}
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