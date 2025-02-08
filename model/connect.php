<?php
	class connect{
		public static function con(){
			$host = '127.0.0.1';  
    		$user = "root";                     
    		$pass = "";                             
    		$db = "replay";                      
    		$port = 3306;                           
    		// $tabla="course";
    		
			$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysqli_connect_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}