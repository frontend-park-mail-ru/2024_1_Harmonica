import pinControlBlockTemplate from './pinControllerBlock.handlebars';
import './pinControllerBlock.scss';
import {View} from '../../../app/View.js';
import {PinView} from '../../../pages/pin/ui/pinView.js';
import {PinAPI} from '../../../pages/pin/api/api.js';
import {Like} from '../../../entity/like/ui/like.js';
import {LikeAPI} from '../../../entity/like/api/api.js';
import {API} from '../../../shared/api/API.js';
import {ErrorWindowView} from '../../../entity/errorWindow/ui/errorWindow.js';
import {localStorageGetValue} from '../../../shared/utils/localStorage.js';
import {CommentView} from '../../../entity/comment/ui/comment.js';

/**
 * Class to render and handle edit and like buttons on pin
 */
export class PinControllerBlock extends View {
    /**
     * Initialize start values
     * @constructor
     * @param {Array} args – arguments to pass into parent class
     */
    constructor(...args) {
        super(...args);
        this.root = document.getElementById('pin-block-bottom');
    }

    /**
     * Function to render pins control buttons
     * @function render
     * @param {json} pin – pin information
     */
    render(pin) {
        this.root.innerHTML = pinControlBlockTemplate({pin});
        if (pin.is_owner) {
            const updateInput = document.querySelector('#pin-update');
            updateInput.addEventListener('click', (event) => {
                event.preventDefault();
                const updateView = new PinView();
                updateView.renderPinUpdate(pin);
            });

            const deleteButton = this.root.querySelector('#pin-delete');
            deleteButton.addEventListener('click', async (event) => {
                event.preventDefault();

                const api = new PinAPI(pin.pin_id);
                await api.apiDELETE();

                history.pushState(null, null, '/');
            });
        }
        const likeView = new Like();
        likeView.render(pin.is_liked);

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const likeButton = document.querySelector('#pin-like');
            const likeCount = document.querySelector('#pin-like-count');
            const likeAPI = new LikeAPI(pin.pin_id);
            let checked = pin.is_liked;
            likeButton.addEventListener('click', async (event) => {
                event.preventDefault();
                if (checked) {
                    await likeAPI.apiDELETE();
                    likeCount.innerHTML = +likeCount.innerHTML - 1;
                } else {
                    await likeAPI.apiPOST();
                    likeCount.innerHTML = +likeCount.innerHTML + 1;
                }
                checked = !checked;
                likeView.render(checked);
            });
        }

        const inputBlock = document.querySelector('#pin-comment-input');

        const commentSend = async () => {
            const user = localStorageGetValue('user');
            const errorWindow = new ErrorWindowView();
            if (!user) {
                errorWindow.render('Пользователь не авторизован');
                return;
            }
            if (inputBlock.value.replace(/(\s|\t)*/, '')) {
                const message = {
                    value: inputBlock.value,
                };

                const api = new API(`/pin/comments/${pin.pin_id}`);
                const response = await api.post(JSON.stringify(message));

                if (response.code) {
                    errorWindow.render('Возникла ошибка при отправке комментария! ' +
                        'Повторите позже.');
                    return;
                }

                const comment = {
                    value: message.value,
                    user: user,
                };
                const commentList = new CommentView('pin-block-comments');
                commentList.render(comment, true);
            }
            inputBlock.value = '';
        };

        inputBlock.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                await commentSend();
            }
        });

        const enterButton = document.querySelector('#pin-send-comment-button');

        enterButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await commentSend();
        });
    }
}
