(function(){
'use strict';
if(document.documentElement.dataset.workspaceV4)return;
const sidebar=document.querySelector('.sidebar'),main=document.querySelector('.main-content'),osc=document.getElementById('onestop');
if(!sidebar||!main||!osc) return;
document.documentElement.dataset.workspaceV4='1';
const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n};
// Keep the original sidebar controls, navigation nodes and event listeners intact.
const brand=el('div','w4-brand');brand.innerHTML='<img src="logo.png" alt="Logo SMKA Tok Bachok"><span><b>SMKA TOK BACHOK</b><small><i class="fas fa-th-large" aria-hidden="true" style="font-size:.78em;margin-right:7px"></i>One Stop Centre</small></span>';
const top=el('header','w4-topbar');const nav=el('nav','w4-tabs');nav.setAttribute('aria-label','Modul sekolah');
const links=[...sidebar.querySelectorAll('.nav-link[onclick*="bukaModul"]')];links.forEach(a=>nav.appendChild(a));
const tools=el('div','w4-tools');const clock=sidebar.querySelector('.clock-widget');const audio=sidebar.querySelector('.audio-container');
const menuButton=el('button','w4-menu-toggle','☰ Modul');menuButton.type='button';menuButton.addEventListener('click',()=>top.classList.toggle('w4-nav-open'));
tools.append(menuButton);top.append(brand,nav,tools);
const app= document.querySelector('.app-container');app.parentNode.insertBefore(top,app);
const hero=el('div','w4-welcome');hero.innerHTML='<div><span class="w4-eyebrow">PORTAL PENGURUSAN BERSEPADU</span><h1>Selamat datang ke<br><strong>SMKA TOK BACHOK.</strong></h1><p>Semua sistem, dokumen dan urusan sekolah — dalam satu ruang kerja yang ringkas.</p></div><div class="w4-welcome-mark"><img src="logo.png" alt="Lambang sekolah"></div>';
const dashboard=el('div','w4-dashboard');const left=el('div','w4-primary');const right=el('aside','w4-aside');
const enrol=osc.querySelector('.enrolmen-widget');const pageTitle=osc.querySelector('.page-title');
const quick=el('section','w4-quick');quick.innerHTML='<div class="w4-section-heading"><div><span class="w4-eyebrow">AKSES SEGERA</span><h2>Aplikasi harian</h2></div></div>';
const quickGrid=el('div','w4-quick-grid');
const sourceCards=[...osc.querySelectorAll('a.card')];
['HANTAR e-RPH','REKOD e-RPH','KEBERADAAN GURU','JADUAL WAKTU','TAKWIM 2026','INSTRUMEN SKPMG4'].forEach(name=>{
const original=sourceCards.find(c=>(c.querySelector('.title')?.textContent||'').trim().toUpperCase()===name);
if(!original)return;
const a=original.cloneNode(true);a.classList.add('w4-quick-tile');quickGrid.appendChild(a);
});quick.appendChild(quickGrid);
const groups=el('section','w4-allgroups');groups.innerHTML='<div class="w4-section-heading"><div><span class="w4-eyebrow">DIREKTORI</span><h2>Semua aplikasi dan perkhidmatan</h2></div></div>';
while(osc.firstChild){let node=osc.firstChild;if(node===enrol||node===pageTitle){osc.removeChild(node);continue;}groups.appendChild(node)}
left.append(quick,groups);
const dataHead=el('div','w4-aside-heading','<span class="w4-eyebrow">DATA SEMASA</span><h2>Enrolmen murid</h2>');
right.append(dataHead);if(enrol)right.appendChild(enrol);
if(clock){clock.classList.add('w4-sidebar-clock');right.appendChild(clock)}
if(audio){audio.classList.add('w4-sidebar-audio');right.appendChild(audio)}
const kpm=el('div','w4-kpm');kpm.innerHTML='<span class="w4-eyebrow">PERKHIDMATAN KPM</span>';
[...sidebar.querySelectorAll('.nav-link[href]')].forEach(a=>{kpm.appendChild(a)});right.appendChild(kpm);
dashboard.append(left,right);osc.append(hero,dashboard);
// Navigation retains the original module handlers and links; no search field is injected.
links.forEach(a=>a.addEventListener('click',()=>top.classList.remove('w4-nav-open')));
// Keep headings in other modules as-is; CSS restyles them.
})();

/* v4.1 progressive enhancement — leaves original onclick handlers and href untouched */
(function(){
'use strict';
if(document.documentElement.dataset.workspaceV41)return;
const top=document.querySelector('.w4-topbar'),nav=top?.querySelector('.w4-tabs'),button=top?.querySelector('.w4-menu-toggle');
if(!top||!nav||!button)return;
document.documentElement.dataset.workspaceV41='1';
button.setAttribute('aria-expanded','false');
button.setAttribute('aria-controls','smkatb-v41-nav');
button.setAttribute('aria-label','Buka atau tutup navigasi modul');
nav.id='smkatb-v41-nav';
const links=[...nav.querySelectorAll('.nav-link')];
function setExpanded(expanded){top.classList.toggle('w4-nav-open',expanded);button.setAttribute('aria-expanded',String(expanded));button.textContent=expanded?'✕ Tutup':'☰ Modul';}
button.addEventListener('click',()=>{ // Old v4 handler toggles once first.
  const open=top.classList.contains('w4-nav-open');
  button.setAttribute('aria-expanded',String(open));
  button.textContent=open?'✕ Tutup':'☰ Modul';
});
function mark(a){links.forEach(link=>{const active=link===a;link.classList.toggle('active-nav',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')})}
links.forEach(a=>a.addEventListener('click',()=>{mark(a);setExpanded(false)}));
const existing=links.find(a=>a.classList.contains('active-nav'))||links[0];if(existing)mark(existing);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&top.classList.contains('w4-nav-open')){setExpanded(false);button.focus()}});
document.addEventListener('click',e=>{if(top.classList.contains('w4-nav-open')&&!top.contains(e.target))setExpanded(false)});
const media=window.matchMedia('(min-width: 901px)');media.addEventListener?.('change',()=>setExpanded(false));
})();
