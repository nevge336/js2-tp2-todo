

export default class ToDoApp {

    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {Int} index 
     */
    createTask(index) {

        let newTaskDom = `
                        <div data-js-task=${index}>
                            <p>
                                <span>
                                    <small>Tâche : </small>${toDoList[index].tache}
                                </span>
                                -
                                <span>
                                    <small>Importance : </small>${toDoList[index].importance}
                                </span>
                                <span data-js-actions>
                                    <button data-js-action="show"l>Afficher le détail</button>
                                    <button data-js-action="delete">Supprimer</button>
                                </span>
                            </p>
                        </div> `;

        this._elToDoList.insertAdjacentHTML('beforeend', newTaskDom);

        new Task(this._elToDoList.lastElementChild);
    }
}