const products = [
 {id:"mat",name:"Duża podkładka NEXORA",desc:"Minimalistyczna przestrzeń do grania i pracy.",price:79.99,tag:"BESTSELLER",image:"assets/mat.jpg"},
 {id:"stand",name:"Stojak na słuchawki",desc:"Porządek i elegancka ekspozycja słuchawek.",price:69.99,tag:"DESK ESSENTIAL",image:"assets/headphone-stand.jpg"},
 {id:"cable",name:"Organizer kabli",desc:"Koniec z plątaniną przewodów na biurku.",price:29.99,tag:"SMART ORGANIZATION",image:"assets/cable-organizer.jpg"},
 {id:"controller",name:"Stojak na kontroler",desc:"Praktyczny dodatek do gamingowego setupu.",price:49.99,tag:"GAMING",image:"assets/controller-stand.jpg"}
];
let cart = [];
const money = n => n.toLocaleString("pl-PL",{style:"currency",currency:"PLN"});
const grid = document.getElementById("productsGrid");
grid.innerHTML = products.map(p=>`<article class="product-card"><div class="product-image"><span class="product-tag">${p.tag}</span><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-buy"><strong>${money(p.price)}</strong><button class="add-button" data-add="${p.id}">DODAJ +</button></div></div></article>`).join("");
grid.addEventListener("click",e=>{const id=e.target.dataset.add;if(!id)return;const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...p,qty:1});renderCart();toast("Dodano produkt do koszyka");});
function renderCart(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);const box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><div>${p.name}<br><small>${p.qty} × ${money(p.price)}</small></div><div>${money(p.price*p.qty)}<br><button data-remove="${p.id}">Usuń</button></div></div>`).join(""):'<p class="empty-cart">Twój koszyk jest pusty.</p>';document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));}
document.getElementById("cartItems").addEventListener("click",e=>{const id=e.target.dataset.remove;if(!id)return;cart=cart.filter(x=>x.id!==id);renderCart();});
const overlay=document.getElementById("cartOverlay");document.getElementById("openCart").onclick=()=>{overlay.classList.add("open");overlay.setAttribute("aria-hidden","false")};document.getElementById("closeCart").onclick=()=>{overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true")};overlay.addEventListener("click",e=>{if(e.target===overlay)document.getElementById("closeCart").click();});
document.getElementById("checkoutButton").onclick=()=>alert("To jest wersja demonstracyjna sklepu. Aby przyjmować prawdziwe zamówienia, trzeba podłączyć operatora płatności, dane sprzedawcy, regulamin i dostawcę.");
let toastTimer;function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),1800);}
renderCart();