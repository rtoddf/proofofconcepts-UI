$(document).ready(function(){
    var swiper = new Swiper('.swiper-container', {
        // pagination option
        pagination: '.swiper-pagination',
        // number of slides option
        // slidesPerView: 1,
        slidesPerView: 'auto',
        // space in between option
        spaceBetween: 15,
        // pagination clickable option
        paginationClickable: true,
        // free mode option
        freeMode: true,
        // infinite loop option
        // loop: true,
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