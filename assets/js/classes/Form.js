class Form extends App {
    constructor(el) {
        super();
        this._el = el;
        this._elInputTask = this._el.task;
        this._elInputDescription = this._el.description;
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            let estValide = this.validForm();
            if (estValide) {
                this.addTask();
                this._el.reset();
            }
        }.bind(this));
    }


    /**
     * Validation du formulaire
     * @returns
     */
    validForm() {

        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this._elInputTask.value == '') {
            this._elInputTask.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._elInputTask.parentNode.classList.contains('error')) this._elInputTask.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) {
            if (this._elInputImportance[0].parentNode.classList.contains('error')) this._elInputImportance[0].parentNode.classList.remove('error');
        } else {
            this._elInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }


    /**
     * Ajoute la tâche au tableau toDoList et appelle la méthode pour injecter la nouvelle tâche
     */
    addTask() {
        let task = {
            tache: this._elInputTask.value,
            description: this._elInputDescription.value,
            importance: this._el.querySelector('input[name="importance"]:checked').value
        }

        toDoList.push(task);

        // Injecte la tâche
        this.createTask(toDoList.length - 1);
    }
}