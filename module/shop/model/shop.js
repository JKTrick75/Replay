/* ============================================================================================ */
/*                                          LISTAR PRODUCTOS                                    */
/* ============================================================================================ */

function ajaxForSearch(url, total_prod = 0, items_page, filter = undefined) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page, 'filter': filter })
        .then(function (data) {
            console.log(data); //Mostrar productos listados

            window.scrollTo(0, 0); //Mover la pantalla arriba del todo
            $('.content_shop_products').empty();
            $('.detalles_producto' && '.imagen_producto' && 'details_product_shop').empty();

            //Si no hay resultados con los filters
            if (data == "error") {
                $('<div></div>').appendTo('.content_shop_products')
                    .html(
                        '<h3>¡No se encuentarn productos con los filters aplicados!</h3>'
                    )
            } else {
                //Añadir contador productos
                $('<div></div>').attr({ 'class': 'list_content_shop' }).appendTo('.content_shop_products')
                        .html(
                            "<div class='count_products'></div>"
                        )
                //Cargar Mapa
                load_map_shop();
                //Generar tarjetas productos
                for (row in data) {
                    // console.log(data[row]);
                    $('<div></div>').attr({ 'id': data[row].id_producto, 'class': 'list_content_shop' }).appendTo('.content_shop_products')
                        .html(
                            "<div class='list_product more_info_button' id='" + data[row].id_producto + "'>" +
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
                                            // "<button id='" + data[row].id_producto + "' class='more_info_button button add'>Detalles</button>" +
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
        
                        //Aquí añadimos los marcadores al mapa
                        load_markers(data[row]);
                }

            }
        }).catch(function () {
            console.log('Error en el ajaxPromise de listar productos / No hay productos para estos filtros');
            $(".content_shop_products").empty();
            $('<div></div>').appendTo('.content_shop_products').html('<img src="view/assets/img/sad-gaming.gif" class="gif_no_stock image_gif">');
            $('<div></div>').appendTo('.content_shop_products').html('<h1>No hay productos con estos filtros</h1>');
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}

/* ============================================================================================ */
/*                                            FILTROS                                           */
/* ============================================================================================ */

function loadProducts(total_prod = 0, items_page = 4) {
    var filter = JSON.parse(localStorage.getItem('filter')) || false;
    // console.log(filter);

    window.scrollTo(0, 0); //Mover la pantalla arriba del todo

    if (filter) {
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
            '<h2>Buscar producto</h2>' +

            '<div class="categoria">' +
                '<h4>Categoria</h4>' +
            '</div>' +

            '<div class="ciudad">' +
                '<h4>Ubicación</h4>' +
                '<select class="filter_ciudad" id="filter_ciudad">' +
                    '<option value="*" class="default_filter">Todas</option>' +
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
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="modelo_consola">' +
                '<h4>Modelo</h4>' +
                '<select class="filter_modelo_consola" id="filter_modelo_consola">' +
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_accesorio">' +
                '<h4>Accesorios</h4>' +
                '<select class="filter_tipo_accesorio" id="filter_tipo_accesorio">' +
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_merchandising">' +
                '<h4>Merchandising</h4>' +
                '<select class="filter_tipo_merchandising" id="filter_tipo_merchandising">' +
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_venta">' +
                '<h4>Tipo de venta</h4>' +
            '</div><br>' +

            '<div id="overlay">' +
                '<div class= "cv-spinner" >' +
                    '<span class="spinner"></span>' +
                '</div >' +
            '</div > ' +
            '<button class="filter_button button_spinner" id="Button_filter">Filtrar</button>&nbsp&nbsp&nbsp' +
            '<button class="filter_remove" id="Remove_filter">Borrar filtros</button><br><br>'
        );

        //FILTROS DINAMICOS
        return ajaxPromise('module/shop/controller/controller_shop.php?op=get_filters', 'GET', 'JSON') //Ponemos return para controlar abajo en el $document.ready que se ejecute antes que algunas funciones
            .then(function (data) {

                // console.log(data); //Mostrar filtros recogidos
                // console.log("categoria"+data[0][0][0].id_categoria);

                // Rellenar filtros categoria
                for (categoria in data[0][0]) {
                    $('.categoria').append(`<input type="checkbox" value="${data[0][0][categoria].id_categoria}" id="categoria${data[0][0][categoria].id_categoria}" class="filter_categoria"> ${data[0][0][categoria].nom_categoria}</br>`);
                }

                // Rellenar filtros ciudad
                for (ciudad in data[1][0]) {
                    $('.filter_ciudad').append(`<option value="${data[1][0][ciudad].id_ciudad}">${data[1][0][ciudad].nom_ciudad}</option>`);
                }
                
                // Rellenar filtros estado
                for (estado in data[2][0]) {
                    $('.estado').append(`<input type="radio" name="filter_estado" value="${data[2][0][estado].id_estado}" id="estado${data[2][0][estado].id_estado}" class="filter_estado"> ${data[2][0][estado].nom_estado}</br>`);                          
                }
                
                // Rellenar filtros marca filter_marca
                for (marca in data[3][0]) {
                    $('.marca').append(`<input type="radio" name="filter_marca" value="${data[3][0][marca].id_marca}" id="marca${data[3][0][marca].id_marca}" class="filter_marca"> ${data[3][0][marca].nom_marca}</br>`);
                                        
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
                    $('.tipo_venta').append(`<input type="checkbox" value="${data[8][0][tipo_venta].id_tipo_venta}" id="tipo_venta${data[8][0][tipo_venta].id_tipo_venta}" class="filter_tipo_venta"> ${data[8][0][tipo_venta].nom_tipo_venta}</br>`);                          
                }

                //SLIDER FILTRO PRECIO
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
                //Actualizar valores del slider
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
    guardar_filtros_storage("set_filters_count");

    // Mostrar spinner
    document.getElementById('overlay').style.display = 'block';

    //Cooldown para ver el spinner antes de recargar
    setTimeout(function() {
        location.reload();
    }, 1500);
}

function filter_remove(){
    localStorage.removeItem('filter');
    location.reload();
};

function highlight() {
    var all_filters = JSON.parse(localStorage.getItem('filter')) || false;

    if (all_filters) {
        // console.log("Estos son los filtros a remarcar:");
        // console.log(all_filters);
        var count_filters = 0;

        //Categoria
        if (all_filters[0].categoria != '*') {
            // console.log(all_filters[0].categoria);

            for (row in all_filters[0].categoria) {
                // console.log("categoria"+all_filters[0].categoria[row]);

                document.getElementById("categoria"+all_filters[0].categoria[row]).setAttribute('checked', true);
            }
            count_filters += 1;
        }

        //Ciudad
        if (all_filters[1].ciudad != '*') {
            // console.log(all_filters[1].ciudad[0]);
            document.getElementById('filter_ciudad').value = all_filters[1].ciudad[0];
            count_filters += 1;
        }

        //Estado
        if (all_filters[2].estado != '*') {
            document.getElementById("estado"+all_filters[2].estado[0]).setAttribute('checked', true);
            count_filters += 1;
        }

        //Marca
        if (all_filters[3].marca != '*') {
            document.getElementById("marca"+all_filters[3].marca[0]).setAttribute('checked', true);
            count_filters += 1;
        }

        //Tipo consola
        if (all_filters[4].tipo_consola != '*') {
            document.getElementById('filter_tipo_consola').value = all_filters[4].tipo_consola[0];
            count_filters += 1;
        }

        //Modelo consola
        if (all_filters[5].modelo_consola != '*') {
            document.getElementById('filter_modelo_consola').value = all_filters[5].modelo_consola[0];
            count_filters += 1;
        }

        //Tipo accesorio
        if (all_filters[6].tipo_accesorio != '*') {
            document.getElementById('filter_tipo_accesorio').value = all_filters[6].tipo_accesorio[0];
            count_filters += 1;
        }

        //Tipo merchandising
        if (all_filters[7].tipo_merchandising != '*') {
            document.getElementById('filter_tipo_merchandising').value = all_filters[7].tipo_merchandising[0];
            count_filters += 1;
        }

        //Tipo venta
        if (all_filters[8].tipo_venta != '*') {
            // console.log(all_filters[8].tipo_venta);

            for (row in all_filters[8].tipo_venta) {
                document.getElementById("tipo_venta"+all_filters[8].tipo_venta[row]).setAttribute('checked', true);
            }
            count_filters += 1;
        }

        // Precio min y max
        if (all_filters[9].precio_min && all_filters[10].precio_max) {
            //Recogemos valores y el slider
            var min = all_filters[9].precio_min[0];
            var max = all_filters[10].precio_max[0];
            var priceSlider = document.getElementById('price-slider');

            if (priceSlider.noUiSlider) {
                priceSlider.noUiSlider.set([min, max]);
            }

            //Actualizamos los valores
            document.getElementById('filter_precio_min').value = min;
            document.getElementById('filter_precio_max').value = max;
            document.getElementById('price-min').textContent = min + '€';
            document.getElementById('price-max').textContent = max + '€';

            if (min != 0 || max != 500){
                count_filters += 1;
            }
        }

        // console.log(count_filters);
        document.getElementById('filterToggle').style.setProperty('--number', `"${count_filters}"`);
    }
}

function modal_filters() {
    document.getElementById('filterToggle').addEventListener('click', function() {
        const filters = document.querySelector('.filters_shop');
        const btn = this;
        
        // Tratamiento de clases para mostrar/ocultar el modal y cambiar el icono/apariencia del botón
        filters.classList.toggle('active');
        btn.classList.toggle('active');
      });
}

function count_products(){
    var filters = JSON.parse(localStorage.getItem('filter')) || false;

    ajaxPromise('module/shop/controller/controller_shop.php?op=count_products', 'POST', 'JSON', { 'filter': filters })
        .then(function(data) {
            // console.log(data);
            //Mostrando X resultados
            // $(`<p class="results">"Mostrar ${data[0]["cantidad"]} resultados"</p>`).appendTo('.div-filters');
            $(`<p class="results">"Mostrando ${data[0]["cantidad"]} resultados"</p>`).appendTo('.count_products');
            
        }).catch(function() {
            console.log('Error en el ajaxPromise de contar productos');
        });
};

function update_count_products(){
    guardar_filtros_storage("update_filters_count");

    var filters = JSON.parse(localStorage.getItem('filter_update')) || false;

    ajaxPromise('module/shop/controller/controller_shop.php?op=count_products', 'POST', 'JSON', { 'filter': filters })
        .then(function(data) {
            // console.log(data);
            //Mostrando X resultados
            $('.div-filters .results').remove();
            $(`<p class="results">"Mostrar ${data[0]["cantidad"]} resultados"</p>`).appendTo('.div-filters');
            
        }).catch(function() {
            console.log('Error en el ajaxPromise de contar productos');
        });
}

function radar_filter_update() {
    //Recogemos y tenemos en cuenta todos los elementos del filtro
    var filterElements = [
        '.filter_categoria',
        '.filter_ciudad',
        '.filter_estado',
        '.filter_marca',
        '.filter_tipo_consola',
        '.filter_modelo_consola',
        '.filter_tipo_accesorio',
        '.filter_tipo_merchandising',
        '.filter_tipo_venta',
        '#filter_precio_min',
        '#filter_precio_max'
    ];

    //Radar para selects/radio-buttons/checkboxes
    $(document).on('change input', filterElements.join(', '), function() {
        update_count_products();
    });

    //Radar para Slider precios
    var priceSlider = document.getElementById('price-slider');
    if (priceSlider && priceSlider.noUiSlider) {
        priceSlider.noUiSlider.on('set', function() {
            update_count_products();
        });
    }
}

function guardar_filtros_storage(modo_guardado){
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
        filter.push({ "precio_max": '0' });
    }

    if (modo_guardado == "set_filters_count"){
        localStorage.removeItem('filter');

        // Guardamos en localStorage los filtros
        if (filter.length != 0) {
            localStorage.setItem('filter', JSON.stringify(filter));
        }
    }else if (modo_guardado == "update_filters_count"){
        localStorage.removeItem('filter_update');

        // Guardamos en localStorage los filtros
        if (filter.length != 0) {
            localStorage.setItem('filter_update', JSON.stringify(filter));
        }
    }
}

/* ============================================================================================ */
/*                                            DETAILS                                           */
/* ============================================================================================ */

function loadDetails(id_producto) {

    ajaxPromise('module/shop/controller/controller_shop.php?op=get_details&id=' + id_producto, 'GET', 'JSON')
        .then(function (data) {
            // console.log(data);

            window.scrollTo(0, 0); //Mover la pantalla arriba del todo

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

            load_map_details(data);
            load_markers_details(data);

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

/* ============================================================================================ */
/*                                            MAPS                                              */
/* ============================================================================================ */

var map;
var map_details;

function load_map_shop() {
    map = L.map('container_map').setView([40.41587070194395, -3.685132043276392], 6);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map);
}

function load_map_details(data) {
    //Recogemos datos
    var position = [parseFloat(data[0].lat),  parseFloat(data[0].long)];
    //Inicializamos mapa
    map_details = L.map('container_map_details').setView(position, 16);
    //Le añadimos la capa/skin visual
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map_details);
    //Añadimos mejoras, como la escala
    map_details.zoomControl.setPosition('topright');
    L.control.scale().addTo(map_details);
}

function load_markers(data) {
    // console.log(data);
    var position = [parseFloat(data.lat), parseFloat(data.long)];
    
    //Creamos el elemento del carrusel popup
    var carouselContainer = $(`<div id='carousel_popup-${data.id_producto}' class='img_container_popup'></div>`);
    
    //Añadimos las imágenes al carrousel
    for (img in data.img_producto) {
        carouselContainer.append(
            `<div><img src="${data.img_producto[img]}" class="img-popup-slide"></div>`
        );
    }
    
    //Creamos el marcador con el popup bindeado, e insertamos el carrousel ya montado
    var marker = L.marker(position).addTo(map).bindPopup(
        `<div class='more_info_popup more_info_button' id='${data.id_producto}'>
            ${carouselContainer.prop('outerHTML')}
            <h4><b>${data.nom_producto}</b></h4>
            <table id='table_popup'>
                <tr>
                    <td><i class='fa-solid fa-location-dot fa-xl'></i>&nbsp;${data.nom_ciudad}</td>
                    <td><i class='fa-solid fa-palette fa-xl'></i>&nbsp;${data.color}</td>
                    <td><i class='fa-solid fa-coins fa-xl'></i>&nbsp;${data.precio} €</td>
                </tr>
            </table>
        </div>`
    );

    //Inicializamos carrousel cuando se abre el popup
    marker.on('popupopen', function() {
        $(`#carousel_popup-${data.id_producto}`).slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: false,
            arrows: true,
            dots: true
        });
    });
}

function load_markers_details(data) {
    var position = [parseFloat(data[0].lat),  parseFloat(data[0].long)];
    console.log(data);
    console.log(data[1][0]);
    L.marker(position).addTo(map_details).bindPopup(data[0].nom_producto);
}

/* ============================================================================================ */
/*                                            CLICKS                                            */
/* ============================================================================================ */

function clicks() {
    // console.log("Cargamos clicks");
    $(document).on("click", ".more_info_button", function (e) {
        // Elementos a excluir (carousel, corazón y botón comprar)
        var excludedElements = '.slick-arrow, .slick-dots, .buy, .list__heart, .fa-heart';
        //Si el elemento pulsado es uno de los de la lista, paramos el evento del click
        if ($(e.target).closest(excludedElements).length > 0) {
            return;
        }

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

function ocultar_elementos() {
    $('#details_product_shop').addClass('hidden'); //Ocultamos los detalles_producto
    document.getElementById('overlay').style.display = 'none'; //Ocultamos el spinner
}

$(document).ready(function () {
    loadProducts();
    clicks();
    load_filters().then(function() {
        modal_filters();
        highlight();
        count_products();
        update_count_products();
        radar_filter_update();
    }).catch(function(error) {
        console.error("Error:", error);
    });
    ocultar_elementos();

    // console.log("Bienvenido al Catálogo");
});