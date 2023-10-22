<?php
// afficher les erreurs à l'écran
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR);

$data = file_get_contents("php://input");
$data = json_decode($data, true);
$tache = $data["tache"];
$description = $data["description"];
$importance = $data["importance"];

try {
    $connexion = new mysqli("localhost", "e9040356", "ypsvFC6RQCCLVc6xvhmq", "e9040356");
    // $connexion = new mysqli("localhost", "root", "", "to_do_list");
    if (mysqli_connect_error()) {
        throw new Exception("Impossible de se connecter à la DB");
    }



    // 2. On prépare la requête
    $requete = "INSERT INTO taches (tache, description, importance) VALUES (?, ?, ?)";
    $stmt = $connexion->prepare($requete);
    //sss indique un string et règle le problème d'apostrophe
    $stmt->bind_param("sss", $tache, $description, $importance);


    // 3. On exécute la requête
    if ($stmt->execute()) {
        $message = "Requête exécutée avec succès";
        $id = $connexion->insert_id;
        $stmt->close();

        if ($connexion) {
            $connexion->close();
        }

        // 4. On envoie les données au client
        $reponse = array("message" => $message, "id" => $id);
        header("Content-type: application/json;");
        http_response_code(200);
        echo json_encode($reponse);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Impossible de récupérer les données"]);
    }
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
    throw new Exception($e->getMessage());
}
