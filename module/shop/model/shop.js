function loadProducts() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=get_products', 'GET', 'JSON')
        .then(function (data) {
            var producto = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_producto,
                    imagen = data[i].img_producto;

                // Crear tarjetas de producto
                producto += "<div class='col-sm-4 producto'>" +
                    "<div class='producto-inner text-center'>" +
                    "<img src='" + imagen + "' class='img_producto'>" +
                    "<br/>producto: " + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#producto").html(producto);
        }).catch(function () {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_producto HOME";
        });
}

$(document).ready(function () {
    loadProducts();
    // console.log("Bienvenido al Catálogo");
});