import App from "../classes/App.js";


export default class Validator {


    
/*fonction static on appelle estVide */
    static estVide(champsFormulaire){
        let estVide = champsFormulaire == "";
        return estVide;
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
}