function load_tipo_consola() {
    //FILTROS DINAMICOS
    ajaxPromise('module/search/controller/controller_search.php?op=select_tipo_consola', 'GET', 'JSON')
        .then(function (data) {
            console.log(data);
            $('<option>Tipo consola</option>').attr('selected', true).attr('disabled', true).appendTo('.search_tipo_consola');
            
            for (row in data) {
                $('<option value="' + data[row].id_tipo_consola + '">' + data[row].nom_tipo_consola + '</option>').appendTo('.search_tipo_consola')
            }
            // Establecer el tooltip inicial
            $('.search_tipo_consola').attr('title', $('.search_tipo_consola option:selected').text());
        }).catch(function () {
            console.error("Error cargando el select tipo_consola search");
        });
}

function load_modelo_consola(tipo_consola) {
    $('.search_modelo_consola').empty();

    if (tipo_consola == undefined) {
        ajaxPromise('module/search/controller/controller_search.php?op=select_modelo_consola_null', 'GET', 'JSON')
            .then(function (data) {
                $('<option>Modelo</option>').attr('selected', true).attr('disabled', true).appendTo('.search_modelo_consola');
                
                for (row in data) {
                    $('<option value="' + data[row].id_modelo_consola + '">' + data[row].nom_modelo_consola + '</option>').appendTo('.search_modelo_consola')
                }
                // Establecer el tooltip inicial
                $('.search_modelo_consola').attr('title', $('.search_modelo_consola option:selected').text());
            }).catch(function () {
                console.error("Error cargando el select modelo_consola_null search");
            });
    }
    else {
        ajaxPromise('module/search/controller/controller_search.php?op=select_modelo_consola', 'POST', 'JSON', {'tipo_consola': tipo_consola})
            .then(function (data) {
                $('<option>Modelo</option>').attr('selected', true).attr('disabled', true).appendTo('.search_modelo_consola');
                for (row in data) {
                    $('<option value="' + data[row].id_modelo_consola + '">' + data[row].nom_modelo_consola + '</option>').appendTo('.search_modelo_consola')
                }
                // Establecer el tooltip inicial
                $('.search_modelo_consola').attr('title', $('.search_modelo_consola option:selected').text());
            }).catch(function () {
                console.error("Error cargando el select modelo_consola search");
            });
    }
}

function load_search() {
    load_tipo_consola();
    load_modelo_consola();
    $(document).on('change', '.search_tipo_consola', function () {
        let tipo_consola = $(this).val();
        if (tipo_consola === 0) {
            load_modelo_consola();
        } else {
            load_modelo_consola(tipo_consola);
        }
        // Actualizar el tooltip cuando cambia la selección
        $(this).attr('title', $(this).find('option:selected').text());
    });
    // Actualizar el tooltip cuando cambia la selección en el segundo select
    $(document).on('change', '.search_modelo_consola', function () {
        $(this).attr('title', $(this).find('option:selected').text());
    });
}

function autocomplete() {
    $("#search_ubicacion").on("keyup", function () {
        let sdata = $(this).val();
        // console.log(sdata);
        // if (($('.search_tipo_consola').val() != 0)) {
        //     sdata.brand = $('.search_tipo_consola').val();
        //     if (($('.search_tipo_consola').val() != 0) && ($('.search_modelo_consola').val() != 0)) {
        //         sdata.category = $('.search_modelo_consola').val();
        //     }
        // }
        // if (($('.search_tipo_consola').val() == undefined) && ($('.search_modelo_consola').val() != 0)) {
        //     sdata.category = $('.search_modelo_consola').val();
        // }
        ajaxPromise('module/search/controller/controller_search.php?op=autocomplete', 'POST', 'JSON', {'autocomplete': sdata})
            .then(function (data) {
                // console.log(data.length);
                // console.log(data);
                $('#search_autocomplete').empty();

                if(data.length > 0) {
                    for (row in data) {
                        $('<div></div>').attr({ 'class': 'searchElement', 'id': data[row].nom_ciudad }).html(data[row].nom_ciudad).appendTo('#search_autocomplete');
                    }
                    $('#search_autocomplete').css({
                        'left': $('#search_ubicacion').offset().left - $('.div_search').offset().left,
                        'width': $('#search_ubicacion').outerWidth(),
                        'top': $('#search_ubicacion').offset().top + 30
                    }).fadeIn(300);
                } else {
                    $('#search_autocomplete').fadeOut(300);
                }
            }).catch(function () {
                $('#search_autocomplete').fadeOut(300);
            });
    });

    //Cerrar autocompletado al hacer click fuera
    $(document).on('click', function(e) {
        if(!$(e.target).closest('#search_autocomplete').length && !$(e.target).is('#search_ubicacion')) {
            $('#search_autocomplete').fadeOut(300);
        }
    });

    //Seleccionar elemento
    $(document).on('click', '.searchElement', function () {
        $('#search_ubicacion').val(this.getAttribute('id'));
        $('#search_autocomplete').fadeOut(300);
    });
}

function click_search() {
    $('#search_btn').on('click', function () {
        var filter = [];

        // Filtro tipo_consola
        if ($('#search_tipo_consola').val() != undefined) {
            filter.push({ "tipo_consola": [$('#search_tipo_consola').val()] });
        } else {
            filter.push({ "tipo_consola": "*" });
        }

        // Filtro modelo_consola
        if ($('#search_modelo_consola').val() != undefined) {
            filter.push({ "modelo_consola": [$('#search_modelo_consola').val()] });
        } else {
            filter.push({ "modelo_consola": "*" });
        }

        // Filtro ciudad
        if ($('#search_ubicacion').val().length > 0) {
            filter.push({ "ciudad": [$('#search_ubicacion').val()] });
        } else {
            filter.push({ "ciudad": "*" });
        }

        //Borramos posibles filtros
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');

        // Guardamos en localStorage los filtros
        if (filter.length != 0) {
            localStorage.setItem('filter_search', JSON.stringify(filter));
        }

        window.location.href = 'index.php?page=controller_shop&op=list';

    });
}

$(document).ready(function () {
    load_search();
    autocomplete();
    click_search();
    // console.log("Bienvenido al Search");
});