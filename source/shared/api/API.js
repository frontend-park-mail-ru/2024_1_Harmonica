/** @module source/modules/API */

import {backendAPI} from '../config.js';

/** Request template object */
export const fetchRequest = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Credentials': true,
    },
    credentials: 'include',
};

/**
 * API class provides API-functions.
 */
export class API {
    constructor(url) {
        this.url = backendAPI + url;
    }

    async get() {
        let response;
        try {
            response = await fetch(this.url, {
                ...fetchRequest,
            });
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            return errCheck(response);
        }
        if (response.code === 204) {
            return {
                code: 0,
            };
        }
        try {
            const body = await response.json();
            return {
                code: 0,
                body: body,
            };
        } catch (error) {
            return {
                code: 0,
            };
        }
    }

    async post(post) {
        let response;
        try {
            const addOptions = {
                method: 'post',
                body: post,
            };
            response = await fetch(this.url, {
                ...fetchRequest,
                ...addOptions,
            });
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            return errCheck(response);
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }

    async delete() {
        let response;
        try {
            const addOptions = {
                method: 'delete',
            };
            response = await fetch(this.url, {
                ...fetchRequest,
                ...addOptions,
            });
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            const body = await response.json();
            return {
                code: body.code,
            };
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }

    /**
     * Signup user by form data
     * @async
     * @function signup
     * @param {json} post - The info from register form (email, password and nickname).
     * @return {json} The data of user and code: status of error if there is or 0 otherwise.
     */
    async signup(post) {
        const url = backendAPI + '/users';
        let response;
        try {
            const addOptions = {
                method: 'post',
                body: JSON.stringify(post),
            };
            response = await fetch(url, {
                ...fetchRequest,
                ...addOptions,
            });
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
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
    /**
     * Logout current user by cookie
     * @async
     * @function logout
     * @return {json} Code: status of error if there is or 0 otherwise.
     */
    async logout() {
        const url = backendAPI + '/logout';
        let response;
        try {
            response = await fetch(url, fetchRequest);
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            return errCheck(response);
        }
        return {
            code: 0,
        };
    }
    /**
     * Get pins list
     * @async
     * @function feed
     * @return {json} The data of feed and code: status of error if there is or 0 otherwise.
     */
    async feed() {
        const url = backendAPI + '/pins' + '?' + new URLSearchParams({
            page: '0',
        });
        let response;
        try {
            response = await fetch(url, fetchRequest);
        } catch (error) {
            return errCheck(error);
        }
        if (!response.ok) {
            return errCheck(response);
        }
        const body = await response.json();
        return {
            code: 0,
            pins: body.pins,
        };
    }
    /**
     * Checks if user is authorized
     * @async
     * @function isAuth
     * @return {json} The data of user and code: status of error if there is or 0 otherwise.
     */
    async isAuth() {
        const url = backendAPI + '/is_auth';
        let response;
        try {
            response = await fetch(url, fetchRequest);
        } catch (error) {
            return errCheck(error);
        }
        fetchRequest.headers['X-CSRF-Token'] = response.headers.get('x-csrf-token');
        if (!response.ok) {
            return errCheck(response);
        }
        const body = await response.json();
        return {
            code: 0,
            body: body,
        };
    }
}
/**
 * Checks if fetch function returned an error
 * @async
 * @function errCheck
 * @param {*} error - Error to check
 * @return {json} The data of fetch and code: status of error if there is.
 */
export const errCheck = async (error) => {
    let response;
    if (error?.message === 'Failed to fetch') {
        response = {
            method: 'ERROR',
            body: {
                code: 50,
            },
        };
    } else {
        try {
            response = await error.json();
        } catch (err){
            return {
                code: 50,
            };
        }
    }
    if (response.code) {
        return {
            code: response.code,
        };
    } else if (response.errors) {
        return {
            code: 51,
            errors: response.errors,
        };
    }
    return {
        code: 50,
    };
};
