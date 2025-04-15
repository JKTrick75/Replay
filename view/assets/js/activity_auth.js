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
    ajaxPromise('module/auth/controller/controller_auth.php?op=controluser', 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            if (data == "Correct_User") {
                console.log("CORRECTO-->El usario coincide con la session");
            } else if (data == "Wrong_User") {
                console.log("INCORRCTO--> Estan intentando acceder a una cuenta");
                logout(); //main_auth.js -> Deslogueamos
            }
        })
        .catch(function() { console.log("ANONYMOUS_user") });
}

function refresh_token() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('module/auth/controller/controller_auth.php?op=refresh_token', 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                console.log("Refresh token correctly");
                localStorage.setItem("token", data);
                load_auth_button(); //main_auth.js -> Recargamos página y regeneramos botón auth
            });
    }
}

function refresh_cookie() {
    ajaxPromise('module/auth/controller/controller_auth.php?op=refresh_cookie', 'POST', 'JSON')
        .then(function(data) {
            console.log("Refresh cookie correctly");
        });
}

$(document).ready(function() {
    //Control inactividad
    setInterval(function() { control_activity() }, 60000); //10min=600000 | 60000=1min
    //Control seguridad usuario
    control_user();
    //Refresh login user
    setInterval(function() { refresh_token() }, 60000);
    setInterval(function() { refresh_cookie() }, 60000);
});