$(window).load(function () {
    
    var heroslider = $('.home_collage').data('flexslider');

    if (typeof heroslider != "undefined" && heroslider.vars.slideshow) {

        //need this if collage auto rotates
        pauseOutsideViewport();

        var scrollTimer;

        $(window).on('scroll', function (e) {

            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                pauseOutsideViewport();
            }, 250);
        });



        function pauseOutsideViewport() {

            var center_of_element = $(".home_collage").offset().top + (($(".home_collage").outerHeight()) / 3);
            var top_of_screen = $(window).scrollTop();
            var collage = $(".home_collage").data('flexslider');
            if (top_of_screen < center_of_element) {
                if (collage.manualPause == true) {
                    collage.flexslider('next');
                    collage.play();
                    collage.manualPause = false;
                }
            }
            else {
                collage.pause();
                collage.manualPause = true;
            }

        }
    }
    
    //this javascript is needed to fix Google Translate breaking the tab code.  Only include if site uses Google Translate.  Update selectors and href values as needed.
    $(".nav-tabs li:first-child span a").attr('href', '.tabpanel-1');
    $(".nav-tabs li:last-child span a").attr('href', '.tabpanel-2');
    $('.scroll-arrow').click(function (e) {
        e.preventDefault();
        $("html, body").stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);

    });
    if ($('.config_widget_template').length < 1) {
        //some scrollreveal magic
        window.sr = ScrollReveal({
            reset: true,
            mobile: false,
            //origin: 'left',
            //distance: '80%',
            //duration: 500,
            //opacity: 0,
            //viewFactor: 1,
            scale: 1,
            viewOffset: { top: 50, right: 0, bottom: 0, left: 0 },
            afterReveal: function (domEl) { },
            beforeReset: function (domEl) { }
        });
        sr.reveal('.home_buttons ul li', 150, {viewFactor: 0 });
        sr.reveal('.slide_content', { origin: 'left' });
        sr.reveal('.home_collage .flex-control-nav', { origin: 'left' });
        sr.reveal('.scroll-arrow', { origin: 'top' });
    }
});


