document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".banner-container");
    const slides = document.querySelectorAll(".banner-slide");
    const leftArrow = document.querySelector(".banner .left-arrow");
    const rightArrow = document.querySelector(".banner .right-arrow");

    if (!container || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        container.style.transform = `translateX(-${index * 100}%)`;
    }

    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    });

    leftArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    });

    // Auto play (tùy chọn)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalSlides;
    //     showSlide(currentIndex);
    // }, 8000);

    showSlide(0);
});
