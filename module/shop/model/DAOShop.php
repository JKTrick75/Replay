<?php
    // include("model/connect.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V2 (CARROUSEL)/';
    include($path . "model/connect.php");
    
	class DAOShop{

		function select_products() {
			$sql= "SELECT * 
					FROM producto p INNER JOIN img_producto i
					ON p.id_producto = i.id_producto
					WHERE i.id_img = (SELECT MIN(i2.id_img) 
                  					  FROM img_producto i2 
                  					  WHERE i2.id_producto = p.id_producto);";

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