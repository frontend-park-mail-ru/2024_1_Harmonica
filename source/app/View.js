/**
 * Parent class for all View classes, so its provide shared properties and functions to view pages
 */
export class View {
    /**
     * Constructor to initialize properties in View class
     * @constructor
     */
    constructor() {
        this.user = {
            nickname: 'nickname',
            is_owner: true,
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:' +
                'ANd9GcSkxPRMT2ZiDmW3aKQyLV_x-qYAwsNYY1XG2W0m5YE-2Q&s',
            followers_number: '514K',
        };
    }
}
