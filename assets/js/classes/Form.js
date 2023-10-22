import App from "../classes/App.js";
import Validator from "../classes/Validator.js";


export default class Form {
    #el;
    #elBouton;
    #elInputTask;
    #elInputDescription;
    #elInputImportance;
    #errorImportance;
    #elToDoList;
    #errorTask;
    #showImportanceError;

    constructor() {
        this.#el;
        this.#elInputTask;
        this.#elInputDescription;
        this.#elInputImportance;
        this.#errorImportance;
        this.#elBouton = document.querySelector('[data-js-btn]');
        this.#elToDoList = document.querySelector('[data-js-tasks]');

        // this.validator = new Validator();
        // this.validator.validForm();
        this.init();
    }



    /**
     * Initialise les comportements
     */
    init() {
        

        this.#elBouton.addEventListener('click', function (e) {
            e.preventDefault();

            // Si le formulaire est valide on ajoute form à la bd
            if (this.#validForm()) {

                const form = {
                    tache: this.#elInputTask.value,
                    description: this.#elInputDescription.value,
                    importance: this.#elInputImportance.value
                };

                this.#manageForm(form);
            }

        }.bind(this));
    }



    /**
     *  Récupère les données du formulaires (tâche et importance) pour vérifier 
     *  si le champs est rempli ou pas
     */
    #validForm() {
        let isValid = true;
        // récupérer les informations du DOM après la validation 
        this.#el = document.querySelector('[data-js-form]');
        this.#elInputTask = this.#el.task;
        this.#elInputDescription = this.#el.description;
        this.#elInputImportance = this.#el.querySelector('input[name="importance"]:checked');
        this.#errorImportance = this.#el.querySelector('[data-js-error-imp]');
        this.#showImportanceError = this.#el.querySelector('[data-js-imp]')
        this.#errorTask = this.#el.querySelector('[data-js-error-task]');

        // Valider si à la fois la tâche et l'importance sont renseignées
        if (this.#elInputTask.value && this.#elInputImportance) {
            isValid = true;

            // Réinitialiser les messages d'erreur
            this.#errorTask.textContent = ''; // Réinitialiser le message d'erreur de la tâche
            this.#errorImportance.textContent = ''; // Réinitialiser le message d'erreur de l'importance
            this.#el.firstElementChild.classList.remove('error');
            this.#showImportanceError.classList.remove('error');

        } else {
            isValid = false;

            // Afficher les messages d'erreur pour Tache
            if (!this.#elInputTask.value) {
                this.#errorTask.textContent = 'Veuillez remplir ce champ.';
                this.#el.firstElementChild.classList.add('error');
            } else {
                this.#errorTask.textContent = ''; // Réinitialiser le message d'erreur
                this.#el.firstElementChild.classList.remove('error');
            }

            // Afficher les messages d'erreur pour Importance
            if (!this.#elInputImportance) {
                this.#errorImportance.textContent = 'Veuillez sélectionner une importance.';
                this.#showImportanceError.classList.add('error');
            } else {
                this.#errorImportance.textContent = ''; // Réinitialiser le message d'erreur
                this.#showImportanceError.classList.remove('error');
            }
        }
        return isValid;
    }



    /**
     * 
     * @param {*} form Fetch pour entrer les données du formulaire dans la bd
     */
    async #manageForm(form) {

        const config = {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(form),
        };

        const url = "api/tasks/create.php";
        const response = await fetch(url, config);
        const message = await response.json();

        this.#el.reset();
        App.instance.getTasksList();
    }
}