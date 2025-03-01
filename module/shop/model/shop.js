function ajaxForSearch(url, total_prod = 0, items_page, filter = undefined) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page, 'filter': filter })
        .then(function (data) {
            // console.log(data); //Mostrar productos listados
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
    var filter = JSON.parse(localStorage.getItem('filter')) || false;

    // console.log(filter);

    if (filter) {
        // console.log('hay filtros');
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filter_products', total_prod, items_page, filter);
        // highlight(filter);
    } else {
        // console.log('sin filtros');
        ajaxForSearch('module/shop/controller/controller_shop.php?op=get_products', total_prod, items_page);
    }
    
}

function load_filters() {
    $('<div class="div-filters"></div>').appendTo('.filters_shop')
        .html(
            '<h2>Buscar producto</h2>' +
            '<div class="categoria">' +
                '<h4>Categoria</h4>' +
            '</div>' +

            '<div class="ciudad">' +
                '<h4>Ubicación</h4>' +
                '<select class="filter_ciudad" id="filter_ciudad">' +
                    '<option value="*" class="default_filter" selected>Todas</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="precio">' +
                '<h4>Precio</h4>' +
                '<div id="price-slider"></div>'+
                '<p>Min/Max: <span id="price-min"></span> - <span id="price-max"></span></p>'+
                '<input type="hidden" id="filter_precio_min" name="precio_min" />'+
                '<input type="hidden" id="filter_precio_max" name="precio_max" />'+
            '</div>' +

            '<div class="estado">' +
                '<h4>Estado</h4>' +
            '</div>' +

            '<div class="marca">' +
                '<h4>Marca</h4>' +
            '</div>' +
            
            '<div class="tipo_consola">' +
                '<h4>Tipo de consola</h4>' +
                '<select class="filter_tipo_consola" id="filter_tipo_consola">' +
                    '<option value="*" class="default_filter" selected>Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="modelo_consola">' +
                '<h4>Modelo</h4>' +
                '<select class="filter_modelo_consola" id="filter_modelo_consola">' +
                    '<option value="*" class="default_filter" selected>Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_accesorio">' +
                '<h4>Accesorios</h4>' +
                '<select class="filter_tipo_accesorio" id="filter_tipo_accesorio">' +
                    '<option value="*" class="default_filter" selected>Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_merchandising">' +
                '<h4>Merchandising</h4>' +
                '<select class="filter_tipo_merchandising" id="filter_tipo_merchandising">' +
                    '<option value="*" class="default_filter" selected>Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_venta">' +
                '<h4>Tipo de venta</h4>' +
            '</div><br>' +

            // '<div id="overlay">' +
            //     '<div class= "cv-spinner" >' +
            //         '<span class="spinner"></span>' +
            //     '</div >' +
            // '</div > ' +
            '<button class="filter_button button_spinner" id="Button_filter">Filtrar</button>&nbsp&nbsp&nbsp' +
            '<button class="filter_remove" id="Remove_filter">Borrar filtros</button>');

            //FILTROS DINAMICOS
            ajaxPromise('module/shop/controller/controller_shop.php?op=get_filters', 'GET', 'JSON')
            .then(function (data) {

                // console.log(data); //Mostrar filtros recogidos

                // Rellenar filtros categoria
                for (categoria in data[0][0]) {
                    // $('.filter_categoria').append(`<option value="${data[0][0][categoria].id_categoria}">${data[0][0][categoria].nom_categoria}</option>`);
                    $('.categoria').append(`<input type="checkbox" value="${data[0][0][categoria].id_categoria}" id="${data[0][0][categoria].id_categoria}" class="filter_categoria"> ${data[0][0][categoria].nom_categoria}</br>`);
                }

                // Rellenar filtros ciudad
                for (ciudad in data[1][0]) {
                    $('.filter_ciudad').append(`<option value="${data[1][0][ciudad].id_ciudad}">${data[1][0][ciudad].nom_ciudad}</option>`);
                }
                
                // Rellenar filtros estado
                for (estado in data[2][0]) {
                    // $('.filter_estado').append(`<option value="${data[2][0][estado].id_estado}">${data[2][0][estado].nom_estado}</option>`);
                    $('.estado').append(`<input type="radio" name="filter_estado" value="${data[2][0][estado].id_estado}" id="${data[2][0][estado].id_estado}" class="filter_estado"> ${data[2][0][estado].nom_estado}</br>`);                          
                }
                
                // Rellenar filtros marca filter_marca
                for (marca in data[3][0]) {
                    $('.marca').append(`<input type="radio" name="filter_marca" value="${data[3][0][marca].id_marca}" id="${data[3][0][marca].id_marca}" class="filter_marca"> ${data[3][0][marca].nom_marca}</br>`);
                                        
                }

                // Rellenar filtros tipo_consola
                for (tipo_consola in data[4][0]) {
                    $('.filter_tipo_consola').append(`<option value="${data[4][0][tipo_consola].id_tipo_consola}">${data[4][0][tipo_consola].nom_tipo_consola}</option>`);
                }

                // Rellenar filtros modelo_consola
                for (modelo_consola in data[5][0]) {
                    $('.filter_modelo_consola').append(`<option value="${data[5][0][modelo_consola].id_modelo_consola}">${data[5][0][modelo_consola].nom_modelo_consola}</option>`);
                }

                // Rellenar filtros tipo_accesorio
                for (tipo_accesorio in data[6][0]) {
                    $('.filter_tipo_accesorio').append(`<option value="${data[6][0][tipo_accesorio].id_tipo_accesorio}">${data[6][0][tipo_accesorio].nom_tipo_accesorio}</option>`);
                }

                // Rellenar filtros tipo_merchandising
                for (tipo_merchandising in data[7][0]) {
                    $('.filter_tipo_merchandising').append(`<option value="${data[7][0][tipo_merchandising].id_tipo_merchandising}">${data[7][0][tipo_merchandising].nom_tipo_merchandising}</option>`);
                }

                // Rellenar filtros tipo_venta
                for (tipo_venta in data[8][0]) {
                    $('.tipo_venta').append(`<input type="checkbox" value="${data[8][0][tipo_venta].id_tipo_venta}" id="${data[8][0][tipo_venta].id_tipo_venta}" class="filter_tipo_venta"> ${data[8][0][tipo_venta].nom_tipo_venta}</br>`);                          
                }

                //INICIALIZAR SLIDER FILTRO PRECIO
                var priceSlider = document.getElementById('price-slider');
                var priceMin = document.getElementById('price-min');
                var priceMax = document.getElementById('price-max');
                var filterPrecioMin = document.getElementById('filter_precio_min');
                var filterPrecioMax = document.getElementById('filter_precio_max');

                var precio_max = parseInt(data[9][0][0]['precio_max']);

                noUiSlider.create(priceSlider, {
                    start: [0, precio_max], //Rango del filtro
                    connect: true,
                    range: {
                        'min': 0,
                        'max': precio_max
                    },
                    step: 10,
                });
                priceSlider.noUiSlider.on('update', function (values) {
                    var min = Math.round(values[0]);
                    var max = Math.round(values[1]);
                    priceMin.textContent = min + '€';
                    priceMax.textContent = max + '€';
                    filterPrecioMin.value = min;
                    filterPrecioMax.value = max;
                });

            }).catch(function(error) {
                console.error("Error cargando las opciones de filtros:", error);
            });
}

function filter_click(total_prod = 0, items_page) {
    var filter = [];
    var categoria = [];
    var ciudad = [];
    var estado = [];
    var marca = [];
    var tipo_consola = [];
    var modelo_consola = [];
    var tipo_accesorio = [];
    var tipo_merchandising = [];
    var tipo_venta = [];
    var precio_min = [];
    var precio_max = [];

    localStorage.removeItem('filter');

// Filtro categoria
    $.each($("input[class='filter_categoria']:checked"), function() {
        categoria.push($(this).val());
    });

    if (categoria.length != 0) {
        filter.push({ "categoria": categoria });
    } else {
        filter.push({ "categoria": '*' });
    }

// Filtro ciudad
    var ciu = document.getElementById("filter_ciudad").value;
    if (ciu != 0) {
        ciudad.push(ciu);
        if (ciudad == "*") {
            filter.push({ "ciudad": "*" });
        } else {
            filter.push({ "ciudad": ciudad });
        }
    } else {
        filter.push({ "ciudad": '*' });
    }

// Filtro estado
    $.each($("input[class='filter_estado']:checked"), function() {
        estado.push($(this).val());
    });

    if (estado.length != 0) {
        filter.push({ "estado": estado });
    } else {
        filter.push({ "estado": '*' });
    }

// Filtro marca
    $.each($("input[class='filter_marca']:checked"), function() {
        marca.push($(this).val());
    });

    if (marca.length != 0) {
        filter.push({ "marca": marca });
    } else {
        filter.push({ "marca": '*' });
    }

// Filtro tipo_consola
    var t_con = document.getElementById("filter_tipo_consola").value;
    if (t_con != 0) {
        tipo_consola.push(t_con);
        if (tipo_consola == "*") {
            filter.push({ "tipo_consola": "*" });
        } else {
            filter.push({ "tipo_consola": tipo_consola });
        }
    } else {
        filter.push({ "tipo_consola": '*' });
    }

// Filtro modelo_consola
    var m_con = document.getElementById("filter_modelo_consola").value;
    if (m_con != 0) {
        modelo_consola.push(m_con);
        if (modelo_consola == "*") {
            filter.push({ "modelo_consola": "*" });
        } else {
            filter.push({ "modelo_consola": modelo_consola });
        }
    } else {
        filter.push({ "modelo_consola": '*' });
    }

// Filtro tipo_accesorio
    var t_acc = document.getElementById("filter_tipo_accesorio").value;
    if (t_acc != 0) {
        tipo_accesorio.push(t_acc);
        if (tipo_accesorio == "*") {
            filter.push({ "tipo_accesorio": "*" });
        } else {
            filter.push({ "tipo_accesorio": tipo_accesorio });
        }
    } else {
        filter.push({ "tipo_accesorio": '*' });
    }

// Filtro tipo_merchandising
    var t_mer = document.getElementById("filter_tipo_merchandising").value;
    if (t_mer != 0) {
        tipo_merchandising.push(t_mer);
        if (tipo_merchandising == "*") {
            filter.push({ "tipo_merchandising": "*" });
        } else {
            filter.push({ "tipo_merchandising": tipo_merchandising });
        }
    } else {
        filter.push({ "tipo_merchandising": '*' });
    }

// Filtro tipo_venta
    $.each($("input[class='filter_tipo_venta']:checked"), function() {
        tipo_venta.push($(this).val());
    });

    if (tipo_venta.length != 0) {
        filter.push({ "tipo_venta": tipo_venta });
    } else {
        filter.push({ "tipo_venta": '*' });
    }

// Filtro precio min
    var p_min = document.getElementById('filter_precio_min').value;
    if (p_min != 0) {
        precio_min.push(p_min);
        if (precio_min == "*") {
            filter.push({ "precio_min": "0" });
        } else {
            filter.push({ "precio_min": precio_min });
        }
    } else {
        filter.push({ "precio_min": '0' });
    }
// Filtro precio max
    var p_max = document.getElementById('filter_precio_max').value;
    if (p_max != 0) {
        precio_max.push(p_max);
        if (precio_max == "*") {
            filter.push({ "precio_max": "*" });
        } else {
            filter.push({ "precio_max": precio_max });
        }
    } else {
        filter.push({ "precio_max": '*' });
    }

    // Guardamos en localStorage los filtros
    if (filter.length != 0) {
        localStorage.setItem('filter', JSON.stringify(filter));
    }

    location.reload();

}

function filter_remove(){
    // localStorage.removeItem('filter_categoria');
    // localStorage.removeItem('filter_ciudad');
    // localStorage.removeItem('filter_estado');
    // localStorage.removeItem('filter_marca');
    // localStorage.removeItem('filter_tipo_consola');
    // localStorage.removeItem('filter_modelo_consola');
    // localStorage.removeItem('filter_tipo_accesorio');
    // localStorage.removeItem('filter_tipo_merchandising');
    // localStorage.removeItem('filter_tipo_venta');
    localStorage.removeItem('filter');

    // Restablecer los selects a su valor inicial
    // $('.filter_categoria, .filter_ciudad, .filter_estado, .filter_marca, .filter_tipo_consola, '+
    //     '.filter_modelo_consola, .filter_tipo_accesorio, .filter_tipo_merchandising, .filter_tipo_venta').val('');

    //En vez de restablecer, recargamos la página para que se vuelvan a mostrar todos los productos tras borrar todo lo de localStorage
    location.reload();
};

function highlight() {
    var all_filters = JSON.parse(localStorage.getItem('filter'));

    console.log("Estos son los filtros a remarcar:");
    console.log(all_filters);

    if (all_filters[2].category[0] != '*') {
        document.getElementById('select_cat').value = all_filters[2].category[0];
    }

    //highlight Selects
    // if (all_filters[2].category[0] != '*') {
    //     document.getElementById('select_cat').value = all_filters[2].category[0];
    // }
    //highlight Radiobuttons
    // if (all_filters[1].Num_doors[0] != '*') {
    //     document.getElementById(all_filters[1].Num_doors[0]).setAttribute('checked', true);
    // }
    //highlight Checkboxes
    // if (all_filters[0].Color[0] != '*') {
    //     for (row in all_filters[0].Color) {
    //         document.getElementById(all_filters[0].Color[row]).setAttribute('checked', true);
    //     }
    // }
}

function loadDetails(id_producto) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=get_details&id=' + id_producto, 'GET', 'JSON')
        .then(function (data) {
            // Debug filtros
            // console.log(data);

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
    $(document).on('click', '.filter_button', function () {
        filter_click();
    });
    $(document).on('click', '.filter_remove', function() {
        filter_remove();
    });

}

$(document).ready(function () {
    loadProducts();
    clicks();
    load_filters();
    $('#details_product_shop').addClass('hidden'); //Ocultamos los detalles_producto
    // console.log("Bienvenido al Catálogo");
});