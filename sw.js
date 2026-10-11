const CACHE='smkatb-pwa-v5-1';
const ASSETS=['./DRA0001_APP.html','./workspace-v4.4.css','./workspace-v4.4.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./offline.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('smkatb-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
   e.respondWith(fetch(req).then(r=>{if(r.ok&&url.pathname.endsWith('/DRA0001_APP.html')){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return r;}).catch(()=>caches.match(req).then(r=>r||caches.match('./offline.html'))));return;
 }
 if(ASSETS.some(p=>url.pathname.endsWith('/'+p.replace('./',''))))e.respondWith(caches.match(req).then(r=>r||fetch(req)));
});
