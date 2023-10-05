import App from "../classes/App.js";


export default class Task {
    #id;
    #tache;
    #description;
    #importance;
    #listeHTML;
    #templateTache;
    #templateDetail;
    #elementHTML;

    constructor(id, tache, description, importance) {
        this.#id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;

        this.#elementHTML;

        this.#listeHTML = App.instance.liste;
        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");

        // this._el = el;
        // this._index = this._el.dataset.jsTask;
        // this._elActions = this._el.querySelector('[data-js-actions]');
        // this._elToDoList = this._el.closest('[data-js-tasks]');
        // this._elTaskDetail = document.querySelector('[data-js-task-detail]');
        this.init();
    }

    injecterUneTacheDansListe(){
        //cloner le content de #template;
        //place le clone dans élémentHTML
        //Modifier le contenu avec replaceAll 
        //Injecter dans la liste
    }

    afficherDetail(){
        //cloner le contenu de #templateDetail
        //Modifier le contenu avec ReplaceAll
        //Injecter dans la section du Détail
    }

    supprimer(){
        //supprime de la bd avec FETCH
        //quand c'est supprimé, on supprime #elementHTML (remove())
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
    // showDetail() {
    //     /* Cas description */
    //     let description = 'Aucune description disponible.';
    //     if (toDoList[this._index].description != '') description = toDoList[this._index].description;

    //     let elDetailDom = `
    //                 <div class="detail__info">
    //                     <p><small>Tâche : </small>${toDoList[this._index].tache}</p>
    //                     <p><small>Description : </small>${description}</p>
    //                     <p><small>Importance : </small>${toDoList[this._index].importance}</p>
    //                 </div>`;

    //     this._elTaskDetail.innerHTML = elDetailDom;
    // }


    // /**
    //  * Supprime la tâche du tableau toDoList et appelle la méthode pour injecter les tâches mises à jour
    //  */
    // delete() {
    //     toDoList.splice(this._index, 1);

    //     // Réinjecte les tâches purgées de la tâche supprimée
    //     this._elToDoList.innerHTML = '';
    //     for (let i = 0, l = toDoList.length; i < l; i++) {
    //         this.createTask(i);
    //     }
    // }
}