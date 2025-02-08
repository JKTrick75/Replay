<main class="main">

    <!-- Page Title -->
    <div class="page-title" data-aos="fade">
        <div class="container">
            <nav class="breadcrumbs">
                <ol>
                    <li><a href="index.php">Home</a></li>
                    <li class="current">deletecourse</li>
                </ol>
            </nav>
            <h1>Borrar Curso</h1>
        </div>
    </div><!-- End Page Title -->

    <!-- deletecourse Section -->
    <section id="deletecourse" class="deletecourse section">

        <div class="container" data-aos="zoom-in" data-aos-delay="100">

            <div id="contenido">
                <form autocomplete="on" method="post" name="delete_course" id="delete_course">
                    <table border='0'>
                        <tr>
                            <td align="center" colspan="2">
                                <h3>¿Desea seguro borrar el curso: <?php echo $course['courseName']; ?>?</h3>
                            </td>
                            <input type="hidden" id="id" name="id" value="<?php echo $course['id']; ?>" />
                            <input type="hidden" id="courseName" name="courseName" value="<?php echo $course['courseName']; ?>" />
                        </tr>

                        <?php
                        // $data = $_GET['courseName'];
                        // die('<script>console.log('.json_encode( $data ) .');</script>');
                        //die('<script>console.log('.json_encode( $_GET ) .');</script>');
                        ?>

                        <tr>
                            <td align="center"><input name="Submit" type="button" class="Button_green" onclick="operations_course('delete')" value="Aceptar" /></td>
                            <td align="center"><a class="Button_red" href="index.php?page=controller_course&op=list">Cancelar</a></td>
                        </tr>
                    </table>
                </form>
            </div>

        </div>

    </section><!-- /deletecourse Section -->

</main>