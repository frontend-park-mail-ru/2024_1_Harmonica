import {App} from './app/App.js';

if (navigator.serviceWorker) {
    await navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'});
}

const app = new App();
await app.start();
