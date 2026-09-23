
// PAGE DETAIL - version matériaux
if(location.pathname.includes("produit.html")){
  let id = new URLSearchParams(location.search).get("id")||1;
  let p = produits.find(x=>x.id==id);
  document.getElementById("detail").innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;background:#fff;padding:25px;border-radius:20px">
      <img src="${p.img}" style="width:100%;border-radius:16px">
      <div>
        <h1>${p.nom}</h1>
        <h2 style="margin:10px 0">${p.prix} DT</h2>
        <p>${p.desc}</p>
        <hr style="margin:15px 0">
        <h3>🧵 Matériaux</h3>
        <ul>${p.materiaux.map(m=>`<li>${m}</li>`).join("")}</ul>
        <p><b>Composition:</b> ${p.composition}</p>
        <p><b>Entretien:</b> ${p.entretien}</p>
        <p><b>Origine:</b> ${p.origine}</p>
        <br>
        <button class=btn onclick="addToCart(${p.id})">Ajouter au panier</button>
      </div>
    </div>
  `
}
