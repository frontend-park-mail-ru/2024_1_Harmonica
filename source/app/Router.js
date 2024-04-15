import {Error} from '../pages/error/error.js';

export class Router {
    constructor() {
        this.routes = [];
        this.root = '/';
        this.currentURI = '';
        this.currentPage = null;
    }

    slashDel(path) {
        return path.toString().replace(/^\//, '').replace(/\/$/, '');
    }

    register(path, view) {
        path = this.root + this.slashDel(path);
        const index = this.routes.findIndex((element) => {
            return element.path === path;
        });
        if (index >= 0) {
            this.routes[index] = {
                path,
                view,
            };
            return;
        }
        this.routes.push({
            path,
            view,
        });
    }

    start() {
        clearInterval(this.interval);
        this.interval = setInterval(async () => {
            if (this.currentURI === window.location.pathname) {
                return null;
            }
            await this.go(window.location.pathname);
        }, 100);
    }

    async go(path) {
        path = this.slashDel(path);
        const url = decodeURI(this.root + path);
        window.history.pushState(null, null, url);
        const args = [];
        const reqRoute = this.routes.find((route) => {
            route = route.path;
            const routeURL = route.split('/');
            const originalURL = url.split('/');
            if (routeURL.length !== originalURL.length) {
                return false;
            }
            for (let i = 0; i < routeURL.length; ++i) {
                routeURL[i] = '/' + routeURL[i];
                originalURL[i] = '/' + originalURL[i];
                if (routeURL[i].match(/\{.*?}/)) {
                    args.push(originalURL[i]);
                    continue;
                }
                if (routeURL[i] !== originalURL[i]) {
                    return false;
                }
            }
            return true;
        });
        this.currentURI = encodeURI(url);
        if (reqRoute) {
            this.currentPage = reqRoute.view;
            await reqRoute.view.render(...args);
        } else {
            const errorView = new Error();
            this.currentPage = errorView;
            errorView.render();
        }
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
