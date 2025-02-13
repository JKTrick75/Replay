function ajaxForSearch(url, total_prod = 0, items_page) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page })
        .then(function (data) {
            console.log(data);
            $('#content_shop_products').empty();
            $('.date_product' && '.date_img').empty();

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
                            "<i id= " + data[row].id_producto + " class='fa-solid fa-heart fa-lg'></i></a>" +
                            "</b></h1>" +
                            "<ul>" +
                            "<li> <i id='col-ico' class='fa-solid fa-road fa-xl'></i>&nbsp;&nbsp;Incluye cargador: " + data[row].incluye_cargador + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-person fa-xl'></i>&nbsp;&nbsp;Incluye juegos: " + data[row].incluye_juegos + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>&nbsp; Color: " + data[row].color + "</li>" +
                            "</ul>" +
                            "<div class='buttons'>" +
                            "<button id='" + data[row].id_producto + "' class='more_info_list button add'>Detalles</button>" +
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
                            // "<button id='" + data[row].id_producto + "' class='more_info_list button add'>Detalles</button>" +
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
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}

function loadProducts(total_prod = 0, items_page = 4) {
    ajaxForSearch('module/shop/controller/controller_shop.php?op=get_products', total_prod, items_page);
}


function loadDetails(id_producto) {
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=details_car&id=' + id_producto, 'GET', 'JSON')
        .then(function (data) {
            $('#content_shop_products').empty();
            $('.date_img_dentro').empty();
            $('.date_product_dentro').empty();

            for (row in data[1][0]) {
                $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'date_img_dentro' }).appendTo('.date_img')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src= '" + data[1][0][row].img_cars + "'" + "</img>" +
                        "</div>"
                    )
            }

            $('<div></div>').attr({ 'id': data[0].id_producto, class: 'date_product_dentro' }).appendTo('.date_product')
                .html(
                    "<div class='list_product_details'>" +
                    "<div class='product-info_details'>" +
                    "<div class='product-content_details'>" +
                    "<h1><b>" + data[0].id_brand + " " + data[0].name_model + "</b></h1>" +
                    "<hr class=hr-shop>" +
                    "<table id='table-shop'> <tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-road fa-2xl'></i> &nbsp;" + data[0].Km + "KM" + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp;" + data[0].gear_shift + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp;" + data[0].name_cat + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0].num_doors + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp;" + data[0].name_tmotor + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0].matricualtion_date + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp;" + data[0].color + "</td>" +
                    "<td> <i class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;" + data[0].city + "</td> </tr>" +
                    "</table>" +
                    "<hr class=hr-shop>" +
                    "<h3><b>" + "More Information:" + "</b></h3>" +
                    "<p>This vehicle has a 2-year warranty and reviews during the first 6 months from its acquisition.</p>" +
                    "<div class='buttons_details'>" +
                    "<a class='button add' href='#'>Add to Cart</a>" +
                    "<a class='button buy' href='#'>Buy</a>" +
                    "<span class='button' id='price_details'>" + data[0].price + "<i class='fa-solid fa-euro-sign'></i> </span>" +
                    "<a class='details__heart' id='" + data[0].id_producto + "'><i id=" + data[0].id_producto + " class='fa-solid fa-heart fa-lg'></i></a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                )

            $('.date_img').slick({
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 1500
            });
        }).catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
        });
}


function clicks() {
    $(document).on("click", ".more_info_list", function () {
        var id_producto = this.getAttribute('id');
        loadDetails(id_producto);
    });
}

$(document).ready(function () {
    loadProducts();
    // clicks();
    // console.log("Bienvenido al Catálogo");
});