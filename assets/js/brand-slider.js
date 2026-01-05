document.addEventListener("DOMContentLoaded", function () {
    const brandsList = document.querySelector(".brands-list");
    const leftBtn = document.querySelector(".brands-arrow.left");
    const rightBtn = document.querySelector(".brands-arrow.right");

    if (!brandsList || !leftBtn || !rightBtn) return;

    const scrollAmount = 200; // Khoảng cách trượt mỗi lần (có thể điều chỉnh)
    let autoScrollInterval;

    // Hàm trượt tự động (từ trái sang phải)
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            // Nếu cuộn đến cuối → quay về đầu mượt mà
            if (
                brandsList.scrollLeft + brandsList.clientWidth >=
                brandsList.scrollWidth - 10
            ) {
                brandsList.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                brandsList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }, 3000); // Tự động trượt mỗi 3 giây (có thể thay đổi: 2000, 4000...)
    }

    // Dừng tự động khi hover vào khu vực brands
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Bấm nút phải → trượt sang phải
    rightBtn.addEventListener("click", function () {
        stopAutoScroll(); // Dừng auto tạm thời
        if (
            brandsList.scrollLeft + brandsList.clientWidth >=
            brandsList.scrollWidth - 10
        ) {
            brandsList.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            brandsList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
        startAutoScroll(); // Tiếp tục auto sau khi bấm
    });

    // Bấm nút trái → trượt sang trái
    leftBtn.addEventListener("click", function () {
        stopAutoScroll();
        brandsList.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        startAutoScroll();
    });

    // Dừng auto khi chuột hover vào phần brands (trải nghiệm tốt hơn)
    brandsList.parentElement.addEventListener("mouseenter", stopAutoScroll);
    brandsList.parentElement.addEventListener("mouseleave", startAutoScroll);

    // Bắt đầu tự động chạy khi tải trang
    startAutoScroll();
});

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 768) return; // Chỉ chạy trên mobile

    const slides = document.querySelectorAll(".news-slide");
    const dots = document.querySelectorAll(".news-dots .dot");

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    // Hàm chạy auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000); // Chuyển slide mỗi 5 giây (có thể đổi thành 4000, 6000...)
    }

    // Dừng auto khi người dùng click dot
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Click dot để chuyển + dừng auto tạm thời rồi chạy lại
    dots.forEach((dot) => {
        dot.addEventListener("click", function () {
            stopAutoPlay();
            currentIndex = parseInt(this.getAttribute("data-index"));
            showSlide(currentIndex);
            startAutoPlay(); // Tiếp tục auto sau khi người dùng tương tác
        });
    });

    // Bắt đầu auto-play khi tải trang
    showSlide(0);
    startAutoPlay();

    // Tùy chọn: Dừng auto khi hover/chạm vào slider (trải nghiệm tốt hơn)
    const slider = document.querySelector(".news-slider-mobile");
    slider.addEventListener("touchstart", stopAutoPlay);
    slider.addEventListener("touchend", startAutoPlay);
    slider.addEventListener("mouseenter", stopAutoPlay);
    slider.addEventListener("mouseleave", startAutoPlay);
});
