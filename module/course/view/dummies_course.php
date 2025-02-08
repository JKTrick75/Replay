<main class="main">

    <!-- Page Title -->
    <div class="page-title" data-aos="fade">
        <div class="container">
            <nav class="breadcrumbs">
                <ol>
                    <li><a href="index.php">Home</a></li>
                    <li class="current">dummiescourse</li>
                </ol>
            </nav>
            <h1>Crear Cursos Dummies</h1>
        </div>
    </div><!-- End Page Title -->

    <!-- dummiescourse Section -->
    <section id="dummiescourse" class="dummiescourse section">

        <div class="container" data-aos="zoom-in" data-aos-delay="100">

            <div id="contenido">
                <form autocomplete="on" method="post" name="dummies_course" id="dummies_course">
                    <table border='0'>
                        <tr>
                            <th width=1200>
                                <h3>¿Quieres cargar algunos cursos de prueba?</h3>
                                <p>Atención!! Se borrarán todos los cursos que hay actualmente y se crearán los dummies. ¿Desea continuar con la operación?</p>
                            </th>
                            <input type="hidden" id="yomogan" name="yomogan" placeholder="yomogan" value="echo Hola yomogan" />
                        </tr>
                    </table>
                    <table border='0'>
                        <tr>
                            <td width=680 align="center"><input name="Submit" type="button" class="Button_green" onclick="operations_course('dummies')" value="Aceptar" /></td>
                            <td width=680 align="center"><a class="Button_red" href="index.php?page=controller_course&op=list">Cancelar</a></td>
                        </tr>
                    </table>
                </form>
            </div>

        </div>

    </section><!-- /dummiescourse Section -->

</main>