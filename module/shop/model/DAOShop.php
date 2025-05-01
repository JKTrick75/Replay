<?php
    // include("model/connect.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
    include($path . "model/connect.php");
    
	class DAOShop{

		/* ============================================================================================ */
		/*                                      GET PRODUCTS                                            */
		/* ============================================================================================ */

		function select_all_products() {
			//Recogemos orderby
			$orderby = isset($_POST['orderby'][0]['orderby']) ? $_POST['orderby'][0]['orderby'] : false;
			//Recogemos limit y offset
			$offset = $_POST['total_prod'];
			$limit = $_POST['items_page'];

			$sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, p.lat, p.long,
						  GROUP_CONCAT(i.img_producto SEPARATOR ':') AS img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					GROUP BY p.id_producto";
			
			if($orderby == 'priceASC'){
				$sql .= " ORDER BY p.precio ASC";
			}else if($orderby == 'priceDESC'){
				$sql .= " ORDER BY p.precio DESC";
			}else if($orderby == 'popularidad'){
				$sql .= " ORDER BY p.popularidad DESC";
			}else{ //Order por defecto, los más relevantes primero
				$sql .= " ORDER BY p.popularidad DESC";
			}

			$sql .= " LIMIT $offset, $limit";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = array(
						"id_producto" => $row["id_producto"],
						"nom_producto" => $row["nom_producto"],
						"precio" => $row["precio"],
						"color" => $row["color"],
						"nom_estado" => $row["nom_estado"],
						"nom_ciudad" => $row["nom_ciudad"],
						"img_producto" => explode(":", $row['img_producto']),
						"lat" => $row["lat"],
						"long" => $row["long"]
					);
				}
			}
			return $retrArray;
		}

		function filter_shop() {
			//Recogemos valores filtro_shop
			$filter = $_POST['filter'];
			$categoria = $filter[0]['categoria'];
			$ciudad = $filter[1]['ciudad'];
			$estado = $filter[2]['estado'];
			$marca = $filter[3]['marca'];
			$tipo_consola = $filter[4]['tipo_consola'];
			$modelo_consola = $filter[5]['modelo_consola'];
			$tipo_accesorio = $filter[6]['tipo_accesorio'];
			$tipo_merchandising = $filter[7]['tipo_merchandising'];
			$tipo_venta = $filter[8]['tipo_venta'];
			$precioMin = $filter[9]['precio_min'];
			$precioMax = $filter[10]['precio_max'];
			//Recogemos orderby
			$orderby = isset($_POST['orderby'][0]['orderby']) ? $_POST['orderby'][0]['orderby'] : false;
			//Recogemos limit y offset
			$offset = $_POST['total_prod'];
			$limit = $_POST['items_page'];

			//Montamos query dinámica
			$sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, p.lat, p.long,
						  GROUP_CONCAT(i.img_producto SEPARATOR ':') AS img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
					INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
					WHERE 1=1";

			if ($categoria != '*') {
				$categoria_sql = implode(", ", $categoria);
				$sql .= " AND pc.id_categoria IN ($categoria_sql)";
			}
			if ($ciudad != '*'){
				$sql .= " AND p.ciudad = '$ciudad[0]'";
			}
			if ($estado != '*'){
				$sql .= " AND p.estado = '$estado[0]'";
			}
			if ($marca != '*'){
				$sql .= " AND p.marca = '$marca[0]'";
			}
			if ($tipo_consola != '*'){
				$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
			}
			if ($modelo_consola != '*'){
				$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
			}
			if ($tipo_accesorio != '*'){
				$sql .= " AND p.tipo_accesorio = '$tipo_accesorio[0]'";
			}
			if ($tipo_merchandising != '*'){
				$sql .= " AND p.tipo_merchandising = '$tipo_merchandising[0]'";
			}
			if ($tipo_venta != '*') {
				$tipo_venta_sql = implode(", ", $tipo_venta);
				$sql .= " AND tvp.id_tipo_venta IN ($tipo_venta_sql)";
			}
			if (isset($precioMin) && isset($precioMax)) {
				$sql .= " AND p.precio BETWEEN $precioMin[0] AND $precioMax[0]";
			}

			$sql.= " GROUP BY p.id_producto";

			if($orderby == 'priceASC'){
				$sql .= " ORDER BY p.precio ASC";
			}else if($orderby == 'priceDESC'){
				$sql .= " ORDER BY p.precio DESC";
			}else if($orderby == 'popularidad'){
				$sql .= " ORDER BY p.popularidad DESC";
			}else{ //Order por defecto, los más relevantes primero
				$sql .= " ORDER BY p.popularidad DESC";
			}

			$sql .= " LIMIT $offset, $limit";

			// error_log("Consulta SQL:");
			// error_log($sql);

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = array(
						"id_producto" => $row["id_producto"],
						"nom_producto" => $row["nom_producto"],
						"precio" => $row["precio"],
						"color" => $row["color"],
						"nom_estado" => $row["nom_estado"],
						"nom_ciudad" => $row["nom_ciudad"],
						"img_producto" => explode(":", $row['img_producto']),
						"lat" => $row["lat"],
						"long" => $row["long"]
					);
				}
			}
			return $retrArray;
		}

		function filter_home() {
			//Recogemos valores filtro_home
			$filter_field = $_POST['filter'][0][0];
			$filter_value = $_POST['filter'][0][1];
			//Recogemos orderby
			$orderby = isset($_POST['orderby'][0]['orderby']) ? $_POST['orderby'][0]['orderby'] : false;
			//Recogemos limit y offset
			$offset = $_POST['total_prod'];
			$limit = $_POST['items_page'];

			//Montamos query dinámica
			$sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, p.lat, p.long,
						  GROUP_CONCAT(i.img_producto SEPARATOR ':') AS img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
					INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
					WHERE 1=1";

			if ($filter_field == 'categoria') {
				$sql .= " AND pc.id_categoria = '$filter_value'";
			}
			if ($filter_field == 'id_producto') {
				$sql .= " AND p.id_producto = '$filter_value'";
			}
			if ($filter_field == 'marca') {
				$sql .= " AND p.marca = '$filter_value'";
			}
			if ($filter_field == 'tipo_consola') {
				$sql .= " AND p.tipo_consola = '$filter_value'";
			}
			if ($filter_field == 'ciudad') {
				$sql .= " AND p.ciudad = '$filter_value'";
			}
			if ($filter_field == 'estado') {
				$sql .= " AND p.estado = '$filter_value'";
			}
			if ($filter_field == 'tipo_venta') {
				$sql .= " AND tvp.id_tipo_venta = '$filter_value'";
			}

			$sql.= " GROUP BY p.id_producto";

			if($orderby == 'priceASC'){
				$sql .= " ORDER BY p.precio ASC";
			}else if($orderby == 'priceDESC'){
				$sql .= " ORDER BY p.precio DESC";
			}else if($orderby == 'popularidad'){
				$sql .= " ORDER BY p.popularidad DESC";
			}else{ //Order por defecto, los más relevantes primero
				$sql .= " ORDER BY p.popularidad DESC";
			}

			$sql .= " LIMIT $offset, $limit";

			// error_log("Consulta SQL:");
			// error_log($sql);

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = array(
						"id_producto" => $row["id_producto"],
						"nom_producto" => $row["nom_producto"],
						"precio" => $row["precio"],
						"color" => $row["color"],
						"nom_estado" => $row["nom_estado"],
						"nom_ciudad" => $row["nom_ciudad"],
						"img_producto" => explode(":", $row['img_producto']),
						"lat" => $row["lat"],
						"long" => $row["long"]
					);
				}
			}
			return $retrArray;
		}

		function filter_search() {
			//Recogemos valores filter_search
			$filter = $_POST['filter'];
			$tipo_consola = $filter[0]['tipo_consola'];
			$modelo_consola = $filter[1]['modelo_consola'];
			$ciudad = $filter[2]['ciudad'];
			//Recogemos orderby
			$orderby = isset($_POST['orderby'][0]['orderby']) ? $_POST['orderby'][0]['orderby'] : false;
			//Recogemos limit y offset
			$offset = $_POST['total_prod'];
			$limit = $_POST['items_page'];

			//Montamos query dinámica
			$sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, p.lat, p.long,
						  GROUP_CONCAT(i.img_producto SEPARATOR ':') AS img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					WHERE 1=1";

			if ($tipo_consola != '*') {
				$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
			}
			if ($modelo_consola != '*'){
				$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
			}
			if ($ciudad != '*'){
				$sql .= " AND p.ciudad = '$ciudad[0]'";
			}

			$sql.= " GROUP BY p.id_producto";

			if($orderby == 'priceASC'){
				$sql .= " ORDER BY p.precio ASC";
			}else if($orderby == 'priceDESC'){
				$sql .= " ORDER BY p.precio DESC";
			}else if($orderby == 'popularidad'){
				$sql .= " ORDER BY p.popularidad DESC";
			}else{ //Order por defecto, los más relevantes primero
				$sql .= " ORDER BY p.popularidad DESC";
			}

			$sql .= " LIMIT $offset, $limit";

			// error_log("Consulta SQL:");
			// error_log($sql);

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = array(
						"id_producto" => $row["id_producto"],
						"nom_producto" => $row["nom_producto"],
						"precio" => $row["precio"],
						"color" => $row["color"],
						"nom_estado" => $row["nom_estado"],
						"nom_ciudad" => $row["nom_ciudad"],
						"img_producto" => explode(":", $row['img_producto']),
						"lat" => $row["lat"],
						"long" => $row["long"]
					);
				}
			}
			return $retrArray;
		}

		/* ============================================================================================ */
		/*                                       PAGINATION                                             */
		/* ============================================================================================ */

		function pagination_all_products() {
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad";

			$count = $this->execute_query($sql);

			return $count;
		}

		function pagination_shop() {
			//Recogemos valores filtro_shop
			$filter = $_POST['filter'];
			$categoria = $filter[0]['categoria'];
			$ciudad = $filter[1]['ciudad'];
			$estado = $filter[2]['estado'];
			$marca = $filter[3]['marca'];
			$tipo_consola = $filter[4]['tipo_consola'];
			$modelo_consola = $filter[5]['modelo_consola'];
			$tipo_accesorio = $filter[6]['tipo_accesorio'];
			$tipo_merchandising = $filter[7]['tipo_merchandising'];
			$tipo_venta = $filter[8]['tipo_venta'];
			$precioMin = $filter[9]['precio_min'];
			$precioMax = $filter[10]['precio_max'];

			//Montamos query dinámica
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
					INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
					WHERE 1=1";

			if ($categoria != '*') {
				$categoria_sql = implode(", ", $categoria);
				$sql .= " AND pc.id_categoria IN ($categoria_sql)";
			}
			if ($ciudad != '*'){
				$sql .= " AND p.ciudad = '$ciudad[0]'";
			}
			if ($estado != '*'){
				$sql .= " AND p.estado = '$estado[0]'";
			}
			if ($marca != '*'){
				$sql .= " AND p.marca = '$marca[0]'";
			}
			if ($tipo_consola != '*'){
				$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
			}
			if ($modelo_consola != '*'){
				$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
			}
			if ($tipo_accesorio != '*'){
				$sql .= " AND p.tipo_accesorio = '$tipo_accesorio[0]'";
			}
			if ($tipo_merchandising != '*'){
				$sql .= " AND p.tipo_merchandising = '$tipo_merchandising[0]'";
			}
			if ($tipo_venta != '*') {
				$tipo_venta_sql = implode(", ", $tipo_venta);
				$sql .= " AND tvp.id_tipo_venta IN ($tipo_venta_sql)";
			}
			if (isset($precioMin) && isset($precioMax)) {
				$sql .= " AND p.precio BETWEEN $precioMin[0] AND $precioMax[0]";
			}

			// error_log("Consulta SQL:");
			// error_log($sql);

			$count = $this->execute_query($sql);

			return $count;
		}

		function pagination_home() {
			//Recogemos valores filtro_home
			$filter_field = $_POST['filter'][0][0];
			$filter_value = $_POST['filter'][0][1];

			//Montamos query dinámica
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
					INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
					WHERE 1=1";

			if ($filter_field == 'categoria') {
				$sql .= " AND pc.id_categoria = '$filter_value'";
			}
			if ($filter_field == 'id_producto') {
				$sql .= " AND p.id_producto = '$filter_value'";
			}
			if ($filter_field == 'marca') {
				$sql .= " AND p.marca = '$filter_value'";
			}
			if ($filter_field == 'tipo_consola') {
				$sql .= " AND p.tipo_consola = '$filter_value'";
			}
			if ($filter_field == 'ciudad') {
				$sql .= " AND p.ciudad = '$filter_value'";
			}
			if ($filter_field == 'estado') {
				$sql .= " AND p.estado = '$filter_value'";
			}
			if ($filter_field == 'tipo_venta') {
				$sql .= " AND tvp.id_tipo_venta = '$filter_value'";
			}

			// error_log("Consulta SQL:");
			// error_log($sql);

			$count = $this->execute_query($sql);

			return $count;
		}

		function pagination_search() {
			//Recogemos valores filter_search
			$filter = $_POST['filter'];
			$tipo_consola = $filter[0]['tipo_consola'];
			$modelo_consola = $filter[1]['modelo_consola'];
			$ciudad = $filter[2]['ciudad'];

			//Montamos query dinámica
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					WHERE 1=1";

			if ($tipo_consola != '*') {
				$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
			}
			if ($modelo_consola != '*'){
				$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
			}
			if ($ciudad != '*'){
				$sql .= " AND p.ciudad = '$ciudad[0]'";
			}

			// error_log("Consulta SQL:");
			// error_log($sql);

			$count = $this->execute_query($sql);

			return $count;
		}

		/* ============================================================================================ */
		/*                                       DETAILS                                                */
		/* ============================================================================================ */

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
						p.observaciones,
						m.nom_marca, 
						e.nom_estado, 
						ci.nom_ciudad, 
						mc.nom_modelo_consola,
						tc.nom_tipo_consola, 
						tm.nom_tipo_merchandising, 
						ta.nom_tipo_accesorio,
						p.lat,
						p.long,
						p.marca,
						p.tipo_consola,
						p.modelo_consola,
						p.ciudad
					FROM producto p
					INNER JOIN marca m ON p.marca = m.id_marca
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad ci ON p.ciudad = ci.id_ciudad
					LEFT JOIN tipo_consola tc ON p.tipo_consola = tc.id_tipo_consola
					LEFT JOIN modelo_consola mc ON p.modelo_consola = mc.id_modelo_consola
					LEFT JOIN tipo_merchandising tm ON p.tipo_merchandising = tm.id_tipo_merchandising
					LEFT JOIN tipo_accesorio ta ON p.tipo_accesorio = ta.id_tipo_accesorio
					WHERE p.id_producto = '$id';";
	
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

		function select_sales($id){
			$sql= "SELECT tv.nom_tipo_venta, tv.img_tipo_venta
				   FROM tipo_venta_producto tp INNER JOIN tipo_venta tv
				   ON tp.id_tipo_venta = tv.id_tipo_venta
				   WHERE id_producto = '$id';";
	
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
	
			$salesArray = array();
			if (mysqli_num_rows($res) > 0) {
				foreach ($res as $row) {
					array_push($salesArray, $row);
				}
			}
			return $salesArray;
		}

		function count_related() {
			//Recogemos valores
			$id = $_POST['id'];
			$marca = $_POST['marca'];
			$tipo_consola = $_POST['tipo_consola'];
			$modelo_consola = $_POST['modelo_consola'];
			$ciudad = $_POST['ciudad'];

			//Montamos query
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					WHERE ((p.marca = '$marca') 
						OR (p.tipo_consola = '$tipo_consola') 
						OR (p.modelo_consola = '$modelo_consola') 
						OR (p.ciudad = '$ciudad'))
					AND p.id_producto != '$id'";

			error_log("Consulta SQL:");
			error_log($sql);

			$count = $this->execute_query($sql);

			return $count;
		}

		function load_related() {
			//Recogemos valores
			$id = $_POST['id'];
			$marca = $_POST['marca'];
			$tipo_consola = $_POST['tipo_consola'];
			$modelo_consola = $_POST['modelo_consola'];
			$ciudad = $_POST['ciudad'];
			//Recogemos limit y offset
			$offset = $_POST['offset'];
			$limit = $_POST['limit'];

			//Montamos query
			$sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, p.lat, p.long,
						  GROUP_CONCAT(i.img_producto SEPARATOR ':') AS img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					WHERE ((p.marca = '$marca') 
						OR (p.tipo_consola = '$tipo_consola') 
						OR (p.modelo_consola = '$modelo_consola') 
						OR (p.ciudad = '$ciudad'))
					AND p.id_producto != '$id'
					GROUP BY p.id_producto
					LIMIT $offset, $limit";

			error_log("Consulta SQL:");
			error_log($sql);

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = array(
						"id_producto" => $row["id_producto"],
						"nom_producto" => $row["nom_producto"],
						"precio" => $row["precio"],
						"color" => $row["color"],
						"nom_estado" => $row["nom_estado"],
						"nom_ciudad" => $row["nom_ciudad"],
						"img_producto" => explode(":", $row['img_producto']),
						"lat" => $row["lat"],
						"long" => $row["long"]
					);
				}
			}
			return $retrArray;
		}

		function count_popularity($id){
			$sql = "UPDATE producto
					SET popularidad = popularidad + 1
					WHERE id_producto = '$id'";
	
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);
		}

		/* ============================================================================================ */
		/*                                       LIKES                                                  */
		/* ============================================================================================ */

		function search_user_likes($username){
			$sql = "SELECT l.id_producto 
					FROM likes l 
					WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			return $res;
		}

		function select_likes($id_producto, $username){
			$sql = "SELECT l.id_producto 
					FROM likes l
					WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')
					AND l.id_producto = '$id_producto'";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			return $res;
		}

		function like($id_producto, $username){
			$sql = "INSERT INTO likes (id_user, id_producto) VALUES ((SELECT u.id_user FROM users u WHERE u.username= '$username') ,'$id_producto');";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			return $res;
		}

		function dislike($id_producto, $username){
			$sql = "DELETE FROM likes WHERE id_producto='$id_producto' AND id_user=(SELECT  u.id_user FROM users u WHERE u.username= '$username')";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			return $res;
		}

		/* ============================================================================================ */
		/*                                       GET FILTERS                                            */
		/* ============================================================================================ */

		function filter_categoria(){
			$sql = "SELECT id_categoria, nom_categoria 
					FROM categoria
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_ciudad(){
			$sql = "SELECT id_ciudad, nom_ciudad 
					FROM ciudad 
					ORDER BY 2";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_estado(){
			$sql = "SELECT id_estado, nom_estado 
					FROM estado
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_marca(){
			$sql = "SELECT id_marca, nom_marca 
					FROM marca
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_tipo_consola(){
			$sql = "SELECT id_tipo_consola, nom_tipo_consola 
					FROM tipo_consola
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_modelo_consola(){
			$sql = "SELECT id_modelo_consola, nom_modelo_consola 
					FROM modelo_consola
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_tipo_accesorio(){
			$sql = "SELECT id_tipo_accesorio, nom_tipo_accesorio 
					FROM tipo_accesorio
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_tipo_merchandising(){
			$sql = "SELECT id_tipo_merchandising, nom_tipo_merchandising 
					FROM tipo_merchandising
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_tipo_venta(){
			$sql = "SELECT id_tipo_venta, nom_tipo_venta 
					FROM tipo_venta
					ORDER BY 1";

			$options = $this->execute_query($sql);

			return $options;
		}

		function filter_precio(){
			$sql = "SELECT MAX(precio) AS precio_max
					FROM producto";

			$options = $this->execute_query($sql);

			return $options;
		}

		/* CONTADOR PRODUCTOS */

		function count_products(){
			if ($_POST["filter"] == "false"){
				$sql = "SELECT COUNT(*) as cantidad
						FROM producto";
			}else{
				$filter = $_POST['filter'];
				$categoria = $filter[0]['categoria'];
				$ciudad = $filter[1]['ciudad'];
				$estado = $filter[2]['estado'];
				$marca = $filter[3]['marca'];
				$tipo_consola = $filter[4]['tipo_consola'];
				$modelo_consola = $filter[5]['modelo_consola'];
				$tipo_accesorio = $filter[6]['tipo_accesorio'];
				$tipo_merchandising = $filter[7]['tipo_merchandising'];
				$tipo_venta = $filter[8]['tipo_venta'];
				$precioMin = $filter[9]['precio_min'];
				$precioMax = $filter[10]['precio_max'];

				$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
						FROM producto p
						INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
						INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
						WHERE 1=1";

				if ($categoria != '*') {
					$categoria_sql = implode(", ", $categoria);
					$sql .= " AND pc.id_categoria IN ($categoria_sql)";
				}
				if ($ciudad != '*'){
					$sql .= " AND p.ciudad = '$ciudad[0]'";
				}
				if ($estado != '*'){
					$sql .= " AND p.estado = '$estado[0]'";
				}
				if ($marca != '*'){
					$sql .= " AND p.marca = '$marca[0]'";
				}
				if ($tipo_consola != '*'){
					$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
				}
				if ($modelo_consola != '*'){
					$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
				}
				if ($tipo_accesorio != '*'){
					$sql .= " AND p.tipo_accesorio = '$tipo_accesorio[0]'";
				}
				if ($tipo_merchandising != '*'){
					$sql .= " AND p.tipo_merchandising = '$tipo_merchandising[0]'";
				}
				if ($tipo_venta != '*') {
					$tipo_venta_sql = implode(", ", $tipo_venta);
					$sql .= " AND tvp.id_tipo_venta IN ($tipo_venta_sql)";
				}
				if (isset($precioMin) && isset($precioMax)) {
					$sql .= " AND p.precio BETWEEN $precioMin[0] AND $precioMax[0]";
				}
			}

			$count = $this->execute_query($sql);

			return $count;
		}

		//Función ejecutar consultas sql
		function execute_query($sql){
			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$array = array();
			if (mysqli_num_rows($res) > 0) {
				foreach ($res as $row) {
					array_push($array, $row);
				}
			}

			return $array;
		}

	}