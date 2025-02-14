function ajaxForSearch(url, total_prod = 0, items_page) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page })
        .then(function (data) {
            console.log(data);
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
                                                "<i id= " + data[row].id_producto + " class='fa-solid fa-heart fa-lg'></i>"+
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

                            // Intento de Carousel para la lista de productos
                            // "<div class='list_product'>" +
                            // "<div class='carousel__img-container'>" +
                            // "<div class='img-container'>" +
                            // "<img src= '" + data[row].img_producto + "'" + "</img>" +
                            // "</div>" +
                            // "<button class='carousel__prev prev_img__products'>" +
                            // "<i class='bx bx-chevron-left'></i>" +
                            // "</button>" +

                            // "<button class='carousel__next next_img__products'>" +
                            // "<i class='bx bx-chevron-right'></i>" +
                            // "</button>" +
                            // "</div>" +
                            // "<div class='product-info'>" +
                            // "<div class='product-content'>" +
                            // "<h1><b>" + data[row].nom_producto + " (" + data[row].precio + '€)' +
                            // "<a class='list__heart' id='" + data[row].id_producto + "'>" +
                            // "<i id= " + data[row].id_producto + " class='fa-solid fa-heart fa-lg'></i></a>" +
                            // "</b></h1>" +
                            // "<ul>" +
                            // "<li> <i id='col-ico' class='fa-solid fa-road fa-xl'></i>&nbsp;&nbsp;Incluye cargador: " + data[row].incluye_cargador + "</li>" +
                            // "<li> <i id='col-ico' class='fa-solid fa-person fa-xl'></i>&nbsp;&nbsp;Incluye juegos: " + data[row].incluye_juegos + "</li>" +
                            // "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>&nbsp; Color: " + data[row].color + "</li>" +
                            // "</ul>" +
                            // "<div class='buttons'>" +
                            // "<button id='" + data[row].id_producto + "' class='more_info_button button add'>Detalles</button>" +
                            // "<button class='button buy'>Comprar</button>" +
                            // "</div>" +
                            // "</div>" +
                            // "</div>" +
                            // "</div>"
                        )

                    // aqui va el carousel de las fotos
                    // ajaxPromise('module/shop/controller/controller_shop.php?op=get_products_images&id=' + data[row].id_producto, 'GET', 'JSON')
                    //     .then(function (images) {
                    //         console.log(images);
                    //         for (row in images) {
                    //             $('<div></div>').attr({class: 'products_images' }).appendTo('.img-container')
                    //                 .html(
                    //                     "<img src= '" + images[row].img_producto + "'></img>"
                    //                 )
                    //         }

                    //         new Glider(document.querySelector('.img-container'), {
                    //             slidesToShow: 1,
                    //             slidesToScroll: 1,
                    //             rewind: true,
                    //             arrows: {
                    //                 prev: '.prev_img__products',
                    //                 next: '.next_img__products'
                    //             }
                    //         });
                    //     }).catch(function () {
                    //         console.log("Error en el ajax de dentro");
                    //     });

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

            for (row in data[1][0]) {
                // console.log(data[1][0][row].img_producto);
                $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'imagen_producto_dentro' }).appendTo('.imagen_producto')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src= '" + data[1][0][row].img_producto + "'" + "</img>" +
                        "</div>"
                    )
            }
            


            $('<div></div>').attr({ 'id': data[0].id_producto, class: 'detalles_producto_dentro' }).appendTo('.detalles_producto')
                .html(
                    "<div class='list_product_details'>" +
                        "<div class='product-info_details'>" +
                            "<div class='product-content_details'>" +
                                "<h1><b>" + data[0].nom_marca + " " + data[0].nom_modelo_consola + "</b></h1>" +
                                "<hr class=hr-shop>" +
                                "<h3>Especificaciones generales:</h3>" +
                                "<table id='table-shop'>"+
                                    "<tr>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Precio: " + data[0].precio + "€</td>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Color: " + data[0].color + "</td>  </tr>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp; Capacidad: " + data[0].capacidad + "</td>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp; Marca: " + data[0].marca + "</td>  </tr>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp; Estado: " + data[0].nom_estado + "</td>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp; Ciudad: " + data[0].nom_ciudad + "</td>  </tr>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp; Tipo consola: " + data[0].nom_tipo_consola + "</td>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;Tipo merchandising: " + data[0].nom_tipo_merchandising + "</td>  </tr>"+
                                        "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp; Tipo accesorio: " + data[0].nom_tipo_accesorio + "</td>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;Tipo merchandising: " + data[0].nom_tipo_merchandising + "</td>  </tr>"+
                                        "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Fecha publicación: " + data[0].fecha_publicacion + "</td>  </tr>" +
                                        "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Última modificación: " + data[0].fecha_ult_mod + "</td>  </tr>" +
                                    "</tr>" +
                                "</table>" +
                                "<hr class=hr-shop>" +
                                "<h3><b>" + "Opciones:" + "</b></h3>" +
                                "<table id='table-shop'>"+
                                "<tr>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Precio: " + data[0].precio + "€</td>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Color: " + data[0].color + "</td>  </tr>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp; Capacidad: " + data[0].capacidad + "</td>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp; Marca: " + data[0].marca + "</td>  </tr>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp; Estado: " + data[0].nom_estado + "</td>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp; Ciudad: " + data[0].nom_ciudad + "</td>  </tr>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp; Tipo consola: " + data[0].nom_tipo_consola + "</td>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;Tipo merchandising: " + data[0].nom_tipo_merchandising + "</td>  </tr>"+
                                    "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp; Tipo accesorio: " + data[0].nom_tipo_accesorio + "</td>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;Tipo merchandising: " + data[0].nom_tipo_merchandising + "</td>  </tr>"+
                                    "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Fecha publicación: " + data[0].fecha_publicacion + "</td>  </tr>" +
                                    "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp; Última modificación: " + data[0].fecha_ult_mod + "</td>  </tr>" +
                                "</tr>" +
                            "</table>" +
                            "<hr class=hr-shop>" +
                                "<div class='buttons_details'>" +
                                    "<a class='button add' href='#'>Añadir a cesta</a>" +
                                    "<a class='button buy' href='#'>Comprar</a>" +
                                    "<span class='button' id='precio_details'>" + data[0].precio + "<i class='fa-solid fa-euro-sign'></i> </span>" +
                                    "<a class='details__heart' id='" + data[0].id_producto + "'><i id=" + data[0].id_producto + " class='fa-solid fa-heart fa-lg'></i></a>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        
                    "</div>"+
                    "<div class='buttons'>" +
                                    "<button class='back_list button add'>Volver</button>" +
                                "</div>" 
                )

            $('.imagen_producto').slick({
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                arrows: true
                // autoplay: true,
                // autoplaySpeed: 1500
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
        window.location.href = "index.php?page=controller_shop&op=list";
    });
}

$(document).ready(function () {
    loadProducts();
    clicks();
    // console.log("Bienvenido al Catálogo");
});