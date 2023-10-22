import Form from "../classes/Form.js";


export default class Validator {
    #el;
    #elBouton;
    #elInputTask;
    #elInputDescription;
    #elInputImportance;
    #errorImportance;
    #elToDoList;
    #errorTask;
    #showImportanceError;

    constructor(el) {
        this.#el;
        this.#elInputTask;
        this.#elInputDescription;
        this.#elInputImportance;
        this.#errorImportance;
        this.#elBouton = document.querySelector('[data-js-btn]');
        this.#elToDoList = document.querySelector('[data-js-tasks]');
    }



    /**
      *  Récupère les données du formulaires (tâche et importance) pour vérifier 
      *  si le champs est rempli ou pas
      */
    validForm() {
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
        } else {
            isValid = false;
            // Afficher les messages d'erreur si la tâche ou l'importance ne sont pas renseignées
            if (!this.#elInputTask.value) {
                this.#errorTask.textContent = 'Veuillez remplir ce champ.';
                this.#el.firstElementChild.classList.add('error');
            } else {
                this.#errorTask.textContent = ''; // Réinitialiser le message d'erreur
                this.#el.firstElementChild.classList.remove('error');
            }

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
}