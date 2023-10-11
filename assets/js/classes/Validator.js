import Form from "../classes/Form.js";


export default class Validator {



    /*fonction static on appelle estVide */
    static estVide(champsFormulaire) {
        let estVide = champsFormulaire == "";
        return estVide;
    }



}
