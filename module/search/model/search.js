// function loadCategories() {
//     ajaxPromise('module/home/controller/controller_homepage.php?op=get_categories', 'GET', 'JSON')
//         .then(function (data) {
//             var categories = "";
//             console.log(data);

//             for (var i = 0; i < data.length; i++) {
//                 var nombre = data[i].nom_categoria,
//                     imagen = data[i].img_categoria,
//                     id = data[i].id_categoria;

//                 // Crear tarjetas de categoría
//                 categories += "<div class='col-sm-4 categoria'>" +
//                                     "<div class='categoria-inner text-center filter_categoria' id='" + id + "'>" +
//                                         "<img src='" + imagen + "' class='img_categoria'>" +
//                                         "<br/>" + nombre +
//                                     "</div>" +
//                                 "</div>";
//             }
//             // Añadir las tarjetas al contenedor
//             $("#categories").html(categories);
//         }).catch(function () {
//             window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
//         });
// }

// function clicks(){
//     $(document).on("click",'div.filter_categoria', function (){
//         // console.log("pulsaste en categorias");
//         var filters = [];
//         //Pillamos la id de la tarjeta pulsada
//         filters.push(["categoria",this.getAttribute('id')]);
//         //Borramos todos los filtros posibles que haya en el localStorage
//         localStorage.removeItem('filter_shop');
//         localStorage.removeItem('filter_home');
//         localStorage.removeItem('filter_search');
//         //Añadimos el que nos interesa filtrar ahora
//         localStorage.setItem('filter_home', JSON.stringify(filters)); 
//         setTimeout(function(){ 
//             window.location.href = 'index.php?page=controller_shop&op=list';
//         }, 200);  
//     });
// }

$(document).ready(function () {
    // loadCategories();

    // clicks();
    // console.log("Bienvenido al Search");
});