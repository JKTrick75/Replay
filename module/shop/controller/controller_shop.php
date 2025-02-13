<?php
// $data = 'hola crtl course';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V2 (CARROUSEL)/';
include($path . "module/shop/model/DAOShop.php");

// die('<script>console.log('.json_encode( $path . "module/course/model/DAOCourse.php" ) .');</script>');

// include ("module/course/model/DAOCourse.php");
// session_start();

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl course';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/shop/view/shop.html");

        break;

    case 'get_products';
        try {
            $daoshop = new DAOShop();
            $Categories = $daoshop->select_products();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Categories)) {
            echo json_encode($Categories);
        } else {
            echo json_encode("error");
        }
        break;

    // case 'get_products_images';
    //     error_log('Esta es la id para pillar las fotos:');
    //     error_log($_GET['id']);
    //     try {
    //         $daoshop = new DAOShop();
    //         $Categories = $daoshop->select_products_images($_GET['id']);
    //     } catch (Exception $e) {
    //         echo json_encode("error");
    //     }

    //     if (!empty($Categories)) {
    //         echo json_encode($Categories);
    //     } else {
    //         echo json_encode("error");
    //     }
    //     break;

    default;
        include("view/inc/error404.html");
        break;
}
