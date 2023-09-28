import App from "../classes/App.js";


export default class Router {
    #conteneur;
    #nav;
    #routes;
    #main;
    constructor() {
        this.#conteneur = document.querySelector("[data-component='router']");
        this.#nav = this.#conteneur.querySelector("[data-nav-list]");
        this.#main = this.#conteneur.querySelector("main");

        this.#routes = {
            equipes: GestionnaireLigue.instance.getEquipes.bind(
                GestionnaireLigue.instance
            ),
            "equipes/:id": GestionnaireLigue.instance.getJoueursParEquipe.bind(
                GestionnaireLigue.instance
            ),
            "ajout-joueur": GestionnaireLigue.instance.ajouterJoueur.bind(
                GestionnaireLigue.instance
            ),
            accueil: GestionnaireLigue.instance.accueil.bind(
                GestionnaireLigue.instance
            ),
        };


        this.init();
        // let id = 2;
        // this.#routes["equipes/:id"]( id );
    }

    init() {

        this.#nav.addEventListener('click', this.gererNavigation.bind(this));

        this.#main.addEventListener('click', this.gererId.bind(this));

        window.addEventListener("popstate", this.gererChangementUrl.bind(this));

        this.gererChangementUrl();
    }



    /**
     * @param {*} evenement 
     * au clic du lien de navigation on affiche "équipe" ou "ajout-joueur" 
     */
    gererNavigation(evenement) {
        evenement.preventDefault();
        const target = evenement.target.closest('[data-href]');
        if (target !== null) {
            //donner un nom à la page
            const name = target.innerText;
            document.title = name;

            const route = target.dataset.href;
            history.pushState({ title: route }, "", route);
            // console.log(url);
            this.gererChangementUrl();
        }

    }



    /**
     * 
     * @param {*} evenement 
     * au clic du nom de l'équipe, on affiche la liste des joueurs par équipe (id)
     */
    gererId(evenement) {
        if (evenement.target.closest("[data-equipe]")) {
            const target = evenement.target.closest("[data-equipe]");
            // donner un nom à la page
            const name = target.innerText;
            document.title = name;

            // id de l'équipe
            const id = target.dataset.equipe;
            const href = `#equipes/${id}`;
            history.pushState({ id: id }, "", href);
            this.gererChangementUrl();
        }
    }



    /**
     *  Déconstruire l'url et rediriger 
     */
    gererChangementUrl() {
        // décortique les éléments de l'url et vérifie s'il y a quelque chose après le slash "/"
        const hash = location.hash.slice(1) || "/";
        const fragments = hash.split("/");

        let id;
        if (fragments[1] !== "" && fragments[1] !== undefined) {

            id = history.state.id; // on récupère la valeur du id
        }

        switch (fragments[0]) {
            case "equipes":
                if (id) {
                    this.#routes["equipes/:id"](id);
                } else {
                    this.#routes.equipes();
                }
                break;
            case "ajout-joueur":
                this.#routes["ajout-joueur"]();
                break;
            default:
                this.#routes.accueil();
        }
    }
};

