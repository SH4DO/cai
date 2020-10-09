-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 16-12-2019 a las 07:29:54
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pcvcontrol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idclientes` int(5) NOT NULL,
  `cliente` varchar(255) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `plazo_cobranza` varchar(3) NOT NULL,
  `encargado` varchar(255) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `ciudad` varchar(120) NOT NULL,
  `rfc` varchar(20) NOT NULL,
  `clave_mercancia` varchar(100) NOT NULL,
  `tipo_mercancia` varchar(100) NOT NULL,
  `plazo_factura` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `codigo` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `iddocuments` int(5) NOT NULL,
  `d1` varchar(255) DEFAULT NULL,
  `d2` varchar(255) DEFAULT '',
  `d3` varchar(255) DEFAULT NULL,
  `d4` varchar(255) DEFAULT NULL,
  `d5` varchar(255) DEFAULT NULL,
  `d6` varchar(255) DEFAULT NULL,
  `d7` varchar(255) DEFAULT NULL,
  `d8` varchar(255) DEFAULT NULL,
  `d9` varchar(255) DEFAULT NULL,
  `d10` varchar(255) DEFAULT NULL,
  `idoperador` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Estructura de tabla para la tabla `documentos_equipo`
--

CREATE TABLE `documentos_equipo` (
  `iddocumentse` int(5) NOT NULL,
  `d1` varchar(255) DEFAULT NULL,
  `d2` varchar(255) DEFAULT NULL,
  `d3` varchar(255) DEFAULT NULL,
  `d4` varchar(255) DEFAULT NULL,
  `d5` varchar(255) DEFAULT NULL,
  `d6` varchar(255) DEFAULT NULL,
  `d7` varchar(255) DEFAULT NULL,
  `d8` varchar(255) DEFAULT NULL,
  `d9` varchar(255) DEFAULT NULL,
  `d10` varchar(255) DEFAULT NULL,
  `idequipo` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Estructura de tabla para la tabla `equipo_flotilla`
--

CREATE TABLE `equipo_flotilla` (
  `idequipo` int(5) NOT NULL,
  `num_economico` varchar(20) NOT NULL,
  `placas` varchar(10) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `marca` varchar(25) NOT NULL,
  `niv` varchar(25) NOT NULL,
  `motor` varchar(20) NOT NULL,
  `modelo` varchar(6) NOT NULL,
  `diferencial` varchar(20) NOT NULL,
  `suspencion` varchar(20) NOT NULL,
  `largo` varchar(10) NOT NULL,
  `ancho` varchar(10) NOT NULL,
  `alto` varchar(10) NOT NULL,
  `eje` varchar(4) NOT NULL,
  `estatus` varchar(20) NOT NULL,
  `altastc` varchar(255) NOT NULL,
  `bajastc` varchar(255) DEFAULT NULL,
  `numtc` varchar(10) NOT NULL,
  `num_poliza` varchar(20) NOT NULL,
  `vd` varchar(255) NOT NULL,
  `vh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Estructura de tabla para la tabla `operador`
--

CREATE TABLE `operador` (
  `idoperador` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha_nacimiento` varchar(255) NOT NULL,
  `edad` int(3) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `tipo_sangre` varchar(2) NOT NULL,
  `estatus` varchar(10) NOT NULL,
  `num_imss` varchar(11) NOT NULL,
  `fecha_alta` varchar(255) NOT NULL,
  `fecha_baje` varchar(30) DEFAULT NULL,
  `num_licencia` varchar(30) NOT NULL,
  `vig_desde` varchar(255) NOT NULL,
  `vig_hasta` varchar(255) NOT NULL,
  `examen_medico` varchar(30) NOT NULL,
  `exa_desde` varchar(255) NOT NULL,
  `exa_hasta` varchar(255) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `cp` varchar(7) NOT NULL,
  `ciudad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int(5) NOT NULL,
  `nombre_producto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idproducto`, `nombre_producto`) VALUES
(1, 'Abarrotes en general'),
(2, 'Arroz diversas presentaciones'),
(3, 'Bases de concreto Pramidal'),
(4, 'Block'),
(5, 'Botellas de Alcohol'),
(6, 'Carga General'),
(7, 'Carton en diversas presentaciones'),
(8, 'Cemento Portland CPC 30R'),
(9, 'Durmientes'),
(10, 'Vigas de Acero'),
(11, 'Emulsificante'),
(12, 'Galletas y Derivados'),
(13, 'Jugo de frutas en diversas presentaciones'),
(14, 'Postes de Concreto'),
(15, 'Material Electrico'),
(16, 'Levadura'),
(17, 'Refresco diversas presentaciones'),
(18, 'Tarimas a devolucion'),
(19, 'Fletes de devolucion'),
(20, 'Envaces de cristal vacio'),
(21, 'Garrafon con agua'),
(22, 'Registro de concreto para alumbrado'),
(23, 'Viaje vacio autorizado por el cliente'),
(24, 'Papeles y derivados'),
(25, 'Producto para reciclar (Playo)'),
(26, 'Garrafon vacio'),
(27, 'Postes metalicos conico octagonal');

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user` varchar(8) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `status` varchar(15) NOT NULL,
  `opciones` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`iduser`, `name`, `user`, `password`, `role`, `status`, `opciones`) VALUES
(1, 'Elias', 'admin', 'YWRtaW5QQ1YwMTk4MjAxOSQ=', 'admin', 'activo', 'todos');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idclientes`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`iddocuments`);

--
-- Indices de la tabla `documentos_equipo`
--
ALTER TABLE `documentos_equipo`
  ADD PRIMARY KEY (`iddocumentse`);

--
-- Indices de la tabla `equipo_flotilla`
--
ALTER TABLE `equipo_flotilla`
  ADD PRIMARY KEY (`idequipo`);

--
-- Indices de la tabla `operador`
--
ALTER TABLE `operador`
  ADD PRIMARY KEY (`idoperador`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idclientes` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `iddocuments` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `documentos_equipo`
--
ALTER TABLE `documentos_equipo`
  MODIFY `iddocumentse` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `equipo_flotilla`
--
ALTER TABLE `equipo_flotilla`
  MODIFY `idequipo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `operador`
--
ALTER TABLE `operador`
  MODIFY `idoperador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
