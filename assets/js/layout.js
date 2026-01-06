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

function initMegaMenu() {
    const hasMegaItem = document.querySelector(".nav-item.has-mega");
    const megaMenu = document.querySelector(".mega-menu");

    if (!hasMegaItem || !megaMenu) return;

    let hoverTimeout;

    // Hover VÀO nav-item.has-mega → MỞ NGAY
    hasMegaItem.addEventListener("mouseenter", () => {
        if (window.innerWidth > 767) {
            clearTimeout(hoverTimeout);
            megaMenu.classList.add("is-active");
        }
    });

    // Hover RA nav-item.has-mega → ĐÓNG SAU 150ms (chống giật)
    hasMegaItem.addEventListener("mouseleave", () => {
        if (window.innerWidth > 767) {
            hoverTimeout = setTimeout(() => {
                megaMenu.classList.remove("is-active");
            }, 150);
        }
    });

    // Hover VÀO mega-menu → GIỮ MỞ
    megaMenu.addEventListener("mouseenter", () => {
        if (window.innerWidth > 767) {
            clearTimeout(hoverTimeout);
            megaMenu.classList.add("is-active");
        }
    });

    // Hover RA mega-menu → ĐÓNG
    megaMenu.addEventListener("mouseleave", () => {
        if (window.innerWidth > 767) {
            hoverTimeout = setTimeout(() => {
                megaMenu.classList.remove("is-active");
            }, 150);
        }
    });

    // Mobile click toggle (KHÔNG đụng desktop)
    const productLink = hasMegaItem.querySelector(".nav-item-link");
    if (productLink) {
        productLink.addEventListener("click", (e) => {
            if (window.innerWidth <= 767) {
                e.preventDefault();
                hasMegaItem.classList.toggle("active");
            }
        });
    }
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
            e.target === navList ||
            (e.clientX > navList.offsetWidth - 70 && e.clientY < 70)
        ) {
            closeMenu();
        }
    });

    // Overlay click
    nav.addEventListener("click", (e) => {
        if (e.target === nav) closeMenu();
    });

    // Accordion cho item có submenu - PHIÊN BẢN CẢI THIỆN: click lần 2 mới đi link
    document.querySelectorAll(".nav-item > .nav-item-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            if (window.innerWidth > 767) return; // Chỉ xử lý trên mobile

            const parent = this.parentElement;
            const hasSubmenu =
                parent.querySelector(".nav-list-child") ||
                parent.classList.contains("has-mega");

            if (!hasSubmenu) {
                // Link bình thường → chuyển trang và đóng menu
                closeMenu();
                return;
            }

            // Có submenu
            e.preventDefault(); // Luôn chặn link mặc định để kiểm soát hành vi

            const isActive = parent.classList.contains("active");

            if (isActive) {
                // Đang mở → lần click thứ 2: cho phép chuyển trang
                window.location.href = this.getAttribute("href");
                return;
            }

            // Lần click đầu: đóng các item khác, mở item hiện tại
            document.querySelectorAll(".nav-item.active").forEach((item) => {
                if (item !== parent) {
                    item.classList.remove("active");
                }
            });

            parent.classList.add("active");
        });
    });

    // Resize sang desktop thì đóng
    window.addEventListener("resize", () => {
        if (window.innerWidth > 767) closeMenu();
    });
}
