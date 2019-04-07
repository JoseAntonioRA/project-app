$(".nano").nanoScroller();

// mostrar contenedor del buscador
$( "#category").focus(function() {
	$(".contentNano").css("opacity", "1");
	/* $(".contentNano").css("display", "block"); */
	$(".contentNano").css("height", "300px");
	$(".contentNano").css("transition", "all 1s linear 0.98s, all 0.15s linear");
});

// ocultar contenedor del buscador
$( "#category").focusout(function() {
	$(".contentNano").css("opacity", "0");
	/* $(".contentNano").css("display", "none"); */
	$(".contentNano").css("transition", "all 0s linear 0.98s, all 0.15s linear");
	$(".contentNano").css("height", "0");
});