const config = {
    WSBackendAPI: 'wss://harmoniums.ru/',
}

export class WebSocketService {
    constructor(url) {
        if (url[0] === '/'){
            url.slice(1, url.length);
        }

        this.actions = {};

        this.url = config.WSBackendAPI + url;
        this.ws = new WebSocket(this.url);

        this.ws.addEventListener('open', () => {
            this.ws.addEventListener('message',
                (event) => this.messageReceive(event));
        });

        this.ws.addEventListener('error', (event) => {
            console.log(`Ошибка WS: ${event.message}`);
        });

        this.ws.addEventListener('close', (event) => {
            console.log(`Код: ${event.code}`);
            console.log(`Причина: ${event.reason}`);
        });
    }

    messageReceive(event){
        const data = event.data;
        const message = JSON.parse(data);

        if (!this.actions[message.action]){
            return null;
        }
        this.actions[message.action]();
    }

    register(action, func){
        this.actions[action] = func;
    }

    send(action, payload){
        this.ws.send(JSON.stringify({
            action: action,
            payload: payload,
        }))
    }
}
