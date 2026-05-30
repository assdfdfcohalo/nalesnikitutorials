self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'STORE_IMAGE') {
        caches.open('mobywatel-v1').then((cache) => {
            var response = new Response(event.data.image, {
                headers: { 'Content-Type': 'text/plain' }
            });
            cache.put('/profileImage', response);
        });
    }
});

self.addEventListener('fetch', (event) => {});