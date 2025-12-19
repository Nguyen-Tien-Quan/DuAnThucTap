document.addEventListener("DOMContentLoaded", function () {
    // 1. Kiểm tra xem file hiện tại có nằm trong thư mục 'pages' hay không
    const isInsidePages = window.location.pathname.includes("/pages/");

    // 2. Nếu đang ở trong 'pages', chỉ cần gọi tên file. Nếu ở ngoài, phải thêm 'pages/'
    const headerPath = isInsidePages ? "header.html" : "pages/header.html";
    const footerPath = isInsidePages ? "footer.html" : "pages/footer.html";
    const sidebarPath = isInsidePages ? "sidebar.html" : "pages/sidebar.html";

    // 3. Gọi hàm load cho từng cái
    loadComponent("header-include", headerPath, setActiveMenu);
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
    var links = document.querySelectorAll(".nav-item-link");
    var currentPath = window.location.pathname;

    links.forEach(function (link) {
        if (currentPath.includes(link.getAttribute("href"))) {
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
