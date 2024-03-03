import {backendAPI} from "./config.js";

export class API {
    async login (post) {
        /*const url = backendAPI + "/login";
        const response = await fetch(url, {
            headers: {
                method: "POST",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
        const body = response.json();
        return `Login ok: ${response.ok}`;*/

        const body = {
            user: {
                email: post.email,
                nickname: "nickname",
                user_id: "123",
            },
        };
        return body.user;
    }

    signup(post){
        /*const url = backendAPI + "/register";
        const response = await fetch(url, {
            headers: {
                method: "POST",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
        const body = response.json();
         */

        const body = {
            user: {
                email: "email",
                nickname: "nickname",
                user_id: "123"
            },
        };
        return body.user;
    }

    async logout() {
        return "Logout ok";
    }

    feed(){

        return pins
    }
}