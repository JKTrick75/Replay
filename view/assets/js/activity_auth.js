function control_activity() {
    //Recogemos token de localStorage
    var token = localStorage.getItem('token');
    //Si logeado -> comprobamos tiempo inactividad:
    if (token) {
        ajaxPromise('module/auth/controller/controller_auth.php?op=check_actividad', 'POST', 'JSON')
            .then(function(data) {
                if (data == "inactivo") {
                    console.log("Usuario INACTIVO");
                    logout(); //main_auth.js -> Deslogueamos
                } else {
                    console.log("Usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usario logeado");
    }
}

function control_user() {
    var token = localStorage.getItem('token');

    if (token) {
        ajaxPromise('module/auth/controller/controller_auth.php?op=controluser', 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            if (data == "Correct_User") {
                console.log("control_user -> CORRECTO: El usuario coincide con la session");
            } else if (data == "Wrong_User") {
                console.log("control_user -> INCORRECTO: Estan intentando acceder a una cuenta");
                logout(); //main_auth.js -> Deslogueamos
            }
        })
        .catch(function() { 
            console.log("control_user -> ANONYMOUS_user");
        });
    }else{
        console.log("control_user -> ANONYMOUS_user");
    }
}

function control_token_vigency() {
    var token = localStorage.getItem('token');

    if (token) {
        ajaxPromise('module/auth/controller/controller_auth.php?op=controltimer', 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            if (data == "Regenerar_access_token") {
                console.log("CORRECTO--> Refresh_token vigente -> Regeneramos access_token");
                //Regeneramos access_token (encadenamos ajaxPromise)
                return ajaxPromise('module/auth/controller/controller_auth.php?op=refresh_token', 'POST', 'JSON', { 'token': token });
            }else if (data == "Correct_Timer") {
                console.log("CORRECTO--> Access_token vigente");
                return Promise.resolve(); //Continuamos cadena promesas
            } else if (data == "Wrong_Timer") {
                console.log("INCORRECTO--> Access_token y refresh_token sin vigencia, sesión expirada");
                logout(); //main_auth.js -> Deslogueamos
                return Promise.reject("Sesión expirada"); //Saltamos al .catch
            }
        })
        .then(function(newAccess_token) {
            if (newAccess_token) {
                console.log("Refresh token correctly");
                localStorage.setItem("token", newAccess_token);
                load_auth_button(); //main_auth.js -> Recargamos página y regeneramos botón auth
            }
        })
        .catch(function() { 
            console.log("control_timer1 -> ANONYMOUS_user");
        });
    }else{
        console.log("control_timer2 -> ANONYMOUS_user");
    }
}

// function refresh_token() {
//     var token = localStorage.getItem('token');
//     if (token) {
//         ajaxPromise('module/auth/controller/controller_auth.php?op=refresh_token', 'POST', 'JSON', { 'token': token })
//             .then(function(data) {
//                 console.log("Refresh token correctly");
//                 localStorage.setItem("token", data);
//                 load_auth_button(); //main_auth.js -> Recargamos página y regeneramos botón auth
//             });
//     }
// }

function refresh_cookie() {
    ajaxPromise('module/auth/controller/controller_auth.php?op=refresh_cookie', 'POST', 'JSON')
        .then(function(data) {
            console.log("Refresh cookie correctly");
        });
}

$(document).ready(function() {
    //Control inactividad
    setInterval(function() { control_activity() }, 600000); //10min=600000 | 60000=1min
    //Control seguridad usuario
    control_user();
    //Control seguridad vigencia tokens
    setInterval(function() { control_token_vigency() }, 600000);
    //Refresh login user
    setInterval(function() { refresh_cookie() }, 600000);
});