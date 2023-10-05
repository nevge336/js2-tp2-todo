import App from "../classes/App.js";


export default class Router {
    constructor() {
        this.routes = {
            // "/": //fonction du gestionnaire,
            // "id": //fonction appropriée du gestionnaire 
        }
    }

    init() {
        //Écouter au clic
            // on change l'url avec # et on appelle gérer url
        // Écouter l'événement popstate, quand ca se déclenche, on appelle gérer l'url
    }

    gererChangementUrl(){ //on peut faire un switch
        // on récupère le #
        //on récupère le id sinon on appelle juste la page d'acceuil

        // si id, le gestionnaire trouve la bonne tâche dans sa liste et appelle la fonction 
        // afficherDetail (dans la classe Tache)

        // si un id/5 ca affiche le détail de la tâche
        //fetch, tache 5, affiche
    }
    
}

