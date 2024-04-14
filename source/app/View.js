/**
 * Parent class for all View classes, so its provide shared properties and functions to view pages
 */
export class View {
    listenObjects = [];
    /**
     * Constructor to initialize properties in View class
     * @constructor
     */
    constructor() {

    }

    render(){

    }

    destructor(){
        for (const object of super.eventListeners){
            object.root.removeEventListener('click', object.entity.onClick);
        }
    }
}
