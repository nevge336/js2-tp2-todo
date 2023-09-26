import ToDoApp from "./classes/ToDoApp.js";

(function () {
    //initialiser le Gestionnaire de librairie
    const app = new ToDoApp(document.querySelector("[data-librairie]"));
})();