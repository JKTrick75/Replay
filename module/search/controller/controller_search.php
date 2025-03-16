<?php
// $data = 'hola crtl search';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V2 (CARROUSEL)/';
include($path . "module/home/model/DAOSearch.php");

// session_start();

switch ($_GET['op']) {
    // case 'list';
    //     // $data = 'hola crtl search';
    //     // die('<script>console.log('.json_encode( $data ) .');</script>');

    //     include("module/home/view/home.html");

    //     break;

    // case 'get_categories';
    //     try {
    //         $daohome = new DAOHome();
    //         $Categories = $daohome->select_categories();
    //     } catch (Exception $e) {
    //         echo json_encode("error");
    //     }

    // default;
    //     include("view/inc/error404.html");
    //     break;
}
