function ajaxForSearch(url, total_prod = 0, items_page, filter = undefined) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page, 'filter': filter })
        .then(function (data) {
            console.log(data);
            $('.content_shop_products').empty();
            $('.detalles_producto' && '.imagen_producto' && 'details_product_shop').empty();

            //Si no hay resultados con los filters
            if (data == "error") {
                $('<div></div>').appendTo('.content_shop_products')
                    .html(
                        '<h3>¡No se encuentarn productos con los filters aplicados!</h3>'
                    )
            } else {
                for (row in data) {
                    // console.log(data[row]);
                    $('<div></div>').attr({ 'id': data[row].id_producto, 'class': 'list_content_shop' }).appendTo('.content_shop_products')
                        .html(
                            "<div class='list_product'>" +
                                "<div id='carousel_list_product-"+data[row].id_producto+"' class='img-container'></div>" + //Aquí va el carousel de las fotos list
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

                        for (img in data[row].img_producto) {
                            // console.log(data[row].img_producto);
                            $('<div></div>').attr('id', data[row].img_producto[img]).appendTo(`#carousel_list_product-${data[row].id_producto}`)
                                .html(
                                    "<img src= '" + data[row].img_producto[img] + "'" + "</img>"
                                );
                        }
        
                        $(`#carousel_list_product-${data[row].id_producto}`).slick({
                            infinite: true,
                            speed: 300,
                            slidesToShow: 1,
                            adaptiveHeight: true,
                            arrows: true
                        });
        
                }

            }
        }).catch(function () {
            console.log('Error en el ajaxPromise de listar productos / No hay productos para estos filtros');
            $(".content_shop_products").empty();
            $('<div></div>').appendTo('.content_shop_products').html('<h1>No hay productos con estos filtros</h1>');
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}

function loadProducts(total_prod = 0, items_page = 4) {
    // var filter = localStorage.getItem('filter');
    // var storedFilter = localStorage.getItem('filter');
    var filter = JSON.parse(localStorage.getItem('filter'));

    // if (filter) {
    if (filter && filter.length > 0) {
        // console.log('hay filtros');
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filter_products', total_prod, items_page, filter);
    } else {
        // console.log('sin filtros');
        ajaxForSearch('module/shop/controller/controller_shop.php?op=get_products', total_prod, items_page);
    }
    
}

function load_filters() {
    $('<div class="div-filters"></div>').appendTo('.filters_shop')
        .html(
            //ManyToMany
            // '<select class="filter_categoria">' +
            //     '<option value="" selected>--Categoria--</option>' +
            //     '<option value="1">Consola</option>' +
            //     '<option value="2">Accesorio</option>' +
            //     '<option value="3">Merchandising</option>' +
            // '</select>' +

            '<select class="filter_ciudad">' +
                '<option value="" selected>--Ciudad--</option>' +
                '<option value="1">Madrid</option>' +
                '<option value="2">Barcelona</option>' +
                '<option value="3">Valencia</option>' +
                '<option value="4">Sevilla</option>' +
                '<option value="5">Bilbao</option>' +
                '<option value="6">Zaragoza</option>' +
                '<option value="7">Málaga</option>' +
                '<option value="8">Murcia</option>' +
                '<option value="9">Alicante</option>' +
                '<option value="10">Córdoba</option>' +
            '</select>' +

            '<select class="filter_estado">' +
                '<option value="" selected>--Estado--</option>' +
                '<option value="1">Nuevo</option>' +
                '<option value="2">Usado</option>' +
                '<option value="3">Desgastado</option>' +
            '</select>' +

            '<select class="filter_marca">' +
                '<option value="" selected>--Marca--</option>' +
                '<option value="1">Sony</option>' +
                '<option value="2">Microsoft</option>' +
                '<option value="3">Nintendo</option>' +
            '</select>' +
            
            '<select class="filter_tipo_consola">' +
                '<option value="" selected>--Tipo consola--</option>' +
                '<option value="1">PlayStation</option>' +
                '<option value="2">Xbox</option>' +
                '<option value="3">Nintendo</option>' +
            '</select>' +

            '<select class="filter_modelo_consola">' +
                '<option value="" selected>--Modelo consola--</option>' +
                '<option value="1">PlayStation 5</option>' +
                '<option value="2">Xbox Series X</option>' +
                '<option value="3">Nintendo Switch</option>' +
                '<option value="4">PlayStation 4</option>' +
                '<option value="5">Xbox One S</option>' +
                '<option value="6">Nintendo 3DS</option>' +
                '<option value="7">PlayStation 3</option>' +
                '<option value="8">Xbox 360</option>' +
                '<option value="9">Nintendo Wii</option>' +
                '<option value="10">PlayStation 2</option>' +
                '<option value="11">PSP</option>' +
                '<option value="12">PSVita</option>' +
            '</select>' +

            '<select class="filter_tipo_accesorio">' +
                '<option value="" selected>--Tipo accesorio--</option>' +
                '<option value="1">Mandos</option>' +
                '<option value="2">Cargadores</option>' +
                '<option value="3">Fundas</option>' +
            '</select>' +

            '<select class="filter_tipo_merchandising">' +
                '<option value="" selected>--Tipo merchandising--</option>' +
                '<option value="1">Camisetas</option>' +
                '<option value="2">Tazas</option>' +
                '<option value="3">Figuras</option>' +
                '<option value="4">Accesorios</option>' +
            '</select>' +

            //ManyToMany
            // '<select class="filter_tipo_venta">' +
            //     '<option value="" disabled selected>--Tipo venta--</option>' +
            //     '<option value="1">Envío disponible</option>' +
            //     '<option value="2">Recogida correos</option>' +
            //     '<option value="3">Presencial</option>' +
            // '</select>'+


            // '<div id="overlay">' +
            //     '<div class= "cv-spinner" >' +
            //         '<span class="spinner"></span>' +
            //     '</div >' +
            // '</div > ' +
            '<button class="filter_button button_spinner" id="Button_filter">Filter</button>' +
            '<button class="filter_remove" id="Remove_filter">Remove</button>');
            $(document).on('click', '.filter_remove', function() {
                filter_remove();
            });
}

function filter_click(total_prod = 0, items_page) {
    // Filtro categoría
        $('.filter_categoria').change(function () {
            localStorage.setItem('filter_categoria', this.value);
        });
        if (localStorage.getItem('filter_categoria')) {
            $('.filter_categoria').val(localStorage.getItem('filter_categoria'));
        }

    // Filtro ciudad
        $('.filter_ciudad').change(function () {
            localStorage.setItem('filter_ciudad', this.value);
        });
        if (localStorage.getItem('filter_ciudad')) {
            $('.filter_ciudad').val(localStorage.getItem('filter_ciudad'));
        }

    // Filtro estado
        $('.filter_estado').change(function () {
            localStorage.setItem('filter_estado', this.value);
        });
        if (localStorage.getItem('filter_estado')) {
            $('.filter_estado').val(localStorage.getItem('filter_estado'));
        }

    // Filtro marca
        $('.filter_marca').change(function () {
            localStorage.setItem('filter_marca', this.value);
        });
        if (localStorage.getItem('filter_marca')) {
            $('.filter_marca').val(localStorage.getItem('filter_marca'));
        }

    // Filtro tipo consola
        $('.filter_tipo_consola').change(function () {
            localStorage.setItem('filter_tipo_consola', this.value);
        });
        if (localStorage.getItem('filter_tipo_consola')) {
            $('.filter_tipo_consola').val(localStorage.getItem('filter_tipo_consola'));
        }

    // Filtro modelo consola
        $('.filter_modelo_consola').change(function () {
            localStorage.setItem('filter_modelo_consola', this.value);
        });
        if (localStorage.getItem('filter_modelo_consola')) {
            $('.filter_modelo_consola').val(localStorage.getItem('filter_modelo_consola'));
        }

    // Filtro tipo accesorio
        $('.filter_tipo_accesorio').change(function () {
            localStorage.setItem('filter_tipo_accesorio', this.value);
        });
        if (localStorage.getItem('filter_tipo_accesorio')) {
            $('.filter_tipo_accesorio').val(localStorage.getItem('filter_tipo_accesorio'));
        }

    // Filtro tipo merchandising
        $('.filter_tipo_merchandising').change(function () {
            localStorage.setItem('filter_tipo_merchandising', this.value);
        });
        if (localStorage.getItem('filter_tipo_merchandising')) {
            $('.filter_tipo_merchandising').val(localStorage.getItem('filter_tipo_merchandising'));
        }

    // Filtro tipo venta
        $('.filter_tipo_venta').change(function () {
            localStorage.setItem('filter_tipo_venta', this.value);
        });
        if (localStorage.getItem('filter_tipo_venta')) {
            $('.filter_tipo_venta').val(localStorage.getItem('filter_tipo_venta'));
        }

    $(document).on('click', '.filter_button', function () {
        var filter = [];

        if (localStorage.getItem('filter_categoria')) {
            filter.push(['categoria', localStorage.getItem('filter_categoria')]);
        }
        if (localStorage.getItem('filter_ciudad')) {
            filter.push(['ciudad', localStorage.getItem('filter_ciudad')]);
        }
        if (localStorage.getItem('filter_estado')) {
            filter.push(['estado', localStorage.getItem('filter_estado')]);
        }
        if (localStorage.getItem('filter_marca')) {
            filter.push(['marca', localStorage.getItem('filter_marca')]);
        }
        if (localStorage.getItem('filter_tipo_consola')) {
            filter.push(['tipo_consola', localStorage.getItem('filter_tipo_consola')]);
        }
        if (localStorage.getItem('filter_modelo_consola')) {
            filter.push(['modelo_consola', localStorage.getItem('filter_modelo_consola')]);
        }
        if (localStorage.getItem('filter_tipo_accesorio')) {
            filter.push(['tipo_accesorio', localStorage.getItem('filter_tipo_accesorio')]);
        }
        if (localStorage.getItem('filter_tipo_merchandising')) {
            filter.push(['tipo_merchandising', localStorage.getItem('filter_tipo_merchandising')]);
        }
        if (localStorage.getItem('filter_tipo_venta')) {
            filter.push(['tipo_venta', localStorage.getItem('filter_tipo_venta')]);
        }

        // localStorage.setItem('filter', filter);
        localStorage.setItem('filter', JSON.stringify(filter));

        // console.log('Filtros aplicados:');
        // console.log(filter);
        if (filter.length != 0) {
            // console.log('hay filtros 2');
            ajaxForSearch('module/shop/controller/controller_shop.php?op=filter_products', total_prod, items_page, filter);
        } else {
            // console.log('sin filtros 2');
            ajaxForSearch('module/shop/controller/controller_shop.php?op=get_products', total_prod, items_page);
        }

        // highlight(filter);
    });

}

function filter_remove(){
    localStorage.removeItem('filter_categoria');
    localStorage.removeItem('filter_ciudad');
    localStorage.removeItem('filter_estado');
    localStorage.removeItem('filter_marca');
    localStorage.removeItem('filter_tipo_consola');
    localStorage.removeItem('filter_modelo_consola');
    localStorage.removeItem('filter_tipo_accesorio');
    localStorage.removeItem('filter_tipo_merchandising');
    localStorage.removeItem('filter_tipo_venta');

    // Restablecer los selects a su valor inicial
    $('.filter_categoria, .filter_ciudad, .filter_estado, .filter_marca, .filter_tipo_consola, '+
        '.filter_modelo_consola, .filter_tipo_accesorio, .filter_tipo_merchandising, .filter_tipo_venta').val('');
};

function loadDetails(id_producto) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=get_details&id=' + id_producto, 'GET', 'JSON')
        .then(function (data) {
            console.log(data);

            $('.list_product_shop').empty();
            $('.imagen_producto_dentro').empty();
            $('.detalles_producto_dentro').empty();
            $('#details_product_shop').removeClass('hidden'); //Mostramos los detalles_producto

            //Apartado imágenes producto
            for (row in data[1][0]) {
                // console.log(data[1][0][row].img_producto);
                $('<div></div>').attr({ 'id': data[1][0][row].id_img, class: 'imagen_producto_dentro' }).appendTo('.imagen_producto')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src= '" + data[1][0][row].img_producto + "'>" + "</img>" +
                        "</div>"
                    )
            }

            // Apartado detalles producto
            $('<div></div>').attr({ 'id': data[0].id_producto, class: 'detalles_producto_dentro' }).appendTo('.detalles_producto')
            .html(
            "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                    // Encabezado con título y botón heart
                    "<div class='header-details'>" +
                    "<h1><b>" + data[0].nom_producto + "</b></h1>" +
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
                                    "<td> <i class='bi bi-controller' style='font-size: 2rem'></i> &nbsp; Incluye mando: " + (data[0].incluye_mando === 'true' ? "Sí" : "No") + "</td>" +
                                    "<td> <i class='bi bi-dpad' style='font-size: 2rem'></i> &nbsp; Tipo consola: " + (data[0].nom_tipo_consola ? data[0].nom_tipo_consola : "N/A") + "</td>" +
                                    "<td> <i class='bi bi-dpad' style='font-size: 2rem'></i> &nbsp; Modelo consola: " + (data[0].nom_modelo_consola ? data[0].nom_modelo_consola : "N/A") + "</td>" +    
                                "</tr>" +
                                "<tr>" +
                                    "<td> <i class='bi bi-plug' style='font-size: 2rem'></i> &nbsp; Incluye cargador: " + (data[0].incluye_cargador === 'true' ? "Sí" : "No") + "</td>" +
                                    "<td> <i class='bi bi-plus-square' style='font-size: 2rem'></i></i> &nbsp; Tipo accesorio: " + (data[0].nom_tipo_accesorio ? data[0].nom_tipo_accesorio : "N/A") + "</td>" +
                                    "<td> </td>"+                                                
                                "</tr>" +
                                "<tr>" +
                                    "<td> <i class='bi bi-joystick' style='font-size: 2rem'></i> &nbsp; Incluye juegos: " + (data[0].incluye_juegos === 'true' ? "Sí" : "No") + "</td>" + 
                                    "<td> <i class='bi bi-boxes' style='font-size: 2rem'></i> &nbsp; Tipo merchandising: " + (data[0].nom_tipo_merchandising ? data[0].nom_tipo_merchandising : "N/A") + "</td>" +
                                    "<td> </td>"+
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
    load_filters();
    filter_click();
    $('#details_product_shop').addClass('hidden'); //Ocultamos los detalles_producto
    // console.log("Bienvenido al Catálogo");
});