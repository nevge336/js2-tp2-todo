import App from "../classes/App.js";


export default class Task {
    #tache;
    #description;
    #importance;
    #templateTache;
    #templateDetail;
    #el;
    #elActions;
    #elTaskDetail;
    #elToDoList;

    constructor(id, tache, description, importance) {
        this.id = id;
        this.#tache = tache;
        this.#description = description;
        this.#importance = importance;

        // this.tasksList = App.instance.tasksList;

        this.#templateTache = document.querySelector("[data-js-task-template]");
        this.#templateDetail = document.querySelector("[data-js-task-detail-template]");
        this.#elTaskDetail = document.querySelector('[data-js-task-detail]');

        this.#el;

        this.init();
    }

    init() {

    }



    /**
     *  Utilise clone template pour afficher une tâche
     * dans la liste de tâches
     */
    showTask() {

        //place le clone dans élémentHTML
        const contenu = this.#templateTache.content;
        let clone = contenu.cloneNode(true);

        // //Modifier le contenu avec replaceAll 
        const dataId = clone.querySelector('[data-js-task]');
        dataId.innerHTML = dataId.innerHTML.replaceAll("{{ID}}", this.id);

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
            let selectedBtn = e.target.dataset.jsAction;
            if (selectedBtn == 'show') {
                //    let id = this.id;
                //    console.log(id);
                //ici je veux envoyer l'id dans la barre url
                
                const href = this.id;
                history.pushState(null, '', href);
 
                // window.location = href; 

                // this.showDetail();
            }
            else if (selectedBtn == 'delete') {
                this.#deleteTask(this.id, this.#el);
            }

        }.bind(this));
    }




    /**
     * Utilise clone et template pour injecter le contenu 
     * d'une tâche dans le détail de la tâche
     */
    showDetail(id) {
        console.log("afficher les détails ", id);
        //cloner le contenu de #templateDetail
        const contenu = this.#templateDetail.content;
        let clone = contenu.cloneNode(true);

        //Modifier le contenu avec ReplaceAll
        const dataId = clone.querySelector('[data-id]');
        dataId.innerHTML = dataId.innerHTML.replaceAll("{{ID}}", this.id);

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
     * paramètre : id (pour la base de données)
     *           : élément html(pour enlever de la page)
     * 
     * Efface une tâche sur la base de données avec Fetch
     * et enlève l'affichage
     */
    async #deleteTask(id, elementHTML) {

        const corps = {
            id: id,
        };
        const config = {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=utf8',
            },
            body: JSON.stringify(corps),
        };

        try {
            const url = "api/tasks/delete.php";
            const response = await fetch(url, config);

            //pour voir les erreurs
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const elDeleted = await response.json();
            elementHTML.remove();

        } catch (erreur) {
            console.log('erreur dans delete task', erreur);
        }
    }
}