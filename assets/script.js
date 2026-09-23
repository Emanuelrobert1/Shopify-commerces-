const produits=[
 {id:1,nom:"Robe Test",prix:99,cat:"femme",img:"https://picsum.photos/seed/1/400/500",materiaux:["Coton 100%"],composition:"Test",entretien:"30°C",origine:"Tunisie",desc:"Test"}
];
const getCart=()=>JSON.parse(localStorage.getItem("cart")||"[]");
const saveCart=c=>{localStorage.setItem("cart",JSON.stringify(c));document.getElementById("cart-count").textContent=c.reduce((a,b)=>a+b.qte,0)};
const addToCart=id=>{let c=getCart();let f=c.find(p=>p.id==id);f?f.qte++:c.push({id,qte:1});saveCart(c);alert("Ajouté!")};
const render=(list,sel)=>{let g=document.querySelector(sel);if(g)g.innerHTML=list.map(p=>`<div class=card><a href="produit.html?id=${p.id}"><img src="${p.img}"></a><div><h4>${p.nom}</h4><p>${p.prix} DT</p><button class=btn onclick="addToCart(${p.id})">Ajouter</button></div></div>`).join("")};
render(produits,"#featured");render(produits,"#grid");
if(location.pathname.includes("produit.html")){let id=new URLSearchParams(location.search).get("id")||1;let p=produits.find(x=>x.id==id);document.getElementById("detail").innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;background:#fff;padding:25px;border-radius:20px"><img src="${p.img}" style="width:100%"><div><h1>${p.nom}</h1><h2>${p.prix} DT</h2><p><b>Matériaux:</b> ${p.materiaux}</p><br><button class=btn onclick="addToCart(${p.id})">Ajouter</button></div></div>`}
saveCart(getCart());
