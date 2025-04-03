<?php
    // include("model/connect.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
    include($path . "model/connect.php");
    
	class DAOAuth{

        function select_username(){
			$username = $_POST['username_reg'];

			$sql = "SELECT * FROM users WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
        }

		function select_email(){
			$email = $_POST['email_reg'];

			$sql = "SELECT * FROM users WHERE email='$email'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}

		function insert_user(){
			//Recibimos datos del formulario de registro
			$username = $_POST['username_reg'];
			$email = $_POST['email_reg'];
			$password = $_POST['passwd1_reg'];

            $hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
            $hashavatar = md5(strtolower(trim($username))); 
            $avatar = "https://api.dicebear.com/9.x/pixel-art/svg?seed=$hashavatar";

			//Insertamos usuario, por defecto tipo client, y un avatar random por defecto
            $sql ="   INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`) 
            VALUES ('$username','$hashed_pass','$email','client','$avatar')";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }
		
	}