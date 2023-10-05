
import Form from "../classes/Form.js";
import Router from "../classes/Router.js";
import SortTasks from "../classes/SortTasks.js";
import Task from "../classes/Task.js";




export default class App {
    // Propriétés privées
    #container;
    #containerForm;
    #containerTaskList;
    // #containerDetail;
    // #form;
    // #list;
    // #detail;
    // #sortTasks;
    // #validator;

    constructor() {
        this.#containerForm = document.querySelector("[data-js-form]");
        this.#containerTaskList = document.querySelector("[data-js-tasks]");



        this.init();
    }

    init() {
        // Patron Singleton
        if (App.instance == null) {
            App.instance = this;
        } else {
            throw new Error("Erreur de gestionnaire: Impossible de créer plusieurs instances.");
        }
        this.createTask();


    }

    recupererListeTaches(){
        //fetch php
        //on instancie les tâches
        //pour chaque élément de la base de données = new Tache();
        // const patate = new Tache();
        // patate.afficherDetail();
        
        //on garde un copie des tâche (liste d'objet tache dans le constructeur)
    }

    afficherAcceuil(){
        //fetch
    }

    afficherDetailTache(){
        //fetch
    }

    // /**
    //  * Construit, injecte et lance les comportements de chaque nouvelle tâche
    //  * @param {Int} index 
    //  */
    createTask() {
        console.log('coucou App');

        //     let newTaskDom = `
        //                     <div data-js-task=${index}>
        //                         <p>
        //                             <span>
        //                                 <small>Tâche : </small>${toDoList[index].tache}
        //                             </span>
        //                             -
        //                             <span>
        //                                 <small>Importance : </small>${toDoList[index].importance}
        //                             </span>
        //                             <span data-js-actions>
        //                                 <button data-js-action="show"l>Afficher le détail</button>
        //                                 <button data-js-action="delete">Supprimer</button>
        //                             </span>
        //                         </p>
        //                     </div> `;

        //     this._elToDoList.insertAdjacentHTML('beforeend', newTaskDom);

        //     new Task(this._elToDoList.lastElementChild);
    }
}