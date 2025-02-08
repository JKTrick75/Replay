function validate_courseName(texto) {
    if (texto.length > 0) {
        var reg = /^[a-zA-Z0-9 ]*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_description(texto) {
    if (texto.length > 0) {
        var reg = /^[a-zA-Z0-9 .,!?'"()\-áéíóúÁÉÍÓÚñÑ]*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_category(array) {
    var i;
    var ok = 0;
    for (i = 0; i < array.length; i++) {
        if (array[i].checked) {
            ok = 1;
        }
    }

    if (ok == 1) {
        return true;
    }
    if (ok == 0) {
        return false;
    }
}

function validate_dificulty(texto) {
    var i;
    var ok = 0;
    for (i = 0; i < texto.length; i++) {
        if (texto[i].checked) {
            ok = 1;
        }
    }

    if (ok == 1) {
        return true;
    }
    if (ok == 0) {
        return false;
    }
}

function validate_hoursDay(texto) {
    if (texto.length > 0) {
        var reg = /^[1-8]$/;
        return reg.test(texto);
    }
    return false;
}

function validate_priceHour(texto) {
    if (texto.length > 0) {
        var reg = /^[0-9]+$/;
        return reg.test(texto);
    }
    return false;
}

function validate_price(texto) {
    if (texto.length > 0) {
        var reg = /^[0-9]+$/;
        return reg.test(texto);
    }
    return false;
}

function validate_fecha(texto) {
    if (texto.length > 0) {
        return true;
    }
    return false;
}

function validate_duration(fecha1, fecha2) {
    var date1 = moment(fecha1, "DD/MM/YYYY").toDate();
    var date2 = moment(fecha2, "DD/MM/YYYY").toDate();

    // console.log(fecha1);
    // console.log(fecha2);
    // console.log(date1);
    // console.log(date2);

    if (date2 <= date1) {
        return false;
    }
    return true;
}

function validate_js(op) {
    // console.log('hola validate js');
    // return false;

    var check = true;
    //Recogemos los valores del formulario y los guardamos en variables
    var v_courseName = document.getElementById("courseName").value;
    var v_description = document.getElementById("description").value;
    var v_category = document.getElementsByName("category[]");
    var v_dificulty = document.getElementsByName("dificulty");
    var v_hoursDay = document.getElementById("hoursDay").value;
    var v_priceHour = document.getElementById("priceHour").value;
    var v_price = document.getElementById("price").value;
    var v_dateIni = document.getElementById("dateIni").value;
    var v_dateEnd = document.getElementById("dateEnd").value;

    // console.log(v_courseName);
    // console.log(v_description);
    // console.log(v_category);
    // console.log(v_dificulty);
    // console.log(v_hoursDay);
    // console.log(v_priceHour);
    // console.log(v_price);
    // console.log(v_dateIni);
    // console.log(v_dateEnd);
    // return false;

    //Validamos los valores recogidos del formulario
    var r_courseName = validate_courseName(v_courseName);
    // console.log(r_courseName);
    // return false;
    var r_description = validate_description(v_description);
    var r_category = validate_category(v_category);
    var r_dificulty = validate_dificulty(v_dificulty);
    // console.log(r_dificulty);
    // return false;
    var r_hoursDay = validate_hoursDay(v_hoursDay);
    // console.log(v_hoursDay);
    // console.log(r_hoursDay);
    // return false;
    var r_priceHour = validate_priceHour(v_priceHour);
    var r_price = validate_price(v_price);
    var r_dateIni = validate_fecha(v_dateIni);
    var r_dateEnd = validate_fecha(v_dateEnd);

    // console.log(r_courseName);
    // console.log(r_description);
    // console.log(r_category);
    // console.log(r_dificulty);
    // console.log(r_hoursDay);
    // console.log(r_priceHour);
    // console.log(r_price);
    // console.log(r_dateIni);
    // console.log(r_dateEnd);
    // return false;

    //Comprobamos el resultado de las validaciones y mostramos un mensaje de error

    if (!r_courseName) {
        document.getElementById("error_courseName").innerHTML =
            " * El nombre del curso introducido no es valido, solo se permiten letras, números y espacios";
        // console.log(r_courseName);
        // return false;
        check = false;
    } else {
        document.getElementById("error_courseName").innerHTML = "";
    }
    if (!r_description) {
        document.getElementById("error_description").innerHTML =
            " * La descripción introducida no es valida, solo se permiten letras, números y courseacteres comunes";
        check = false;
    } else {
        document.getElementById("error_description").innerHTML = "";
    }
    if (!r_category) {
        document.getElementById("error_category").innerHTML =
            " * Selecciona al menos una categoria";
        check = false;
    } else {
        document.getElementById("error_category").innerHTML = "";
    }
    if (!r_dificulty) {
        document.getElementById("error_dificulty").innerHTML =
            " * Selecciona una dificultad";
        check = false;
    } else {
        document.getElementById("error_dificulty").innerHTML = "";
    }
    if (!r_hoursDay) {
        document.getElementById("error_hoursDay").innerHTML =
            " * La cantidad introducida de horas al dia no es valida, tiene un rango de 1 a 8";
        check = false;
    } else {
        document.getElementById("error_hoursDay").innerHTML = "";
    }
    if (!r_priceHour) {
        document.getElementById("error_priceHour").innerHTML =
            " * El precio por hora introducido no es valido, tiene que ser un número entero";
        check = false;
    } else {
        document.getElementById("error_priceHour").innerHTML = "";
    }
    if (!r_price) {
        document.getElementById("error_price").innerHTML =
            " * El price introducido no es valido";
        check = false;
    } else {
        document.getElementById("error_price").innerHTML = "";
    }
    if (!r_dateIni) {
        document.getElementById("error_dateIni").innerHTML =
            " * No has introducido ninguna fecha";
        check = false;
    } else {
        document.getElementById("error_dateIni").innerHTML = "";
    }

    if (!r_dateEnd) {
        document.getElementById("error_dateEnd").innerHTML =
            " * No has introducido ninguna fecha";
        check = false;
    } else {
        if (r_dateIni) {
            // console.log(r_dateEnd);
            r_dateEnd = validate_duration(v_dateIni, v_dateEnd);
            // console.log(r_dateEnd);
            // return false;
            if (!r_dateEnd) {
                document.getElementById("error_dateEnd").innerHTML =
                    " * La fecha fin no puede ser anterior o igual a la de inicio";
                check = false;
            } else {
                document.getElementById("error_dateEnd").innerHTML = "";
            }
        }
    }

    //return check;

    //Si no hay ningun error, enviamos el formulario con los datos
    if (check) {
        if (op == "create") {
            document.getElementById("alta_course").submit();
            document.getElementById("alta_course").action =
                "index.php?page=controller_course&op=create";
        }
        if (op == "update") {
            document.getElementById("update_course").submit();
            document.getElementById("update_course").action =
                "index.php?page=controller_course&op=update";
        }
    }
}

function operations_course(op) {
    if (op == "delete") {
        document.getElementById("delete_course").submit();
        document.getElementById("delete_course").action =
            "index.php?page=controller_course&op=delete";
    }
    if (op == "delete_all") {
        document.getElementById("delete_all_course").submit();
        document.getElementById("delete_all_course").action =
            "index.php?page=controller_course&op=delete_all";
    }
    if (op == "dummies") {
        document.getElementById("dummies_course").submit();
        document.getElementById("dummies_course").action =
            "index.php?page=controller_course&op=dummies";
    }
}

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

function exportBackup() {
    $(".export_backup").click(function () {
        Swal.fire({
            title: "Quieres realizar un backup del estado actual de la base de datos?",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                //Realizar backup

                ajaxPromise("module/course/controller/controller_course.php?op=export_backup", "GET", "JSON")
                    .then(function (data) {
                        console.log(data);
                        if (data.status === 'success') {
                            Swal.fire("Backup realizado!", data.message, "success").then((result) => {
                                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                    window.location.href = "index.php?page=controller_course&op=list";
                                }
                            });
                        } else {
                            // Si hay error, redirigir error
                            window.location.href = 'index.php?page=controller_error&op=503&file=validate_course.js&desc=Export backup error';
                        }
                    })
                    .catch(function (error) {
                        // Si hay error, redirigir error
                        window.location.href = 'index.php?page=controller_error&op=503&file=validate_course.js&desc=Export backup error';
                    });

            } else if (result.isDenied || result.dismiss === Swal.DismissReason.backdrop) {
                Swal.fire("Backup cancelado", "", "info");
            }
        });
    });
};

function showModalImportBackup() {
    // Limpiar el contenido del otro modal
    $("#course_modal").empty().hide();
    //Mostramos modal
    $("#details_backup").show();
    // console.log("Mostrar modal:", $("#details_course").is(":visible"));

    $("#backup_modal").dialog({
        width: 850, //<!-- ancho de la ventana -->
        height: 700, //<!-- altura de la ventana -->
        resizable: "false", //<!-- fija o redimensionable si ponemos este valor a "true" -->
        //position: "down",<!-- posicion de la ventana en la pantalla (left, top, right...) -->
        modal: "true", //<!-- si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            'Restore Backup': function () {
                var selectedFile = $('#backup_file').val();
                if (selectedFile) {

                    ajaxPromise('module/course/controller/controller_course.php?op=import_backup&file=' + selectedFile, 'GET')
                        .then(function (data) {
                            console.log(data); // Verifica la respuesta en la consola
                            if (data.status === 'success') {
                                Swal.fire("Listo!", data.message, "success").then((result) => {
                                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                        window.location.href = "index.php?page=controller_course&op=list";
                                    }
                                });
                            } else {
                                // Si hay un error, redirigir a la página de error
                                window.location.href = 'index.php?page=controller_error&op=503&file=validate_course.js&desc=Import backup error';
                            }
                        })
                        .catch(function (error) {
                            window.location.href = 'index.php?page=controller_error&op=503&file=validate_course.js&desc=Import backup error';
                        });

                } else {
                    alert('Por favor, selecciona un archivo de backup.');
                }
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

function importBackup() {
    $(".backupModal").click(function () {

        //Configuramos modal
        ajaxPromise("module/course/controller/controller_course.php?op=get_backup_files", "GET", "JSON")
            .then(function (data) {
                console.log(data);
                $('#backup_modal').empty();
                $('<div></div>').attr('id', 'details_backup', 'type', 'hidden').appendTo('#backup_modal');
                $('<div></div>').attr('id', 'details').appendTo('#details_backup');
                $('<div></div>').attr('id', 'modal_header').appendTo('#details');
                $('<h2></h2>').attr('id', 'modal_title').appendTo('#modal_header');
                $('<span>Selecciona un archivo de backup:</span>').attr('id', 'span_modal_title').appendTo('#modal_title');
                $('<div></div>').attr('id', 'container_modal').appendTo('#details');

                $('#container_modal').html(function () {
                    var content = "";
                    content += '<select class="form-select" name="backup_file" id="backup_file" required>';
                    content += '<option value="" disabled selected>-- Selecciona un archivo --</option>';

                    for (row in data) {
                        content += '<option value=' + data[row] + ' id=' + data[row] + '>' + data[row] + '</option>';
                    }
                    content += '</select>';
                    return content;
                });

            });

        showModalImportBackup();
    });
}

$(document).ready(function () {
    loadModalCourse();
    exportBackup();
    importBackup();
});