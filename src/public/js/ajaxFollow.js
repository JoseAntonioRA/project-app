$(function () {
	$('#formFollow').on('submit', function (event) {
		event.preventDefault();

		$.ajax({
			method: 'PUT',
			success: function () {
				$('#heart').toggleClass("redFollow");
				$('#btn-follow').css("box-shadow", "none");
				$('#btn-follow').toggleClass("shadoww");
				$('#btn').toggleClass("shadoww");
			},
			error: function (err) {
				console.log(err);
			}
		});
	});	
});