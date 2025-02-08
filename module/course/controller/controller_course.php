<?php
// $data = 'hola crtl course';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/PHPDavid/8_MVC_CRUD_Course V3 (MENU_ADMIN)/';
include($path . "module/course/model/DAOCourse.php");

// die('<script>console.log('.json_encode( $path . "module/course/model/DAOCourse.php" ) .');</script>');

// include ("module/course/model/DAOCourse.php");
// session_start();

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl course';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        try {
            $daocourse = new DAOCourse();

            // Obtener los filtros
            $category = isset($_POST['category']) ? $_POST['category'] : '';
            $dificulty = isset($_POST['dificulty']) ? $_POST['dificulty'] : '';
            $price = isset($_POST['price']) ? $_POST['price'] : '';

            //Llamar al método de selección con filtros
            $rdo = $daocourse->select_courses_with_filters($category, $dificulty, $price);
            //$rdo = $daocourse->select_all_course();
            // die('<script>console.log('.json_encode( $rdo->num_rows ) .');</script>');
        } catch (Exception $e) {
            $callback = 'index.php?page=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        }

        if (!$rdo) {
            $callback = 'index.php?page=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        } else {
            include("module/course/view/list_course.php");
        }
        break;

    case 'create';
        // $data = 'hola crtl course create';
        // die('<script>console.log('.json_encode( $data ) .');</script>');
        // die('<script>console.log('.json_encode( $_POST ) .');</script>');

        include("module/course/model/validate.php");

        $check = true;

        if ($_POST) {
            // $data = 'hola create post course';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
            // die('<script>console.log('.json_encode( $_POST ) .');</script>');

            $check = validate_create_php();
            //die('<script>console.log('.json_encode( $check ) .');</script>');

            if ($check) {
                // die('<script>console.log('.json_encode( $_POST ) .');</script>');
                try {
                    $daocourse = new DAOCourse();
                    $rdo = $daocourse->insert_course($_POST);
                    // die('<script>console.log('.json_encode( $rdo ) .');</script>');
                } catch (Exception $e) {
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="' . $callback . '";</script>');
                }

                if ($rdo) {
                    echo '<script language="javascript">
                                Swal.fire({
                                    title: "Curso creado correctamente!",
                                    icon: "success",
                                    draggable: true
                                }).then((result) => {
                                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                        window.location.href="index.php?page=controller_course&op=list";
                                    }
                                });
                            </script>';
                } else {
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="' . $callback . '";</script>');
                }
            }
        }
        include("module/course/view/create_course.php");
        break;

    case 'update';
        // $data = 'hola crtl course update';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/course/model/validate.php");
        $check = true;

        if ($_POST) {
            // $data = 'hola update post course';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
            // die('<script>console.log('.json_encode( $_POST ) .');</script>');

            $check = validate_update_php();
            //die('<script>console.log('.json_encode( $check ) .');</script>');

            if ($check) {
                //die('<script>console.log('.json_encode( $_POST ) .');</script>');
                try {
                    $daocourse = new DAOCourse();
                    $rdo = $daocourse->update_course($_POST);
                    //die('<script>console.log('.json_encode( $rdo ) .');</script>');
                } catch (Exception $e) {
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="' . $callback . '";</script>');
                }

                if ($rdo) {
                    echo '<script language="javascript">
                                Swal.fire({
                                    title: "Curso modificado correctamente!",
                                    icon: "success",
                                    draggable: true
                                }).then((result) => {
                                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                        window.location.href="index.php?page=controller_course&op=list";
                                    }
                                });
                            </script>';
                } else {
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="' . $callback . '";</script>');
                }
            }
        }

        // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');
        try {
            $daocourse = new DAOCourse();
            $rdo = $daocourse->select_course($_GET['id']);
            $course = get_object_vars($rdo);
        } catch (Exception $e) {
            $callback = 'index.php?page=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        }

        if (!$rdo) {
            $callback = 'index.php?page=503';
            die('<script>window.location.href="' . $callback . '";</script>');
        } else {
            include("module/course/view/update_course.php");
        }
        break;

        // case 'read';
        //     // $data = 'hola crtl course read';
        //     // die('<script>console.log('.json_encode( $data ) .');</script>');
        //     // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');

        //     try{
        //         $daocourse = new DAOCourse();
        //     	$rdo = $daocourse->select_course($_GET['id']);
        //     	$course=get_object_vars($rdo);
        //         // die('<script>console.log('.json_encode( $course ) .');</script>');
        //     }catch (Exception $e){
        //         $callback = 'index.php?page=503';
        // 	    die('<script>window.location.href="'.$callback .'";</script>');
        //     }
        //     if(!$rdo){
        // 		$callback = 'index.php?page=503';
        // 		die('<script>window.location.href="'.$callback .'";</script>');
        // 	}else{
        //         include("module/course/view/read_course.php");
        // 	}
        //     break;

    case 'delete';
        // $data = 'hola crtl course delete';
        // die('<script>console.log('.json_encode( $data ) .');</script>');
        // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');

        if ($_POST) {
            // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');
            try {
                $daocourse = new DAOCourse();
                $rdo = $daocourse->delete_course($_GET['id']);
            } catch (Exception $e) {
                $callback = 'index.php?page=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            }
            if ($rdo) {
                echo '<script language="javascript">
                        Swal.fire({
                            title: "El curso: ' . $_POST['courseName'] . ' ha sido borrado correctamente!",
                            icon: "success",
                            draggable: true
                        }).then((result) => {
                            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                window.location.href="index.php?page=controller_course&op=list";
                            }
                        });
                    </script>';
            } else {
                $callback = 'index.php?page=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            }
        } else {
            try {
                $daocourse = new DAOCourse();
                $rdo = $daocourse->select_course($_GET['id']);
                $course = get_object_vars($rdo);
                // echo '<script>console.log("Hola");</script>';
                // die('<script>console.log('.json_encode( $course ) .');</script>');
            } catch (Exception $e) {
                $callback = 'index.php?page=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            }
            if (!$rdo) {
                $callback = 'index.php?page=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            } else {
                include("module/course/view/delete_course.php");
            }
        }
        break;

    case 'delete_all';
        // $data = 'hola crtl course delete all';
        // die('<script>console.log('.json_encode( $data ) .');</script>');
        // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');

        if ($_POST) {
            // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');
            try {
                $daocourse = new DAOCourse();
                $rdo = $daocourse->delete_all_course();
            } catch (Exception $e) {
                $callback = 'index.php?page=controller_course&op=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            }

            if ($rdo) {
                echo '<script language="javascript">
                            Swal.fire({
                                title: "Lista de cursos borrada correctamente!",
                                icon: "success",
                                draggable: true
                            }).then((result) => {
                                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                    window.location.href="index.php?page=controller_course&op=list";
                                }
                            });
                        </script>';
                // $callback = 'index.php?page=controller_course&op=list';
                // die('<script>window.location.href="'.$callback .'";</script>');
            } else {
                $callback = 'index.php?page=controller_course&op=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            }
        }
        include("module/course/view/delete_all_course.php");
        break;

    case 'dummies';
        // $data = 'hola crtl course dummies';
        // die('<script>console.log('.json_encode( $data ) .');</script>');
        // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');
        if ($_POST) {
            // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');
            try {
                $daocourse = new DAOCourse();
                $rdo = $daocourse->dummies_course();
            } catch (Exception $e) {
                $callback = 'index.php?page=controller_course&op=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            }

            if ($rdo) {
                echo '<script language="javascript">
                            Swal.fire({
                                title: "Dummies creados correctamente!",
                                icon: "success",
                                draggable: true
                            }).then((result) => {
                                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                    window.location.href="index.php?page=controller_course&op=list";
                                }
                            });
                        </script>';
            } else {
                $callback = 'index.php?page=controller_course&op=503';
                die('<script>window.location.href="' . $callback . '";</script>');
            }
        }
        include("module/course/view/dummies_course.php");
        break;

    case 'read_modal':
        // echo $_GET["modal"]; 
        // exit;
        // error_log("Entered read_modal case");
        // error_log($_GET["modal"]);

        try {
            $daocourse = new DAOCourse();
            $rdo = $daocourse->select_course($_POST['modal']);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!$rdo) {
            // error_log('Hay error');
            echo json_encode("error");
            exit;
        } else {
            // error_log('No hay error');
            $course = get_object_vars($rdo);
            echo json_encode($course);
            //echo json_encode("error");
            // error_log(json_encode($course));
            exit;
        }
        break;

    case 'export_backup':
        define("BACKUP_PATH", "C:/wamp64/mysqldump/");

        $server_name = "localhost";
        $username = "root";
        $password = "";
        $database_name = "cursos";
        $date_string = date("dmY_His");

        //Preparamos comando
        $cmd = "\"C:/wamp64/bin/mysql/mysql9.1.0/bin/mysqldump.exe\" --routines --no-tablespaces -h {$server_name} -u {$username} --password=\"{$password}\" {$database_name} > \"" . BACKUP_PATH . "{$date_string}_{$database_name}.sql\" 2>NUL";

        exec($cmd, $output, $return_var);

        // Verificar si el backup se realizó correctamente
        if (file_exists(BACKUP_PATH . "{$date_string}_{$database_name}.sql")) {
            // error_log('================================================================');
            // error_log('No hay error al crear el backup');
            // error_log(BACKUP_PATH . "{$date_string}_{$database_name}.sql");
            // error_log($cmd);
            // error_log(file_exists(BACKUP_PATH . "{$date_string}_{$database_name}.sql"));
            $response = [
                'status' => 'success',
                'message' => 'Backup realizado correctamente.'
            ];
        } else {
            // error_log('Hay error al crear el backup');
            $response = [
                'status' => 'error',
                'message' => 'Error al realizar el backup.'
            ];
        }

        // Devolver la respuesta en formato JSON
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
        break;

    case 'import_backup':
        // error_log('================================================================');
        // error_log($_GET['file']);
        // exit;
        // break;

        $restore_file  = "C:/wamp64/mysqldump/" . $_GET['file'];
        $server_name   = "localhost";
        $username      = "root";
        $password      = "";
        $database_name = "cursos";

        $cmd = "\"C:/wamp64/bin/mysql/mysql9.1.0/bin/mysql.exe\" -h {$server_name} -u {$username} --password=\"{$password}\" {$database_name} < \"{$restore_file}\"";

        exec($cmd . " 2>&1", $output, $return_var);

        // Verificar si el import backup se realizó correctamente
        if ($return_var === 0) {
            // error_log('================================================================');
            // error_log('No hay error al importar el backup');
            // error_log($cmd);
            // error_log($return_var);
            // error_log(implode("\n", $output));

            $response = [
                'status' => 'success',
                'message' => 'Import backup realizado correctamente.'
            ];
        } else {
            // error_log('================================================================');
            // error_log('Hay error en el import backup');
            // error_log($cmd);
            // error_log($return_var);
            // error_log(implode("\n", $output));

            $response = [
                'status' => 'error',
                'message' => 'Error al importar backup.'
            ];
        }

        // Devolver la respuesta en formato JSON
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
        break;

    case 'get_backup_files':

        // Directorio de backups
        $backup_dir = "C:/wamp64/mysqldump/";

        // Leer los archivos del directorio
        $files = array_diff(scandir($backup_dir), ['.', '..']);
        $backup_files = [];

        // Filtrar solo los archivos .sql
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'sql') {
                $backup_files[] = $file;
            }
        }

        // Devolver la lista de archivos en formato JSON
        echo json_encode($backup_files);
        exit;
        break;

    default;
        include("view/inc/error404.html");
        break;
}
