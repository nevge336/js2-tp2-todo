import App from "../classes/App.js";


export default class Task {
    #id;
    #tache;
    #description;
    #importance;
    #tasksList;
    #templateTache;
    #templateDetail;
    #el;
    #elActions;
    #elTaskDetail;
    #elToDoList;

    constructor(id, tache, description, importance) {
        this.#id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;



        this.#tasksList = App.instance.tasksList;

        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#elTaskDetail = document.querySelector('[data-js-task-detail]');

        this.#el;

        this.init();
    }

    init() {

    }

    /**
     *  
     */
    showTask() {

        //place le clone dans élémentHTML
        const contenu = this.#templateTache.content;
        let clone = contenu.cloneNode(true);

        // //Modifier le contenu avec replaceAll 
        const dataId = clone.querySelector('[data-js-task]');
        dataId.innerHTML = dataId.innerHTML.replaceAll("{{ID}}", this.#id);

        const dataTache = clone.querySelector("[data-tache]");
        dataTache.innerHTML = dataTache.innerHTML.replaceAll("{{TACHE}}", this.#tache)

        const dataImportance = clone.querySelector('[data-js-importance]');
        dataImportance.innerHTML = dataImportance.innerHTML.replaceAll("{{IMPORTANCE}}", this.#importance);


        //Injecter dans la liste
        const parentTaskList = document.querySelector('[data-js-tasks]');
        parentTaskList.append(clone);

        this.#el = parentTaskList.lastElementChild;
        this.#elActions = this.#el.querySelector('[data-js-actions]');
        this.#elToDoList = this.#el.closest('[data-js-tasks]');


        this.#elActions.addEventListener('click', function (e) {
            if (e.target.dataset.jsAction == 'show') this.showDetail();
            else if (e.target.dataset.jsAction == 'delete') this.delete();
        }.bind(this));

    }



    /**
     * Utilise un template pour injecter le contenu 
     * d'une tâche dans le détail de la tâche
     */
    showDetail() {
        //cloner le contenu de #templateDetail
        const contenu = this.#templateDetail.content;
        let clone = contenu.cloneNode(true);

        //Modifier le contenu avec ReplaceAll
        const dataId = clone.querySelector('[data-id]');
        dataId.innerHTML = dataId.innerHTML.replaceAll("{{ID}}", this.#id);

        const dataTache = clone.querySelector("[data-tache]");
        dataTache.innerHTML = dataTache.innerHTML.replaceAll("{{TACHE}}", this.#tache);


        const dataDescription = clone.querySelector('[data-description]');
        if (this.#description == "") {
            this.#description = "Aucune description disponible";
        }
        dataDescription.innerHTML = dataDescription.innerHTML.replaceAll("{{DESCRIPTION}}", this.#description);

        const dataImportance = clone.querySelector('[data-importance]');
        dataImportance.innerHTML = dataImportance.innerHTML.replaceAll("{{IMPORTANCE}}", this.#importance);


        //Injecter dans la liste
        this.#elTaskDetail.innerHTML = "";
        this.#elTaskDetail.append(clone);
    }


    /**
     * Efface la tâche de la liste de tâche
     */
    delete() {

        console.log("DELETE Fonctionne!!!!")
        //supprime de la bd avec FETCH
        //quand c'est supprimé, on supprime #elementHTML (remove())
        this.#el.remove();
    }




    /**
     * Initialise les comportements
     */
    // init() {
    //     this._elActions.addEventListener('click', function (e) {
    //         if (e.target.dataset.jsAction == 'show') this.showDetail();
    //         else if (e.target.dataset.jsAction == 'delete') this.delete();
    //     }.bind(this));
    // }


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