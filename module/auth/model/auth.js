function click_login() {
    $('#login_btn').on('click', function () {
        window.location.href = 'index.php?page=controller_auth&op=list';
        $('.register_auth').hide();
    });
    $('.toggle_auth_login').on('click', function () {
        $('.login_auth').hide();
        $('.register_auth').show();
    });
    $('.toggle_auth_register').on('click', function () {
        $('.register_auth').hide();
        $('.login_auth').show();
    });
}

function ocultar_elementos(){
    $('.register_auth').hide();
}

$(document).ready(function () {
    click_login();
    ocultar_elementos();
    // console.log("Bienvenido al Auth");
});