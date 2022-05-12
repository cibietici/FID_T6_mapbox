
// vi definere her navn av cache mappa 
const cache_NAME = 'v1OsloBS';
// vi definere her lista av filer vi kommer til å lagre
const cache_ASSETS = [
	'./index.html',
	'./css/style.css',
	'./js/app.js',
	'./manifest.json'
]
// install event
self.addEventListener('install', (e) => {
	console.log('service worker installed');
	e.waitUntil(
		caches
			.open(cache_NAME)
			.then(cache => {
				console.log('SW is caching');
				cache.addAll(cache_ASSETS);
			})
			.then(() => self.skipWaiting())
			.catch(err => console.log(err))
	);
});

// activate event
// vi kan gjøre ting her som for eksempel slette gammel cache
/* self.addEventListener('activate', (e) => {
	console.log('service worker activate');
	// ta borte cache
	e.waitUntil(
		caches.keys().then(cache_NAME => {
			return Promise.all(
				cache_NAME.map(cache => {
					if(cache !== cache_NAME) {
						return caches.delete(cache);
					}
				})
			)
		})
	);
}); */

// ta ut cache filer fra cache om det ikke er nett 
self.addEventListener('fetch', (e) => {
	e.respondWith(
		// neste linje med feiler om det ikke er nett
		// vi fanger det med catch
		fetch(e.request).catch(() =>{
			return caches.match(e.request)
		})
	)
});
