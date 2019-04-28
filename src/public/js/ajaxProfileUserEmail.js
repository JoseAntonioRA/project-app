$(function () {
	$('#formProfileUserEmail').on('submit', function (event) {
		event.preventDefault();

		let newNameUser = $('#userName');
		let newEmail = $('#email');
		$.ajax({
			method: 'PUT',
			data: {
				user: newNameUser.val(),
				email: newEmail.val(),
			},
			success: function () {
				$("#successMessageAvatar").css("display", "block");
			},
			error: function (err){
				console.log(err);
			}
		});
	});
});

$('#btn-successAjaxAvatar').on('click', function (){
	$('#successMessageAvatar').hide();
});