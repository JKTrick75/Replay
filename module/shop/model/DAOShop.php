<?php
    // include("model/connect.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V2 (CARROUSEL)/';
    include($path . "model/connect.php");
    
	class DAOShop{

		function select_products() {
			$sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, i.img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					WHERE i.id_img = (SELECT MIN(i2.id_img) 
										FROM img_producto i2 
										WHERE i2.id_producto = p.id_producto);";
						// $sql= "SELECT *
			// 		FROM producto p 
			// 		INNER JOIN img_producto i ON p.id_producto = i.id_producto

			// 		WHERE i.id_img = (SELECT MIN(i2.id_img) 
            //       					  FROM img_producto i2 
            //       					  WHERE i2.id_producto = p.id_producto);";


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

		function select_details($id){
			$sql = "SELECT
						p.id_producto,
						p.nom_producto, 
						p.precio, 
						p.color, 
						p.fecha_publicacion, 
						p.fecha_ult_mod,
						p.capacidad, 
						p.incluye_mando, 
						p.incluye_cargador, 
						p.incluye_juegos,
						m.nom_marca, 
						e.nom_estado, 
						ci.nom_ciudad, 
						mc.nom_modelo_consola,
						tc.nom_tipo_consola, 
						tm.nom_tipo_merchandising, 
						ta.nom_tipo_accesorio
					FROM producto p
					INNER JOIN marca m ON p.marca = m.id_marca
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad ci ON p.ciudad = ci.id_ciudad
					LEFT JOIN tipo_consola tc ON p.tipo_consola = tc.id_tipo_consola
					LEFT JOIN modelo_consola mc ON p.modelo_consola = mc.id_modelo_consola
					LEFT JOIN tipo_merchandising tm ON p.tipo_merchandising = tm.id_tipo_merchandising
					LEFT JOIN tipo_accesorio ta ON p.tipo_accesorio = ta.id_tipo_accesorio
					WHERE p.id_producto = '$id';";

			// $sql = "SELECT p.nom_producto, p.precio, p.color, p.fecha_publicacion, p.fecha_ult_mod,
			// 		p.capacidad, p.incluye_mando, p.incluye_cargador, p.incluye_juegos,
			// 		m.nom_marca, e.nom_estado, ci.nom_ciudad, mc.nom_modelo_consola,
			// 		tc.nom_tipo_consola, tm.nom_tipo_merchandising, ta.nom_tipo_accesorio
			// 		FROM producto p, marca m, estado e, ciudad ci, producto_categoria pc, 
			// 		tipo_consola tc, modelo_consola mc, tipo_merchandising tm, tipo_accesorio ta
			// 		WHERE p.id_producto = '$id'
			// 		AND  c.model = m.id_model 
			// 		AND c.category = ca.id_cat
			// 		AND c.motor = t.cod_tmotor";
	
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql)->fetch_object();
			connect::close($conexion);
	
			return $res;
		}
	
		function select_images($id){
			$sql= "SELECT *
				   FROM img_producto
				   WHERE id_producto = '$id';";
	
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
	
			$imgArray = array();
			if (mysqli_num_rows($res) > 0) {
				foreach ($res as $row) {
					array_push($imgArray, $row);
				}
			}
			return $imgArray;
		}

		// function select_products_images($id) {
		// 	error_log('Este es el select para la id:');
		// 	error_log($id);

		// 	$sql= "SELECT img_producto 
		// 		   FROM img_producto
		// 		   WHERE id_producto = $id;";

		// 	$conexion = connect::con();
		// 	$res = mysqli_query($conexion, $sql);
		// 	connect::close($conexion);

		// 	$retrArray = array();
		// 	if (mysqli_num_rows($res) > 0) {
		// 		while ($row = mysqli_fetch_assoc($res)) {
		// 			$retrArray[] = $row;
		// 		}
		// 	}
		// 	return $retrArray;
		// }

		
		
	}