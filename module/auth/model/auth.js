function click_login() {
    $('#login_btn').on('click', function () {
        window.location.href = 'index.php?page=controller_auth&op=list';
    });
}

$(document).ready(function () {
    click_login();
    // console.log("Bienvenido al Auth");
});