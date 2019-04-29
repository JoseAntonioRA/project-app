$(function () {
	$('#formFollow').on('submit', function (event) {
		event.preventDefault();

		let followers = $('#followersId').text();
		let numFollowers = followers[11];
		numFollowers = parseInt(numFollowers);
		let numfollowerMore = numFollowers + 1;
		let numFollowerLess = numFollowers - 1;
		console.log(numFollowerLess);

		$.ajax({
			method: 'POST',
			success: function () {

				/* $('#followersId').text.load(''); */
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