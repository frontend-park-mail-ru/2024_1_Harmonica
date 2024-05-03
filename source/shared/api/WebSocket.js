const config = {
    WSBackendAPI: 'wss://harmoniums.ru/',
};

class WebSocketService {
    constructor(url) {
        if (url[0] && url[0] === '/') {
            url = url.slice(1, url.length);
        }
        this.actions = {};
        this.url = config.WSBackendAPI + url;
    }

    initialize() {
        if (this.ws && this.isOpen()) {
            this.closeConn();
        }
        this.ws = new WebSocket(this.url);

        this.ws.addEventListener('open', () => {
            console.log('open');
        });

        this.ws.addEventListener('message',
            (event) => this.messageReceive(event));

        this.ws.addEventListener('error', (event) => {
            console.log('Ошибка WS:', event.message);
            // this.ws = new WebSocket(this.url);
        });

        this.ws.addEventListener('close', (event) => {
            console.log(`Код: ${event.code}`);
            console.log(`Причина: ${event.reason}`);
        });
    }

    isOpen() {
        return this.ws.readyState === 1;
    }

    closeConn() {
        if (this.ws) {
            this.ws.close(1000, 'Работа закончена!');
        }
    }

    messageReceive(event) {
        const data = event.data;
        const message = JSON.parse(data);

        if (!this.actions[message.action]) {
            return null;
        }
        this.actions[message.action]();
    }

    register(action, func) {
        this.actions[action] = func;
    }

    send(action, payload) {
        this.ws.send(JSON.stringify({
            action: action,
            payload: payload,
        }));
    }
}

export default new WebSocketService('/ws');
