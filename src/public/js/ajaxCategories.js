
// mostrar contenedor del buscador
$( "#category").focus(function() {
	$(".contentNano").css("opacity", "1");
	$(".contentNano").css("display", "block");
	$(".contentNano").css("height", "300px");
	$(".contentNano").css("transition", "all 1s linear 0.98s, all 0.20s linear");
});

// ocultar contenedor del buscador
$("#category").focusout(function() {
	$(".contentNano").css("opacity", "0");
	$(".contentNano").css("transition", "all 0s linear 0.98s, all 0.20s linear");
	$(".contentNano").css("height", "300px");
});

// filtrado de busqueda
$('[data-search]').on('keyup', function() {
	var searchVal = $(this).val();
	var filterItems = $('[data-filter-item]');
	if ( searchVal != '' ) {
		filterItems.addClass('hidden');
		$('[data-filter-item][data-filter-name*="' + searchVal + '"]').removeClass('hidden');
	} else {
		filterItems.removeClass('hidden');
	}
});

$('.contentNano').on('click', function (event) {
	$('#category').val(event.target.value); // Obtengo el valor del target que se ha hecho clic y lo paso al input con la id #category
	$(".contentNano").css("display", "none"); // CAMBIARLO
});

$(function() {
	$('#formPanelControl').on('submit', function (event) {
		event.preventDefault();
		
		let newCategory = $('#category');
		let newTitle = $('#title');

		$.ajax({
			method: 'PUT',
			data: {
				title: newTitle.val(),
				category: newCategory.val()
			},
			success: function () {
				$("#successMessage").css("display", "block");
			},
			error: function (err){
				console.log(err);
			}
		});
	});
});