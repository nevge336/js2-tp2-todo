<?php
// afficher les erreurs à l'écran
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR);

try {
    // 1. Se connecter à la base de données
    // Si la connexion est réussie, la variable $connection contiendra l'objet représentant la connexion
    // Sinon, une exception sera levée
    $connexion = new mysqli("localhost", "e9040356", "ypsvFC6RQCCLVc6xvhmq", "e9040356");
    // $connexion = new mysqli("localhost", "root", "", "to_do_list");

    if (mysqli_connect_error()) {
        throw new Exception("Impossible de se connecter à la DB");
    }
    $id = $_GET['id'];
    // 2. On prépare la requête
    $requete = "SELECT * FROM taches WHERE id = $id";

    $stmt = $connexion->prepare($requete);

    // 3. On exécute la requête
    // Si la requête est exécutée avec succès, la variable $data contiendra les données récupérées
    if ($stmt->execute()) {
        $data = $stmt->get_result();

        // On ferme la requête préparée car elle n'est plus utile
        // On ferme la connexion à la base de données car on n'en a plus besoin
        $stmt->close();

        if ($connexion) {
            $connexion->close();
        }

        // 4. On envoie les données au client
        // Le client recevra les données sous la forme d'un tableau d'objets JSON

        // On précise le type de contenu de la réponse pour que le client sache comment interpréter les données
        // On indique le code 200 pour indiquer que la requête s'est bien déroulée
        // On encode les données au format JSON et on les envoie au client
        header("Content-type: application/json;");
        http_response_code(200);
        echo json_encode($data->fetch_all(MYSQLI_ASSOC));
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Impossible de récupérer les données"]);
    }
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
    throw new Exception($e->getMessage());
}
