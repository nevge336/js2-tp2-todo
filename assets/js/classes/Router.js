import App from "../classes/App.js";
import Task from "../classes/Task.js"


export default class Router {
    #routes
    constructor() {
        this.app = App.instance;

        this.#routes = {
            "/": this.app.getTasksList.bind(this.app),
            "/:id": this.handleTaskDetail.bind(this)
        }

        this.init();
    }

    init() {
        window.addEventListener("popstate", this.manageUrl.bind(this));
        this.manageUrl();


    }

    handleTaskDetail(id) {
        const selectedId = window.location.pathname.slice(1);
        this.app.showDetailById(selectedId);
        console.log(selectedId);
    }

    /**
     *  Déconstruire l'url et rediriger 
     */
    manageUrl() {
        // décortique les éléments de l'url et vérifie s'il y a quelque chose après le slash "/"
        const url = location.hash.slice(1) || "/";

        this.#routes[url]();

    }
}



