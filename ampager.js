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
        let animTime = 1000;
        let scrolling = false;
        var sectionPrefix = ".scroll-section-"

        function pagination() {
            scrolling = true;

            $(sectionPrefix + curSection).removeClass(".inactive").addClass('active')
            $(sectionPrefix + (curSection - 1)).addClass("inactive");
            $(sectionPrefix + (curSection + 1)).removeClass("active");

            setTimeout(function() {
                scrolling = false;
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
