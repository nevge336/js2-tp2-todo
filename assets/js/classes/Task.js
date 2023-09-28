import App from "../classes/App.js";


export default class Task {
    constructor(el) {
        this._el = el;
        this._index = this._el.dataset.jsTask;
        this._elActions = this._el.querySelector('[data-js-actions]');
        
        this._elToDoList = this._el.closest('[data-js-tasks]');
        this._elTaskDetail = document.querySelector('[data-js-task-detail]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'show') this.showDetail();
            else if (e.target.dataset.jsAction == 'delete') this.delete();
        }.bind(this));
    }


    /**
     * Affiche le détail d'une tâche
     */
    showDetail() {
        /* Cas description */
        let description = 'Aucune description disponible.';
        if (toDoList[this._index].description != '') description = toDoList[this._index].description;

        let elDetailDom = `
                    <div class="detail__info">
                        <p><small>Tâche : </small>${toDoList[this._index].tache}</p>
                        <p><small>Description : </small>${description}</p>
                        <p><small>Importance : </small>${toDoList[this._index].importance}</p>
                    </div>`;

        this._elTaskDetail.innerHTML = elDetailDom;
    }


    /**
     * Supprime la tâche du tableau toDoList et appelle la méthode pour injecter les tâches mises à jour
     */
    delete() {
        toDoList.splice(this._index, 1);

        // Réinjecte les tâches purgées de la tâche supprimée
        this._elToDoList.innerHTML = '';
        for (let i = 0, l = toDoList.length; i < l; i++) {
            this.createTask(i);
        }
    }
}