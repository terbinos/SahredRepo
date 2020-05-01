
$(window).load(function () {
    /***************************************************
    start sticky header script.  
    If site does not have sticky header, remove this script
    *****************************************/

    if ($('.mainnav').length > 0 && $('.config_widget_template').length < 1) {

        var stickyNavTop = $('.mainnav').offset().top;

        var stickyNav = function () {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > stickyNavTop) {
                $('.front_end_body').addClass('sticky_header');

            } else {
                $('.front_end_body').removeClass('sticky_header');
            }
        };

        stickyNav();
        $(window).scroll(function () {
            stickyNav();
        });
        //to make sure the megamenus don't expand below the bottom of the screen - especially important with a sticky menu.
        var stickyNavSizing = function () {
            if ($('.mainnav').length > 0) {
                var menuoffset = $('.mainnav').offset();
                var menuVPoffset = menuoffset.top - $(document).scrollTop();
                var windowHeight = $(window).height();

                //available vertical space for megamenus
                var menuspace = windowHeight - menuVPoffset - ($('#dropdownrootitem2').height());
                //make it so we can get the height of menus without showing them.
                $('.megamenu_container').css('display', 'block').css('visibility', 'hidden');

                $('.megamenu_container').each(function () {
                    //reset max height so we can get actual height
                    $(this).css('max-height', '');

                    if ($(this).height() > menuspace) {
                        $(this).css('max-height', menuspace + 'px');
                    }
                    //rehide menus when done
                    $('.megamenu_container').css('display', 'none').css('visibility', '');
                });
            }
        }
        //dont need for mobile
        if ($(window).width() > 751) {

            stickyNavSizing();
        }

        //resize the max-height when the window is resized
        var resizeTimer;

        $(window).on('resize', function (e) {

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {

                // Run code here, resizing has "stopped"
                if ($(window).width() > 768) {
                    stickyNavSizing();
                } else {
                    //mobile, clear max-height
                    $('.megamenu_container').css('max-height', '');
                }
            }, 250);

        });
        $(window).on('scroll', function (e) {

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {

                // Run code here, scrolling has "stopped"
                if ($(window).width() > 768) {
                    stickyNavSizing();
                } else {
                    //mobile, clear max-height
                    $('.megamenu_container').css('max-height', '');
                }
            }, 250);

        });
    }
    //to fix faq anchors if there is a sticky header, so they do not end up behind the sticky header.  Update value below with height of sticky header.
    $('.listfaq a').click(function (e) {
        var stickyHeaderHeight = 51;
        e.preventDefault();
        var anchorhref = $(this).attr('href');
        anchorhref = anchorhref.substring(1);
        //alert(anchorhref);
        var offset = $('a[name=' + anchorhref + ']').offset();
        var scrollto = offset.top - stickyHeaderHeight;
        $('html, body').animate({ scrollTop: scrollto }, 400);

    });


    /***************************************************
    End sticky header script  
    If site does not have sticky header, remove script above
    *****************************************/




    /**********************************************
    start search overlay script.  If site does not have popup / overlay for search, remove script below.
    ******************************************/
    /* if ($(window).width() < 751) {
         $(".top_search").show();
 
     }
     $(".search-trigger").click(function () {
         $(".top_search").fadeIn();
         $(".mainSpan").addClass('search_open').append('<div class="search_overlay" style="display:none"></div>');
         $(".search_overlay").fadeIn();
         $("input#search_text").focus();
     })
     $(".close_search").click(function () {
         $(".top_search").hide();
         $(".search_overlay").hide().remove();
         $(".mainSpan").removeClass('search_open');
     });
     $(window).resize(function () {
         if ($(window).width() < 751) {
             $(".top_search").show();
             $(".search_overlay").hide();
             $(".mainSpan").removeClass("search_open");
         } else if ($('.search_open').length < 1) {
             $(".top_search").hide();
         }
     })*/
    /***************************************************
    end search overlay script. If site does not have popup / overlay for search, remove script above.
    ********************************************************/


    /*******************************************************
    start search script.  Used for expanding or overlaying the search
    ********************************************************/

    $('.search-trigger').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $("#searchbox").addClass('active_search');
            $(".mainSpan").addClass("search_open");
            $('#search_text').focus();
        } else {
            $(this).removeClass('active');
            $("#searchbox").removeClass('active_search');
            $(".mainSpan").removeClass("search_open");
        }
    });
    var exclude_div = $("#searchbox, #searchbox input, #searchbox a");
    $(document).click(function (e) {
        if (!(exclude_div.is(e.target)) && !($(e.target).hasClass('search-trigger'))) {
            $('.search-trigger').removeClass('active');
            $('#searchbox').removeClass('active_search');
            $(".mainSpan").removeClass("search_open");
        }
    });

    /*******************************************************
   end search script.
   ********************************************************/

    //adjust search if important notice is closed so tab does not overlap search
    var alertClass = $('#alert_controls').attr("class");
    if (alertClass == "show") { $("#top_nav").addClass("right_adjust"); $(".alert_container").addClass("alert--closed"); }
    //readjust search on open/close of important notice
    $('#alert_controls').click(function () {
        var alertClass = $('#alert_controls').attr("class");
        if (alertClass == "hide") {
            $("#top_nav").removeClass("right_adjust");
            $(".alert_container").removeClass("alert--closed");
        }
        else {
            $("#top_nav").addClass("right_adjust");
            $(".alert_container").addClass("alert--closed");
        }
    });
});