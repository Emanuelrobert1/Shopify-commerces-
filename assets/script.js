const products = [
{
id: 1,
name: "Sac Élégance",
price: 49.90,
category: "Sacs",
material: "Cuir",
image: "assets/images/sac-elegance.jpg",
description: "Sac élégant et pratique pour tous les jours.",
stock: 10
},
{
id: 2,
name: "Montre Classic",
price: 79.90,
category: "Montres",
material: "Acier inoxydable",
image: "assets/images/montre-classic.jpg",
description: "Montre moderne avec bracelet résistant.",
stock: 15
},
{
id: 3,
name: "Chaussures Urban",
price: 59.90,
category: "Chaussures",
material: "Cuir synthétique",
image: "assets/images/chaussures-urban.jpg",
description: "Chaussures confortables pour un style quotidien.",
stock: 20
},
{
id: 4,
name: "T-shirt Premium",
price: 24.90,
category: "Vêtements",
material: "Coton",
image: "assets/images/tshirt-premium.jpg",
description: "T-shirt confortable en coton de qualité.",
stock: 30
},
{
id: 5,
name: "Lunettes Fashion",
price: 34.90,
category: "Accessoires",
material: "Acétate",
image: "assets/images/lunettes-fashion.jpg",
description: "Lunettes modernes pour compléter votre style.",
stock: 12
}
];

let cart = JSON.parse(localStorage.getItem("ella-cart")) || [];

function formatPrice(price) {
return "${price.toFixed(2).replace(".", ",")} DT";
}

function saveCart() {
localStorage.setItem("ella-cart", JSON.stringify(cart));
updateCartCount();
}

function updateCartCount() {
const count = cart.reduce((total, item) => total + item.quantity, 0);

document.querySelectorAll("#cart-count").forEach(element => {
element.textContent = count;
});
}

function addToCart(productId) {
const product = products.find(item => item.id === productId);

if (!product) return;

const existing = cart.find(item => item.id === productId);

if (existing) {
if (existing.quantity < product.stock) {
existing.quantity++;
} else {
alert("Stock maximum atteint.");
return;
}
} else {
cart.push({
id: product.id,
name: product.name,
price: product.price,
image: product.image,
quantity: 1
});
}

saveCart();
alert("${product.name} a été ajouté au panier.");
}

function createProductCard(product) {
return `
<article class="card">
<img src="${product.image}" alt="${product.name}" loading="lazy"
onerror="this.style.display='none'">

  <div class="info">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p><strong>Matière :</strong> ${product.material}</p>
    <p><strong>${formatPrice(product.price)}</strong></p>
    <p>Stock : ${product.stock}</p>

    <button class="btn add-cart" data-id="${product.id}">
      Ajouter au panier
    </button>
  </div>
</article>

`;
}

function renderProducts(list = products) {
const productGrid = document.querySelector("#product-grid");

if (!productGrid) return;

if (list.length === 0) {
productGrid.innerHTML = "<p>Aucun produit trouvé.</p>";
return;
}

productGrid.innerHTML = list.map(createProductCard).join("");

document.querySelectorAll(".add-cart").forEach(button => {
button.addEventListener("click", () => {
addToCart(Number(button.dataset.id));
});
});
}

function renderFeaturedProducts() {
const container = document.querySelector("#featured-products");

if (!container) return;

container.innerHTML = products
.slice(0, 4)
.map(createProductCard)
.join("");

document.querySelectorAll(".add-cart").forEach(button => {
button.addEventListener("click", () => {
addToCart(Number(button.dataset.id));
});
});
}

function setupSearch() {
const search = document.querySelector("#search");

if (!search) return;

search.addEventListener("input", () => {
const query = search.value.toLowerCase().trim();

const results = products.filter(product =>
  product.name.toLowerCase().includes(query) ||
  product.category.toLowerCase().includes(query) ||
  product.material.toLowerCase().includes(query)
);

renderProducts(results);

});
}

function setupFilters() {
const buttons = document.querySelectorAll(".filter-btn");
const priceRange = document.querySelector("#prix-range");
const priceValue = document.querySelector("#prix-val");

buttons.forEach(button => {
button.addEventListener("click", () => {
buttons.forEach(btn => btn.classList.remove("active"));
button.classList.add("active");

  const category = button.dataset.cat;

  let filtered = products;

  if (category !== "all") {
    filtered = products.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (priceRange) {
    filtered = filtered.filter(
      product => product.price <= Number(priceRange.value)
    );
  }

  renderProducts(filtered);
});

});

if (priceRange) {
priceRange.addEventListener("input", () => {
if (priceValue) {
priceValue.textContent = priceRange.value;
}

  const activeButton = document.querySelector(".filter-btn.active");
  const category = activeButton?.dataset.cat || "all";

  let filtered = products;

  if (category !== "all") {
    filtered = filtered.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  filtered = filtered.filter(
    product => product.price <= Number(priceRange.value)
  );

  renderProducts(filtered);
});

}
}

function setupContactForm() {
const form = document.querySelector("#contact-form");
const message = document.querySelector("#form-msg");

if (!form || !message) return;

form.addEventListener("submit", event => {
event.preventDefault();

message.textContent =
  "Merci ! Votre message a bien été préparé. Nous vous répondrons rapidement.";

form.reset();

});
}

document.addEventListener("DOMContentLoaded", () => {
renderProducts();
renderFeaturedProducts();
setupSearch();
setupFilters();
setupContactForm();
updateCartCount();
});
