$(document).ready(function() {
            $('#fullpage').fullpage({
                navigation: true;
            });
            
});
$(document).ready(function(){
	$("#demosMenu").change(function(){
	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});
});