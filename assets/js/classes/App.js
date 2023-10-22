import Task from "../classes/Task.js";
import Form from "../classes/Form.js";
import Router from "../classes/Router.js";
import SortTasks from "../classes/SortTasks.js";


export default class App {
    // Propriétés privées
    #container;
    #containerForm;
    #containerTasksList;
    #router;
    // #containerDetail;
    #form;
    #list;
    // #detail;
    // #sortTasks;
    // #validator;

    constructor() {
        this.#containerForm = document.querySelector("[data-js-form]");
        this.#containerTasksList = document.querySelector("[data-js-tasks]");
        this.#list = [];

        // this.#tasksList;
        this.init();
    }

    init() {
        // Patron Singleton
        if (App.instance == null) {
            App.instance = this;
        } else {
            throw new Error("Erreur de gestionnaire: Impossible de créer plusieurs instances.");
        }

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
            const tasksList = await response.json();

            if (tasksList.length > 0) {

                tasksList.forEach((task) => {
                    this.task = new Task(task.id, task.tache, task.description, task.importance);
                    this.task.showTask();
                });
                this.#list.push.tasksList;
            } else {
                this.#containerTasksList.innerHTML = "<p>Aucune tâche trouvée dans la base de données</p>";
            }
        } catch (erreur) {
            console.log('erreur dans getTasksList App', erreur);
        }
    }


    showDetailById(id) {
        console.log('aksldjfhalksdhflkasdjhflkasjdhfalkjsdhflkajsdhf');
        this.showDetail();
        // this.#list[idUrl].showDetail();

            // let elementRecherche = this.#list.find(function (form) {
            //     return form.id == idUrl;

            // })  
            // if (elementRecherche) {
            //     // Appeler la méthode showDetail de l'élément trouvé
            //     elementRecherche.showDetail();
            // }
        }
    }
