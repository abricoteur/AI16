$(".orga-form-container").find('.wrapper').first().css("display","block");
$(".manage-orga-btns").on("click", function() {
    $(".orga-form-container").find('.wrapper').each(function(){
        $(this).css("display","none");
    });
    $(".orga-form-container").find(".wrapper").eq($(this).parent().index()).css("display","block");
});