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
                <form autocomplete="on" method="post" name="delete_all_course" id="delete_all_course">
                    <table border='0'>
                        <tr>
                            <th width=1500>
                                <h3>¿Estás seguro de que quieres eliminar toda la lista de cursos?</h3>
                            </th>
                            <input type="hidden" id="yomogan" name="yomogan" placeholder="yomogan" value="echo Hola yomogan" />
                        </tr>
                    </table>
                    <table border='0'>
                        <tr>
                            <td width=680 align="center"><input name="Submit" type="button" class="Button_green" onclick="operations_course('delete_all')" value="Aceptar" /></td>
                            <td width=680 align="center"><a class="Button_red" href="index.php?page=controller_course&op=list">Cancelar</a></td>
                        </tr>
                    </table>
                    <br>
                    <br>
                </form>
            </div>

        </div>

    </section><!-- /deleteallcourse Section -->

</main>