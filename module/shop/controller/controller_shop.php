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
            // $Products = $daoshop->select_products();
            $Products = $daoshop->select_products_carousel();

        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Products)) {
            echo json_encode($Products);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filter_products';
        error_log('======================================================================================');
        // error_log($_POST['filter']);
        
        $daoshop = new DAOShop();
        $Products = $daoshop -> filters_product($_POST['filter']);
        
        if (!empty($Products)) {
            echo json_encode($Products);
        }
        else {
            echo "error";
        }
        break;

    case 'get_details':
        try {
            $daoshop = new DAOShop();
            $Product_details = $daoshop->select_details($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_img = new DAOShop();
            $Product_images = $daoshop_img->select_images($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_img = new DAOShop();
            $Product_sales = $daoshop_img->select_sales($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Product_details || $Product_images || $Product_sales)) {
            $rdo = array();
            $rdo[0] = $Product_details;
            $rdo[1][] = $Product_images;
            $rdo[2][] = $Product_sales;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;

    default;
        include("view/inc/error404.html");
        break;
}
