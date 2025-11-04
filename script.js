// 🛍️ Product List
const products = [
    { id: 1, name: "Smartphone", price: 14999, img: "phone.jpg" },
    { id: 2, name: "Laptop", price: 49999, img: "laptop.jpg" },
    { id: 3, name: "Smartwatch", price: 4999, img: "watch.jpg" },
    { id: 4, name: "Shoes", price: 1999, img: "shoes.jpg" },
    { id: 5, name: "Television", price: 25999, img: "tv.jpg" },
    { id: 6, name: "Bag", price: 999, img: "bag.jpg" },
    { id: 7, name: "Camera", price: 29999, img: "camera.jpg" },
    { id: 8, name: "Headphones", price: 1999, img: "headphones.jpg" },
    { id: 9, name: "Perfume", price: 799, img: "perfume.jpg" },
    { id: 10, name: "Table", price: 15999, img: "table.jpg" }
];

// 🧱 Show Products on Home Page
function showProducts(items) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";
    items.forEach((p) => {
        const card = document.createElement("div");
        card.classList.add("product");
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}" style="width:100%; height:200px; object-fit:cover; border-radius:10px;">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="addCartBtn" data-id="${p.id}">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// 🔍 Search Functionality
function handleSearch() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );
    showProducts(filtered);
}

document.getElementById("searchBtn").addEventListener("click", handleSearch);
document.getElementById("search").addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
});

// 🛒 Cart Functionality
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("addCartBtn")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push(product);
            alert(`${product.name} added to cart!`);
            updateCartCount();
            localStorage.setItem("cartItems", JSON.stringify(cart));
        }
    }
});

// 🌙 Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
    });
}

// 🧩 Initialize Products
showProducts(products);
updateCartCount(); // refresh cart count on load

// 🧩 User login check
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("flipUser");
    const isLogged = localStorage.getItem("isLoggedIn");

    const loginBtn = document.getElementById("loginBtn");
    const userProfile = document.getElementById("userProfile");
    const userName = document.getElementById("userName");

    if (isLogged === "true" && user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (userProfile) userProfile.style.display = "inline";
        if (userName) userName.textContent = user;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            alert("You have been logged out!");
            window.location.href = "login.html";
        });
    }
});

