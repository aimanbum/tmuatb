/* SMKATB Premium v2.0: Progressive enhancement ONLY. No changes to original handlers, ids, or hrefs. */
(function(){'use strict';
function init(){
 if(document.querySelector('.premium-topbar'))return;
 const main=document.querySelector('.main-content'), sidebar=document.querySelector('.sidebar'), home=document.getElementById('onestop');
 if(!main||!sidebar||!home)return;
 const top=document.createElement('header');top.className='premium-topbar';
 top.innerHTML=`<div class="premium-topbar-left"><button type="button" class="premium-square-button" id="premium-menu" title="Rapat / buka menu" aria-label="Rapat atau buka menu"><i class="fas fa-bars"></i></button><div><div class="premium-breadcrumb">SMKA TOK BACHOK / PORTAL DIGITAL</div><div class="premium-page-label" id="premium-active-section">One Stop Centre</div></div></div><div class="premium-topbar-right"><span class="premium-date" id="premium-date"></span><span class="premium-live">PORTAL DIGITAL</span></div>`;
 main.insertBefore(top,main.firstChild);
 const now=new Date();const date=top.querySelector('#premium-date');date.textContent=now.toLocaleDateString('ms-MY',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 top.querySelector('#premium-menu').addEventListener('click',()=>{if(window.innerWidth<=768){if(typeof window.toggleMenu==='function')window.toggleMenu();}else{document.body.classList.toggle('premium-collapsed');}});
 const hero=document.createElement('section');hero.className='premium-hero';
 hero.innerHTML=`<div class="premium-hero-eyebrow">PORTAL PENGURUSAN BERSEPADU · 2026</div><h1>Memudahkan urusan,<br>memperkasa pengurusan.</h1><p>Semua sistem, dokumen dan urusan sekolah dalam satu portal digital. Akses pantas kepada perkhidmatan yang digunakan setiap hari.</p><div class="premium-hero-actions"><button type="button" class="premium-action primary" id="premium-open-services"><i class="fas fa-layer-group"></i> Terokai aplikasi</button><button type="button" class="premium-action" id="premium-open-tmua"><i class="fas fa-book-quran"></i> Portal TMUA</button></div>`;
 home.insertBefore(hero,home.firstChild);
 hero.querySelector('#premium-open-services').addEventListener('click',()=>home.querySelector('.grid-panitia')?.scrollIntoView({behavior:'smooth',block:'start'}));
 hero.querySelector('#premium-open-tmua').addEventListener('click',()=>{const link=sidebar.querySelector('[onclick*="tmua"]');if(link)link.click()});
 const search=document.createElement('div');search.className='premium-search-box';search.innerHTML=`<i class="fas fa-magnifying-glass" aria-hidden="true"></i><input class="premium-search-input" id="premium-search" type="search" placeholder="Cari aplikasi, borang, panitia atau dokumen…" aria-label="Cari aplikasi dalam portal"><button type="button" class="premium-search-clear" id="premium-clear">Kosongkan</button>`;
 main.insertBefore(search,main.querySelector('.ticker-wrap')?.nextSibling||home);
 const input=search.querySelector('input');
 function visibleSection(){return [...document.querySelectorAll('.modul-section')].find(s=>getComputedStyle(s).display!=='none')||home}
 function applySearch(){const q=input.value.trim().toLocaleLowerCase('ms');const section=visibleSection();section.querySelectorAll('.card').forEach(card=>{card.style.display=(!q||card.textContent.toLocaleLowerCase('ms').includes(q))?'':'none'});section.querySelectorAll('.grid-panitia').forEach(grid=>{const hasVisible=[...grid.querySelectorAll('.card')].some(c=>c.style.display!=='none');grid.style.display=hasVisible?'':'none'});section.querySelectorAll('.category-header').forEach(header=>{const next=header.nextElementSibling;if(next?.classList.contains('grid-panitia'))header.style.display=next.style.display==='none'?'none':''})}
 input.addEventListener('input',applySearch);search.querySelector('#premium-clear').addEventListener('click',()=>{input.value='';applySearch();input.focus()});
 sidebar.querySelectorAll('.nav-link[onclick]').forEach(link=>link.addEventListener('click',()=>{input.value='';document.querySelectorAll('.card,.grid-panitia,.category-header').forEach(el=>el.style.display='');top.querySelector('#premium-active-section').textContent=link.textContent.trim();}));
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
