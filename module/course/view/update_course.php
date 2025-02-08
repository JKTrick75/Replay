<main class="main">

    <!-- Page Title -->
    <div class="page-title" data-aos="fade">
        <div class="container">
            <nav class="breadcrumbs">
                <ol>
                    <li><a href="index.php">Home</a></li>
                    <li class="current">deleteallcourse</li>
                </ol>
            </nav>
            <h1>Borrar Cursos</h1>
        </div>
    </div><!-- End Page Title -->

    <!-- deleteallcourse Section -->
    <section id="deleteallcourse" class="deleteallcourse section">

        <div class="container" data-aos="zoom-in" data-aos-delay="100">

            <div id="contenido">
                <form autocomplete="on" method="post" name="update_course" id="update_course">
                    <h1>Modificar curso</h1>
                    <table border='0'>
                        <tr>
                            <td>Nombre: </td>
                            <td><input type="text" id="courseName" name="courseName" placeholder="Nombre del curso" value="<?php echo $course['courseName']; ?>" /></td>
                            <td>
                                <font color="red">
                                    <span id="error_courseName" class="error">
                                        <?php
                                        echo "$error_courseName";
                                        ?>
                                    </span>
                                </font>
                            </td>
                        </tr>

                        <tr>
                            <td>Descripción: </td>
                            <td><textarea cols="30" rows="5" id="description" name="description" placeholder="Añade una descripción"><?php echo $course['description']; ?></textarea></td>
                            <td>
                                <font color="red">
                                    <span id="error_description" class="error"></span>
                                </font>
                            </td>
                        </tr>

                        <tr>
                            <td>Categoria: </td>
                            <?php
                            $category = explode(":", $course['category']);
                            ?>
                            <td>
                                <?php
                                $busca_array = in_array("Online", $category);
                                if ($busca_array) {
                                ?>
                                    <input type="checkbox" id="category[]" name="category[]" value="Online" checked />Online
                                <?php
                                } else {
                                ?>
                                    <input type="checkbox" id="category[]" name="category[]" value="Online" />Online
                                <?php
                                }
                                ?>
                                <?php
                                $busca_array = in_array("Presencial", $category);
                                if ($busca_array) {
                                ?>
                                    <input type="checkbox" id="category[]" name="category[]" value="Presencial" checked />Presencial
                                <?php
                                } else {
                                ?>
                                    <input type="checkbox" id="category[]" name="category[]" value="Presencial" />Presencial
                                <?php
                                }
                                ?>
                                <?php
                                $busca_array = in_array("Semipresencial", $category);
                                if ($busca_array) {
                                ?>
                                    <input type="checkbox" id="category[]" name="category[]" value="Semipresencial" checked />Semipresencial
                            </td>
                        <?php
                                } else {
                        ?>
                            <input type="checkbox" id="category[]" name="category[]" value="Semipresencial" />Semipresencial</td>
                        <?php
                                }
                        ?>
                        </td>
                        <td>
                            <font color="red">
                                <span id="error_category" class="error"></span>
                            </font>
                            </font>
                        </td>
                        </tr>

                        <tr>
                            <td>Dificultad: </td>
                            <td>
                                <?php
                                if ($course['dificulty'] === "Facil") {
                                ?>
                                    <input type="radio" id="dificulty" name="dificulty" value="Facil" checked />Fácil
                                    <input type="radio" id="dificulty" name="dificulty" value="Intermedia" />Intermedia
                                    <input type="radio" id="dificulty" name="dificulty" value="Dificil" />Difícil
                                <?php
                                } elseif ($course['dificulty'] === "Intermedia") {
                                ?>
                                    <input type="radio" id="dificulty" name="dificulty" value="Facil" />Fácil
                                    <input type="radio" id="dificulty" name="dificulty" value="Intermedia" checked />Intermedia
                                    <input type="radio" id="dificulty" name="dificulty" value="Dificil" />Difícil
                                <?php
                                } else {
                                ?>
                                    <input type="radio" id="dificulty" name="dificulty" value="Facil" />Fácil
                                    <input type="radio" id="dificulty" name="dificulty" value="Intermedia" />Intermedia
                                    <input type="radio" id="dificulty" name="dificulty" value="Dificil" checked />Difícil
                                <?php
                                }
                                ?>
                            </td>
                            <td>
                                <font color="red">
                                    <span id="error_dificulty" class="error"></span>
                                </font>
                                </font>
                            </td>
                        </tr>

                        <tr>
                            <td>Horas Dia: </td>
                            <td>
                                <select id="hoursDay" name="hoursDay">
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    <?php for ($i = 1; $i <= 8; $i++) { ?>
                                        <option value="<?php echo $i; ?>" <?php echo ($course['hoursDay'] == $i) ? 'selected' : ''; ?>>
                                            <?php echo $i; ?>
                                        </option>
                                    <?php } ?>
                                </select>
                            </td>
                            <td>
                                <font color="red">
                                    <span id="error_hoursDay" class="error"></span>
                                </font>
                            </td>
                        </tr>

                        <tr>
                            <td>Precio Hora: </td>
                            <td><input type="number" id="priceHour" name="priceHour" placeholder="Precio por hora" min="1" value="<?php echo $course['priceHour']; ?>" /></td>
                            <td>
                                <font color="red">
                                    <span id="error_priceHour" class="error"> </span>
                                </font>
                            </td>
                        </tr>

                        <tr>
                            <td>Precio Total: </td>
                            <td><input type="number" id="price" name="price" min="1" placeholder="Precio total" value="<?php echo $course['price']; ?>" /></td>
                            <td>
                                <font color="red">
                                    <span id="error_price" class="error"></span>
                                </font>
                            </td>
                        </tr>

                        <tr>
                            <td>Fecha inicio curso: </td>
                            <td><input type="text" id="dateIni" name="dateIni" placeholder="Introduce una fecha" value="<?php echo $course['dateIni']; ?>" readonly /></td>
                            <td>
                                <font color="red">
                                    <span id="error_dateIni" class="error"></span>
                                </font>
                            </td>
                        </tr>

                        <tr>
                            <td>Fecha fin curso: </td>
                            <td><input type="text" id="dateEnd" name="dateEnd" placeholder="Introduce una fecha" value="<?php echo $course['dateEnd']; ?>" readonly /></td>
                            <td>
                                <font color="red">
                                    <span id="error_dateEnd" class="error"></span>
                                </font>
                            </td>
                        </tr>

                        <!-- Hidden Fields -->
                        <input type="hidden" id="id" name="id" value="<?php echo $course['id']; ?>" />
                        <input type="hidden" id="courseName_Ori" name="courseName_Ori" value="<?php echo $course['courseName']; ?>" />

                        <tr>
                            <td><input type="button" name="update" onclick="validate_js('update')" value="Guardar" /></td>
                            <td align="right"><a href="index.php?page=controller_course&op=list">Volver</a></td>
                        </tr>
                    </table>
                </form>
            </div>

        </div>

    </section><!-- /deleteallcourse Section -->

</main>