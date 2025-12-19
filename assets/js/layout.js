document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-include", "header.html", setActiveMenu);
    loadComponent("footer-include", "footer.html");
});

function loadComponent(containerId, filePath, callback) {
    var box = document.getElementById(containerId);
    if (!box) return;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", filePath, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            box.innerHTML = xhr.responseText;
            if (callback) callback();
        }
    };

    xhr.send();
}

// ACTIVE MENU
function setActiveMenu() {
    var links = document.querySelectorAll(".nav-item-link");
    var currentPath = window.location.pathname;

    links.forEach(function (link) {
        var linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", () => {
    document
        .querySelector(".header-fixed")
        .classList.toggle("shrink", window.scrollY > 80);
});

fetch("sidebar.html") // Đường dẫn đến file sidebar đã tách
    .then((response) => response.text())
    .then((data) => {
        const sidebar = document.getElementById("sidebar-include");
        if (sidebar) {
            sidebar.innerHTML = data;
        }
    });
