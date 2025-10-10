// Swiper.js carousel initialization
function initializeSliders() {
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        console.error('Swiper library not loaded');
        return;
    }
    // Hero carousel
    const heroCarousel = document.querySelector('.hero-carousel');
    if (!heroCarousel) {
        console.warn('Hero carousel element not found');
    } else {
        const heroSwiper = new Swiper('.hero-carousel', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-carousel .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.hero-carousel .swiper-button-next',
            prevEl: '.hero-carousel .swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
    }
    
    // Product carousel
    const productCarousel = document.querySelector('.product-carousel');
    if (!productCarousel) {
        console.warn('Product carousel element not found');
    } else {
        const productSwiper = new Swiper('.product-carousel', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        },
        pagination: {
            el: '.product-carousel .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.product-carousel .swiper-button-next',
            prevEl: '.product-carousel .swiper-button-prev',
        }
    });
    }
    
    // Team carousel
    const teamSwiper = new Swiper('.team-carousel', {
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
    
    // Blog carousel
    const blogSwiper = new Swiper('.blog-carousel', {
        loop: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
    
    // Testimonial carousel
    const testimonialSwiper = new Swiper('.testimonial-carousel', {
        loop: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
}

// Image lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Parallax scrolling effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeParallax();
});
