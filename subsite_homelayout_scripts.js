
/*
* Used for Subsite Home page
* start of tabs
*/

// hash change handler
function hashchangeFun() {
    var hash = window.location.hash
    , el = $('ul.tabs [href*="' + hash + '"]')
    , content = $(hash)

    if (el.length && !el.hasClass('active_tab') && content.length) {
        el.closest('.tabs').find('.active_tab').removeClass('active_tab');
        el.addClass('active_tab');
        content.addClass('active_tab').siblings().removeClass('active_tab');
    }
}

// listen on event and fire right away
$(function () {
    hashchangeFun();
    if ("onhashchange" in window) {
        window.onhashchange = hashchangeFun; 
    } else {
        $("ul.tabs a").click(function () {
            $(this).closest('.tabs').find('.active_tab').removeClass('active_tab');
            $(this).addClass('active_tab');
            var content = $($(this).attr("href"));
            content.addClass('active_tab').siblings().removeClass('active_tab');
        });
    }
});

/** end of tabs*/

$(window).load(function() {
    $('.home_collage').flexslider({
        
    });
    $('.home_buttons .flexslider').flexslider({
        animation: "slide",
        slideshow: false,
        itemWidth: 114,
        itemMargin: 0
    });
    $(".home_buttons ul li").each(function (index) {
        $('<img />').attr('src', $(this).attr("data-hover-src")).appendTo('body').hide();
    });
});