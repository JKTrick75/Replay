<?php
// $data = 'hola crtl course';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
include($path . "module/shop/model/DAOShop.php");
include($path . "/model/middleware_auth.php");
//Sesion start
@session_start();
if (isset($_SESSION["tiempo"])) {  
    $_SESSION["tiempo"] = time(); //Devuelve la fecha actual
}

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl course';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/shop/view/shop.html");

        break;

    case 'get_all_products';
        try {
            $daoshop = new DAOShop();
            $Products = $daoshop->select_all_products();

        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Products)) {
            echo json_encode($Products);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filter_shop';
        // error_log('======================================================================================');
        // error_log($_POST['filter']);
        // echo json_encode($_POST['filter']);
        try{
            $daoshop = new DAOShop();
            $Products = $daoshop -> filter_shop();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Products)) {
            echo json_encode($Products);
        }
        else {
            echo "error";
        }
        break;
    
    case 'filter_home';
        try{
            $daoshop = new DAOShop();
            $Products = $daoshop -> filter_home();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Products)) {
            echo json_encode($Products);
        }
        else {
            echo "error";
        }
        break;
    
    case 'filter_search';
        try{
            $daoshop = new DAOShop();
            $Products = $daoshop -> filter_search();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Products)) {
            echo json_encode($Products);
        }
        else {
            echo "error";
        }
        break;
    
    case 'pagination_all_products';
        try {
            $daoshop = new DAOShop();
            $Products = $daoshop->pagination_all_products();

        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Products)) {
            echo json_encode($Products);
        } else {
            echo json_encode("error");
        }
        break;

    case 'pagination_shop';
        try{
            $daoshop = new DAOShop();
            $Products = $daoshop -> pagination_shop();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Products)) {
            echo json_encode($Products);
        }
        else {
            echo "error";
        }
        break;

    case 'pagination_home';
        try{
            $daoshop = new DAOShop();
            $Products = $daoshop -> pagination_home();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Products)) {
            echo json_encode($Products);
        }
        else {
            echo "error";
        }
        break;

    case 'pagination_search';
        try{
            $daoshop = new DAOShop();
            $Products = $daoshop -> pagination_search();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Products)) {
            echo json_encode($Products);
        }
        else {
            echo "error";
        }
        break;

    //Recogemos todos los datos necesarios para el details (datos del producto, imágenes y tipos de venta)
    case 'get_details';
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

    //Contamos el máximo de productos relacionados que podemos cargar
    case 'count_related';
        try{
            $daoshop = new DAOShop();
            $count = $daoshop -> count_related();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($count)) {
            echo json_encode($count);
        }
        else {
            echo "error";
        }
        break;

    //Contamos el máximo de productos relacionados que podemos cargar
    case 'load_related';
        try{
            $daoshop = new DAOShop();
            $count = $daoshop -> load_related();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($count)) {
            echo json_encode($count);
        }
        else {
            echo "error";
        }
        break;

    //Aumentamos el contador de popularidad
    case 'count_popularity';
        try{
            $daoshop = new DAOShop();
            $count = $daoshop -> count_popularity($_POST['id_producto']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;

    //Recogemos todos los datos de los filtros dinámicos
    case 'get_filters';
        try {
            $daoshop = new DAOShop();
            $filter_categoria = $daoshop->filter_categoria();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        try {
            $daoshop = new DAOShop();
            $filter_ciudad = $daoshop->filter_ciudad();
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

        try {
            $daoshop = new DAOShop();
            $filter_precio = $daoshop->filter_precio();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        //Ordenamos los datos de salida
        if (!empty($filter_ciudad || $filter_categoria || $filter_estado || $filter_marca || $filter_tipo_consola || $filter_modelo_consola || $filter_tipo_accesorio || $filter_tipo_merchandising || $filter_tipo_venta || $filter_precio)) {
            $rdo = array();
            $rdo[0][] = $filter_categoria;
            $rdo[1][] = $filter_ciudad;
            $rdo[2][] = $filter_estado;
            $rdo[3][] = $filter_marca;
            $rdo[4][] = $filter_tipo_consola;
            $rdo[5][] = $filter_modelo_consola;
            $rdo[6][] = $filter_tipo_accesorio;
            $rdo[7][] = $filter_tipo_merchandising;
            $rdo[8][] = $filter_tipo_venta;
            $rdo[9][] = $filter_precio;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;

    case 'count_products';
        try{
            $daoshop = new DAOShop();
            $count = $daoshop -> count_products();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($count)) {
            echo json_encode($count);
        }
        else {
            echo "error";
        }
        break;

    /* ============================================================================================ */
    /*                                       LIKES                                                  */
    /* ============================================================================================ */

    case 'controller_likes':
        $token = $_POST['token'];
        $id_producto = $_POST['id_producto'];

        try {
            $json = decode_token($token);
            $dao = new DAOShop();
            $rdo = $dao->select_likes($id_producto, $json['username']); //Buscamos si el usuario tiene like en ese producto
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            $array_likes = array();
            foreach ($rdo as $row) {
                array_push($array_likes, $row);
            }
            if (count($array_likes) === 0) { //Si no tiene like en ese producto, lo añadimos a la tabla likes
                $dao = new DAOShop();
                $rdo = $dao->like($id_producto, $json['username']);
                echo json_encode("0");
            } else { //Si ya tenía puesto like en ese producto, lo borramos de la tabla likes
                $dao = new DAOShop();
                $rdo = $dao->dislike($id_producto, $json['username']);
                echo json_encode("1");
            }
        }
        break;

    case 'highlight_likes_user';
        try {
            $json = decode_token($_POST['token']);
            $dao = new DAOShop();
            $rdo = $dao->search_user_likes($json['username']); //Buscamos la lista de likes del usuario
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            $array_likes = array();
            foreach ($rdo as $row) {
                array_push($array_likes, $row);
            }
            echo json_encode($array_likes);
        }
        break;

    default;
        include("view/inc/error404.html");
        break;
}
