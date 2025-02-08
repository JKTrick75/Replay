<main class="main">

    <!-- Page Title -->
    <div class="page-title" data-aos="fade">
        <div class="container">
            <nav class="breadcrumbs">
                <ol>
                    <li><a href="index.php">Home</a></li>
                    <li class="current">createcourse</li>
                </ol>
            </nav>
            <h1>Crear Curso</h1>
        </div>
    </div><!-- End Page Title -->

    <!-- createcourse Section -->
    <section id="createcourse" class="createcourse section">

        <div class="container" data-aos="zoom-in" data-aos-delay="100">

        <div id="contenido">
    <form autocomplete="on" method="post" name="alta_course" id="alta_course"> 
        <h1>Curso nuevo</h1>
        <table border='0'>
            <tr>
                <td>Nombre: </td>
                <td><input type="text" id="courseName" name="courseName" placeholder="Nombre del curso" value="<?php echo isset($_POST['courseName']) ? $_POST['courseName'] : ''; ?>"/></td>
                <td><font color="red">
                    <span id="error_courseName" class="error">
                        <?php
                            echo "$error_courseName";
                        ?>
                    </span>
                </font></td>
            </tr>
            
            <tr>
                <td>Descripción:</td>
                <td><textarea cols="30" rows="5" id="description" name="description" placeholder="Añade una descripción"><?php echo isset($_POST['description']) ? $_POST['description'] : ''; ?></textarea></td>
                <td><font color="red">
                    <span id="error_description" class="error"></span>
                </font></td>
            </tr>

            <tr>
                <td>Categoria: </td>
                <td>
                    <input type="checkbox" id="category[]" name="category[]" placeholder= "category" value="Online" <?php echo (isset($_POST['category']) && in_array('Online', $_POST['category'])) ? 'checked' : ''; ?>/>Online
                    <input type="checkbox" id="category[]" name="category[]" placeholder= "category" value="Presencial" <?php echo (isset($_POST['category']) && in_array('Presencial', $_POST['category'])) ? 'checked' : ''; ?>/>Presencial
                    <input type="checkbox" id="category[]" name="category[]" placeholder= "category" value="Semipresencial" <?php echo (isset($_POST['category']) && in_array('Semipresencial', $_POST['category'])) ? 'checked' : ''; ?>/>Semipresencial
                </td>
                <td><font color="red">
                    <span id="error_category" class="error"></span>
                </font></td>
            </tr>

            <tr>
                <td>Dificultad: </td>
                <td>
                    <input type="radio" id="dificulty" name="dificulty" value="Facil" <?php echo (isset($_POST['dificulty']) && $_POST['dificulty'] == 'Facil') ? 'checked' : ''; ?>/>Fácil
                    <input type="radio" id="dificulty" name="dificulty" value="Intermedia" <?php echo (isset($_POST['dificulty']) && $_POST['dificulty'] == 'Intermedia') ? 'checked' : ''; ?>/>Intermedia
                    <input type="radio" id="dificulty" name="dificulty" value="Dificil" <?php echo (isset($_POST['dificulty']) && $_POST['dificulty'] == 'Dificil') ? 'checked' : ''; ?>/>Difícil
                </td>
                <td><font color="red">
                    <span id="error_dificulty" class="error"></span>
                </font></td>
            </tr>

            <tr>
                <td>Horas Dia: </td>
                <td>
                    <select id="hoursDay" name="hoursDay">
                        <option value="" disabled selected>Selecciona una opción</option>
                        <?php for ($i = 1; $i <= 8; $i++): ?>
                            <option value="<?php echo $i; ?>" <?php echo (isset($_POST['hoursDay']) && $_POST['hoursDay'] == $i) ? 'selected' : ''; ?>>
                                <?php echo $i; ?>
                            </option>
                        <?php endfor; ?>
                    </select>
                </td>
                <td><font color="red">
                    <span id="error_hoursDay" class="error"></span>
                </font></td>
            </tr>

            <tr>
                <td>Precio Hora: </td>
                <td><input type="number" id="priceHour" name="priceHour" placeholder="Precio por hora" min="1" value="<?php echo isset($_POST['priceHour']) ? $_POST['priceHour'] : ''; ?>"/></td>
                <td><font color="red">
                    <span id="error_priceHour" class="error"> </span>
                </font></td>
            </tr>
            
            <tr>
                <td>Precio Total: </td>
                <td><input type="number" id="price" name="price" min="1" placeholder="Precio total" value="<?php echo isset($_POST['price']) ? $_POST['price'] : ''; ?>"/></td>
                <td><font color="red">
                    <span id="error_price" class="error"></span>
                </font></td>
            </tr>

            <tr>
                <td>Fecha inicio curso: </td>
                <td><input type="text" id="dateIni" name="dateIni" placeholder="Introduce una fecha" value="<?php echo isset($_POST['dateIni']) ? $_POST['dateIni'] : ''; ?>" readonly/></td>
                <td><font color="red">
                    <span id="error_dateIni" class="error"></span>
                </font></td>
            </tr>

            <tr>
                <td>Fecha fin curso: </td>
                <td><input type="text" id="dateEnd" name="dateEnd" placeholder="Introduce una fecha" value="<?php echo isset($_POST['dateEnd']) ? $_POST['dateEnd'] : ''; ?>" readonly/></td>
                <td><font color="red">
                    <span id="error_dateEnd" class="error"></span>
                </font></td>
            </tr>
            
            <tr>
                <td><input type="button" class="Button_red_2" onclick="validate_js('create')" value="Crear Curso"/></td>
                <td align="right"><a href="index.php?page=controller_course&op=list">Volver</a></td>
            </tr>
        </table>
    </form>
</div>

        </div>

    </section><!-- /createcourse Section -->

</main>