(function(){
'use strict';
if(document.documentElement.dataset.workspaceV4)return;
const sidebar=document.querySelector('.sidebar'),main=document.querySelector('.main-content'),osc=document.getElementById('onestop');
if(!sidebar||!main||!osc) return;
document.documentElement.dataset.workspaceV4='1';
const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n};
// Keep the original sidebar controls, navigation nodes and event listeners intact.
const brand=el('div','w4-brand');brand.innerHTML='<img src="logo.png" alt="Logo SMKA Tok Bachok"><span><b>SMKA TOK BACHOK</b><small>Digital Workspace</small></span>';
const top=el('header','w4-topbar');const nav=el('nav','w4-tabs');nav.setAttribute('aria-label','Modul sekolah');
const links=[...sidebar.querySelectorAll('.nav-link[onclick*="bukaModul"]')];links.forEach(a=>nav.appendChild(a));
const tools=el('div','w4-tools');const clock=sidebar.querySelector('.clock-widget');const audio=sidebar.querySelector('.audio-container');
const status=el('div','w4-status','<span class="w4-status-dot"></span> Portal Sekolah 2026');
const menuButton=el('button','w4-menu-toggle','☰ Modul');menuButton.type='button';menuButton.addEventListener('click',()=>top.classList.toggle('w4-nav-open'));
tools.append(status,menuButton);top.append(brand,nav,tools);
const app= document.querySelector('.app-container');app.parentNode.insertBefore(top,app);
const hero=el('div','w4-welcome');hero.innerHTML='<div><span class="w4-eyebrow">PORTAL PENGURUSAN BERSEPADU</span><h1>Selamat datang ke<br><strong>Digital Workspace.</strong></h1><p>Semua sistem, dokumen dan urusan sekolah — dalam satu ruang kerja yang ringkas.</p></div><div class="w4-welcome-mark"><img src="logo.png" alt="Lambang sekolah"></div>';
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
// A search action filters cards in whichever module the school user selected.
const searchbox=el('div','w4-search');searchbox.innerHTML='<i class="fas fa-magnifying-glass" aria-hidden="true"></i><input type="search" aria-label="Cari aplikasi" placeholder="Cari aplikasi dalam modul ini..."><button type="button" aria-label="Kosongkan carian">×</button>';
main.insertBefore(searchbox,main.firstChild);
const input=searchbox.querySelector('input');const reset=searchbox.querySelector('button');
function filter(){const active=[...document.querySelectorAll('.modul-section')].find(s=>getComputedStyle(s).display!=='none');if(!active)return;active.querySelectorAll('.grid-panitia .card').forEach(c=>{const yes=c.textContent.toLocaleLowerCase().includes(input.value.trim().toLocaleLowerCase());c.style.display=yes?'':'none'});}
input.addEventListener('input',filter);reset.addEventListener('click',()=>{input.value='';filter();input.focus()});
links.forEach(a=>a.addEventListener('click',()=>{top.classList.remove('w4-nav-open');input.value='';document.querySelectorAll('.grid-panitia .card').forEach(c=>c.style.display='')}));
// Keep headings in other modules as-is; CSS restyles them.
})();
