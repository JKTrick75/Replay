function showModalCourse(id) {
    // Limpiar el contenido del otro modal
    $("#backup_modal").empty().hide();
    //Mostramos modal
    $("#details_course").show();
    // console.log("Mostrar modal:", $("#details_course").is(":visible"));

    $("#course_modal").dialog({
        width: 850, //<!-- ancho de la ventana -->
        height: 700, //<!-- altura de la ventana -->
        resizable: "false", //<!-- fija o redimensionable si ponemos este valor a "true" -->
        //position: "down",<!-- posicion de la ventana en la pantalla (left, top, right...) -->
        modal: "true", //<!-- si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            },
            Update: function () {
                window.location.href = 'index.php?page=controller_course&op=update&id=' + id;
            },
            Delete: function () {
                window.location.href = 'index.php?page=controller_course&op=delete&id=' + id;
            }
        },
        show: {
            effect: "puff",
            duration: 1000,
        },
        hide: {
            effect: "puff",
            duration: 1000,
        },
    });
}

function loadModalCourse() {
    $(".course").click(function () {

        var id = this.getAttribute("id");
        //alert(id);
        // console.log(id);

        ajaxPromise("module/course/controller/controller_course.php?op=read_modal", "POST", "JSON", { modal: id })
            .then(function (data) {

                // console.log(data);
                json = data;
                // console.log(id);
                // console.log(data);

                if (json === "error") {
                    console.log(json);
                    //pintar 503
                    window.location.href = "index.php?page=503";
                } else {
                    console.log(json);

                    // Asignación de valores al modal
                    $('#course_modal').empty();
                    $('<div></div>').attr('id', 'details_course', 'type', 'hidden').appendTo('#course_modal');
                    $('<div></div>').attr('id', 'details').appendTo('#details_course');
                    $('<div></div>').attr('id', 'modal_header').appendTo('#details');
                    $('<h2></h2>').attr('id', 'modal_title').appendTo('#modal_header');
                    $('<span>' + json.courseName + '</span>').attr('id', 'span_modal_title').appendTo('#modal_title');
                    $('<div></div>').attr('id', 'container_modal').appendTo('#details');
                    $('#container_modal').html(function () {
                        var content = "";
                        for (row in data) {
                            if (row == 'id') {
                                content += '<p class="modal-field">ID: <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'courseName') {
                                content += '<p class="modal-field">Nombre: <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'description') {
                                content += '<p class="modal-field">Descripción:&nbsp; <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'category') {
                                content += '<p class="modal-field multi-value">Categoria:&nbsp; <span class="modal-value" id =' + row + '>' + json[row].replace(/:/g, "<br>") + '</span></p>';
                            }
                            if (row == 'dificulty') {
                                content += '<p class="modal-field">Dificultad:&nbsp; <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'hoursDay') {
                                content += '<p class="modal-field">Horad Dia:&nbsp; <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'priceHour') {
                                content += '<p class="modal-field">Precio Hora:&nbsp; <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'price') {
                                content += '<p class="modal-field">Precio Total:&nbsp; <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'dateIni') {
                                content += '<p class="modal-field">Fecha Inicio:&nbsp; <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }
                            if (row == 'dateEnd') {
                                content += '<p class="modal-field">Fecha Fin:&nbsp; <span class="modal-value" id =' + row + '>' + json[row] + '</span></p>';
                            }

                        }
                        return content;
                    });

                    // DEBUG:
                    // console.log("courseName:", $("#modal_courseName").html());
                    // console.log("description:", $("#modal_description").html());
                    // console.log("category:", $("#modal_category").html());
                    // console.log("dificulty:", $("#modal_dificulty").html());
                    // console.log("hoursDay:", $("#modal_hoursDay").html());
                    // console.log("priceHour:", $("#modal_priceHour").html());
                    // console.log("price:", $("#modal_price").html());
                    // console.log("dateIni:", $("#modal_dateIni").html());
                    // console.log("dateEnd:", $("#modal_dateEnd").html());

                    showModalCourse(json.id);
                } //end-else
            })
            .catch(function (error) {
                // console.log(error);
                window.location.href = 'index.php?page=controller_error&op=503&file=validate_course.js&desc=Modal error';
            });
    });
}

$(document).ready(function () {
    // loadModalCourse();
    // console.log("Bienvenido al Inicio");
});