import templateProfile from './profile.handlebars';
import './profile.css';
import profileUserInfo from '../../../widgets/profile-user-info/ui/profile-user-info.js';

/**
 * Handle profile page
 *
 * @class
 * @classdesc This class is made for render profile and handle listeners
 */
class Profile {
    /**
     * Render user profile page
     *
     * @function render
     */
    render() {
        const root = document.getElementById('root');
        const user = {
            nickname: 'nickname',
            is_owner: true,
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:' +
                'ANd9GcSkxPRMT2ZiDmW3aKQyLV_x-qYAwsNYY1XG2W0m5YE-2Q&s',
            followers_number: '514K',
        };
        root.innerHTML = templateProfile();
        profileUserInfo.render(user);
    };
}

export default new Profile();
