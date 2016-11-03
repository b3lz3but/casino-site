// MAIN.JS
/*-------------------------------------------------------------------------------------------------------------------------------*/
//This is main JS file that contains custom JS scipts and initialization used in this template */

/*global $:false */
/*global window: false */


var $ = jQuery.noConflict();

var MAJESTY = MAJESTY || {};

(function($){

    // USE STRICT
    "use strict";

    MAJESTY.initialize = {

        init: function(){

            MAJESTY.initialize.responsiveClasses();
            MAJESTY.initialize.dataResponsiveHeights();

        },

        responsiveClasses: function(){
            var jRes = jRespond([
                {
                    label: 'smallest',
                    enter: 0,
                    exit: 479
                },{
                    label: 'handheld',
                    enter: 480,
                    exit: 767
                },{
                    label: 'tablet',
                    enter: 768,
                    exit: 991
                },{
                    label: 'laptop',
                    enter: 992,
                    exit: 1199
                },{
                    label: 'desktop',
                    enter: 1200,
                    exit: 10000
                }
            ]);
            jRes.addFunc([
                {
                    breakpoint: 'desktop',
                    enter: function() { $body.addClass('device-lg'); },
                    exit: function() { $body.removeClass('device-lg'); }
                },{
                    breakpoint: 'laptop',
                    enter: function() { $body.addClass('device-md'); },
                    exit: function() { $body.removeClass('device-md'); }
                },{
                    breakpoint: 'tablet',
                    enter: function() { $body.addClass('device-sm'); },
                    exit: function() { $body.removeClass('device-sm'); }
                },{
                    breakpoint: 'handheld',
                    enter: function() { $body.addClass('device-xs'); },
                    exit: function() { $body.removeClass('device-xs'); }
                },{
                    breakpoint: 'smallest',
                    enter: function() { $body.addClass('device-xxs'); },
                    exit: function() { $body.removeClass('device-xxs'); }
                }
            ]);
        },


        dataResponsiveHeights: function(){
            var $dataHeightXxs = $('[data-height-xxs]'),
                $dataHeightXs = $('[data-height-xs]'),
                $dataHeightSm = $('[data-height-sm]'),
                $dataHeightMd = $('[data-height-md]'),
                $dataHeightLg = $('[data-height-lg]');

            if( $dataHeightXxs.length > 0 ) {
                $dataHeightXxs.each( function(){
                    var element = $(this),
                        elementHeight = element.attr('data-height-xxs');

                    if( $body.hasClass('device-xxs') ) {
                        if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
                    }
                });
            }

            if( $dataHeightXs.length > 0 ) {
                $dataHeightXs.each( function(){
                    var element = $(this),
                        elementHeight = element.attr('data-height-xs');

                    if( $body.hasClass('device-xs') ) {
                        if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
                    }
                });
            }

            if( $dataHeightSm.length > 0 ) {
                $dataHeightSm.each( function(){
                    var element = $(this),
                        elementHeight = element.attr('data-height-sm');

                    if( $body.hasClass('device-sm') ) {
                        if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
                    }
                });
            }

            if( $dataHeightMd.length > 0 ) {
                $dataHeightMd.each( function(){
                    var element = $(this),
                        elementHeight = element.attr('data-height-md');

                    if( $body.hasClass('device-md') ) {
                        if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
                    }
                });
            }

            if( $dataHeightLg.length > 0 ) {
                $dataHeightLg.each( function(){
                    var element = $(this),
                        elementHeight = element.attr('data-height-lg');

                    if( $body.hasClass('device-lg') ) {
                        if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
                    }
                });
            }
        }


    };

    MAJESTY.header = {

        init: function(){

            MAJESTY.header.superfish();
            MAJESTY.header.menufunctions();
            MAJESTY.header.fullWidthMenu();
            MAJESTY.header.overlayMenu();
            MAJESTY.header.topcart();
            MAJESTY.header.splitmenu();
            MAJESTY.header.removeStickyness();
            

        },

        superfish: function(){

            if ( $().superfish ) {
                if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
                    $('#main-menu ul ul, #main-menu ul .mega-menu-content').css('display', 'block');
                    MAJESTY.header.menuInvert();
                }

                $('body:not(.side-header) #main-menu > ul, body:not(.side-header) #main-menu > div > ul,.top-links > ul').superfish({
                    popUpSelector: 'ul,.mega-menu-content,.top-link-section',
                    delay: 250,
                    speed: 350,
                    animation: {opacity:'show'},
                    animationOut:  {opacity:'hide'},
                    cssArrows: false
                });

                $('body.side-header #main-menu > ul').superfish({
                    popUpSelector: 'ul',
                    delay: 250,
                    speed: 350,
                    animation: {opacity:'show',height:'show'},
                    animationOut:  {opacity:'hide',height:'hide'},
                    cssArrows: false
                });
            }

        },

        menuInvert: function() {

            $('#main-menu .mega-menu-content, #main-menu ul ul, .menu-center ul ul').each( function( index, element ){
                var $menuChildElement = $(element);
                var windowWidth = $window.width();
                var menuChildOffset = $menuChildElement.offset();
                var menuChildWidth = $menuChildElement.width();
                var menuChildLeft = menuChildOffset.left;

                if(windowWidth - (menuChildWidth + menuChildLeft) < 0) {
                    $menuChildElement.addClass('menu-pos-invert');
                }
            });

        },

        menufunctions: function(){

            $( '#main-menu ul li:has(ul)' ).addClass('sub-menu');
            $( '.top-links ul li:has(ul) > a' ).append( ' <i class="icon-angle-down"></i>' );
            $( '.top-links > ul' ).addClass( 'clearfix' );

            if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
                $('#main-menu.sub-title > ul > li,#main-menu.sub-title > div > ul > li').hover(function() {
                    $(this).prev().css({ backgroundImage : 'none' });
                }, function() {
                    $(this).prev().css({ backgroundImage : 'url("images/icons/menu-divider.png")' });
                });

                $('#main-menu.sub-title').children('ul').children('.current').prev().css({ backgroundImage : 'none' });
                $('#main-menu.sub-title').children('div').children('ul').children('.current').prev().css({ backgroundImage : 'none' });
            }

            if( MAJESTY.isMobile.Android() ) {
                $( '#main-menu ul li.sub-menu' ).children('a').on('touchstart', function(e){
                    if( !$(this).parent('li.sub-menu').hasClass('sfHover') ) {
                        e.preventDefault();
                    }
                });
            }

            if( MAJESTY.isMobile.Windows() ) {
                $('#main-menu > ul, #main-menu > div > ul,.top-links > ul').superfish('destroy').addClass('windows-mobile-menu');

                $( '#main-menu ul li:has(ul)' ).append('<a href="#" class="wn-submenu-trigger"><i class="icon-angle-down"></i></a>');

                $( '#main-menu ul li.sub-menu' ).children('a.wn-submenu-trigger').click( function(e){
                    $(this).parent().toggleClass('open');
                    $(this).parent().find('> ul, > .mega-menu-content').stop(true,true).toggle();
                    return false;
                });
            }

        },

        fullWidthMenu: function(){
            if( $body.hasClass('stretched') ) {
                if( $header.find('.container-fullwidth').length > 0 ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 120 }); }
                if( $header.hasClass('full-header') ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 60 }); }
            } else {
                if( $header.find('.container-fullwidth').length > 0 ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 120 }); }
                if( $header.hasClass('full-header') ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 80 }); }
            }
        },

        overlayMenu: function(){
            if( $body.hasClass('overlay-menu') ) {
                var overlayMenuItem = $('#main-menu').children('ul').children('li'),
                    overlayMenuItemHeight = overlayMenuItem.outerHeight(),
                    overlayMenuItemTHeight = overlayMenuItem.length * overlayMenuItemHeight,
                    firstItemOffset = ( $window.height() - overlayMenuItemTHeight ) / 2;

                $('#main-menu').children('ul').children('li:first-child').css({ 'margin-top': firstItemOffset+'px' });
            }
        },

        removeStickyness: function(){

            if( $body.hasClass('device-md') || $body.hasClass('device-lg')) {
               // sticky header
                  $("#header").sticky({ topSpacing: 0,
                        responsiveWidth: true,
                        getWidthFrom:"body",
                         wrapperClassName: 'sticky-header'
                     });
            }
            if ( $body.hasClass('device-xs') || $body.hasClass('device-xxs') || $body.hasClass('device-sm') ) {
                $("#header").unstick();
                $(".sticky-onepage").sticky({ topSpacing: 0,
                        responsiveWidth: true,
                        getWidthFrom:"body",
                         wrapperClassName: 'sticky-header'
                     });
            }
           
        },

        topcart: function(){
            $("#shop_cart-trigger").click(function(e){
                $pagemenu.toggleClass('pagemenu-active', false);
                $topCart.toggleClass('shop_cart-open');
                e.stopPropagation();
                e.preventDefault();
            });
        },

        splitmenu: function(){
            if( ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) && $header.hasClass('split-menu') ) {
                var element = $('#logo'),
                    logoWidth = defaultLogo.find('img').outerWidth(),
                    logoPosition = logoWidth/2,
                    menuPadding = logoPosition + 30;

                element.css({ 'margin-left': -logoPosition+'px' });

                $('#main-menu').find('.menu-left').css({ 'padding-right': menuPadding+'px' });
                $('#main-menu').find('.menu-right').css({ 'padding-left': menuPadding+'px' });
            }

        }

    };

    MAJESTY.widget = {

        init: function(){

            MAJESTY.widget.animations();
            MAJESTY.widget.SwiperVertical();
            MAJESTY.widget.Swiper();
            MAJESTY.widget.scrollDown();
            MAJESTY.widget.extras();
            MAJESTY.widget.forResizeAndLoad();
            MAJESTY.widget.html5Video();
            MAJESTY.widget.vimeoBgVideo();
            MAJESTY.widget.youtubeBgVideo();
            MAJESTY.widget.carouselImage();

        },

    scrollDown:function(){
            $.scrollIt({
              upKey: 38,             // key code to navigate to the next section
              downKey: 40,           // key code to navigate to the previous section
              easing: 'linear',      // the easing function for animation
              scrollTime: 600,       // how long (in ms) the animation takes
              activeClass: 'current', // class given to the active nav element
              onPageChange: null,    // function(pageIndex) that is called when page is changed
              topOffset: 0           // offste (in px) for fixed top navigation
            });
    },

    SwiperVertical:function(){
        var swiper = new Swiper('.vertical-slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        grabCursor: true,
        slidesPerView: 1,
        direction: 'vertical',
        autoplay:5000,
        loop: true
        });      
    },
    Swiper:function(){
            var swiperSlider = new Swiper('.swiper-parent',{
             paginationClickable: false,
             slidesPerView: 1,
              loop: true,
              autoplay:5000,
             effect:'slide',
             grabCursor: true,
                             
                                });

                                $('#slider-arrow-left').on('click', function(e){
                                    e.preventDefault();
                                    swiperSlider.slidePrev();
                                });

                                $('#slider-arrow-right').on('click', function(e){
                                    e.preventDefault();
                                    swiperSlider.slideNext();
                                });

              
    },
       parallax: function(){
               if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
                        skrollr.init({
                            forceHeight: false
                        });
                    }
                    else {
                $parallaxEl.addClass('mobile-parallax');
               
            }
        },
        animations: function(){   
            if( MAJESTY.isMobile.any() ) {
        $('.animated').addClass('visible');
    }
    else{
        $('.animated').appear(function() {
            var elem = $(this);
            var animation = elem.data('animation');
            if ( !elem.hasClass('visible') ) {
                var animationDelay = elem.data('animation-delay');
                if ( animationDelay ) {
                    setTimeout(function(){
                        elem.addClass( animation + " visible" );
                    }, animationDelay);
                } else {
                    elem.addClass( animation + " visible" );
                }
            }
        });
    }

        },

        html5Video: function(){
            var videoEl = $('.video-wrap:has(video)');
            if( videoEl.length > 0 ) {
                videoEl.each(function(){
                    var element = $(this),
                        elementVideo = element.find('video'),
                        outerContainerWidth = element.outerWidth(),
                        outerContainerHeight = element.outerHeight(),
                        innerVideoWidth = elementVideo.outerWidth(),
                        innerVideoHeight = elementVideo.outerHeight();

                    if( innerVideoHeight < outerContainerHeight ) {
                        var videoAspectRatio = innerVideoWidth/innerVideoHeight,
                            newVideoWidth = outerContainerHeight * videoAspectRatio,
                            innerVideoPosition = (newVideoWidth - outerContainerWidth) / 2;
                        elementVideo.css({ 'width': newVideoWidth+'px', 'height': outerContainerHeight+'px', 'left': -innerVideoPosition+'px' });
                    } else {
                        var innerVideoPosition = (innerVideoHeight - outerContainerHeight) / 2;
                        elementVideo.css({ 'width': innerVideoWidth+'px', 'height': innerVideoHeight+'px', 'top': -innerVideoPosition+'px' });
                    }

                    if( MAJESTY.isMobile.any() ) {
                        var placeholderImg = elementVideo.attr('poster');

                        if( placeholderImg != '' ) {
                            element.append('<div class="video-placeholder" style="background-image: url('+ placeholderImg +');"></div>')
                        }
                    }
                });
            }
        },

        vimeoBgVideo:function(){
             if( !MAJESTY.isMobile.any() ){
               $("#vimeo").okvideo({ source: '23851992',
                    volume: 0,
                    loop: true,
                    hd:true,
                    adproof: true,
                    annotations: false
                 });
                   
              } else{
                $('#vimeo').addClass('poster-img');
              }
        },
        carouselImage:function(){
                 var singImg = $("#single-img");
                  var thumbImg = $("#thumb-img");
                 
                  singImg.owlCarousel({
                    singleItem : true,
                    slideSpeed : 1000,
                    navigation: false,
                    pagination:false,
                    afterAction : syncPosition,
                    responsiveRefreshRate : 200,
                  });
                 
                  thumbImg.owlCarousel({
                    items : 4,
                    itemsDesktop      : [1199,4],
                    itemsDesktopSmall     : [979,4],
                    itemsTablet       : [768,3],
                    itemsMobile       : [479,2],
                    pagination:false,
                    responsiveRefreshRate : 100,
                    afterInit : function(el){
                      el.find(".owl-item").eq(0).addClass("current");
                    }
                  });
                 
                  function syncPosition(el){
                    var current = this.currentItem;
                    $("#thumb-img")
                      .find(".owl-item")
                      .removeClass("current")
                      .eq(current)
                      .addClass("current")
                    if($("#thumb-img").data("owlCarousel") !== undefined){
                      center(current)
                    }
                  }
                 
                  $("#thumb-img").on("click", ".owl-item", function(e){
                    e.preventDefault();
                    var number = $(this).data("owlItem");
                    singImg.trigger("owl.goTo",number);
                  });
                 
                  function center(number){
                    var thumbImgvisible = thumbImg.data("owlCarousel").owl.visibleItems;
                    var num = number;
                    var found = false;
                    for(var i in thumbImgvisible){
                      if(num === thumbImgvisible[i]){
                        var found = true;
                      }
                    }
                 
                    if(found===false){
                      if(num>thumbImgvisible[thumbImgvisible.length-1]){
                        thumbImg.trigger("owl.goTo", num - thumbImgvisible.length+2)
                      }else{
                        if(num - 1 === -1){
                          num = 0;
                        }
                        thumbImg.trigger("owl.goTo", num);
                      }
                    } else if(num === thumbImgvisible[thumbImgvisible.length-1]){
                      thumbImg.trigger("owl.goTo", thumbImgvisible[1])
                    } else if(num === thumbImgvisible[0]){
                      thumbImg.trigger("owl.goTo", num-1)
                    }
                    
                  }
                 
        },

        youtubeBgVideo: function(){

            if( $youTubeBg.length > 0 ){
                $youTubeBg.each( function(){
                    var element = $(this),
                        ytbgVideo = element.attr('data-video'),
                        ytbgMute = element.attr('data-mute'),
                        ytbgRatio = element.attr('data-ratio'),
                        ytbgQuality = element.attr('data-quality'),
                        ytbgOpacity = element.attr('data-opacity'),
                        ytbgContainer = element.attr('data-container'),
                        ytbgOptimize = element.attr('data-optimize'),
                        ytbgLoop = element.attr('data-loop'),
                        ytbgVolume = element.attr('data-volume'),
                        ytbgStart = element.attr('data-start'),
                        ytbgStop = element.attr('data-stop'),
                        ytbgAutoPlay = element.attr('data-autoplay'),
                        ytbgFullScreen = element.attr('data-fullscreen');

                    if( ytbgMute == 'false' ) { ytbgMute = false; } else { ytbgMute = true; }
                    if( !ytbgRatio ) { ytbgRatio = '16/9'; }
                    if( !ytbgQuality ) { ytbgQuality = 'hd720'; }
                    if( !ytbgOpacity ) { ytbgOpacity = 1; }
                    if( !ytbgContainer ) { ytbgContainer = 'self'; }
                    if( ytbgOptimize == 'false' ) { ytbgOptimize = false; } else { ytbgOptimize = true; }
                    if( ytbgLoop == 'false' ) { ytbgLoop = false; } else { ytbgLoop = true; }
                    if( !ytbgVolume ) { ytbgVolume = 1; }
                    if( !ytbgStart ) { ytbgStart = 0; }
                    if( !ytbgStop ) { ytbgStop = 0; }
                    if( ytbgAutoPlay == 'false' ) { ytbgAutoPlay = false; } else { ytbgAutoPlay = true; }
                    if( ytbgFullScreen == 'true' ) { ytbgFullScreen = true; } else { ytbgFullScreen = false; }

                    if( MAJESTY.isMobile.any() ){
                            $(youTubeBg).addClass('video-mobile');
                   
                        }  

                    element.mb_YTPlayer({
                        videoURL: ytbgVideo,
                        mute: ytbgMute,
                        ratio: ytbgRatio,
                        quality: ytbgQuality,
                        opacity: ytbgOpacity,
                        containment: ytbgContainer,
                        optimizeDisplay: ytbgOptimize,
                        loop: ytbgLoop,
                        vol: ytbgVolume,
                        startAt: ytbgStart,
                        stopAt: ytbgStop,
                        autoplay: ytbgAutoPlay,
                        realfullscreen: ytbgFullScreen,
                        showYTLogo: false,
                        showControls: false
                    });

                });
            }
        },

        extras: function(){
            $('[data-toggle="tooltip"]').tooltip();
            $('#main-menu-trigger,#overlay-menu-close').click(function() {
                $( '#main-menu > ul, #main-menu > div > ul' ).toggleClass("show");
                return false;
            });
            $('#page-submenu-trigger').click(function() {
                $body.toggleClass('top-search-open', false);
                $pagemenu.toggleClass("pagemenu-active");
                return false;
            });
            $pagemenu.find('nav').click(function(e){
                $body.toggleClass('top-search-open', false);
                $topCart.toggleClass('shop_cart-open', false);
            });
            if( MAJESTY.isMobile.any() ){
                $body.addClass('device-touch');
                   
            }
           
        },

            // for resize and load function 
     forResizeAndLoad: function (){
            
       // Decect Viewport Screen
         var vH = $(window).height();
        $('#home-header, .fullheight, #slider, .slider-parallax').css('height',vH);
        // Centering Text for Home Header
        var parent_height = $('.slider-content').parent().height();
        var image_height = $('.slider-content').height();

        var top_margin = (parent_height - image_height)/2; 
        $('.slider-content').css( 'padding-top' , top_margin);       
    }

    };

    MAJESTY.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (MAJESTY.isMobile.Android() || MAJESTY.isMobile.BlackBerry() || MAJESTY.isMobile.iOS() || MAJESTY.isMobile.Opera() || MAJESTY.isMobile.Windows());
        }
    };

    MAJESTY.documentOnResize = {
        init: function(){
            var t = setTimeout( function(){
                MAJESTY.header.fullWidthMenu();
                MAJESTY.header.overlayMenu();
                MAJESTY.initialize.dataResponsiveHeights();
                MAJESTY.widget.forResizeAndLoad();
                MAJESTY.widget.parallax();
            }, 0 );

        }

    };

    MAJESTY.documentOnReady = {
        init: function(){
            MAJESTY.initialize.init();
            MAJESTY.header.init();
            MAJESTY.widget.init();
            MAJESTY.header.removeStickyness();
            MAJESTY.widget.forResizeAndLoad();
        },

    };
    MAJESTY.documentOnLoad = {
        init: function(){
          MAJESTY.widget.parallax();            
        }

    };


    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $headerWrap = $('#header-wrap'),
        oldHeaderClasses = $header.attr('class'),
        oldHeaderWrapClasses = $headerWrap.attr('class'),
        stickyMenuClasses = $header.attr('data-sticky-class'),
        defaultLogo = $('#logo').find('.standard-logo'),
        $topCart = $('#shop_cart'),
        $pagemenu = $('#page-menu'),
        $parallaxEl = $('.bcg'),
        $youTubeBg = $('.yt-bg-player');

    $(document).ready(MAJESTY.documentOnReady.init);
    $window.load( MAJESTY.documentOnLoad.init );
    $window.on( 'resize', MAJESTY.documentOnResize.init );


})(jQuery);





  /* Text transform */
    $("#text-transform").owlCarousel({
            autoPlay: 4000,
            navigation: false,
            slideSpeed: 700,
            pagination: false,
            singleItem: true
        });
   

   $(document).ready(function(){
         $(".bg").interactive_bg();
        });
        
        $(window).resize(function() {
          $(".wrapper-bg > .ibg-bg").css({
            width: $(window).outerWidth(),
            height: $(window).outerHeight()
          })
        });
        



    // Fade slider   
$("#slider-fade, #slider-fullwidth").skippr({
            transition: 'fade',
            speed: 4,
            easing: 'easeOutQuart',
            navType: false,
            arrows: false,
            autoPlay: true,
            autoPlayDuration: 4000,
            hidePrevious: true

});

/* vertical slider for one page vertical */
$("#vertical-slider, #skipper-slider").skippr({
             speed: 300,
            easing: 'easeOutQuart',
            autoPlay: true,
            autoPlayDuration: 5000,
});

     $('#fade, .text-rotator').list_ticker({
        speed:4000,
        effect:'fade'

    });    
