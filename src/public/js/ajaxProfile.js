$(function () {
	$('#formProfile').on('submit', function (event) {
		event.preventDefault();

		let newAvatar = document.getElementById("filename").files[0].name;

		var formData = new FormData(this);
		console.log(formData);
		$.ajax({
			type: "POST",
			url: "/users/profile",
			data: formData,
			processData: false,
			contentType: false,
			success: function (r) {
				$("#successMessage").css("display", "block");
				$("#imgProfile").attr("src", "/img/uploads/"+ newAvatar);
				$("#imgProfile-p").attr("src", "/img/uploads/"+ newAvatar);
			},
			error: function (e) {
				console.log(e);
			}
		});
	});
});

$('#btn-successAjax').on('click', function (){
	$('#successMessage').hide();
});