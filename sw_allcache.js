
//Alternativ metode for å cache er dette 
//Vi lagre filer underveis mens vi bla gjennom
const cache_NAME = 'v1_OsloBS_site_all';

// install event
self.addEventListener('install', (e) => {
	console.log('service worker installed');
});


// ta ut cache filer fra cach om det ikke er nett 
self.addEventListener('fetch', (e) => {
	e.respondWith(
		// neste linje feiler om det ikke er nett
		// vi fanger det med catch
		fetch(e.request)
            .then(res => {
                const responseClone = res.clone();
                caches.open(cache_NAME)
                    .then(cache => {
                        cache.put(e.request, responseClone)
                    });
                return res;
            // hvis nett faller dette som kommer respondere
            }).catch(error => {
                caches.match(e.request).then(res => {
                    return res;
                })
            })
		)
});