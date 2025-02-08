<?php
    function search_courseName($courseName){
        $sql = "SELECT * FROM course WHERE courseName='$courseName'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);
        return $res;
    }

    $error_courseName="";
    
    function validate_create_php() {
        // $data = 'hola validate php';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        global $error_courseName;
        
        $check = true;

        $courseName = $_POST['courseName'];
        $courseName = search_courseName($courseName);

        if($courseName !== null){
            echo '<script language="javascript">
                    Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ya existe un curso con este nombre!"
                    });
                </script>';
            $check = false;
            $error_courseName="El nombre del curso no puede estar repetido, inserte otro nombre";
        }

        return $check;
    }

    function validate_update_php() {
        // $data = 'hola validate update php';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        global $error_courseName;
        
        $check = true;
        $courseName = null;

        $courseName_Ori = $_POST['courseName_Ori'];
        $courseName_New = $_POST['courseName'];

        // $data = 'Original: '.$courseName_Ori;
        // $data .= '| Nuevo: '.$courseName_New;
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        if ($courseName_Ori !== $courseName_New) {
            $courseName = search_courseName($courseName_New);

            // $data = $courseName;
            // die('<script>console.log('.json_encode( $data ) .');</script>');
        }

        if($courseName !== null){
            echo '<script language="javascript">
                    Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ya existe un curso con este nombre!"
                    });
                </script>';
            $check = false;
            $error_courseName="* El nombre del curso no puede estar repetido, inserte otro nombre";
        }

        return $check;
    }