import {backendAPI} from "./config.js";

export class API {
    async login (post) {
        const url = backendAPI + "/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            credentials: 'include',
            body: JSON.stringify(post),
        });
        const body = response.json();
        if (response.status !== 200) {
            return null;
        }
        return body.user;
    }

    async signup(post){
        const url = backendAPI + "/register";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            credentials: 'include',
            body: JSON.stringify(post),
        });
        return response.json();
    }

    async logout() {
        const url = backendAPI + "/logout";
        await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            credentials: 'include',
        });
    }

    async feed(){
        const url = backendAPI + "/pins_list" + '?' + new URLSearchParams({
            page: '0',
        });
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            credentials: 'include',
        });
        const body = await response.json();
        return body.pins;
    }
}