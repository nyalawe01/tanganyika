(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.sticky-top').addClass('shadow-sm bg-white').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '0px');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Smooth scrolling for single-page nav links
    $('a.nav-link[href^="#"], a.scroll-to[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            var navHeight = $('.navbar').outerHeight() || 80;
            $('html, body').stop().animate({
                scrollTop: target.offset().top - navHeight + 5
            }, 800);

            // Close mobile menu if open
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    });

    // Active link highlighting on scroll (ScrollSpy)
    $(window).on('scroll', function () {
        var scrollPos = $(document).scrollTop() + 120;
        $('section[id], div[id]').each(function () {
            var currSection = $(this);
            var sectionId = currSection.attr('id');
            if (sectionId && (sectionId === 'home' || sectionId === 'about' || sectionId === 'products' || sectionId === 'contact')) {
                var top = currSection.offset().top;
                var bottom = top + currSection.outerHeight();
                if (scrollPos >= top && scrollPos <= bottom) {
                    $('.navbar-nav a.nav-link').removeClass('active');
                    $('.navbar-nav a.nav-link[href="#' + sectionId + '"]').addClass('active');
                }
            }
        });
    });

    // Minimalist WhatsApp Form Submission
    $('#whatsappOrderForm').on('submit', function (e) {
        e.preventDefault();

        var name = $('#customerName').val().trim();
        var phone = $('#customerPhone').val().trim();
        var litres = $('#orderLitres').val();
        var location = $('#customerLocation').val().trim();
        var notes = $('#orderNotes').val().trim();

        if (!name) {
            alert('Please enter your name.');
            $('#customerName').focus();
            return;
        }

        var message = "🐄 *NEW INQUIRY / ORDER - Tanganyika Herds & Homestead*\n";
        message += "━━━━━━━━━━━━━━━━━━━━\n";
        message += "👤 *Name:* " + name + "\n";
        if (phone) {
            message += "📞 *Phone:* " + phone + "\n";
        }
        if (litres) {
            var qtyText = (litres === "1" || litres === "5" || litres === "10" || litres === "20") ? (litres + " Litre" + (litres === "1" ? "" : "s")) : litres;
            message += "🥛 *Milk Quantity:* " + qtyText + "\n";
        }
        if (location) {
            message += "📍 *Location:* " + location + "\n";
        }
        if (notes) {
            message += "📝 *Message / Notes:* " + notes + "\n";
        }
        message += "━━━━━━━━━━━━━━━━━━━━\n";
        message += "🌿 *Tanganyika Herds & Homestead (Kigamboni · Bagamoyo · Nzega)*";

        var encodedMsg = encodeURIComponent(message);
        var whatsappUrl = "https://wa.me/255710999469?text=" + encodedMsg;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Show feedback alert
        $('#orderSuccessAlert').removeClass('d-none').hide().fadeIn();
    });

    // Preset selection when clicking package button on product cards
    $(document).on('click', '.btn-select-package', function (e) {
        e.preventDefault();
        var qty = $(this).data('litres');
        if (qty) {
            $('#orderLitres').val(qty);
        }
        
        var target = $('#contact');
        var navHeight = $('.navbar').outerHeight() || 80;
        $('html, body').stop().animate({
            scrollTop: target.offset().top - navHeight + 5
        }, 800);
    });

})(jQuery);


