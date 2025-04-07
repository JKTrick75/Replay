<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
include($path . "module/auth/model/DAOAuth.php");
include($path . "/model/middleware_auth.php");

// session_start();

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl auth';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/auth/view/auth.html");

        break;

    case 'register';
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

    case 'login':
        try {
            $daoLog = new DAOAuth();
            $rdo = $daoLog->search_user();

            if ($rdo == "error_user") {
                echo json_encode("error_user");
                exit;
            } else {
                if (password_verify($_POST['passwd_log'], $rdo['password'])) {
                    $token= create_token($rdo["username"]);
                    // $_SESSION['username'] = $rdo['username']; //Guardamos el usario 
                    // $_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
                    echo json_encode($token);
                    // echo json_encode($rdo);
                    exit;
                } else {
                    echo json_encode("error_passwd");
                    exit;
                }
            }
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        break;

    case 'data_user':
        $json = decode_token($_POST['token']);
        $daoLog = new DAOAuth();
        $rdo = $daoLog->select_data_user($json['username']);
        echo json_encode($rdo);
        exit;
        break;

    default;
        include("view/inc/error404.html");
        break;
}
