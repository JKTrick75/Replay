// function loadProducts() {
//     ajaxPromise('module/shop/controller/controller_shop.php?op=get_products', 'GET', 'JSON')
//         .then(function (data) {
//             var producto = "";

//             for (var i = 0; i < data.length; i++) {
//                 var nombre = data[i].nom_producto,
//                     imagen = data[i].img_producto;

//                 // Crear tarjetas de producto
//                 producto += "<div class='col-sm-4 producto'>" +
//                     "<div class='producto-inner text-center'>" +
//                     "<img src='" + imagen + "' class='img_producto'>" +
//                     "<br/>producto: " + nombre +
//                     "</div>" +
//                     "</div>";
//             }
//             // Añadir las tarjetas al contenedor
//             $("#producto").html(producto);
//         }).catch(function () {
//             window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_producto HOME";
//         });
// }

function ajaxForSearch(url, total_prod = 0, items_page) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page })
        .then(function(data) {
            // console.log(data);
            $('#content_shop_cars').empty();
            $('.date_car' && '.date_img').empty();

            //Mejora para que cuando no hayan resultados en los filtros aplicados
            if (data == "error") {
                $('<div></div>').appendTo('#content_shop_cars')
                    .html(
                        '<h3>¡No se encuentarn resultados con los filtros aplicados!</h3>'
                    )
            } else {
                for (row in data) {
                    $('<div></div>').attr({ 'id': data[row].id_car, 'class': 'list_content_shop' }).appendTo('#content_shop_cars')
                        .html(
                            "<div class='list_product'>" +
                            "<div class='img-container'>" +
                            "<img src= '" + data[row].img_car + "'" + "</img>" +
                            "</div>" +
                            "<div class='product-info'>" +
                            "<div class='product-content'>" +
                            "<h1><b>" + data[row].id_brand + " " + data[row].name_model + "<a class='list__heart' id='" + data[row].id_car + "'><i id= " + data[row].id_car + " class='fa-solid fa-heart fa-lg'></i></a>" + "</b></h1>" +
                            "<p>Up-to-date maintenance and revisions</p>" +
                            "<ul>" +
                            "<li> <i id='col-ico' class='fa-solid fa-road fa-xl'></i>&nbsp;&nbsp;" + data[row].Km + " KM" + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-person fa-xl'></i>&nbsp;&nbsp;&nbsp;" + data[row].gear_shift + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>&nbsp;" + data[row].color + "</li>" +
                            "</ul>" +
                            "<div class='buttons'>" +
                            "<button id='" + data[row].id_car + "' class='more_info_list button add' >More Info</button>" +
                            "<button class='button buy' >Buy</button>" +
                            "<span class='button' id='price'>" + data[row].price + '€' + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        )
                }
            }
        }).catch(function() {
            window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}

function loadProducts(total_prod = 0, items_page = 4) {
    ajaxForSearch('module/shop/controller/controller_shop.php?op=all_cars', total_prod, items_page);
}

$(document).ready(function () {
    // loadProducts();
    console.log("Bienvenido al Catálogo");
});