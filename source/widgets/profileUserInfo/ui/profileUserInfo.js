import userInfoTemplate from './profileUserInfo.handlebars';
import './profile-user-info.scss';
import {Avatar} from '../../../entity/avatar/ui/avatar.js';
import {View} from '../../../app/View.js';
import {ButtonView} from '../../../entity/button/ui/button.js';
import {API} from '../../../shared/api/API.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {errors} from '../../../shared/config.js';

/**
 * Handle profile info widget
 */
export class ProfileUserInfo extends View {
    /**
     * Constructor to initialize variables in user profile page
     * @constructor
     */
    constructor(...args) {
        super(...args);
        this.userInfo = document.getElementById('user-info');
        this.currentListener = null;
    }

    unsubscribe(userID) {
        if (this.currentListener) {
            const listener = this.currentListener;
            listener.element.removeEventListener(listener.event, listener.listener);
        }

        const buttonElement = new ButtonView('profile-sub-toggle-button');
        buttonElement.render('Отписаться', ['secondary-button'], 'unsubscribe-button');

        const listener = async (event) => {
            event.preventDefault();
            const api = new API(`/users/subscribe/${userID}`);
            const response = await api.delete();

            if (response.code) {
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                return;
            }

            const followersCount = document.querySelector('#profile-followers-count');
            followersCount.innerText = +followersCount.innerText - 1;

            this.subscribe(userID);
        };

        const unsubscribeButton = document.querySelector('#unsubscribe-button');
        unsubscribeButton.addEventListener('click', listener);

        this.currentListener = {
            'element': unsubscribeButton,
            'listener': listener,
            'event': 'click',
        };
    }

    subscribe(userID) {
        if (this.currentListener) {
            const listener = this.currentListener;
            listener.element.removeEventListener(listener.event, listener.listener);
        }

        const buttonElement = new ButtonView('profile-sub-toggle-button');
        buttonElement.render('Подписаться', ['primary-button'], 'subscribe-button');

        const subscribeButton = document.querySelector('#subscribe-button');

        const listener = async (event) => {
            event.preventDefault();
            const api = new API(`/users/subscribe/${userID}`);
            const response = await api.post({});

            if (response.code) {
                const errorWindow = new ErrorWindowView();
                errorWindow.render(errors[response.code]);
                return;
            }

            const followersCount = document.querySelector('#profile-followers-count');
            followersCount.innerText = +followersCount.innerText + 1;

            this.unsubscribe(userID);
        };

        subscribeButton.addEventListener('click', listener);
        this.currentListener = {
            'element': subscribeButton,
            'listener': listener,
            'event': 'click',
        };
    }
    /**
     * Render profile info widget
     * @function render
     * @param {json} userInfo – user info to render
     */
    async render(userInfo) {
        this.userInfo.innerHTML = userInfoTemplate({userInfo});
        const avatar = new Avatar();
        avatar.render(userInfo.user.avatar_url);

        if (userInfo.is_subscribed) {
            await this.unsubscribe(userInfo.user.user_id);
        } else {
            await this.subscribe(userInfo.user.user_id);
        }
    };
}
