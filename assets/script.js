const produits = [
  {id:1,nom:"Robe Satin ELLA",prix:89,cat:"femme",img:"https://picsum.photos/seed/1/400/500",desc:"Robe élégante pour soirée."},
  {id:2,nom:"Chemise Lin Homme",prix:65,cat:"homme",img:"https://picsum.photos/seed/2/400/500",desc:"100% lin respirant."},
  {id:3,nom:"Sac Mini Cuir",prix:120,cat:"accessoire",img:"https://picsum.photos/seed/3/400/500",desc:"Cuir véritable."},
  {id:4,nom:"Jupe Plissée",prix:55,cat:"femme",img:"https://picsum.photos/seed/4/400/500",desc:"Tendance 2026."},
  {id:5,nom:"Casquette ELLA",prix:35,cat:"accessoire",img:"https://picsum.photos/seed/5/400/500",desc:"Unisexe."},
  {id:6,nom:"Pull Oversize",prix:75,cat:"homme",img:"https://picsum.photos/seed/6/400/500",desc:"Chaud et confortable."}
];

function getCart(){return JSON.parse(localStorage.getItem("cart")||"[]")}
function saveCart(c){localStorage.setItem("cart",JSON.stringify(c));updateCount()}
function updateCount(){const el=document.getElementById("cart-count");if(el)el.textContent=getCart().reduce((a,b)=>a+b.qte,0)}
function addToCart(id){let c=getCart();let f=c.find(p=>p.id==id);if(f)f.qte++;else c.push({id,qte:1});saveCart(c);alert("Ajouté au panier!")}

function renderProducts(list){
  const grid=document.getElementById("product-grid")||document.getElementById("featured-products");
  if(!grid) return;
  grid.innerHTML=list.map(p=>`<div class="card"><a href="produit.html?id=${p.id}"><img src="${p.img}"></a><div class="info"><h3>${p.nom}</h3><p>${p.prix} DT</p><button class="btn" onclick="addToCart(${p.id})">Ajouter</button></div></div>`).join("");
}

// Catalogue + filtres
if(document.getElementById("product-grid")){
  let currentCat="all"; let currentPrix=200;
  function filterAndRender(){
    let q=(document.getElementById("search")?.value||"").toLowerCase();
    let filtered=produits.filter(p=>(currentCat=="all"||p.cat==currentCat)&&p.prix<=currentPrix&&p.nom.toLowerCase().includes(q));
    renderProducts(filtered);
  }
  renderProducts(produits);
  document.querySelectorAll(".filter-btn").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentCat=b.dataset.cat;filterAndRender()});
  document.getElementById("prix-range").oninput=e=>{currentPrix=e.target.value;document.getElementById("prix-val").textContent=currentPrix;filterAndRender()}
  document.getElementById("search")?.addEventListener("input",filterAndRender);
}

// Page d'accueil
if(document.getElementById("featured-products")) renderProducts(produits.slice(0,4));

// Page produit
if(document.getElementById("product-detail")){
  const id=new URLSearchParams(location.search).get("id")||1;
  const p=produits.find(x=>x.id==id);
  document.getElementById("product-detail").innerHTML=`<img src="${p.img}" style="width:100%;border-radius:16px"><div><h1>${p.nom}</h1><h2>${p.prix} DT</h2><p>${p.desc}</p><br><button class="btn" onclick="addToCart(${p.id})">Ajouter au panier</button></div>`;
}

// Contact
document.getElementById("contact-form")?.addEventListener("submit",e=>{e.preventDefault();document.getElementById("form-msg").textContent="Message envoyé! On te répond vite.";e.target.reset()});
updateCount();
