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
                    "<br/>Categoria: " + nombre +
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
                    "<br/>Marca: " + nombre +
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
                    "<br/>Tipo consola: " + nombre +
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
                    "<br/>Ciudad: " + nombre +
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
                    "<br/>Estado: " + nombre +
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
                    "<br/>Tipo venta: " + nombre +
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
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_ciudad).appendTo(".carousel__list")
                    .html(
                        "<div class='col-sm-4 carousel__ciudad'>" +
                            "<div class='carousel__ciudad-inner text-center'>" +
                                "<img class='carousel__img' src='" + data[row].img_ciudad + "' alt=''><br>" + data[row].nom_ciudad +
                            "</div>" +
                        "</div>"
                    )
            }
            new Glider(document.querySelector('.carousel__list'), {
                slidesToShow: 3,
                slidesToScroll: 3,
                draggable: true,
                rewind: true,
                dots: '.carousel__dots',
                arrows: {
                    prev: '.carousel__prev',
                    next: '.carousel__next'
                }
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
    // console.log("Bienvenido al Inicio");
});





















// var categories = "",
//     makes = "",
//     models = "",
//     types = "";

// for (var i = 0; i < data.length; i++) {
//     var make = data[i].make,
//         model = data[i].model,
//         type = data[i].type,
//         price = data[i].price,
//         rawPrice = price.replace("$", ""),
//         rawPrice = parseInt(rawPrice.replace(",", "")),
//         image = data[i].image;

//     //create categoria cards
//     categories += "<div class='col-sm-4 categoria' data-make='" + make + "' data-model='" + model + "' data-type='" + type + "' data-price='" + rawPrice + "'>" +
//         "<div class='categoria-inner text-center'>" +
//         "<img src='" + image + "'><br />Make: " + make +
//         "<br />Model: " + model +
//         "<br />Type: " + type +
//         "<br />Price: " + price +
//         "</div>" +
//         "</div>";

//     //create dropdown of makes
//     if (makes.indexOf("<option value='" + make + "'>" + make + "</option>") == -1) {
//         makes += "<option value='" + make + "'>" + make + "</option>";
//     }

//     //create dropdown of models
//     if (models.indexOf("<option value='" + model + "'>" + model + "</option>") == -1) {
//         models += "<option value='" + model + "'>" + model + "</option>";
//     }

//     //create dropdown of types
//     if (types.indexOf("<option value='" + type + "'>" + type + "</option>") == -1) {
//         types += "<option value='" + type + "'>" + type + "</option>";
//     }
// }

// $("#categories").html(categories);
// $(".filter-make").append(makes);
// $(".filter-model").append(models);
// $(".filter-type").append(types);

// var filtersObject = {};

// //on filter change
// $(".filter").on("change", function () {
//     var filterName = $(this).data("filter"),
//         filterVal = $(this).val();

//     if (filterVal == "") {
//         delete filtersObject[filterName];
//     } else {
//         filtersObject[filterName] = filterVal;
//     }

//     var filters = "";

//     for (var key in filtersObject) {
//         if (filtersObject.hasOwnProperty(key)) {
//             filters += "[data-" + key + "='" + filtersObject[key] + "']";
//         }
//     }

//     if (filters == "") {
//         $(".categoria").show();
//     } else {
//         $(".categoria").hide();
//         $(".categoria").hide().filter(filters).show();
//     }
// });

// //on search form submit
// $("#search-form").submit(function (e) {
//     e.preventDefault();
//     var query = $("#search-form input").val().toLowerCase();

//     $(".categoria").hide();
//     $(".categoria").each(function () {
//         var make = $(this).data("make").toLowerCase(),
//             model = $(this).data("model").toLowerCase(),
//             type = $(this).data("type").toLowerCase();

//         if (make.indexOf(query) > -1 || model.indexOf(query) > -1 || type.indexOf(query) > -1) {
//             $(this).show();
//         }
//     });
// });