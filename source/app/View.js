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
            email: 'email@mail.ru',
            is_owner: true,
            avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:' +
                'ANd9GcSkxPRMT2ZiDmW3aKQyLV_x-qYAwsNYY1XG2W0m5YE-2Q&s',
            followers_number: '514K',
        };
        this.pin = {
            allow_comments: true,
            author: this.user,
            click_url: 'string',
            content_url: 'https://i.pinimg.com/564x/43/c2/4b/43c24ba032fd32edac948cfc3a477eb5.jpg',
            created_at: '02.04.2024',
            description: 'Some additional information',
            likes_count: 132,
            pin_id: 0,
            title: 'Test gap',
            is_owner: true,
        };
        this.board = {
            board_id: 1,
            title: 'This is my board',
            created_at: '01.04.2024',
            description: 'My first experience of making a board on this service',
            cover_url: '',
            visibility_type: 'public',
        };
    }
}
