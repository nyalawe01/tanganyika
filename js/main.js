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

    // WhatsApp Live Order Pricing & Calculation Logic
    var PRICE_PER_LITRE = 2000;

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function calculateOrderTotal() {
        var litres = parseInt($('#orderLitres').val(), 10);
        if (isNaN(litres) || litres < 1) {
            litres = 1;
        }
        var total = litres * PRICE_PER_LITRE;
        $('#livePriceDisplay').text(formatNumber(total) + ' TSh');
        $('#liveLitresSummary').text(litres + ' ' + (litres === 1 ? 'Litre' : 'Litres'));
        return { litres: litres, total: total };
    }

    // Quick select buttons for litres
    $(document).on('click', '.btn-quick-litres', function () {
        var qty = $(this).data('litres');
        $('.btn-quick-litres').removeClass('btn-secondary').addClass('btn-outline-light');
        $(this).removeClass('btn-outline-light').addClass('btn-secondary');
        $('#orderLitres').val(qty);
        calculateOrderTotal();
    });

    $('#orderLitres').on('input change', function () {
        var val = $(this).val();
        $('.btn-quick-litres').removeClass('btn-secondary').addClass('btn-outline-light');
        $('.btn-quick-litres[data-litres="' + val + '"]').removeClass('btn-outline-light').addClass('btn-secondary');
        calculateOrderTotal();
    });

    // Direct WhatsApp Order submission from form
    $('#whatsappOrderForm').on('submit', function (e) {
        e.preventDefault();

        var name = $('#customerName').val().trim();
        var phone = $('#customerPhone').val().trim();
        var location = $('#customerLocation').val();
        var specificAddress = $('#customerAddress').val().trim();
        var orderFor = $('#orderFor').val();
        var notes = $('#orderNotes').val().trim();
        
        var calc = calculateOrderTotal();

        if (!name) {
            alert('Please enter your name.');
            $('#customerName').focus();
            return;
        }

        var message = "🐄 *NEW MILK ORDER - Tanganyika Herds & Homestead*\n";
        message += "━━━━━━━━━━━━━━━━━━━━\n";
        message += "👤 *Customer Name:* " + name + "\n";
        if (phone) {
            message += "📞 *Contact Phone:* " + phone + "\n";
        }
        message += "🥛 *Organic Milk Quantity:* " + calc.litres + " Litre" + (calc.litres > 1 ? "s" : "") + "\n";
        message += "💰 *Total Estimated Price:* " + formatNumber(calc.total) + " TSh\n";
        message += "📍 *Delivery / Farm Region:* " + location + "\n";
        if (specificAddress) {
            message += "🏠 *Specific Address/Area:* " + specificAddress + "\n";
        }
        message += "🎯 *Order Purpose:* " + orderFor + "\n";
        if (notes) {
            message += "📝 *Special Notes:* " + notes + "\n";
        }
        message += "━━━━━━━━━━━━━━━━━━━━\n";
        message += "🌿 *Fresh from Kigamboni · Bagamoyo · Nzega Farms*";

        var encodedMsg = encodeURIComponent(message);
        var whatsappUrl = "https://wa.me/255710999469?text=" + encodedMsg;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Show feedback message in form
        $('#orderSuccessAlert').removeClass('d-none').hide().fadeIn();
    });

    // Preset selection when clicking quick order on product cards
    $(document).on('click', '.btn-select-package', function (e) {
        e.preventDefault();
        var qty = $(this).data('litres');
        if (qty) {
            $('#orderLitres').val(qty);
            $('.btn-quick-litres').removeClass('btn-secondary').addClass('btn-outline-light');
            $('.btn-quick-litres[data-litres="' + qty + '"]').removeClass('btn-outline-light').addClass('btn-secondary');
            calculateOrderTotal();
        }
        
        var target = $('#contact');
        var navHeight = $('.navbar').outerHeight() || 80;
        $('html, body').stop().animate({
            scrollTop: target.offset().top - navHeight + 5
        }, 800);
    });

    // Initial calculation on page load
    calculateOrderTotal();

})(jQuery);


