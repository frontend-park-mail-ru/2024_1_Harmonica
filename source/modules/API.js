import {backendAPI} from './config.js';

export class API {
    async login(post) {
        const url = backendAPI + '/login';
        let response;
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                credentials: 'include',
                body: JSON.stringify(post),
            });
        } catch (error) {
            return errCheck(error);
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }

    async signup(post) {
        const url = backendAPI + '/register';
        let response;
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                credentials: 'include',
                body: JSON.stringify(post),
            });
        } catch (error) {
            return errCheck(error);
        }
        if (response.status >= 400) {
            const body = await response.json();
            return {
                code: 51,
                errors: body.errors,
            };
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }

    async logout() {
        const url = backendAPI + '/logout';
        try {
            await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                credentials: 'include',
            });
        } catch (error) {
            return errCheck(error);
        }
        return {
            code: 0,
        };
    }

    async feed() {
        const url = backendAPI + '/pins_list' + '?' + new URLSearchParams({
            page: '0',
        });
        let response;
        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                credentials: 'include',
            });
        } catch (error) {
            return errCheck(error);
        }
        const body = await response.json();
        return {
            code: 0,
            pins: body.pins,
        };
    }

    async isAuth() {
        const url = backendAPI + '/is_auth';
        let response;
        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                credentials: 'include',
            });
        } catch (error) {
            return errCheck(error);
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }
}

const errCheck = async (error) => {
    let response;
    if (error.message && error.message === 'Failed to fetch') {
        response = {
            method: 'ERROR',
            body: {
                code: 50,
            },
        };
    } else {
        response = error;
    }
    return {
        code: response.body.code,
    };
};
