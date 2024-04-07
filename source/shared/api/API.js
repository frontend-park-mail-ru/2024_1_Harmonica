/** @module source/modules/API */

import {backendAPI} from '../config.js';

/** Request template object */
export const fetchRequest = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
    credentials: 'include',
};

/**
 * API class provides API-functions.
 */
export class API {
    /**
     * Login user by from data
     * @async
     * @function login
     * @param {json} post - The info of user to login (email and password).
     * @return {json} The data of user and code: status of error if there is or 0 otherwise.
     */
    async login(post) {
        const url = backendAPI + '/login';
        let response;
        try {
            const addOptions = {
                method: 'POST',
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
            return errCheck(response);
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
                method: 'POST',
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
    if (error.message && error.message === 'Failed to fetch') {
        response = {
            method: 'ERROR',
            body: {
                code: 50,
            },
        };
    } else {
        response = await error.json();
    }
    return {
        code: response.code,
    };
};
