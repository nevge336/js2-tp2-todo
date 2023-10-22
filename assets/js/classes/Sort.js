import App from "../classes/App.js";
import Task from "../classes/Task.js";


export default class Sort {
  static byTache(tasksList) {
    // Trier par le nom de tache
    tasksList.sort((task1, task2) => task1.tache.localeCompare(task2.tache));

    // Effacer la liste de tâches
    const parentTaskList = document.querySelector('[data-js-tasks]');
    parentTaskList.innerHTML = '';

    // Afficher les tâches triées
    tasksList.forEach((task) => {
      const newTask = new Task(task.id, task.tache, task.description, task.importance);
      newTask.showTask();
    });
  }

  static byImportance(tasksList) {
    // Filtrer par importance
    tasksList.sort((task1, task2) => task1.importance - task2.importance);

    // Nettoyer la liste
    const parentTaskList = document.querySelector('[data-js-tasks]');
    parentTaskList.innerHTML = '';

    // afficher les tâches triées
    tasksList.forEach((task) => {
      const newTask = new Task(task.id, task.tache, task.description, task.importance);
      newTask.showTask();
    });
  }
}