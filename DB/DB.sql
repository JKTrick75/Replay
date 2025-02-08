-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-04-2022 a las
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

DROP DATABASE Replay;
CREATE DATABASE Replay;
USE Replay;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `concesionario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(10) NOT NULL,
  `nom_producto` varchar(30) NOT NULL,
  `precio` int(10) NOT NULL,
  `color` varchar(20) NULL,
  `marca` int(10) NOT NULL,
  `tipo_consola` int(10) NULL,
  `modelo_consola` int(10) NULL,
  `tipo_accesorio` int(10) NULL,
  `tipo_merch` int(10) NULL,
  `estado` int(10) NOT NULL,
  `ciudad` int(10) NOT NULL,
  `fecha_publicacion` varchar(10) NOT NULL,
  `fecha_ult_mod` varchar(10) NOT NULL,
  `capacidad` varchar(10) NOT NULL,
  `incluye_mando` varchar(10) NULL,
  `incluye_cargador` varchar(10) NULL,
  `incluye_juegos` varchar(10) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--
INSERT INTO `producto` (`id_producto`, `nom_producto`, `precio`, `color`, `marca`, `tipo_consola`, `modelo_consola`, `tipo_accesorio`, `tipo_merch`, `estado`, `ciudad`, `fecha_publicacion`, `fecha_ult_mod`, `capacidad`, `incluye_mando`, `incluye_cargador`, `incluye_juegos`) VALUES
(1, 'PlayStation 5', 500, 'Blanco', 1, 1, 1, NULL, NULL, 1, 1, '2022/04/01', '2022/04/05', '825GB', 'true', 'true', 'true'),
(2, 'Xbox Series X', 450, 'Negro', 2, 2, 2, NULL, NULL, 2, 2, '2022/03/25', '2022/04/05', '1TB', 'true', 'true', 'false'),
(3, 'Nintendo Switch', 300, 'Rojo/Azul', 3, 3, 3, NULL, NULL, 1, 3, '2022/04/02', '2022/04/05', '32GB', 'true', 'true', 'true'),
(4, 'PlayStation 4', 200, 'Negro', 1, 1, 4, NULL, NULL, 2, 4, '2022/03/30', '2022/04/05', '500GB', 'true', 'true', 'false'),
(5, 'Xbox One S', 250, 'Blanco', 2, 2, 5, NULL, NULL, 1, 5, '2022/04/03', '2022/04/05', '1TB', 'true', 'true', 'true'),
(6, 'Nintendo 3DS', 100, 'Negro', 3, 3, 6, NULL, NULL, 2, 6, '2022/03/28', '2022/04/05', '4GB', 'true', 'true', 'false'),
(7, 'PlayStation 3', 80, 'Negro', 1, 1, 7, NULL, NULL, 2, 7, '2022/03/27', '2022/04/05', '120GB', 'true', 'true', 'false'),
(8, 'Xbox 360', 70, 'Blanco', 2, 2, 8, NULL, NULL, 2, 8, '2022/03/26', '2022/04/05', '250GB', 'true', 'true', 'false'),
(9, 'Nintendo Wii', 50, 'Blanco', 3, 3, 9, NULL, NULL, 2, 9, '2022/03/29', '2022/04/05', '512MB', 'true', 'true', 'false'),
(10, 'PlayStation 2', 40, 'Negro', 1, 1, 10, NULL, NULL, 2, 10, '2022/03/24', '2022/04/05', 'No', 'true', 'true', 'false');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nom_categoria` varchar(30) NOT NULL,
  `img_categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nom_categoria`, `img_categoria`) VALUES
(1, 'consola', 'view/assets/img/categories/consola.jpg'),
(2, 'accesorio', 'view/assets/img/categories/accesorio.jpeg'),
(3, 'merchandising', 'view/assets/img/categories/merchandising.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_categoria`
--

CREATE TABLE `producto_categoria` (
  `id_producto` int(10) NOT NULL,
  `id_categoria` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto_categoria`
--

INSERT INTO `producto_categoria` (`id_producto`, `id_categoria`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id_marca` int(10) NOT NULL,
  `nom_marca` varchar(30) NOT NULL,
  `img_marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_marca`, `nom_marca`, `img_marca`) VALUES
(1, 'Sony', 'view/assets/img/marca/sony.webp'),
(2, 'Microsoft', 'view/assets/img/marca/microsoft.webp'),
(3, 'Nintendo', 'view/assets/img/marca/nintendo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_producto`
--

CREATE TABLE `img_producto` (
  `id_img` int(10) NOT NULL,
  `id_producto` int(10) NOT NULL,
  `img_producto` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `img_producto`
--

INSERT INTO `img_producto` (`id_img`, `id_producto`, `img_producto`) VALUES
(1, 1, 'view/assets/img/productos/ps5_1.webp'),
(2, 1, 'view/assets/img/productos/ps5_2.webp'),
(3, 1, 'view/assets/img/productos/ps5_3.webp'),
(4, 2, 'view/assets/img/productos/xbox_series_x_1.webp'),
(5, 2, 'view/assets/img/productos/xbox_series_x_2.webp'),
(6, 3, 'view/assets/img/productos/nintendo_switch_1.webp'),
(7, 3, 'view/assets/img/productos/nintendo_switch_2.webp'),
(8, 4, 'view/assets/img/productos/ps4_1.webp'),
(9, 5, 'view/assets/img/productos/xbox_one_s_1.webp'),
(10, 6, 'view/assets/img/productos/nintendo_3ds_1.webp'),
(11, 7, 'view/assets/img/productos/ps3_1.webp'),
(12, 8, 'view/assets/img/productos/xbox_360_1.webp'),
(13, 9, 'view/assets/img/productos/nintendo_wii_1.webp'),
(14, 10, 'view/assets/img/productos/ps2_1.webp'),
(15, 5, 'view/assets/img/productos/xbox_one_s_2.webp'),
(16, 4, 'view/assets/img/productos/ps4_2.webp'),
(17, 6, 'view/assets/img/productos/nintendo_3ds_2.webp'),
(18, 6, 'view/assets/img/productos/nintendo_3ds_3.webp'),
(19, 7, 'view/assets/img/productos/ps3_2.webp'),
(20, 7, 'view/assets/img/productos/ps3_3.webp'),
(21, 8, 'view/assets/img/productos/xbox_360_2.webp'),
(22, 9, 'view/assets/img/productos/nintendo_wii_2.webp'),
(23, 9, 'view/assets/img/productos/nintendo_wii_3.webp'),
(24, 9, 'view/assets/img/productos/nintendo_wii_4.webp'),
(25, 10, 'view/assets/img/productos/ps2_2.webp'),
(26, 10, 'view/assets/img/productos/ps2_3.webp');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id_ciudad` int(10) NOT NULL,
  `nom_ciudad` varchar(30) NOT NULL,
  `img_ciudad` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id_ciudad`, `nom_ciudad`, `img_ciudad`) VALUES
(1, 'Madrid', 'view/assets/img/ciudades/madrid.jpg'),
(2, 'Barcelona', 'view/assets/img/ciudades/barcelona.jpg'),
(3, 'Valencia', 'view/assets/img/ciudades/valencia.jpg'),
(4, 'Sevilla', 'view/assets/img/ciudades/sevilla.jpg'),
(5, 'Bilbao', 'view/assets/img/ciudades/bilbao.jpeg'),
(6, 'Zaragoza', 'view/assets/img/ciudades/zaragoza.jpg'),
(7, 'Málaga', 'view/assets/img/ciudades/malaga.jpg'),
(8, 'Murcia', 'view/assets/img/ciudades/murcia.jpg'),
(9, 'Alicante', 'view/assets/img/ciudades/alicante.jpg'),
(10, 'Córdoba', 'view/assets/img/ciudades/cordoba.webp');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(10) NOT NULL,
  `nom_estado` varchar(30) NOT NULL,
  `img_estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_estado`, `nom_estado`, `img_estado`) VALUES
(1, 'Nuevo', 'view/assets/img/estados/nuevo.png'),
(2, 'Usado', 'view/assets/img/estados/usado.png'),
(3, 'Desgastado', 'view/assets/img/estados/desgastado.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_venta`
--

CREATE TABLE `tipo_venta` (
  `id_tipo_venta` int(10) NOT NULL,
  `nom_tipo_venta` varchar(30) NOT NULL,
  `img_tipo_venta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_venta`
--

INSERT INTO `tipo_venta` (`id_tipo_venta`, `nom_tipo_venta`, `img_tipo_venta`) VALUES
(1, 'Envio disponible', 'view/assets/img/tipo_venta/envio_disponible.png'),
(2, 'Recogida correos', 'view/assets/img/tipo_venta/recogida_correos.webp'),
(3, 'Presencial', 'view/assets/img/tipo_venta/presencial.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_venta_producto`
--

CREATE TABLE `tipo_venta_producto` (
  `id_tipo_venta` int(10) NOT NULL,
  `id_producto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_venta_producto`
--

INSERT INTO `tipo_venta_producto` (`id_tipo_venta`, `id_producto`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo_consola`
--

CREATE TABLE `modelo_consola` (
  `id_modelo_consola` int(10) NOT NULL,
  `nom_modelo_consola` varchar(30) NOT NULL,
  `id_tipo_consola` int(10) NOT NULL,
  `img_modelo_consola` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `modelo_consola`
--

INSERT INTO `modelo_consola` (`id_modelo_consola`, `nom_modelo_consola`, `id_tipo_consola`, `img_modelo_consola`) VALUES
(1, 'PlayStation 5', 1, 'view/assets/img/modelos/ps5.jpg'),
(2, 'Xbox Series X', 2, 'view/assets/img/modelos/xbox_series_x.jpg'),
(3, 'Nintendo Switch', 3, 'view/assets/img/modelos/nintendo_switch.jpg'),
(4, 'PlayStation 4', 1, 'view/assets/img/modelos/ps4.webp'),
(5, 'Xbox One S', 2, 'view/assets/img/modelos/xbox_one_s.jpg'),
(6, 'Nintendo 3DS', 3, 'view/assets/img/modelos/nintendo_3ds.webp'),
(7, 'PlayStation 3', 1, 'view/assets/img/modelos/ps3.jpg'),
(8, 'Xbox 360', 2, 'view/assets/img/modelos/xbox_360.jpg'),
(9, 'Nintendo Wii', 3, 'view/assets/img/modelos/nintendo_wii.jpg'),
(10, 'PlayStation 2', 1, 'view/assets/img/modelos/ps2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_consola`
--

CREATE TABLE `tipo_consola` (
  `id_tipo_consola` int(10) NOT NULL,
  `nom_tipo_consola` varchar(30) NOT NULL,
  `id_marca` int(10) NOT NULL,
  `img_tipo_consola` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_consola`
--

INSERT INTO `tipo_consola` (`id_tipo_consola`, `nom_tipo_consola`, `id_marca`, `img_tipo_consola`) VALUES
(1, 'PlayStation', 1, 'view/assets/img/tipo_consola/playstation.webp'),
(2, 'Xbox', 2, 'view/assets/img/tipo_consola/xbox.jpg'),
(3, 'Nintendo', 3, 'view/assets/img/tipo_consola/nintendo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_accesorio`
--

CREATE TABLE `tipo_accesorio` (
  `id_tipo_accesorio` int(10) NOT NULL,
  `nom_tipo_accesorio` varchar(30) NOT NULL,
  `id_marca` int(10) NOT NULL,
  `img_tipo_accesorio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_accesorio`
--

INSERT INTO `tipo_accesorio` (`id_tipo_accesorio`, `nom_tipo_accesorio`, `id_marca`, `img_tipo_accesorio`) VALUES
(1, 'Mandos', 1, 'view/assets/img/tipo_accesorio/mandos.webp'),
(2, 'Cargadores', 2, 'view/assets/img/tipo_accesorio/cargadores.jpg'),
(3, 'Fundas', 3, 'view/assets/img/tipo_accesorio/fundas.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_merchandising`
--

CREATE TABLE `tipo_merchandising` (
  `id_tipo_merchandising` int(10) NOT NULL,
  `nom_tipo_merchandising` varchar(30) NOT NULL,
  `id_marca` int(10) NOT NULL,
  `img_tipo_merchandising` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_merchandising`
--

INSERT INTO `tipo_merchandising` (`id_tipo_merchandising`, `nom_tipo_merchandising`, `id_marca`, `img_tipo_merchandising`) VALUES
(1, 'Camisetas', 1, 'view/assets/img/tipo_merchandising/camisetas.jpg'),
(2, 'Tazas', 2, 'view/assets/img/tipo_merchandising/tazas.jpg'),
(3, 'Figuras', 3, 'view/assets/img/tipo_merchandising/figuras.jpg');

-- --------------------------------------------------------
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `nom_producto` (`nom_producto`),
  ADD KEY `modelo_consola` (`modelo_consola`),
  ADD KEY `tipo_consola` (`tipo_consola`),
  ADD KEY `tipo_accesorio` (`tipo_accesorio`),
  ADD KEY `tipo_merch` (`tipo_merch`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nom_categoria` (`nom_categoria`),
  ADD UNIQUE KEY `img_categoria` (`img_categoria`);

--
-- Indices de la tabla `producto_categoria`
--
ALTER TABLE `producto_categoria`
  ADD PRIMARY KEY (`id_producto`, `id_categoria`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_marca`),
  ADD UNIQUE KEY `nom_marca` (`nom_marca`),
  ADD UNIQUE KEY `img_marca` (`img_marca`);


--
-- Indices de la tabla `img_producto`
--
ALTER TABLE `img_producto`
  ADD PRIMARY KEY (`id_img`),
  ADD KEY `id_producto` (`id_producto`);;

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD UNIQUE KEY `nom_ciudad` (`nom_ciudad`),
  ADD UNIQUE KEY `img_ciudad` (`img_ciudad`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`),
  ADD UNIQUE KEY `nom_estado` (`nom_estado`),
  ADD UNIQUE KEY `img_estado` (`img_estado`);

--
-- Indices de la tabla `tipo_venta`
--
ALTER TABLE `tipo_venta`
  ADD PRIMARY KEY (`id_tipo_venta`),
  ADD UNIQUE KEY `nom_tipo_venta` (`nom_tipo_venta`),
  ADD UNIQUE KEY `img_tipo_venta` (`img_tipo_venta`);

--
-- Indices de la tabla `tipo_venta_producto`
--
ALTER TABLE `tipo_venta_producto`
  ADD PRIMARY KEY (`id_tipo_venta`, `id_producto`);

--
-- Indices de la tabla `modelo_consola`
--
ALTER TABLE `modelo_consola`
  ADD PRIMARY KEY (`id_modelo_consola`),
  ADD UNIQUE KEY `nom_modelo_consola` (`nom_modelo_consola`),
  ADD UNIQUE KEY `img_modelo_consola` (`img_modelo_consola`),
  ADD KEY `id_tipo_consola` (`id_tipo_consola`);

--
-- Indices de la tabla `tipo_consola`
--
ALTER TABLE `tipo_consola`
  ADD PRIMARY KEY (`id_tipo_consola`),
  ADD UNIQUE KEY `nom_tipo_consola` (`nom_tipo_consola`),
  ADD UNIQUE KEY `img_tipo_consola` (`img_tipo_consola`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `tipo_accesorio`
--
ALTER TABLE `tipo_accesorio`
  ADD PRIMARY KEY (`id_tipo_accesorio`),
  ADD UNIQUE KEY `nom_tipo_accesorio` (`nom_tipo_accesorio`),
  ADD UNIQUE KEY `img_tipo_accesorio` (`img_tipo_accesorio`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `tipo_merchandising`
--
ALTER TABLE `tipo_merchandising`
  ADD PRIMARY KEY (`id_tipo_merchandising`),
  ADD UNIQUE KEY `nom_tipo_merchandising` (`nom_tipo_merchandising`),
  ADD UNIQUE KEY `img_tipo_merchandising` (`img_tipo_merchandising`),
  ADD KEY `id_marca` (`id_marca`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id_marca` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `img_producto`
--
ALTER TABLE `img_producto`
  MODIFY `id_img` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id_ciudad` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id_estado` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_venta`
--
ALTER TABLE `tipo_venta`
  MODIFY `id_tipo_venta` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `modelo_consola`
--
ALTER TABLE `modelo_consola`
  MODIFY `id_modelo_consola` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tipo_consola`
--
ALTER TABLE `tipo_consola`
  MODIFY `id_tipo_consola` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_accesorio`
--
ALTER TABLE `tipo_accesorio`
  MODIFY `id_tipo_accesorio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_merchandising`
--
ALTER TABLE `tipo_merchandising`
  MODIFY `id_tipo_merchandising` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FK_marca1` FOREIGN KEY (`marca`) REFERENCES `marca` (`id_marca`),
  ADD CONSTRAINT `FK_tipo_consola1` FOREIGN KEY (`tipo_consola`) REFERENCES `tipo_consola` (`id_tipo_consola`),
  ADD CONSTRAINT `FK_modelo_consola` FOREIGN KEY (`modelo_consola`) REFERENCES `modelo_consola` (`id_modelo_consola`),
  ADD CONSTRAINT `FK_tipo_accesorio` FOREIGN KEY (`tipo_accesorio`) REFERENCES `tipo_accesorio` (`id_tipo_accesorio`),
  ADD CONSTRAINT `FK_tipo_merch` FOREIGN KEY (`tipo_merch`) REFERENCES `tipo_merchandising` (`id_tipo_merchandising`),
  ADD CONSTRAINT `FK_estado` FOREIGN KEY (`estado`) REFERENCES `estado` (`id_estado`),
  ADD CONSTRAINT `FK_ciudad` FOREIGN KEY (`ciudad`) REFERENCES `ciudad` (`id_ciudad`);

--
-- Filtros para la tabla `producto_categoria`
--
ALTER TABLE `producto_categoria`
  ADD CONSTRAINT `FK_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `FK_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `img_producto`
--
ALTER TABLE `img_producto`
  ADD CONSTRAINT `FK_producto2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `tipo_venta_producto`
--
ALTER TABLE `tipo_venta_producto`
  ADD CONSTRAINT `FK_tipo_venta` FOREIGN KEY (`id_tipo_venta`) REFERENCES `tipo_venta` (`id_tipo_venta`),
  ADD CONSTRAINT `FK_producto3` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `modelo_consola`
--
ALTER TABLE `modelo_consola`
  ADD CONSTRAINT `FK_tipo_consola2` FOREIGN KEY (`id_tipo_consola`) REFERENCES `tipo_consola` (`id_tipo_consola`);

--
-- Filtros para la tabla `tipo_consola`
--
ALTER TABLE `tipo_consola`
  ADD CONSTRAINT `FK_marca2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);

--
-- Filtros para la tabla `tipo_accesorio`
--
ALTER TABLE `tipo_accesorio`
  ADD CONSTRAINT `FK_marca3` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);

--
-- Filtros para la tabla `tipo_merchandising`
--
ALTER TABLE `tipo_merchandising`
  ADD CONSTRAINT `FK_marca4` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);


-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
