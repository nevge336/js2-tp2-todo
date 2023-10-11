import Task from "../classes/Task.js";
import Form from "../classes/Form.js";
import Router from "../classes/Router.js";
import SortTasks from "../classes/SortTasks.js";


export default class App {
    // Propriétés privées
    #container;
    #containerForm;
    #containerTaskList;
    // #containerDetail;
    #form;
    // #list;
    // #detail;
    // #sortTasks;
    // #validator;

    constructor() {
        this.#containerForm = document.querySelector("[data-js-form]");
        this.#containerTaskList = document.querySelector("[data-js-tasks]");


        this.taskList = [];
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
        this.getTaskList();

    }

    /**
    * Récupère les sondages depuis le serveur avec une requête HTTP GET (via FETCH)
    */
    async getTaskList() {
        try {
            const url = "api/tasks/showAll.php";
            const reponse = await fetch(url);
            const tasksList = await reponse.json();

            if (tasksList.length > 0) {
                // let listeElements = "";

                tasksList.forEach((task) => {
                    this.task = new Task(task.id, task.tache, task.description, task.importance);
                    this.task.showTask();

                });


            } else {
                this.#containerTaskList.innerHTML = "<p>Aucune tâche trouvée dans la base de données</p>";
            }
        } catch (erreur) {
            console.log('erreur dans getTasksList App', erreur);
            // this.accueil();
        }
    }



    //on garde un copie des tâche (liste d'objet tache dans le constructeur)

    afficherAcceuil() {
        //fetch
    }

    afficherDetailTache() {
        //fetch
    }


}