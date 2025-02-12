function ajaxForSearch(url, total_prod = 0, items_page) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page })
        .then(function(data) {
            console.log(data);
            $('#content_shop_products').empty();
            $('.date_product' && '.date_img').empty();

            //Mejora para que cuando no hayan resultados en los filtros aplicados
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
                                        "<a class='list__heart' id='" + data[row].id_producto + "'>"+
                                        "<i id= " + data[row].id_producto + " class='fa-solid fa-heart fa-lg'></i></a>" + 
                                        "</b></h1>" +
                                        "<ul>" +
                                            "<li> <i id='col-ico' class='fa-solid fa-road fa-xl'></i>&nbsp;&nbsp;Incluye cargador: " + data[row].incluye_cargador + "</li>" +
                                            "<li> <i id='col-ico' class='fa-solid fa-person fa-xl'></i>&nbsp;&nbsp;Incluye juegos: " + data[row].incluye_juegos + "</li>" +
                                            "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>&nbsp; Color: " + data[row].color + "</li>" +
                                        "</ul>" +
                                        "<div class='buttons'>" +
                                            "<button id='" + data[row].id_producto + "' class='more_info_list button add' >More Info</button>" +
                                            "<button class='button buy' >Buy</button>" +
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
    ajaxForSearch('module/shop/controller/controller_shop.php?op=get_products', total_prod, items_page);
}

$(document).ready(function () {
    loadProducts();
    // console.log("Bienvenido al Catálogo");
});