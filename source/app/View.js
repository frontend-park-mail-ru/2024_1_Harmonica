/**
 * Parent class for all View classes, so its provide shared properties and functions to view pages
 */
export class View {
    /**
     * Constructor to initialize properties in View class
     * @constructor
     */
    constructor() {
        this.eventListeners = []
    }

    render(){

    }

    destructor(){
        for (const object of this.eventListeners){
            object.root.removeEventListener(object.event, object.listenFunc);
        }
    }
}
