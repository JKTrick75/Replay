<?php
// $data = 'hola crtl search';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
include($path . "module/search/model/DAOSearch.php");
// session_start();

switch ($_GET['op']) {

    case 'select_tipo_consola';
        // error_log('Entramos en el controller');
        try {
            $daosearch = new DAOSearch();
            $Tipo_consola = $daosearch->select_tipo_consola();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Tipo_consola)) {
            echo json_encode($Tipo_consola);
        }
        else {
            echo "error";
        }
    break;
    
    case 'select_modelo_consola_null';
        try {
            $daosearch = new DAOSearch();
            $Modelo_consola = $daosearch->select_modelo_consola_null();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Modelo_consola)) {
            echo json_encode($Modelo_consola);
        }
        else {
            echo "error";
        }
    break;

    case 'select_modelo_consola';
        try {
            $daosearch = new DAOSearch();
            $Modelo_consola = $daosearch->select_modelo_consola();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Modelo_consola)) {
            echo json_encode($Modelo_consola);
        }
        else {
            echo "error";
        }
    break;

    case 'autocomplete';
        try {
            $daosearch = new DAOSearch();
            $Tipo_consola = $daosearch->autocomplete();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        
        if (!empty($Tipo_consola)) {
            echo json_encode($Tipo_consola);
        }
        else {
            echo "error";
        }
    break;

    default;
        include("view/inc/error404.html");
    break;
}
