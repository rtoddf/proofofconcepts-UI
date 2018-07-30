var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    autoplay: 3000,
    speed: 1300,
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true
});

galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;