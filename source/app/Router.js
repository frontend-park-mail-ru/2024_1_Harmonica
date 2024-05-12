import {Error} from '../pages/error/ui/error.js';

/**
 * Class representing router.
 */
export class Router {
    /**
     * Create a router (set initial values).
     * @constructor
     */
    constructor() {
        this.routes = [];
        this.root = '/';
        this.currentURI = '';
        this.currentPage = null;
    }

    /**
     * Deletes '/' from begin and end of the path.
     * @param {string} path - The path.
     * @return {string} New path.
     */
    slashDel(path) {
        return path.toString().replace(/^\//, '').replace(/\/$/, '');
    }

    /**
     * Сompares path to view
     * @param {string} path - The path.
     * @param {View} view - View to compare.
     */
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

    /**
     * Starts router work.
     */
    start() {
        clearInterval(this.interval);
        this.interval = setInterval(async () => {
            if (this.currentURI === window.location.pathname) {
                return null;
            }
            await this.go(window.location.pathname);
        }, 100);
    }

    /**
     * Go to view via path.
     * @async
     * @param {string} path - The path.
     */
    async go(path) {
        path = this.slashDel(path);
        const url = decodeURI(this.root + path);
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
                    if (originalURL[i][0] === '/') {
                        args.push(originalURL[i].slice(1, originalURL[i].length));
                    }
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
        const ev = new Event('pageMovement');
        dispatchEvent(ev);
    }

    /**
     * Back to prelast view.
     */
    back() {
        window.history.back();
    }

    /**
     * Go to next view.
     */
    forward() {
        window.history.forward();
    }
}
