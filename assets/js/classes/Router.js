import App from "../classes/App.js";
import Task from "../classes/Task.js";

export default class Router {
    #routes;

    constructor() {
        this.app = App.instance;

        this.#routes = {
            "/": this.app.getTasksList.bind(this.app),
            "/:id": this.app.showDetailById.bind(this.app),
        };

        this.init();
    }

    init() {
        window.addEventListener("popstate", this.manageUrl.bind(this));
        this.manageUrl();

        // Call getTasksList when the Router is initialized
        this.app.getTasksList();
    }

    /**
     *  Déconstruire l'url et rediriger
     */
    manageUrl() {
        const url = location.hash.slice(1) || "/";
        const fragments = url.split("/");

        if (fragments.length === 2) {
            const id = fragments[1];
            this.#routes["/:id"](id);
        } else {
            this.#routes["/"]();
        }
    }
}