var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

$('#search').keyup(function () {
    var searchField = $('#search').val();
    console.log(searchField);
    //API url with search
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchField + '&format=json&callback=?';
    console.log(url);
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (data) {
            if (searchField === '') {
                $('#output').html('');
            } else {
                for (var i = 0; i < data[1].length; i++) {
                    $("#output").prepend("<li><a href='" + data[3][i] + "'>" + data[1][i] + "</a> <p>" + data[2][1] + "</p></li>");
                }
            }


        },
        error: function (errorMessage) {
            alert("Error");
        }
    });
});
//show input-group
$('#search-icon').on('click', function() {
    $(".input-group").removeClass("hide");
    $("#search-icon").addClass("hide");
});


//<p class='fa fa-search'></p>
$(".input-group-btn").on("click", function() {
    $(".input-group").addClass("hide");
    $("#search-icon").removeClass("hide");
    $("#search").val('');
    $('#output').html('');
    $('#wrapper').css("margin","25vh auto");
}); 

