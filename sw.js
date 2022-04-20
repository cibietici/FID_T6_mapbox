/* let cacheVersion = 1
let cacheName = "web-workr-cache-"+cacheVersion
const pageToSave = "./offline.html"

// Installing service worker
this.addEventListener('install', event => {
    console.log("Installing service worker");
    event.waitUntil(caches.open(cacheName)
    .then((openCache) => {
        return openCache.add(pageToSave)
    })
    .catch(err => console.log(err)))
});

// Fetching resource
this.addEventListener('fetch', event => {
    console.log("Fetching with service worker");
    if(event.request.mode === 'navigate'){
        event.respondWith(
            fetch(event.request.url)
            .catch(_ => {
                return caches.match(pageToSave)
            })
        )
    }
});
 */

// On install, cache some stuff
addEventListener('install', function (event) {
	event.waitUntil(caches.open('core').then(function (cache) {
		cache.add(new Request('./offline.html'));
		return;
	}));
});

// listen for requests
addEventListener('fetch', function (event) {

	// Get the request
	var request = event.request;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {
				return response;
			}).catch(function (error) {
				return caches.match('offline.html');
			})
		);
	}

});