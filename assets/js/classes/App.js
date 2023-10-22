import Task from "../classes/Task.js";
import Form from "../classes/Form.js";
import Router from "../classes/Router.js";
import Sort from "../classes/Sort.js";


export default class App {
    // Propriétés privées
    #container;
    #containerForm;
    #containerTasksList;
    #router;
    // #containerDetail;
    #form;
    // #detail;
    // #sortTasks;
    // #validator;

    constructor() {
        this.#containerForm = document.querySelector("[data-js-form]");
        this.#containerTasksList = document.querySelector("[data-js-tasks]");
        this.tasksList = [];

        this.init();
    }

    init() {
        // Patron Singleton
        if (App.instance == null) {
            App.instance = this;
        } else {
            throw new Error("Erreur de gestionnaire: Impossible de créer plusieurs instances.");
        }

        // Add event listeners pour les boutons de tri
        const sortTaskBtns = document.querySelectorAll("[data-js-sort]");
        sortTaskBtns.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                // console.log(this.tasksList);
                const sortType = event.target.dataset.jsSort;
                if (sortType === "tache") {
                    Sort.byTache(this.tasksList);
                } else if (sortType === "importance") {
                    Sort.byImportance(this.tasksList);
                }
            });
        });
        this.#form = new Form();
        this.#router = new Router();
    }



    /**
    * Récupère les tâches depuis la bd avec une requête HTTP GET (via FETCH)
    */
    async getTasksList() {
        //vider la liste avant la réinjection
        this.#containerTasksList.innerHTML = "";
        try {
            const url = "api/tasks/showAll.php";
            const response = await fetch(url);
            const list = await response.json();

            if (list.length > 0) {
                list.forEach((task) => {
                    const newTask = new Task(
                        task.id,
                        task.tache,
                        task.description,
                        task.importance
                    );
                    newTask.showTask();
                    this.tasksList.push(newTask);
                });
            } else {
                this.#containerTasksList.innerHTML =
                    "<p>Aucune tâche trouvée dans la base de données</p>";
            }
        } catch (erreur) {
            console.log("erreur dans getTasksList App", erreur);
        }
    }

    showDetailById(id) {
        const task = this.tasksList.find(task => task.id === id);
        if (task) {
            //   this.hideTasksList();
            task.showDetail(id);
        }
    }




}
