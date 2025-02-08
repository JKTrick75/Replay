<?php
// $data = 'hola crtl course';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/PHPDavid/8_MVC_CRUD_Course V3 (MENU_ADMIN)/';
include($path . "module/error/model/DAOError.php");

// die('<script>console.log('.json_encode( $path . "module/error/model/DAOError.php" ) .');</script>');

switch ($_GET['op']) {
    case '503';

        // die('<script>console.log('.json_encode( $_POST ) .');</script>');
        try {
            $daoerror = new DAOError();
            $rdo = $daoerror->insert_error($_GET);
            // die('<script>console.log('.json_encode( $rdo ) .');</script>');
        } catch (Exception $e) {
            $callback = 'index.php?page=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        }

        if ($rdo) {
            echo '<script language="javascript">
                            Swal.fire({
                                title: "Error",
                                text: "Se ha producido un error inesperado!",
                                icon: "error",
                                draggable: true
                            }).then((result) => {
                                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                    // window.location.href="index.php?page=controller_course&op=list";
                                    window.location.href = document.referrer; //Ir a la página anterior
                                }
                            });
                        </script>';
        } else {
            $callback = 'index.php?page=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        }

        include("view/inc/error503.html");
        break;


    default;
        include("view/inc/error404.html");
        break;
}
