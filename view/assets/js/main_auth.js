function load_auth_button() {
    var sesion = JSON.parse(localStorage.getItem('sesion'));
    console.log(sesion);

    //Vaciamos elementos
    $('#auth_btn').empty().removeClass("click_login click_dropdown");
    $('.user-dropdown').remove();
    
    if (sesion) {
        //Vaciamos botón, quitamos classe click_login, y añadimos avatar + username
        $('#auth_btn')
        .addClass("click_dropdown")
        .append(
            $('<img></img>').attr({ src: sesion.avatar, alt: "Robot" }),
            $('<span></span>').text(sesion.username),
            $('<span class="caret">◂</span>')
        );

        //Creamos el dropdown menu
        $('#auth_btn').after(`
            <div class="user-dropdown">
                <div class="dropdown-item click_profile">Perfil</div>
                <div class="dropdown-item click_logout">Logout</div>
            </div>
        `);
    } else {
        //Vaciamos botón, añadimos classe click_login, y preparamos para el login
        $('#auth_btn')
        .addClass("click_login")
        .append(
            $('<i class="bi bi-person"></i>'),
            $('<span>Identifícate</span>')
        );
    }
}

function auth_clicks() {
    //Click auth
    $('.click_login').on('click', function () {
        window.location.href = 'index.php?page=controller_auth&op=list';
        $('.register_auth').hide();
    });
    //Click logout
    $(document).on('click', '.click_logout', function() {
        localStorage.removeItem('sesion');
        Swal.fire("Has cerrado sesión!").then(() => {
            window.location.href = 'index.php?page=controller_home&op=list';
        });
    });
    //Click Drop-down
    $(document).on('click', '.click_dropdown', function() {
        $('.user-dropdown').toggle();
        $('.caret').toggleClass('rotate');
    });
    // Cerrar dropdown al hacer click fuera
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#auth_btn').length && !$(e.target).closest('.user-dropdown').length) {
            $('.user-dropdown').hide();
            $('.caret').removeClass('rotate');
        }
    });
}

$(document).ready(function () {
    load_auth_button();
    auth_clicks();
});