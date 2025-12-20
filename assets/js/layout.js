document.addEventListener("DOMContentLoaded", function () {
    const isInsidePages = window.location.pathname.includes("/pages/");

    const headerPath = isInsidePages ? "header.html" : "pages/header.html";
    const footerPath = isInsidePages ? "footer.html" : "pages/footer.html";
    const sidebarPath = isInsidePages ? "sidebar.html" : "pages/sidebar.html";

    // CHỈ gọi setActiveMenu ở đây (trong callback của header)
    loadComponent("header-include", headerPath, function () {
        setActiveMenu(); // Hàm cũ
        initMegaMenu(); // Hàm mới thêm vào đây
    });

    loadComponent("footer-include", footerPath);
    loadComponent("sidebar-include", sidebarPath);
});

function loadComponent(containerId, filePath, callback) {
    const box = document.getElementById(containerId);
    if (!box) return;

    fetch(filePath)
        .then((response) => {
            if (!response.ok) throw new Error("404 Not Found: " + filePath);
            return response.text();
        })
        .then((data) => {
            box.innerHTML = data;
            if (callback) callback();
        })
        .catch((err) => console.error("Lỗi load component:", err));
}

// Hàm xử lý Menu Active
function setActiveMenu() {
    const links = document.querySelectorAll(".nav-item-link");

    // 1. Lấy tên file thực tế từ URL (ví dụ: product.html hoặc contact.html)
    // Dùng URLSearchParams hoặc split để lấy phần cuối của path
    let currentPath = window.location.pathname.split("/").pop();

    // Nếu ở trang chủ (chỉ có / hoặc /index.html)
    if (currentPath === "" || currentPath === "index.html") {
        currentPath = "index.html";
    }

    links.forEach((link) => {
        // 2. Quan trọng: Luôn xóa sạch class active của mọi link trước khi check
        link.classList.remove("active");

        // 3. Lấy tên file từ thuộc tính href của link
        // Ví dụ href="../pages/product.html" -> lấy được "product.html"
        const hrefValue = link.getAttribute("href");
        if (!hrefValue) return;

        const linkFile = hrefValue.split("/").pop();

        // 4. So sánh và add active
        if (currentPath === linkFile) {
            link.classList.add("active");
        }
    });
}

// Hiệu ứng Header khi cuộn chuột
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header-fixed");
    if (header) {
        header.classList.toggle("shrink", window.scrollY > 80);
    }
});

function initMegaMenu() {
    const productLink = document.querySelector(".has-mega > .nav-item-link");
    const megaMenu = document.querySelector(".mega-menu");
    const allLinks = document.querySelectorAll(".nav-item-link");

    if (!productLink || !megaMenu) return;

    productLink.addEventListener("click", function (e) {
        // Nếu bạn muốn click vào là sáng đèn Sản phẩm ngay lập tức:
        allLinks.forEach((l) => l.classList.remove("active"));
        productLink.classList.add("active");

        // Logic đóng mở menu
        e.preventDefault();
        e.stopPropagation();
        megaMenu.classList.toggle("is-active");
    });
}
