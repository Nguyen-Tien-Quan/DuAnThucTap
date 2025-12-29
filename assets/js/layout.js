document.addEventListener("DOMContentLoaded", function () {
    const isInsidePages = window.location.pathname.includes("/pages/");

    const headerPath = isInsidePages ? "header.html" : "pages/header.html";
    const footerPath = isInsidePages ? "footer.html" : "pages/footer.html";
    const sidebarPath = isInsidePages ? "sidebar.html" : "pages/sidebar.html";

    // Load header trước để các element menu tồn tại rồi mới init JS
    loadComponent("header-include", headerPath, function () {
        setActiveMenu(); // Highlight trang hiện tại
        initMegaMenu(); // Mega menu desktop (hover)
        initMobileMenu(); // <<< Mobile menu cải thiện mới
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

// Highlight menu item của trang hiện tại
function setActiveMenu() {
    const links = document.querySelectorAll(".nav-item-link");

    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "index.html") {
        currentPath = "index.html";
    }

    links.forEach((link) => {
        link.classList.remove("active");
        const hrefValue = link.getAttribute("href");
        if (!hrefValue) return;

        const linkFile = hrefValue.split("/").pop();
        if (currentPath === linkFile) {
            link.classList.add("active");
        }
    });
}

// Mega menu trên desktop (hover)
function initMegaMenu() {
    const hasMegaItem = document.querySelector(".nav-item.has-mega");
    const megaMenu = document.querySelector(".mega-menu");

    if (!hasMegaItem || !megaMenu) return;

    // Desktop: hover
    hasMegaItem.addEventListener("mouseenter", () => {
        if (window.innerWidth > 767) {
            megaMenu.classList.add("is-active");
        }
    });
    hasMegaItem.addEventListener("mouseleave", () => {
        if (window.innerWidth > 767) {
            megaMenu.classList.remove("is-active");
        }
    });

    // Mobile: click để mở/đóng (không nhảy trang)
    const productLink = hasMegaItem.querySelector(".nav-item-link");
    productLink.addEventListener("click", (e) => {
        if (window.innerWidth <= 767) {
            e.preventDefault();
            hasMegaItem.classList.toggle("active");
        }
    });
}

// ===== PHẦN MOBILE MENU CẢI THIỆN MỚI =====

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");
    const nav = document.querySelector(".nav");

    if (!menuToggle || !navList || !nav) return;

    function openMenu() {
        navList.classList.add("active");
        nav.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        navList.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
        // Đóng hết submenu khi đóng menu chính
        document
            .querySelectorAll(".nav-item.active")
            .forEach((item) => item.classList.remove("active"));
    }

    // Hamburger toggle
    menuToggle.addEventListener("click", () => {
        if (navList.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Nút X (click vào vùng ::before)
    navList.addEventListener("click", (e) => {
        if (
            e.target === navList.querySelector("::before") ||
            (e.clientX > navList.offsetWidth - 70 && e.clientY < 70)
        ) {
            closeMenu();
        }
    });

    // Overlay click
    nav.addEventListener("click", (e) => {
        if (e.target === nav) closeMenu();
    });

    // Accordion cho item có submenu
    document.querySelectorAll(".nav-item > .nav-item-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 767) {
                const parent = this.parentElement;
                if (
                    parent.classList.contains("has-mega") ||
                    parent.querySelector(".nav-list-child")
                ) {
                    e.preventDefault();
                    parent.classList.toggle("active");
                } else {
                    closeMenu(); // link thường thì đóng menu sau khi click
                }
            }
        });
    });

    // Resize sang desktop thì đóng
    window.addEventListener("resize", () => {
        if (window.innerWidth > 767) closeMenu();
    });
}
