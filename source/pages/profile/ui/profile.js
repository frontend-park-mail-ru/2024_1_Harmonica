import templateProfile from './profile.handlebars';
import './profile.css';
import {ProfileUserInfo} from '../../../widgets/profile-user-info/ui/profile-user-info.js';
import {ProfileFeed} from '../../../widgets/profile-feed/ui/profile-feed.js';

/**
 * Handle profile page
 *
 * @class
 * @classdesc This class is made for render profile and handle listeners
 */
export class Profile {
    /**
     * Define some properties for profile page
     *
     * @function constructor
     */
    constructor() {
        this.root = document.getElementById('root');
        this.user = {
            nickname: 'nickname',
            is_owner: true,
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:' +
                'ANd9GcSkxPRMT2ZiDmW3aKQyLV_x-qYAwsNYY1XG2W0m5YE-2Q&s',
            followers_number: '514K',
        };
    }

    /**
     * Render profile page
     *
     * @function render
     */
    render() {
        this.root.innerHTML = templateProfile();
        this.profileUserInfo = new ProfileUserInfo();
        this.profileFeed = new ProfileFeed();
        this.profileUserInfo.render(this.user);
        this.profileFeed.render();
    };
}
