import App from "../classes/App.js";
import Validator from "../classes/Validator.js";


export default class Form {
    #el;
    #elBouton;
    #elInputTask;
    #elInputDescription;
    #elInputImportance;
    #elToDoList;

    constructor(el) {
        this.#el;
        this.#elInputTask;
        this.#elInputDescription;
        this.#elInputImportance;
        this.#elBouton = document.querySelector('[data-js-btn]');
        this.#elToDoList = document.querySelector('[data-js-tasks]');




        this.init();
    }


    /*Pour valider 
    
    Validator.estVide ;*/

    /**
     * Initialise les comportements
     */
    init() {

        this.#elBouton.addEventListener('click', function (e) {
            e.preventDefault();
            //     /* Si valide */
            //     let estValide = this.validForm();
            //     if (estValide) {
            this.addTask();
            //         this._el.reset();
            //     }
        }.bind(this));
    }



    /**
     * 
     */
    addTask() {

        //récupérer les informations du DOM après la validation 
        this.#el = document.querySelector('[data-js-form]');
        this.#elInputTask = this.#el.task;
        this.#elInputDescription = this.#el.description;
        // this.#elInputImportance = this.#el.querySelectorAll('input[name="importance"]');


        let task = {
            tache: this.#elInputTask.value,
            description: this.#elInputDescription.value,
            importance: this.#el.querySelector('input[name="importance"]:checked').value
        }
        //Valider si tache est rempli]
        const validTask = Validator.estVide(task.tache);
        if (validTask) {
            //injecter un message d'erreur
                let html = `<small>svp remplissez la tâche<small>`;
                this.#el.firstElementChild.insertAdjacentHTML('beforeend', html);   
                this.#el.firstElementChild.classList.add('error');
        }
    }
}