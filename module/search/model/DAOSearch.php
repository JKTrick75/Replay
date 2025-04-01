<?php
    // include("model/connect.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
    include($path . "model/connect.php");
    
	class DAOSearch{

		function select_tipo_consola() {
			$sql= "SELECT * FROM tipo_consola";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

        function select_modelo_consola_null() {
			$sql= "SELECT * FROM modelo_consola";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

        function select_modelo_consola() {
            $tipo_consola= $_POST['tipo_consola'];

			$sql= "SELECT * FROM modelo_consola m
                    WHERE m.id_tipo_consola = '$tipo_consola'";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

        function autocomplete() {
            $autocomplete = $_POST['autocomplete'];
            // error_log("Pulso en botón de autocomplete: "+$autocomplete);

			$sql= "SELECT * FROM ciudad c
                    WHERE c.nom_ciudad LIKE '%$autocomplete%'";

            // error_log($sql);

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}
		
	}