function ajaxForSearch(url, total_prod = 0, items_page) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page })
        .then(function (data) {
            // console.log(data);
            $('#content_shop_products').empty();
            $('.detalles_producto' && '.imagen_producto' && 'details_product_shop').empty();

            //Si no hay resultados con los filtros
            if (data == "error") {
                $('<div></div>').appendTo('#content_shop_products')
                    .html(
                        '<h3>¡No se encuentarn productos con los filtros aplicados!</h3>'
                    )
            } else {
                for (row in data) {
                    $('<div></div>').attr({ 'id': data[row].id_producto, 'class': 'list_content_shop' }).appendTo('.content_shop_products')
                        .html(
                            "<div class='list_product'>" +
                                "<div class='img-container'>" +
                                    "<img src= '" + data[row].img_producto + "'" + "</img>" +
                                "</div>" +
                                "<div class='product-info'>" +
                                    "<div class='product-content'>" +
                                        "<h1><b>" + data[row].nom_producto + " (" + data[row].precio + '€)' +
                                            "<a class='list__heart' id='" + data[row].id_producto + "'>" +
                                            "<a class='list__heart' id='" + data[row].id_producto + "'><i id=" + data[row].id_producto + " class='fa-solid fa-heart fa-lg'></i></a>" +
                                            "</a>" +
                                        "</b></h1>" +
                                        "<ul>" +
                                            "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>Color: " + data[row].color + "</li>" +
                                            "<li> <i id='col-ico' class='fa-solid fa-certificate fa-xl'></i>Estado: " + data[row].nom_estado + "</li>" +
                                            "<li> <i id='col-ico' class='fa-solid fa-map-location-dot fa-xl'></i>Ciudad: " + data[row].nom_ciudad + "</li>" +
                                        "</ul>" +
                                        "<div class='buttons'>" +
                                            "<button id='" + data[row].id_producto + "' class='more_info_button button add'>Detalles</button>" +
                                            "<button class='button buy'>Comprar</button>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>"
                        )
                }
            }
        }).catch(function () {
            console.log('Error en el ajaxPromise de listar productos');
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}

function loadProducts(total_prod = 0, items_page = 4) {
    ajaxForSearch('module/shop/controller/controller_shop.php?op=get_products', total_prod, items_page);
}


function loadDetails(id_producto) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=get_details&id=' + id_producto, 'GET', 'JSON')
        .then(function (data) {
            // console.log(data);

            $('.list_product_shop').empty();
            $('.imagen_producto_dentro').empty();
            $('.detalles_producto_dentro').empty();
            $('#details_product_shop').removeClass('hidden'); //Mostramos los detalles_producto

            //Apartado imágenes producto
            for (row in data[1][0]) {
                // console.log(data[1][0][row].img_producto);
                $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'imagen_producto_dentro' }).appendTo('.imagen_producto')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src= '" + data[1][0][row].img_producto + "'" + "</img>" +
                        "</div>"
                    )
            }

            // Apartado detalles producto
            $('<div></div>').attr({ 'id': data[0].id_producto, class: 'detalles_producto_dentro' })
            .appendTo('.detalles_producto')
            .html(
            "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                    // Encabezado con título y botón heart
                    "<div class='header-details'>" +
                    "<h1><b>" + data[0].nom_marca + " " + data[0].nom_modelo_consola + "</b></h1>" +
                    "<a class='details__heart' id='" + data[0].id_producto + "'>" +
                        "<i id='" + data[0].id_producto + "' class='fa-solid fa-heart fa-lg'></i>" +
                    "</a>" +
                    "</div>" +
                    "<hr class='hr-shop'>" +
                    "<h3>Especificaciones generales:</h3>" +
                    "<table id='table-shop'>" +
                    "<tr>" +
                        "<td> <i id='col-ico' class='fa-solid fa-sack-dollar fa-2xl'></i> &nbsp; Precio inicial: " + data[0].precio + "€</td>" +
                        "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp; Color: " + data[0].color + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> <i id='col-ico' class='fa-solid fa-box fa-2xl'></i> &nbsp; Capacidad: " + (data[0].capacidad ? data[0].capacidad : "N/A") + "</td>" +
                        "<td> <i id='col-ico' class='fa-brands fa-bandcamp fa-2xl'></i> &nbsp; Marca: " + data[0].nom_marca + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> <i id='col-ico' class='fa-solid fa-certificate fa-2xl'></i> &nbsp; Estado: " + data[0].nom_estado + "</td>" +
                        "<td> <i id='col-ico' class='fa-solid fa-map-location-dot fa-2xl'></i> &nbsp; Ciudad: " + data[0].nom_ciudad + "</td>" +
                    "</tr>" +
                    // "<tr>" +
                    //     "<td> <i id='col-ico' class='fa-solid fa-gamepad fa-2xl'></i> &nbsp; Tipo consola: " + data[0].nom_tipo_consola + "</td>" +
                    //     "<td></td>" +
                    // "</tr>" +
                    "</table>" +
                    "<hr class='hr-shop'>" +
                    "<h3>Fechas:</h3>" +
                    "<table id='table-shop'>" +
                    "<tr>" +
                        "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp; Fecha publicación: " + data[0].fecha_publicacion + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp; Última modificación: " + data[0].fecha_ult_mod + "</td>" +
                    "</tr>" +
                    "</table>" +
                    "<hr class='hr-shop'>" +
                    "<h3>Observaciones:</h3>" +
                    "<p>"+data[0].observaciones+"</p>" +
                "</div>" +
                "</div>" +
            "</div>"
            );


            //Apartado detalles extra
            $('<div></div>').attr({ 'id': data[0].id_producto, class: 'detalles_producto_dentro' }).appendTo('.detalles_extra')
            .html(
                "<div class='list_product_details'>" +
                    "<div class='product-info_details'>" +
                        "<div class='product-content_details'>" +
                            "<h3>Otros detalles:</h3>" +
                            "<hr class=hr-shop>" +
                            "<table id='table-shop'>"+
                                "<tr>" +
                                    "<td> <i class='bi bi-controller' style='font-size: 2rem'></i> &nbsp; Incluye mando: " + (data[0].incluye_mando ? "Sí" : "No") + "</td>" +
                                    "<td> <i class='bi bi-dpad' style='font-size: 2rem'></i> &nbsp; Tipo consola: " + (data[0].nom_tipo_consola ? data[0].nom_tipo_consola : "N/A") + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td> <i class='bi bi-plug' style='font-size: 2rem'></i> &nbsp; Incluye cargador: " + (data[0].incluye_cargador ? "Sí" : "No") + "</td>" +
                                    "<td> <i class='bi bi-boxes' style='font-size: 2rem'></i> &nbsp; Tipo merchandising: " + (data[0].nom_tipo_merchandising ? data[0].nom_tipo_merchandising : "N/A") + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td> <i class='bi bi-joystick' style='font-size: 2rem'></i> &nbsp; Incluye juegos: " + (data[0].incluye_juegos ? "Sí" : "No") + "</td>" +
                                    "<td> <i class='bi bi-plus-square' style='font-size: 2rem'></i></i> &nbsp; Tipo accesorio: " + (data[0].nom_tipo_accesorio ? data[0].nom_tipo_accesorio : "N/A") + "</td>" +
                                "</tr>" +
                            "</table>" +
                            "<hr class=hr-shop>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "<div class='buttons'>" +
                    "<button class='back_list button add'>Volver</button>" +
                "</div>" 
            );

            //Apartado compra
            $('<div></div>').attr({ 'id': data[0].id_producto, class: 'compra_producto_dentro' }).appendTo('.compra_producto')
            .html(
                "<h2>" + data[0].precio + "€</h2>" +
                // "<h3>Opciones de compra:</h3>" +
                // "<hr class='hr-shop'>" +
                "<div class='buttons_details'>" +
                    "<a class='button add' href='#'>Añadir a cesta</a>" +
                    "<a class='button buy' href='#'>Comprar</a>" +
                "</div>" +
                "<hr class='hr-shop'>" +
                "<h3>Opciones de envio:</h3>" +
                "<hr class='hr-shop'>" +
                "<div class='purchase-options'></div>"
            );

            for (var row in data[2][0]) {
                $('<div></div>').attr({ class: 'purchase-item' }).appendTo('.purchase-options')
                .html(
                    "<img src='" + data[2][0][row].img_tipo_venta + "' alt='" + data[2][0][row].nom_tipo_venta + "'>" +
                    "<p>" + data[2][0][row].nom_tipo_venta + "</p>" +
                    "<button>Seleccionar</button>"
                );
            }


            $('.imagen_producto').slick({
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                arrows: true,
                autoplay: true,
                autoplaySpeed: 3000
            });


            // console.log(data[0].id_producto);
            // console.log(data[0].nom_marca);
            // console.log(data[0].nom_modelo_consola);
            // console.log(data[0].nom_producto);
            // console.log(data[0].color);
            // console.log(data[0].capacidad);
            // console.log(data[0].nom_estado);
            // console.log(data[0].nom_ciudad);
            // console.log(data[0].precio);
            // console.log(data[0].nom_estado);


        }).catch(function (data) {
            console.log('Error en el ajaxPromise de detalles producto');
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
        });
}


function clicks() {
    // console.log("Cargamos clicks");
    $(document).on("click", ".more_info_button", function () {
        var id_producto = this.getAttribute('id');
        // console.log("Pillamos el id: " + id_producto);
        loadDetails(id_producto);
    });
    $(document).on("click", ".back_list", function () {
        // console.log("Volvemos al list");
        $('#details_product_shop').addClass('hidden'); //Ocultamos los detalles_producto
        window.location.href = "index.php?page=controller_shop&op=list";
    });
}

$(document).ready(function () {
    loadProducts();
    clicks();
    $('#details_product_shop').addClass('hidden'); //Ocultamos los detalles_producto
    // console.log("Bienvenido al Catálogo");
});