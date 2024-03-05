import {backendAPI} from "./config.js";

export class API {
    async login (post) {
        const url = backendAPI + "/login";
        let response
        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                credentials: 'include',
                body: JSON.stringify(post),
            });
        } catch (error) {
            return errCheck(error);
        }
        const body = response.json();
        if (response.status !== 200) {
            return response;
        }
        return body.user;
    }

    async signup(post){
        const url = backendAPI + "/register";
        let response;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                credentials: 'include',
                body: JSON.stringify(post),
            });
        } catch (error){
            return errCheck(error);
        }
        return response.json();
    }

    async logout() {
        const url = backendAPI + "/logout";
        let response;
        try {
            response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                credentials: 'include',
            });
        } catch (error) {
            return errCheck(error);
        }
        return response;
    }

    async feed(){
        const url = backendAPI + "/pins_list" + '?' + new URLSearchParams({
            page: '0',
        });
        let response;
        try {
            response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                credentials: 'include',
            });
        } catch (error){
            return errCheck(error);
        }
        const body = await response.json();
        return body.pins;
    }
}

const errCheck = (error) => {
    let response;
    if (error.message && error.message === "Failed to fetch"){
        response = {
            method: "ERROR",
            status: 500,
            statusText: "Internal Server Error",
            body: {
                code: 50,
            },
        }
    } else {
        response = error;
    }
    return response;
}
