// DỮ LIỆU DỰ ÁN (thêm thoải mái)
const projectsData = [
    {
        img: "../assets/img/new-2.png",
        title: "Dự án cung cấp thiết bị cho bệnh viện ngoại thành",
    },
    {
        img: "https://www.aw2.com/wp-content/uploads/2018/04/AW2-FV-Hospital-Ho-Chi-Minh-City-Vietnam-831.jpg",
        title: "Dự án cung cấp thiết bị cho bệnh viện đa khoa",
    },
    {
        img: "https://healthcaresnapshots.com/wp-content/uploads/sites/5/2019/11/american-international-hospital-1-700x467.jpg",
        title: "Dự án cung cấp thiết bị cho khu hồi sức tích cực",
    },
    {
        img: "https://dam.northwell.edu/m/5965b0e539477c7c/Drupal-NEWS_North-Shore-University-Hospital-opens-21M-MRI-suite.jpg",
        title: "Dự án cung cấp máy chụp MRI 3.0 Tesla",
    },
    {
        img: "https://www.hospitalsmagazine.com/wp-content/uploads/2022/01/Hybrid-OR-1024x683.jpg",
        title: "Dự án lắp đặt phòng mổ hybrid hiện đại",
    },
    {
        img: "https://cdn-prod.medicalnewstoday.com/content/images/articles/153/153201/ct-scan.jpg",
        title: "Dự án cung cấp máy chụp CT đa lát cắt",
    },
    {
        img: "https://besconsultants.net/cdn/shop/files/best_glass_facades-1.jpg?v=1737285748&width=3840",
        title: "Dự án trang bị cho bệnh viện hiện đại",
    },
    {
        img: "https://www.aw2.com/wp-content/uploads/2018/04/AW2-FV-Hospital-Ho-Chi-Minh-City-Vietnam-706.jpg",
        title: "Dự án cung cấp thiết bị cho bệnh viện quốc tế",
    },
    {
        img: "../assets/img/new-2.png",
        title: "Dự án cung cấp hệ thống gây mê cao cấp",
    },
    {
        img: "../assets/img/new-2.png",
        title: "Dự án lắp đặt hệ thống PACS toàn viện",
    },
    {
        img: "../assets/img/new-2.png",
        title: "Dự án nâng cấp phòng xét nghiệm tự động",
    },
    {
        img: "../assets/img/new-2.png",
        title: "Dự án cung cấp máy siêu âm 5D",
    },
    {
        img: "../assets/img/new-2.png",
        title: "Dự án cung cấp hệ thống gây mê cao cấp",
    },
    {
        img: "../assets/img/new-2.png",
        title: "Dự án cung cấp hệ thống gây mê cao cấp",
    },
    {
        img: "../assets/img/new-2.png",
        title: "Dự án cung cấp hệ thống gây mê cao cấp",
    },
];

const itemsPerPage = 9;
let currentPage = 1;

const grid = document.getElementById("projects-grid");
const paginationEl = document.getElementById("pagination");

function renderProjects(page) {
    if (!grid) return;
    grid.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = projectsData.slice(start, end);

    pageItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = "#"; // Sau này thay bằng link chi tiết nếu có
        link.innerHTML = `
            <div class="project-item">
                <img src="${item.img}" alt="${item.title}" />
                <p>${item.title}</p>
            </div>
        `;
        grid.appendChild(link);
    });
}

function renderPagination() {
    if (!paginationEl) return;
    paginationEl.innerHTML = "";

    const totalPages = Math.ceil(projectsData.length / itemsPerPage);

    // Nút Prev
    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.className = "page-num";
        prev.innerHTML = "&lt;";
        prev.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage--;
            updatePage();
        });
        paginationEl.appendChild(prev);
    }

    // Các số trang (hiển thị tối đa 5 trang để gọn)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        const num = document.createElement("a");
        num.href = "#";
        num.className = "page-num" + (i === currentPage ? " active" : "");
        num.textContent = i;
        num.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = i;
            updatePage();
        });
        paginationEl.appendChild(num);
    }

    // Nút Next
    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.className = "page-num";
        next.innerHTML = "&gt;";
        next.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage++;
            updatePage();
        });
        paginationEl.appendChild(next);
    }
}

function updatePage() {
    renderProjects(currentPage);
    renderPagination();
    // Cuộn mượt lên grid

    document
        .querySelector(".project-breadcrumb a")
        .scrollIntoView({ behavior: "smooth" });
}

// Chạy ngay khi page load (an toàn hơn DOMContentLoaded nếu có script khác)
window.addEventListener("load", () => {
    updatePage();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Nếu vẫn không chạy, fallback chạy ngay lập tức
if (document.readyState === "complete") {
    updatePage();
}
