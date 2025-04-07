<?php
	class connect{
		public static function con(){
			$db_replay = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/model/db.ini');
    		$host = $db_replay['host'];
			$user = $db_replay['user'];
			$pass = $db_replay['password'];
			$db = $db_replay['db'];
			$port = $db_replay['port'];
    		
			$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysqli_connect_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}