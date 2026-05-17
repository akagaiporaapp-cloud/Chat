// Service Worker do Talkr — Escutador de Segundo Plano
self.addEventListener('push', function(event) {
    if (event.data) {
        try {
            const data = event.data.json();
            const options = {
                body: data.body,
                icon: data.icon || 'https://picsum.photos/192/192?random=99',
                badge: data.badge || 'https://picsum.photos/96/96?random=99',
                vibrate: [200, 100, 200],
                data: { url: self.location.origin }
            };
            event.waitUntil(
                self.registration.showNotification(data.title, options)
            );
        } catch (e) {
            // Trata caso o payload venha em texto simples
            const options = {
                body: event.data.text(),
                icon: 'https://picsum.photos/192/192?random=99',
                vibrate: [200, 100, 200]
            };
            event.waitUntil(
                self.registration.showNotification('Talkr App', options)
            );
        }
    }
});

// Abre o aplicativo ao clicar na notificação
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(event.notification.data?.url || '/');
        })
    );
});
