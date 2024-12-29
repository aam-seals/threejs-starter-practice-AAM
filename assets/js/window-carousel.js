let currentSlide = { carousel1: 0, carousel2: 0 };
let currentSlide = { carousel1: 0, carousel2: 0 };

function slideNext(carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelector('.carousel-slides');
    const totalSlides = slides.children.length;

    // Update the current slide index for this carousel
    currentSlide[carouselId] = (currentSlide[carouselId] + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide[carouselId] * 100}%)`;
}

function slidePrev(carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelector('.carousel-slides');
    const totalSlides = slides.children.length;

    // Update the current slide index for this carousel
    currentSlide[carouselId] = (currentSlide[carouselId] - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide[carouselId] * 100}%)`;
}
