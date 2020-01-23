(function($) {

    $(document).ready(function() {
        // Static Animation
        var lFollowX = 0,
            lFollowY = 0,
            x = 0,
            y = 0,
            friction = 1 / 30;


        let curSection = 1;
        let numOfSection = $(".typo-section .scroll-section").length;
        let animTime = 700;
        let scrolling = false;
        var sectionPrefix = ".scroll-section-"
        var scrollSec = $(".typo-section .scroll-section");
      	
      	scrollSec.css({
            transition : 'all '+animTime+'ms ease-in-out'
        });

        function pagination() {
            scrolling = true;

            $(sectionPrefix + curSection).removeClass(".inactive").addClass('active')
            $(sectionPrefix + (curSection - 1)).addClass("inactive");
            $(sectionPrefix + (curSection + 1)).removeClass("active");

            setTimeout(function() {
                scrolling = false;
             
              if(curSection == numOfSection){
                $(document).trigger('ampager_end');
                $(document).trigger('ampager_last');
                
                console.log('ampager_end');
                console.log('ampager_last');
              }
              if(curSection == 1){
                $(document).trigger('ampager_start');
                $(document).trigger('ampager_first');
                
                console.log('ampager_start');
                console.log('ampager_first');
              }
              
              $(document).trigger('ampager_slide_'+curSection);              
               console.log('ampager_slide_'+curSection);
            }, animTime);
        }

        function navigateUp() {
            if(curSection == 1) {
                return;
            }
            curSection--;
            pagination();
            $(".static-section").addClass("scrolling");
            setTimeout(() => {
                $(".static-section").removeClass("scrolling");
            }, 500)
        };

        function navigateDown() {
            if(curSection === numOfSection) {
                return;
            }
            curSection++;
            pagination();

            $(".static-section").addClass("scrolling");
            setTimeout(() => {
                $(".static-section").removeClass("scrolling");
            }, 500)
        };

        $(".typo-section").on("mousewheel DOMMouseScroll", function(e) {
            var sp = $(window).scrollTop();
            if(scrolling) return false;
            if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                if(sp == 0 && curSection <= numOfSection) {
                    navigateUp();

                    return false;
                } else {
                    return true;
                }
            } else {
                if(sp == 0 && curSection < numOfSection) {
                    navigateDown();
                    return false;
                } else {
                    return true;
                }
            }
        });
    });

}(jQuery));
