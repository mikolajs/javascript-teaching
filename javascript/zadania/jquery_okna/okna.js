var open = null;

$(function(){
   $('.content:not(:first)').hide();
   open = $('.content:first').get(0);
});

function mkShow(elem) {
    if(elem == open) return;
    $('.content').hide(500);
    $aside.parent().children('.content').show(500);
    open = elem;
}
