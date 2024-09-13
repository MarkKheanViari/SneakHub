let index = 0;
const slides = document.querySelectorAll('.mama-natin');
const totalSlides = slides.length;

function showSlide() {
    slides.forEach(slide => {
        slide.style.transform = `translateX(-${index * 100}%)`; /* Slide the images horizontally */
    });
}

function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide();
}

function nextSlide() {
    index = (index + 1) % totalSlides;
    showSlide();
}

showSlide();
