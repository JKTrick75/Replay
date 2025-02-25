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
            $daoshop_sales = new DAOShop();
            $Product_sales = $daoshop_sales->select_sales($_GET['id']);
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

        //Separar en varias llamadas al dao, como arriba en los details, y organizar la salida en varios $rdo, igual que arriba

        case 'get_filters':
        
            try {
                $daoshop = new DAOShop();
                $filter_ciudad = $daoshop->filter_ciudad();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_categoria = $daoshop->filter_categoria();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_estado = $daoshop->filter_estado();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_marca = $daoshop->filter_marca();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_tipo_consola = $daoshop->filter_tipo_consola();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_modelo_consola = $daoshop->filter_modelo_consola();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_tipo_accesorio = $daoshop->filter_tipo_accesorio();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_tipo_merchandising = $daoshop->filter_tipo_merchandising();
            } catch (Exception $e) {
                echo json_encode("error");
            }

            try {
                $daoshop = new DAOShop();
                $filter_tipo_venta = $daoshop->filter_tipo_venta();
            } catch (Exception $e) {
                echo json_encode("error");
            }
    
            if (!empty($filter_ciudad || $filter_categoria || $filter_estado || $filter_marca || $filter_tipo_consola || $filter_modelo_consola || $filter_tipo_accesorio || $filter_tipo_merchandising || $filter_tipo_venta)) {
                $rdo = array();
                $rdo[0][] = $filter_ciudad;
                $rdo[1][] = $filter_categoria;
                $rdo[2][] = $filter_estado;
                $rdo[3][] = $filter_marca;
                $rdo[4][] = $filter_tipo_consola;
                $rdo[5][] = $filter_modelo_consola;
                $rdo[6][] = $filter_tipo_accesorio;
                $rdo[7][] = $filter_tipo_merchandising;
                $rdo[8][] = $filter_tipo_venta;
                echo json_encode($rdo);
            } else {
                echo json_encode("error");
            }
            break;


    default;
        include("view/inc/error404.html");
        break;
}
