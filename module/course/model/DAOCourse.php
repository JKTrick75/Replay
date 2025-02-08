<?php
    // include("model/connect.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/PHPDavid/8_MVC_CRUD_Course V3 (MENU_ADMIN)/';
    include($path . "model/connect.php");
    
	class DAOCourse{
		function insert_course($datos){
			// die('<script>console.log('.json_encode( $datos ) .');</script>');

			//Recogemos los datos del formulario
			$courseName=$datos['courseName'];
        	$description=$datos['description'];
			$category = ""; //Inicializamos la variable
			foreach ($datos['category'] as $indice) {
        	    $category=$category."$indice:";
        	}
        	$dificulty=$datos['dificulty'];
        	$hoursDay=$datos['hoursDay'];
        	$priceHour=$datos['priceHour'];
        	$price=$datos['price'];
        	$dateIni=$datos['dateIni'];
        	$dateEnd=$datos['dateEnd'];

			// // Formateamos las fechas antes de hacer el insert
            // $dateIni = DateTime::createFromFormat('Y-m-d', $datos['dateIni'])->format('d/m/Y');
            // $dateEnd = DateTime::createFromFormat('Y-m-d', $datos['dateEnd'])->format('d/m/Y');
			
			//Hacemos el insert
        	$sql = "INSERT INTO course (courseName, description, category, dificulty, hoursDay, priceHour, price, dateIni, dateEnd)"
        		. "VALUES ('$courseName', '$description', '$category', '$dificulty', '$hoursDay', '$priceHour', '$price', '$dateIni', '$dateEnd')";
            
			// die('<script>console.log('.json_encode( $sql ) .');</script>');
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
			return $res;
		}
		
		function select_all_course(){
			// $data = 'hola DAO select_all_user';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
			$sql = "SELECT * FROM course ORDER BY id ASC";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
			connect::close($conexion);
            return $res;
		}

		function select_courses_with_filters($category, $dificulty, $price) {
			$sql = "SELECT * FROM course WHERE 1=1";
	
			if ($category != '') {
				$sql .= " AND BINARY category LIKE '%$category%'";
			}
	
			if ($dificulty != '') {
				$sql .= " AND dificulty = '$dificulty'";
			}
	
			if ($price != '') {
				$sql .= " AND price <= $price";
			}
	
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
			connect::close($conexion);
            return $res;
		}
		
		function select_course($id){
			// $data = 'hola DAO select_user';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
			$sql = "SELECT * FROM course WHERE id='$id'";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}
		
		function update_course($datos){
			// die('<script>console.log('.json_encode( $datos ) .');</script>');

			//Recogemos los datos del formulario
			$id=$datos['id'];
			$courseName=$datos['courseName'];
        	$description=$datos['description'];
			$category = ""; //Inicializamos la variable
			foreach ($datos['category'] as $indice) {
        	    $category=$category."$indice:";
        	}
        	$dificulty=$datos['dificulty'];
        	$hoursDay=$datos['hoursDay'];
        	$priceHour=$datos['priceHour'];
        	$price=$datos['price'];
        	$dateIni=$datos['dateIni'];
        	$dateEnd=$datos['dateEnd'];
        	
			$sql = " UPDATE course SET courseName='$courseName', description='$description', category='$category', dificulty='$dificulty', hoursDay='$hoursDay', priceHour='$priceHour', 
					price='$price', dateIni='$dateIni', dateEnd='$dateEnd' WHERE id='$id'";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
			return $res;
		}
		
		function delete_course($id){
			$sql = "DELETE FROM course WHERE id='$id'";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
		}

		function delete_all_course(){
			$sql = "DELETE FROM course";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            return $res;
		}

		function dummies_course(){
			$sql = "DELETE FROM course;";

			$sql.= "INSERT INTO `course` (`id`, `courseName`, `description`, `category`, `dificulty`, `hoursDay`, `priceHour`, `price`, `dateIni`, `dateEnd`)" 
			." VALUES (1, 'Curso Java', 'Curso Avanzado para iniciarse en la programación', 'Semipresencial:Online:', 'Dificil', 4, 5, 300, '12/12/2024', '27/12/2024');";
		
			$sql.= "INSERT INTO `course` (`id`, `courseName`, `description`, `category`, `dificulty`, `hoursDay`, `priceHour`, `price`, `dateIni`, `dateEnd`)" 
			." VALUES (2, 'Curso jQuery', 'Ganar una base sólida para programadores', 'Online:', 'Intermedia', 6, 7, 630, '12/12/2024', '27/12/2024');";

			$sql.= "INSERT INTO `course` (`id`, `courseName`, `description`, `category`, `dificulty`, `hoursDay`, `priceHour`, `price`, `dateIni`, `dateEnd`)" 
			." VALUES (3, 'Curso PHP', 'Lograrás estar en la cúspide de los desarrolladores web', 'Presencial:', 'Dificil', 5, 9, 675, '12/12/2024', '27/12/2024');";

			$sql.= "INSERT INTO `course` (`id`, `courseName`, `description`, `category`, `dificulty`, `hoursDay`, `priceHour`, `price`, `dateIni`, `dateEnd`)" 
			." VALUES (4, 'Curso CSS', 'Explora tus capacidades', 'Presencial:', 'Facil', 3, 7, 315, '12/12/2024', '27/12/2024');";

			$sql.= "INSERT INTO `course` (`id`, `courseName`, `description`, `category`, `dificulty`, `hoursDay`, `priceHour`, `price`, `dateIni`, `dateEnd`)" 
			." VALUES (5, 'Curso Jango', 'Alcanza el éxito mediante este curso', 'Semipresencial:', 'Intermedia', 6, 8, 720, '12/12/2024', '27/12/2024');";

			$conexion = connect::con();
            $res = mysqli_multi_query($conexion, $sql);
            connect::close($conexion);

            return $res;
		}
		
	}