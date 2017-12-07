$(document).ready(function() {

	// toggle login and user info
	$('.nav-login-btn2').click(function(e) {

		$('.navbar-user-big-link--collection').toggleClass('active');
		e.preventDefault();
	});



	// login display popup
	$('.nav-login-btn').click(function(e) {
		$('.login-register--collection').addClass('active');
		$('.all-login-btn--collection').addClass('active');

		e.preventDefault();

	});

	$('.close-login--popup').click(function(e) {
		$('.login-register--collection').removeClass('active');
        $('.all-btn--collection').removeClass('active');
        $('.all-login-btn--collection').removeClass('active');
        $('.all-form-login--collection').removeClass('active');
        $('.form-login').removeClass('active');
        $('.all-form-register--collection').removeClass('active');
        $('.form-register').removeClass('active');
        $('.form-forget-password').removeClass('active');

		e.preventDefault();
	});

	$(document).on('keyup', function(e) {
		if (e.keyCode == 27) {
			$('.login-register--collection').removeClass('active');
            $('.all-btn--collection').removeClass('active');
            $('.all-login-btn--collection').removeClass('active');
            $('.all-form-login--collection').removeClass('active');
            $('.form-login').removeClass('active');
            $('.all-form-register--collection').removeClass('active');
            $('.form-register').removeClass('active');
            $('.form-forgot-password').removeClass('active');
		}

		e.preventDefault();
	});

	$('.login-ookbee-btn').click(function(e) {
		$('.all-login-btn--collection').removeClass('active');
        $('.all-form-login--collection').addClass('active');
        $('.suggestion-text--collection').addClass('active');
        $('.forgot-suggestion-text--collection').removeClass('active');
        $('.form-login').addClass('active');
		
		e.preventDefault();
	});

	$('.register-login-btn').click(function(e) {
		$('.all-login-btn--collection').removeClass('active');
		$('.all-form-register--collection').addClass('active');
		$('.form-register').addClass('active');

		e.preventDefault();
	});	

	$('.forget-password--btn').click(function (e) {
        $('.form-login').removeClass('active');
        $('.form-forgot-password').addClass('active');
        $('.suggestion-text--collection').removeClass('active');
        $('.forgot-suggestion-text--collection').addClass('active');

        e.preventDefault();
    });

});	