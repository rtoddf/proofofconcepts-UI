$(document).ready(function(){
    var swiper = new Swiper('.swiper-container', {
        // pagination option
        pagination: '.swiper-pagination',
        // number of slides option
        // slidesPerView: 1,
        // slidesPerView: 'auto',
        // space in between option
        // spaceBetween: 30,
        // pagination clickable option
        paginationClickable: true,
        // free mode option
        // freeMode: true,
        // effects option
        // effect: 'fade',
        autoplay: 3000,
        autoplayDisableOnInteraction: true,
        speed: 1100,
        effect: 'cube',
        grabCursor: true,
        cube: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
        },
        // infinite loop option
        loop: true,
        // autoplay options
        // autoplayDisableOnInteraction: false,
        // mousewheel - make sure you use slides pr view with this
        // otherwise its janky
        // mousewheelControl: true
    });
});