<?php
	class connect{
		public static function con(){
			$db_replay = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/model/db.ini');
    		$host = $db_replay['DB_HOST'];
			$user = $db_replay['DB_USER'];
			$pass = $db_replay['DB_PASSWORD'];
			$db = $db_replay['DB'];
			$port = $db_replay['DB_PORT'];
    		
			$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysqli_connect_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}