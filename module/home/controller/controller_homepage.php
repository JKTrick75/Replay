<?php
// $data = 'hola crtl course';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V2 (CARROUSEL)/';
include($path . "module/home/model/DAOHomepage.php");

// die('<script>console.log('.json_encode( $path . "module/course/model/DAOCourse.php" ) .');</script>');

// include ("module/course/model/DAOCourse.php");
// session_start();

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl course';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/home/view/home.html");

        break;

    case 'get_categories';
        try {
            $daohome = new DAOHome();
            $Categories = $daohome->select_categories();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Categories)) {
            echo json_encode($Categories);
        } else {
            echo json_encode("error");
        }
        break;

    case 'get_marcas';
        try {
            $daohome = new DAOHome();
            $Marcas = $daohome->select_marcas();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Marcas)) {
            echo json_encode($Marcas);
        } else {
            echo json_encode("error");
        }
        break;

    case 'get_tipo_consola';
        try {
            $daohome = new DAOHome();
            $Tipo_consola = $daohome->select_tipo_consola();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Tipo_consola)) {
            echo json_encode($Tipo_consola);
        } else {
            echo json_encode("error");
        }
        break;

    case 'get_ciudad';
        try {
            $daohome = new DAOHome();
            $Ciudad = $daohome->select_ciudad();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Ciudad)) {
            echo json_encode($Ciudad);
        } else {
            echo json_encode("error");
        }
        break;

    case 'get_estado';
        try {
            $daohome = new DAOHome();
            $Estado = $daohome->select_estado();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Estado)) {
            echo json_encode($Estado);
        } else {
            echo json_encode("error");
        }
        break;

    case 'get_tipo_venta';
        try {
            $daohome = new DAOHome();
            $Tipo_venta = $daohome->select_tipo_venta();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Tipo_venta)) {
            echo json_encode($Tipo_venta);
        } else {
            echo json_encode("error");
        }
        break;

    case 'Carrousel_Ciudades';
        try {
            $daohome = new DAOHome();
            $Ciudad = $daohome->select_ciudad();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Ciudad)) {
            echo json_encode($Ciudad);
        } else {
            echo json_encode("error");
        }
        break;

    case 'Carrousel_Productos';
        try {
            $daohome = new DAOHome();
            $Ciudad = $daohome->select_CarouselProductos();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Ciudad)) {
            echo json_encode($Ciudad);
        } else {
            echo json_encode("error");
        }
        break;

    default;
        include("view/inc/error404.html");
        break;
}
