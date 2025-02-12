function loadCategories() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=get_categories', 'GET', 'JSON')
        .then(function (data) {
            var categories = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_categoria,
                    imagen = data[i].img_categoria;

                // Crear tarjetas de categoría
                categories += "<div class='col-sm-4 categoria'>" +
                    "<div class='categoria-inner text-center'>" +
                    "<img src='" + imagen + "' class='img_categoria'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#categories").html(categories);
        }).catch(function () {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
        });
}

function loadMarcas() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=get_marcas', 'GET', 'JSON')
        .then(function (data) {
            var marcas = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_marca,
                    imagen = data[i].img_marca;

                // Crear tarjetas de marca
                marcas += "<div class='col-sm-4 marca'>" +
                    "<div class='marca-inner text-center'>" +
                    "<img src='" + imagen + "' class='img_marca'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#marcas").html(marcas);
        }).catch(function () {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Marcas HOME";
        });
}

function loadTipoConsola() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=get_tipo_consola', 'GET', 'JSON')
        .then(function (data) {
            var tipo_consola = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_tipo_consola,
                    imagen = data[i].img_tipo_consola;

                // Crear tarjetas de tipo_consola
                tipo_consola += "<div class='col-sm-4 tipo_consola'>" +
                    "<div class='tipo_consola-inner text-center'>" +
                    "<img src='" + imagen + "' class='img_tipo_consola'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#tipo_consola").html(tipo_consola);
        }).catch(function () {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_tipo_consola HOME";
        });
}

function loadCiudad() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=get_ciudad', 'GET', 'JSON')
        .then(function (data) {
            var ciudad = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_ciudad,
                    imagen = data[i].img_ciudad;

                // Crear tarjetas de ciudad
                ciudad += "<div class='col-sm-4 ciudad'>" +
                    "<div class='ciudad-inner text-center'>" +
                    "<img src='" + imagen + "' class='img_ciudad'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#ciudad").html(ciudad);
        }).catch(function () {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_ciudad HOME";
        });
}

function loadEstado() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=get_estado', 'GET', 'JSON')
        .then(function (data) {
            var estado = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_estado,
                    imagen = data[i].img_estado;

                // Crear tarjetas de estado
                estado += "<div class='col-sm-4 estado'>" +
                    "<div class='estado-inner text-center'>" +
                    "<img src='" + imagen + "' class='img_estado'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#estado").html(estado);
        }).catch(function () {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_estado HOME";
        });
}

function loadTipoVenta() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=get_tipo_venta', 'GET', 'JSON')
        .then(function (data) {
            var tipo_venta = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_tipo_venta,
                    imagen = data[i].img_tipo_venta;

                // Crear tarjetas de tipo_venta
                tipo_venta += "<div class='col-sm-4 tipo_venta'>" +
                    "<div class='tipo_venta-inner text-center'>" +
                    "<img src='" + imagen + "' class='img_tipo_venta'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#tipo_venta").html(tipo_venta);
        }).catch(function () {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_tipo_venta HOME";
        });
}

function carrousel_Ciudades() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=Carrousel_Ciudades', 'GET', 'JSON')
        .then(function (data) {
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_ciudad).appendTo(".carousel__list__ciudades")
                    .html(
                        "<div class='col-sm-4 carousel__ciudad'>" +
                            "<div class='carousel__ciudad-inner text-center'>" +
                                "<img class='carousel__img' src='" + data[row].img_ciudad + "' alt=''><br>" + data[row].nom_ciudad +
                            "</div>" +
                        "</div>"
                    )
            }
            new Glider(document.querySelector('.carousel__list__ciudades'), {
                slidesToShow: 3,
                slidesToScroll: 3,
                draggable: true,
                rewind: true,
                dots: '.carousel__dots__ciudad',
                arrows: {
                    prev: '.prev_ciudades',
                    next: '.next_ciudades'
                }
            });
        })
        .catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        });
}

// function carrousel_Productos() {
//     ajaxPromise('module/home/controller/controller_homepage.php?op=Carrousel_Productos', 'GET', 'JSON')
//         .then(function (data) {
//             for (row in data) {
//                 $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_producto).appendTo(".carousel__list__productos")
//                     .html(
//                         "<div class='col-sm-4 carousel__productos'>" +
//                             "<div class='carousel__productos-inner text-center'>" +
//                                 "<img class='carousel__img' src='" + data[row].img_producto + "' alt=''><br>" + data[row].nom_producto +
//                             "</div>" +
//                         "</div>"
//                     )
//             }
//             new Glider(document.querySelector('.carousel__list__productos'), {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 draggable: true,
//                 rewind: true,
//                 dots: '.carousel__dots__productos',
//                 arrows: {
//                     prev: '.prev_productos',
//                     next: '.next_productos'
//                 }
//             });
//         })
//         .catch(function () {
//             // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
//         });
// }

function carrousel_Productos_New() {
    ajaxPromise('module/home/controller/controller_homepage.php?op=Carrousel_Productos', 'GET', 'JSON')
        .then(function (data) {
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_producto).appendTo(".carousel__new__productos")
                    .html(
                        // "<div><img src='" + data[row].img_producto + "'></div>"
                        "<div class='col-sm-4 carousel__productos'>" +
                            "<div class='carousel__productos-inner text-center'>" +
                                "<img class='carousel__img' src='" + data[row].img_producto + "' alt=''><br>" 
                                + data[row].nom_producto +
                            "</div>" +
                        "</div>"
                    )
            }
            $('.carousel__new__productos').slick({
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 4,
                dots:true
              });
        })
        .catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
        });
}

$(document).ready(function () {
    loadCategories();
    loadMarcas();
    loadTipoConsola();
    loadEstado();
    loadTipoVenta();
    carrousel_Ciudades();
    // carrousel_Productos();
    carrousel_Productos_New();
    // console.log("Bienvenido al Inicio");
});