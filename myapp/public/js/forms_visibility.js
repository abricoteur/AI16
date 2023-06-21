$(".orga-form-container").find('.wrapper').first().css("display","block");
$(".data-item").on("click", function() {
    $(".orga-form-container").find('.wrapper').each(function(){
        $(this).css("display","none");
    });
    $(".orga-form-container").find(".wrapper").eq($(this).index()).css("display","block");
});