<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
include($path . "module/auth/model/DAOAuth.php");

// session_start();

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl auth';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/auth/view/auth.html");

        break;

    case 'register':
        //Comprobar que el username no exista
        try {
            $daoLog = new DAOAuth();
            $check_username = $daoLog->select_username();
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if ($check_username) {
            echo json_encode("error_username");
            exit;
        }

        // Comprobar que la email no exista
        try {
            $daoLog = new DAOAuth();
            $check_email = $daoLog->select_email();
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if ($check_email) {
            echo json_encode("error_email");
            exit;
        }

        // Si no existen los datos, creamos usuario
        try {
            $daoLog = new DAOAuth();
            $rdo = $daoLog->insert_user();
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error_registro");
            exit;
        } else {
            echo json_encode("ok");
            exit;
        }

        break;

    default;
        include("view/inc/error404.html");
        break;
}
