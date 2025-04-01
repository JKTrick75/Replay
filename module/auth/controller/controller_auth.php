<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
include($path . "module/home/model/DAOHomepage.php");

// include ("module/course/model/DAOCourse.php");
// session_start();

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl auth';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/auth/view/auth.html");

        break;

    default;
        include("view/inc/error404.html");
        break;
}
