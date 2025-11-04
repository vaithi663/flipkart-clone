// ---------------------- PRODUCTS ----------------------
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

// ---------------------- SHOW PRODUCTS ----------------------
function showProducts(items) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  items.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="addCartBtn" data-id="${p.id}">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// ---------------------- CART LOGIC ----------------------
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartCount();
}

function findProduct(id) {
  return products.find(p => p.id === id);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

function addToCart(id) {
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  alert(`${findProduct(id).name} added to cart!`);
}

// Add to cart button
document.addEventListener("click", e => {
  if (e.target.classList.contains("addCartBtn")) {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

// ---------------------- RENDER CART PAGE ----------------------
function renderCartPage() {
  const tbody = document.querySelector("#cartTable tbody");
  const totalEl = document.getElementById("totalPrice");
  if (!tbody || !totalEl) return;

  tbody.innerHTML = "";
  let total = 0;

  cart.forEach((c, index) => {
    const p = findProduct(c.id);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td><img src="${p.img}" style="width:70px;height:70px;"></td>
      <td>₹${p.price}</td>
      <td>
        <button class="qtyBtn" data-action="dec" data-index="${index}">-</button>
        <span>${c.qty}</span>
        <button class="qtyBtn" data-action="inc" data-index="${index}">+</button>
      </td>
      <td>₹${p.price * c.qty}</td>
      <td><button class="removeBtn" data-index="${index}">Remove</button></td>
    `;
    tbody.appendChild(row);
    total += p.price * c.qty;
  });

  totalEl.textContent = "Total: ₹" + total;
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("qtyBtn")) {
    const idx = e.target.dataset.index;
    const act = e.target.dataset.action;
    if (act === "inc") cart[idx].qty++;
    else cart[idx].qty = Math.max(1, cart[idx].qty - 1);
    saveCart();
    renderCartPage();
  }

  if (e.target.classList.contains("removeBtn")) {
    const idx = e.target.dataset.index;
    cart.splice(idx, 1);
    saveCart();
    renderCartPage();
  }
});

// ---------------------- SEARCH ----------------------
function handleSearch() {
  const q = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(q));
  showProducts(filtered);
}

// ---------------------- PRODUCT MODAL ----------------------
document.addEventListener("click", e => {
  const card = e.target.closest(".product");
  if (card && !e.target.classList.contains("addCartBtn")) {
    const name = card.querySelector("h3").textContent;
    const prod = products.find(p => p.name === name);
    if (!prod) return;

    const modal = document.getElementById("productModal");
    const content = document.getElementById("modalContent");
    content.innerHTML = `
      <h2>${prod.name}</h2>
      <img src="${prod.img}" style="width:100%;border-radius:10px;">
      <p>₹${prod.price}</p>
      <p>High quality ${prod.name} at best price!</p>
      <button class="addCartBtn" data-id="${prod.id}">Add to Cart</button>
    `;
    modal.style.display = "flex";
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("productModal").style.display = "none";
});

// ---------------------- INIT ----------------------
document.addEventListener("DOMContentLoaded", () => {
  showProducts(products);
  updateCartCount();
  if (document.getElementById("cartTable")) renderCartPage();
});
