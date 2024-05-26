import notificationTemplate from './notification.handlebars';
import './notification.scss';
import {View} from '../../../app/View.js';

export class NotificationView extends View{
    constructor(root, ...args) {
        super(...args);
        this.root = root;
    }

    render(notification) {
        const text = {
            'new_pin': 'Пользователь на которого вы подписаны выложил новый пин',
            'subscription': `На вас подписался пользователь ${notification?.triggered_by_user?.nickname}`,
            // 'comment': `Под вашим постом оставилил комментарий`,
        }


        const content = text[notification?.type];
        const time = new Date(notification?.created_at);
        const options = {
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        const element = document.createElement('div');
        element.classList.add('notification-block');
        element.innerHTML = notificationTemplate({content, time: time.toLocaleString("ru", options)});

        this.root.insertAdjacentElement('afterbegin', element);

        this.root.addEventListener('click', (event) => {
            event.preventDefault();
            switch (notification?.type){
            case 'subscription':
                history.pushState(null, null, '/profile/' + notification?.triggered_by_user?.nickname)
                break;
            case 'new_pin':
                history.pushState(null, null, '/pin/' + notification?.pin?.pin_id);
                break;
            // case 'comment':
            //     history.pushState(null, null, '/pin/' + notification.pin.pin_id)
            //     break;
            }
        });
    }
}
