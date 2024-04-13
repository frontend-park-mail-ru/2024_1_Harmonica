export class Router {
    constructor() {
        this.routes = [];
        this.root = "/";
        this.currentURI = '';
    }

    slashDel(path){
        return path.toString().replace(/^\//, '').replace(/\/$/,'');
    }

    pathSimplify(path){
        return path.replace(/\/\{.+?}/g, '');
    }

    register(path, view){
        path = this.root + this.slashDel(path);
        const index = this.routes.findIndex((element) => {
            return element.path === path;
        })
        if (index >= 0) {
            this.routes[index] = {
                path,
                view
            };
            return
        }
        this.routes.push({
            path,
            view
        });
    }

    start(){
        clearInterval(this.interval);
        this.interval = setInterval(async () => {
            if (this.currentURI === window.location.pathname) {
                return null;
            }
            await this.go(window.location.pathname);
        }, 300);
    }

    async go(path){
        path = this.slashDel(path)
        const url = decodeURI(this.root + path);
        window.history.pushState(null, null, url);
        let args = [];
        const reqRoute = this.routes.find((route) => {
            route = route.path;
            const routeURL = route.split('/');
            const originalURL = url.split('/');
            if (routeURL.length !== originalURL.length) {
                return false;
            }
            for (let i = 0; i < routeURL.length; ++i){
                routeURL[i] = '/' + routeURL[i];
                originalURL[i] = '/' + originalURL[i];
                if (routeURL[i].match(/\{.*?}/)){
                    args.push(originalURL[i]);
                    continue;
                }
                if (routeURL[i] !== originalURL[i]){
                    return false;
                }
            }
            return true;
        });
        this.currentURI = encodeURI(url);
        if (reqRoute){
            await reqRoute.view.render(...args);
        } else {
            //
        }
    }

    back(){
        window.history.back();
    }

    forward(){
        window.history.forward();
    }
}
