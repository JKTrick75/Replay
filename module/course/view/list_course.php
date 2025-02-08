<main class="main">

    <!-- Page Title -->
    <div class="page-title" data-aos="fade">
        <div class="container">
            <nav class="breadcrumbs">
                <ol>
                    <li><a href="index.php">Home</a></li>
                    <li class="current">listcourse</li>
                </ol>
            </nav>
            <h1>Lista Cursos</h1>
        </div>
    </div><!-- End Page Title -->

    <!-- ListCourse Section -->
    <section id="ListCourse" class="ListCourse section">

        <div class="container" data-aos="zoom-in" data-aos-delay="100">


            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <h3>LISTA DE CURSOS</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <h4>Filtrar Cursos</h4>
                        <form action="index.php?page=controller_course&op=list" method="post">
                            <div class="form-group">
                                <label for="category">Categoría:</label>
                                <select name="category" id="category" class="form-control">
                                    <option value="">Todas</option>
                                    <option value="Online">Online</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Semipresencial">Semipresencial</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="dificulty">Dificultad:</label>
                                <select name="dificulty" id="dificulty" class="form-control">
                                    <option value="">Todas</option>
                                    <option value="Facil">Fácil</option>
                                    <option value="Intermedia">Intermedia</option>
                                    <option value="Dificil">Difícil</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="price">Precio Máximo:</label>
                                <input type="number" name="price" id="price" class="form-control" placeholder="Precio máximo">
                            </div>
                            <button type="submit" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                                </svg> Filtrar
                            </button>
                        </form><br>

                        <h4>Menu Admin</h4>
                        <button class="btn btn-primary export_backup">Exportar backup</button><br><br>
                        <button class="btn btn-primary backupModal">Importar backup</button>

                    </div>
                    <div class="col-md-9">
                        <div class="text-right mb-3">
                            <a href="index.php?page=controller_course&op=create" class="btn btn-primary">
                                <img src="view/assets/img/anadir.png"> Añadir Curso
                            </a>
                            <a href="index.php?page=controller_course&op=dummies" class="btn btn-primary">
                                <img src="view/assets/img/anadir.png"> Crear Dummies
                            </a>
                            <a href="index.php?page=controller_course&op=delete_all" class="btn btn-danger">
                                <img src="view/assets/img/eliminar.png"> Borrar Todo
                            </a>
                        </div>
                        <table class="table-list text-center">
                            <tr>
                                <td width=125><b>Nombre</b></th>
                                <td width=125><b>Descripción</b></th>
                                <td width=125><b>Categoria</b></th>
                                <td width=125><b>Dificultad</b></th>
                                <td width=125><b>Precio Total</b></th>
                                <th width=400><b>Acciones</b></th>
                            </tr>
                            <?php
                            if ($rdo->num_rows === 0) {
                                echo '<tr>';
                                echo '<td align="center" colspan="3">NO HAY NINGUN CURSO DISPONIBLE</td>';
                                echo '</tr>';
                            } else {
                                foreach ($rdo as $row) {
                                    echo '<tr>';
                                    echo '<td width=125>' . $row['courseName'] . '</td>';
                                    echo '<td width=125>' . $row['description'] . '</td>';
                                    echo '<td width=125>';
                                    $categories = explode(':', $row['category']);
                                    foreach ($categories as $category) {
                                        if (!empty($category)) {
                                            echo $category . '<br>';
                                        }
                                    }
                                    echo '</td>';
                                    echo '<td width=125>' . $row['dificulty'] . '</td>';
                                    echo '<td width=125>' . $row['price'] . '</td>';
                                    echo '<td width=400>';
                                    print("<button class='btn btn-primary course' id='" . $row['id'] . "'>
                                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-search' viewBox='0 0 16 16'>
                                                    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0'/>
                                                </svg> Read</button>");
                                    echo '&nbsp;';
                                    echo '<a class="btn btn-success" href="index.php?page=controller_course&op=update&id=' . $row['id'] . '">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg> Update</a>';
                                    echo '&nbsp;';
                                    echo '<a class="btn btn-danger" href="index.php?page=controller_course&op=delete&id=' . $row['id'] . '">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg> Delete</a>';
                                    echo '</td>';
                                    echo '</tr>';
                                }
                            }
                            ?>
                        </table>
                    </div>
                </div>
            </div>

            <!-- modal window -->
            <section id="course_modal">
            </section>

            <!-- modal window -->
            <section id="backup_modal">
            </section>

        </div>

    </section><!-- /ListCourse Section -->

</main>