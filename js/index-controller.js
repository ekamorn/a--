$(document).ready(function() {



	// -------------------------------------------- Add Loaded Class Preload ---------------------------

	setTimeout(function(){
		$('body').addClass('loaded');
		$('.parallax-header').addClass('active');
	},4000);






	// -------------------------------------------- Global Variable ---------------------------

	var main_link     = 'http://lek.ots.co.th/a-duangHTML-v4';
	var sub_link1     = '/web_client_service/index_client_service.php';
	var weekly_link   = '/weekly-daily';
	var article_link  = '/article-horo';
	var dailyPicArray = ['image/v02/sunday-btn.png', 'image/v02/monday-btn.png', 'image/v02/tuesday-btn.png', 'image/v02/wednesday-day-btn.png', 'image/v02/wednesday-night-btn.png', 'image/v02/thursday-btn.png', 'image/v02/friday-btn.png', 'image/v02/saturday-btn.png'];
	var zodiacPic     = ['image/v02/aries.png', 'image/v02/taurus.png', 'image/v02/gemini.png', 'image/v02/cancer.png', 'image/v02/leo.png', 'image/v02/virgo.png', 'image/v02/libra.png', 'image/v02/scorpio.png', 'image/v02/sajittarius.png', 'image/v02/carpicorn.png', 'image/v02/aquarius.png', 'image/v02/pisces.png'];










	// ------------------------------------------- fixed top navbar --------------------------------------
	
	var windowWidth = $(window).width();

	if(windowWidth > 1260 && windowWidth < 1930) {
		$(window).scroll(function(){
			if ($(window).scrollTop() > 950) {
				$('.navbar-collection').addClass('navbar-fixed-top');
			} else {
				$('.navbar-collection').removeClass('navbar-fixed-top');
			}
		});
	} else if (windowWidth >= 4096) {
		$(window).scroll(function(){
			if($(window).scrollTop() > 2000) {
				$('.navbar-collection').addClass('navbar-fixed-top');
			} else {
				$('.navbar-collection').removeClass('navbar-fixed-top');
			}
		});
	}
	

	for (var i = 0; i<12; i++) {
		

		var createQuiz = document.createElement('div');
				createQuiz.className = 'col-lg-3 col-md-3 col-sm-4 col-xl-3 col-6 each-article-btn';
				createQuiz.innerHTML = 
				'<a href="#" class="each-article-btn-link">' + 
					'<div class="each-article-cover-pic">' + '</div>'+
					'<div class="each-article-info-collection">' + 
						'<p class="each-article-name">' + 'ชื่อบทความดีๆน่าส่วนใจมากๆเลยนะ' + '</p>' +
						'<p class="each-article-creator">' + 'สร้างโดย: <span>a ดวง</span>' + '</p>' +
					'</div>' +
				'</a>';

		document.getElementById('quiz-body-collection').appendChild(createQuiz);
	}





	// -------------------------------------------- GETTING Horo function ---------------------------

	var daily = {
				"daily1" : "horodaily"
	}

	daily = $(this).serialize() + "&" + $.param(daily);

	PostService(daily, main_link + sub_link1, false, function(msg) {

		
		createHoroDaily(msg, "daily-link");
		$('.daily-link').addClass('active');
	});


	var weekly = {
				  "weekly1" : "horoweekly"
	}

	weekly = $(this).serialize() + "&" + $.param(weekly);
	PostService(weekly, main_link + sub_link1, false, function(msg) {

		createHoroZodiac(msg, "weekly-link");
	});


	var monthly = {
					"monthly1" : "horomonthly" 
	}

	monthly = $(this).serialize() + "&" + $.param(monthly);
	PostService(monthly, main_link + sub_link1, false, function(msg) {

		createHoroZodiac(msg, "monthly-link");
	});


	var article = {
				    "article1" : "horoarticle"
	}

	article = $(this).serialize() + "&" + $.param(article);
	PostService(article, main_link + sub_link1, false, function(msg) {

		CreateArticle(msg);
	});

	// var yearly = {
	// 			  "yearly1" : "horoyearly"
	// };

	// yearly = $(this).serialize() + "&" + $.param(yearly);
	// PostService(yearly, main_link + sub_link1, false, function(msg) {

	// 	createHoroZodiac(msg, "yearly-link");
	// });






	// -------------------------------------------- Click open Horo ---------------------------

	$('#daily-link-button').click(function(e) {

		// $('.weekly-btn--zodiac').remove();
		$('.horo-link-button').removeClass('active');
		$('.weekly-btn--zodiac').removeClass('active');
		$(this).addClass('active');
		$('.daily-link').addClass('active');


		e.preventDefault();
	});


	$('#weekly-link-button').click(function(e) {

		// $('.weekly-btn--zodiac').remove();
		$('.horo-link-button').removeClass('active');
		$('.weekly-btn--zodiac').removeClass('active');
		$(this).addClass('active');
		$('.weekly-link').addClass('active');
		

		e.preventDefault();
	});


	$('#monthly-link-button').click(function(e) {

		$('.horo-link-button').removeClass('active');
		$('.weekly-btn--zodiac').removeClass('active');
		$(this).addClass('active');
		$('.monthly-link').addClass('active');

		e.preventDefault();
	});




	// -------------------------------------------- Create Article Function ---------------------------

	function CreateArticle(data) {
		var all_article = data;
		console.log(all_article);
		var article_length = all_article.length;

		for (var i = 0; i < article_length; i++) {

			var article_id 		 = all_article[i].id;
			var article_title 	 = all_article[i].title;
			var article_text  	 = all_article[i].text;
			var article_cover 	 = all_article[i].imageUrl;

			console.log(article_cover);
			var article_nickname = all_article[i].creator.nickname;

			var createArticle = document.createElement('div');
			createArticle.className = 'col-lg-3 col-md-3 col-sm-4 col-xl-3 col-6 each-article-btn';
			createArticle.innerHTML = 
			'<a href="'+ main_link + article_link + '?id=' + article_id +'" class="each-article-btn-link">' + 
				'<div class="each-article-cover-pic">' + 
					'<img class="each-article-cover img-responsive" src="'+ article_cover +'">' +
				'</div>' +
				'<div class="each-article-info-collection">' + 
					'<p class="each-article-name">' + article_title + '</p>' +
					'<p class="each-article-creator">' + 'สร้างโดย: <span>'+ article_nickname +'</span>' + '</p>' +
				'</div>' +
			'</a>';

			document.getElementById('article-body-collection').appendChild(createArticle);

			$('.each-article-cover').css({"max-width" : "100%", "min-height" : "170px", "max-height" : "170px", "margin-left": "auto", "margin-right" : "auto", "display": "block"});

			// $('.each-article-cover').css({"background" : 'url('+ article_cover +')', "width" : "100%", "min-height" : "170px", "background-size" : "cover"});
		}	


	}



	// -------------------------------------------- Create Horo Daily Function ---------------------------

	function createHoroDaily(data, horo) {

		var all_daily_horo = data;
		var all_daily_horo_length = all_daily_horo.length;
		var current_daily;

		for (var i = 0; i < all_daily_horo_length; i++) {

			current_daily     	  = all_daily_horo[all_daily_horo_length-1];
			var daily_content 	  = current_daily.contents;
			var daily_length      = daily_content.length;
			var daily_cover   	  = current_daily.imageUrl;
			var daily_title       = current_daily.title;
			var daily_description = current_daily.description;
			var daily_id          = current_daily.id;

		}

		for (var k = 0; k < daily_length; k++) {

			var createDaily       = document.createElement('div');
			createDaily.className = 'col-lg-3 col-md-3 col-sm-3 col-xl-3 col-6 weekly-btn--zodiac '+ horo +'';
			createDaily.innerHTML = 
			'<a href="'+ main_link + weekly_link + '?id=' + daily_id + '&length=' + k +'&type='+ horo +'">' +
			'<img class="img-weekly-btn" src="'+ dailyPicArray[k] +'">' +
			'</a>'; 

			document.getElementById('weekly-body-collection').appendChild(createDaily);
		}
		console.log(all_daily_horo);
	}





	// -------------------------------------------- Create Horo Zodiac Function ---------------------------

	function createHoroZodiac(data, horo) {

		var all_horo        = data;
		var all_horo_length = all_horo.length;
		var current_horo;

		for (var i = 0; i < all_horo_length; i++) {

			current_horo     = all_horo[all_horo_length-1];
			var horo_content = current_horo.contents;
			var horo_length  = horo_content.length;
			var horo_id      = current_horo.id;
		}

		for (var k = 0; k < horo_length; k++) {

			var length_array 	   = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2];
			var createZodiac 	   = document.createElement('div');
			createZodiac.className = 'col-lg-2 col-md-2 col-sm-4 col-xl-2 col-6 weekly-btn--zodiac '+ horo +'';
			createZodiac.innerHTML =
			'<a href="'+ main_link + weekly_link + '?id=' + horo_id + '&length=' + length_array[k] + '&type=' + horo +'" class="weekly-btn-zodiac-link">' +
			'<img class="img-weekly-btn" src="'+ zodiacPic[k] +'">' +
			'</a>';

			document.getElementById('weekly-body-collection').appendChild(createZodiac);
		}
	}




	// -------------------------------------------- CallBack POST Service Function ---------------------------

	function PostService(data, url, async, callBack) {

		$.ajax({
			type: 'post',
			url: url,
			dataType: 'json',
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