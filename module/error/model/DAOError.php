<?php
// include("model/connect.php");
$path = $_SERVER['DOCUMENT_ROOT'] . '/PHPDavid/8_MVC_CRUD_Course V3 (MENU_ADMIN)/';
include($path . "model/connect.php");

class DAOError{

	function insert_error($datos){
		// die('<script>console.log('.json_encode( $datos ) .');</script>');

		//Recogemos los datos del error
		$file=$datos['file'];
		$desc=$datos['desc'];
		
		//Hacemos el insert
		$sql = "INSERT INTO log_error (file, `desc`, `timestamp`)"
			. "VALUES ('$file', '$desc', CURRENT_TIMESTAMP)";
		
		// die('<script>console.log('.json_encode( $sql ) .');</script>');
		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);
		return $res;
	}


}