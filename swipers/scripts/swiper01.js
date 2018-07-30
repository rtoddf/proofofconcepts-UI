$(document).ready(function(){
    var swiper = new Swiper('.swiper-container', {
        // pagination option
        pagination: '.swiper-pagination',
        // number of slides option
        // slidesPerView: 1,
        slidesPerView: 1,
        // space in between option
        // spaceBetween: 30,
        // pagination clickable option
        paginationClickable: true,
        // infinite loop option
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: true,
        speed: 1100,
        effect: 'fade',
        // free mode option
        // freeMode: true,
        // effects option
        // effect: 'fade',
        // autoplay options,
        // autoplay: 5000,
        // autoplayDisableOnInteraction: false,
        // mousewheel - make sure you use slides pr view with this
        // otherwise its janky
        // mousewheelControl: true
    });
});
