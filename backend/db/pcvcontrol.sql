-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-06-2020 a las 05:53:15
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idclientes`, `cliente`, `telefono`, `plazo_cobranza`, `encargado`, `domicilio`, `ciudad`, `rfc`, `clave_mercancia`, `tipo_mercancia`, `plazo_factura`, `email`, `codigo`) VALUES
(2, 'Cementos Apasco, S.A. de C.V.', '1234567890', '1', 'Ing. Amalia Rosas', 'Av. Prolong. Vasco de quiroga Torre ll Piso 1', 'Ixtaczoquitlan, Ver.', 'CAP821208LQ3', '76', '76', '1', 'ing@gmail.com.com', '94732'),
(3, 'Centrifugados Mexicanos, S.A. de C.V.', '2721234567', '3', 'Viridiana Alamillo', 'KM. 28.5 Carretera Cordoba-La Tinaja Col. 30 de Abril', 'Cuitláhuac, Veracruz', 'CME770429QL1', '12', '12', '2', 'ing@gmail.com', '94732'),
(4, 'Desarrollo Logistico, S.A. de C.V.', '2381293819', '4', 'Ing. Alfonso Hector Primo Lauro', 'General Anaya Poniente No.601', 'Monterrey, N.L.', 'DLO990908D79', '73', '73', '3', 'ing@gmail.com', '94732'),
(5, 'Edificaciones y Proyectos Torres, S.A. de C.V.', '2721234567', '3', 'Ing Julio', 'Av. Río Churubuscos 274-A Int.6 Col. Del Carmen', 'Ciudad de Mexico', 'EPT050527UQ6', '1', '1', '2', 'ing@gmail.com.mx', '94732'),
(6, 'Empacadora y Comercializadora de Productos Básicos México S.A.P.I. de C.V.', '2721234567', '4', 'Ingeniero', 'Paseo de las Palmas No. 767 Col. Rincón Grande', 'Orizaba,Ver', 'ECP0006303N8', '1', '1', '3', 'dmkasm@gmail.com', '94732'),
(7, 'Georgina Moran Robles', '2721234567', '3', 'Georgina Moran Robles', 'Priv. de Calle sin Nombre No.201.Col. La Luz Francisco', 'Orizaba', 'MORGA470423Q', '7', '7', '2', 'GeorginaMoranRobles@gmail.com', '94732'),
(8, 'Grupo Cantabria, S.A. de C.V.', '2721234567', '4', 'Ing. Ándres Ferman', 'Carretera Federal Ciudad Aleman-Nopaltepec Km 16', 'Nopaltepec', 'AAA#####AAAAa', '4', '4', '3', 'ing@gmail.com', '94732'),
(9, 'Grupo Experto en Logistica ENMA', '2721234567', '3', 'Fidel Ramírez Tenoro', 'Privadas las Villas No. 161; Col. Real de Cumbres 2do.', 'Monterrey, N.L.', 'GEL140822P34', '1', '3', '2', 'ing@gmail.com', '94732'),
(10, 'Industrial de Productos Petroleros, S.A. de C.V.', '2721234567', '4', 'Lic. Ángeles Lagunes Zamora', 'Calle 21 No. 520 Int. \"A\" Col. Centro', 'Cordoba, Ver.', 'IPP040803BC5', '1', '1', '3', 'ing@hotmail.com.mx', '94732'),
(11, 'Juan Ángel Aranda García', '2721234567', '3', 'Ingeniero', 'A.v Reforma No. 1509 Col. Centro', 'Tehuacan, Puebla', 'AAGJ880729KZ7', '3', '3', '2', 'ingeniero@gmail.com.mx', '94732'),
(12, 'Omnigreen S.A.P.I', '2721234567', '4', 'Lic. Ángel Dominguez Minutti', 'Calle Guadalupe Victoria No.20 camino al deportivo', 'Río Blanco, Ver', 'SHDJASHJD28392389134', '28', '28', '3', 'ingeniero@gmail.com', '94732'),
(13, 'Puros Fierros S.A. de C.V.', '2721234567', '3', 'Joaquin Azamar', 'Calle Carlos Cruz No.327 entre av. Allende y calle Netz', 'Veracruz, Ver', 'PFI170210CB9', '1', '1', '2', 'ing@gmail.com', '94732'),
(14, 'Schettino Hermanos S.', '2721234567', '4', 'Joshua Iván Martínez', 'Prolongación de Sur 33', 'Orizaba, Ver.', 'WPS150803FC8', '78', '78', '3', 'ing@gmial.com', '94732'),
(15, 'Sistemas Electrourbanos, S.A. de C.V.', '2721234567', '3', 'Ing. Jorge Ramos', 'Carretera Federal Cordoba-Veracruz Km. 23.5', 'Cuitláhuac, Veracruz', 'SEL110713J56', '3', '3', '2', 'ingjorgeramos@gmail.com', '94732'),
(16, 'Tecnologia Industrial Rosanco, S.A. de C.V.', '2721234567', '4', 'Ingeniero', 'Alvaro Obregón No. 55; Col. Terricola', 'Orizaba, Ver.', 'TIR940112Q91', '2', '2', '3', 'ingeniero@hotmail.com.mx', '94732'),
(17, 'World Path Service S. de R.L. de C.V.', '2721234567', '3', 'Lic. Guillermo Martínez', 'Lago Alberto No. 320 entre Lago Mayor y Mariano', 'CDMX', 'WPS150803FC8', '16', '16', '2', 'ingeniero@gmail.com.mx', '94732'),
(18, 'Urbanizadora del Bajio, S.A. de C.V.', '2721234567', '4', 'Ivan', 'Pase Solidaridad No. 17820. Col. El Dorado', 'Irapuato, GTO.', 'UBA8409053U8', '4', '4', '3', 'ing@hotmail.com', '94732'),
(19, 'house\'s diego', '272703349', '3', 'diego', 'calle puebla', 'rio blanco, ver', '1123dsdcccccc', '40', '40', '2', 'diego.rs@hotmail.com', '94732'),
(20, 'Cliente Prueba', '2389128391', '2', 'sdmaksdmka', 'asmdkasmkda', 'Orizaba', '2392013902193', '41', '41', '2', 'portadoresdelestadodeveracruz@portadoresdelestadodeveracruz.com.mx', ''),
(21, 'Prueba 3', '3901293012', '1', 'sdlaksld', 'sdamsda', 'orizava', 'sdamdkamskdma', '1', '1', '1', 'veracluster@veracruzterdelestadodeveracruz.com.mx', ''),
(22, 'tecnologico ito', '2721234567', '4', 'director', 'zapata', 'orizaba, ver.', 'fjskfjsakfa22', '77', '77', '3', 'tecnologicodeorizaba@hotmail.com.mx', '94327');

-- --------------------------------------------------------

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
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`iddocuments`, `d1`, `d2`, `d3`, `d4`, `d5`, `d6`, `d7`, `d8`, `d9`, `d10`, `idoperador`) VALUES
(14, 'ca8f0c8a-5a88-4539-9c9b-016fbeee4632.pdf/1.pdf', '6c52e465-acdc-4233-9413-d71d72f7de81.pdf/1.pdf', '6df5b50b-3f9b-4ccd-9bc9-1187c53b3b86.pdf/1.pdf', 'cd9dd1e1-ad25-4073-2808-553354ade4ab.pdf/1.pdf', '29e1174d-1fd0-4175-870e-8025c024d2c5.pdf/1.pdf', '3ce597e4-bd85-4333-a750-db0aa9797095.pdf/1.pdf', '43f2cc99-a678-41c8-a448-2393358cf524.pdf/1.pdf', '6b1d88ee-fd68-4235-104f-c42a4e9dc1da.pdf/1.pdf', 'd5ca2030-ae09-426c-35a4-6b55132dcf38.pdf/MODULO-EQUIPO-FLOTILLA.pdf', NULL, 1),
(15, 'affd564e-8493-45a7-0628-998b7dd8cec8.pdf/1.pdf', '700fb1be-7307-4452-a3b5-542f68230dea.pdf/1.pdf', '45fa63e7-2858-4023-13df-7f37e8e6c970.pdf/1.pdf', '7831e376-88d1-4c4d-0783-107818426cad.pdf/1.pdf', '948af764-80a6-4905-0ffe-4f49bb637760.pdf/1.pdf', '7a2f4b24-a990-4d03-0cb0-5ee7c0233bd9.pdf/1.pdf', '294e5abb-0e0b-4d75-2a1b-5628a811cae7.pdf/1.pdf', NULL, NULL, NULL, 17),
(16, '7baa4bd5-1076-4608-012c-363fe469e84b.pdf/MODULO-EQUIPO-FLOTILLA.pdf', '7e923e88-3451-4b34-8fe0-f1debf3743b4.pdf/MODULO-EQUIPO-FLOTILLA.pdf', '81a4fd79-7e49-425a-b239-65e9f510d556.pdf/MODULO-EQUIPO-FLOTILLA.pdf', '5ef993e2-b52a-493d-8a08-c5cefe46d22b.pdf/MODULO-EQUIPO-FLOTILLA.pdf', '7204c55c-deae-477b-1041-e8b18cafeabb.pdf/MODULO-EQUIPO-FLOTILLA.pdf', NULL, NULL, NULL, NULL, NULL, 2);

-- --------------------------------------------------------

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
-- Volcado de datos para la tabla `documentos_equipo`
--

INSERT INTO `documentos_equipo` (`iddocumentse`, `d1`, `d2`, `d3`, `d4`, `d5`, `d6`, `d7`, `d8`, `d9`, `d10`, `idequipo`) VALUES
(1, '19490e5c-6708-4cdd-a19d-7032027112b8.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', '3d209f77-fec4-4f7e-1455-d616d54db4c9.pdf/EscÃ¡ner_20181101 (2) (1).pdf', 'a37a8403-c9f8-41db-8a63-9f363dccd8e9.pdf/EscÃ¡ner_20181101 (2).pdf', '130ca595-1c31-4f8e-2576-d0e472653d4f.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', 'b0604ce6-1ee6-4d6d-238e-69d5d9612d52.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', NULL, NULL, NULL, NULL, NULL, 4),
(2, '1e251977-e5e7-4881-8ddb-db7bf4f34adb.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', '5b06c2cb-be19-4674-9d72-4f57a861fdf7.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', 'a4c4a312-a70b-4a77-20d0-1e200733557b.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', '1e251977-e5e7-4881-8ddb-db7bf4f34adb.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', '5b06c2cb-be19-4674-9d72-4f57a861fdf7.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', 'a4c4a312-a70b-4a77-20d0-1e200733557b.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', '8bc224c4-7d38-4adf-987e-0b0bff252c27.pdf/Te-mando-este-PDF-para-que-sobrescribas-algunas-palabras-desde-el-login.pdf', 'abecba9a-5446-4bff-1d8a-3c19fc2c82fc.pdf/MODULO-EQUIPO-FLOTILLA.pdf', 'da531556-13e8-4393-2650-f1c35e296e14.pdf/EscÃ¡ner_20181101 (2).pdf', NULL, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo_flotilla`
--

CREATE TABLE `equipo_flotilla` (
  `idequipo` int(5) NOT NULL,
  `num_economico` varchar(20) DEFAULT NULL,
  `placas` varchar(10) DEFAULT NULL,
  `tipo` varchar(30) DEFAULT NULL,
  `marca` varchar(25) DEFAULT NULL,
  `niv` varchar(25) DEFAULT NULL,
  `motor` varchar(20) DEFAULT NULL,
  `modelo` varchar(6) DEFAULT NULL,
  `diferencial` varchar(20) DEFAULT NULL,
  `suspencion` varchar(20) DEFAULT NULL,
  `largo` varchar(10) DEFAULT NULL,
  `ancho` varchar(10) DEFAULT NULL,
  `alto` varchar(10) DEFAULT NULL,
  `eje` varchar(4) DEFAULT NULL,
  `estatus` varchar(20) DEFAULT NULL,
  `altastc` varchar(255) DEFAULT NULL,
  `bajastc` varchar(255) DEFAULT NULL,
  `numtc` varchar(10) DEFAULT NULL,
  `num_poliza` varchar(20) DEFAULT NULL,
  `vd` varchar(255) DEFAULT NULL,
  `vh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipo_flotilla`
--

INSERT INTO `equipo_flotilla` (`idequipo`, `num_economico`, `placas`, `tipo`, `marca`, `niv`, `motor`, `modelo`, `diferencial`, `suspencion`, `largo`, `ancho`, `alto`, `eje`, `estatus`, `altastc`, `bajastc`, `numtc`, `num_poliza`, `vd`, `vh`) VALUES
(3, 'PL-002', '72-4J-4S', 'Plataforma', 'Ford', '89', '849348932849234', '2000', '46,000.000 LBS', 'Neumatica', '3.10 M', '2.42 M', '3.10 M', '2', 'operando', '2019-01-06T06:00:00.000Z', NULL, '82938492', '902390129301920', '2019-12-25T06:00:00.000Z', '2019-12-18T06:00:00.000Z'),
(4, 'TC-003', '37-AG-4S', 'Tractor', 'Ford', '98', '283912839128391', '2000', '26,000.000 LBS', 'Mecanica', '3.10 M', '2.42 M', '3.10 M', '3', 'baja_definitiva', '2019-12-09T06:00:00.000Z', '2019-12-09T21:08:50.918Z', '90219301', '912039120390129', '2019-12-09T06:00:00.000Z', '2019-12-09T06:00:00.000Z'),
(5, 'TC-58', '859-AE-2', 'Tractor', 'Kenworth', '1234567899', 'wer455ttg', '2009', '46,000.00 Lbs', 'Neumatica', '3.00 M', '2.00 M', '2.00 M', '3', 'operando', '2009-07-14T05:00:00.000Z', '1970-01-01T00:00:00.000Z', '2234555', '2345678888', '2019-03-22T06:00:00.000Z', '2018-03-22T06:00:00.000Z'),
(6, 'TC-07', '30-7A-K5', 'Tractor', '675', '8798900', '3424234234', '2005', '47.000.000 LBS', 'Neumatica', '4.00 M', '2.00 M', '2.00 M', '7', 'operando', '2020-03-17T06:00:00.000Z', '', '76799898', '65678769688', '2000-01-12T06:00:00.000Z', '2018-07-25T05:00:00.000Z'),
(7, 'TC-18', '34-6E-S4', 'Tractor', '678698576', '877', '8678587', '2000', '45.000.000 LBS', 'Mecanica', '3.00 M', '2.00 M', '2.00 M', '8', 'operando', '2016-06-22T05:00:00.000Z', '', '67567578', '657675778786998', '2020-03-27T06:00:00.000Z', '2022-06-22T05:00:00.000Z'),
(8, 'TC-32', '61-9D-X5', 'Tractor', 'ford', '88', '656757657657575', '2000', '34.000.000 LBS', 'Mecanica', '3.12 M', '2.47 M', '3.11 M', '67', 'accidentado', '2020-03-11T06:00:00.000Z', '', '89676876', '564676576', '2020-03-11T06:00:00.000Z', '2020-03-11T06:00:00.000Z'),
(9, 'TC-36', '17AF1T', 'Tractor', 'Nissan', '34', '767809890800000', '1999', '56.000.000 LBS', 'Neumatica', '3.00 M', '2.00 M', '2.00 M', '89', 'robado', '2016-01-01T06:00:00.000Z', '', '87658896', '657456354365568', '2016-01-01T06:00:00.000Z', '2020-03-04T06:00:00.000Z'),
(10, 'TC-53', '37AG4S', 'Tractor', 'ford', '67', '786798798796875', '2005', '78.000.000 LBS', 'Mecanica', '4.00 M', '3.00 M', '3.00 M', '7', 'vendido', '2020-03-10T06:00:00.000Z', '2020-03-19T05:50:09.881Z', '76897896', '658709809809896', '2020-03-10T06:00:00.000Z', '2020-03-13T06:00:00.000Z'),
(11, 'CS-3800', '996-WC-3', 'Caja seca', 'CORPUS CHRISTI', '60', '786875467345634', '2004', '34.000.000 LBS', 'Mecanica', '3.00 M', '2.00 M', '2.00 M', '4', 'operando', '2020-03-20T06:00:00.000Z', '', '76785764', '875764653547658', '2020-03-23T06:00:00.000Z', '2020-03-25T06:00:00.000Z'),
(12, 'CS-4000', '461-WC-3', 'Caja seca', 'CAYTRASA', '7', '675674563424', '1996', '23.000.000 LBS', 'Mecanica', '3.00 M', '3.00 M', '3.00 M', '2', 'baja_definitiva', '2020-03-02T06:00:00.000Z', '2020-03-19T05:59:20.985Z', '57576465', '6R746534576869', '2020-03-02T06:00:00.000Z', '2020-03-11T06:00:00.000Z'),
(13, 'CS-4002', '278-WC-4', 'Caja seca', 'ZAPATA', '47', '788970998009890', '1999', '40.000.000 LBS', 'Mecanica', '3.00 M', '2.00 M', '2.00 M', '67', 'vendido', '2020-03-17T06:00:00.000Z', '2020-03-19T06:19:49.486Z', '65646758', '675546535487796', '2020-03-23T06:00:00.000Z', '2020-03-30T06:00:00.000Z'),
(15, 'YSN-01', '312-WL-7', 'Plataforma encotinada', 'ALTAMIRANO', '6', '34252453563456', '2003', '10.000.000 LBS', 'Mecanica', '4.00 M', '3.00 M', '3.00 M', '56', 'baja_definitiva', '2020-03-02T06:00:00.000Z', '2020-03-19T06:25:47.836Z', '67567465', '567465879797986', '2020-03-16T06:00:00.000Z', '2020-03-17T06:00:00.000Z'),
(16, 'YSN-02', '70-UD-1F', 'Plataforma', 'ALTAMIRANO', '56', '53465236546', '2007', '10.000.000 LBS', 'Mecanica', '5.00 M', '4.00 M', '4.00 M', '5', 'robado', '2019-01-01T06:00:00.000Z', '', '56456757', '764654365476', '2019-02-12T06:00:00.000Z', '2019-02-13T06:00:00.000Z'),
(17, 'PE-3801', '30-UB-9R', 'Plataforma', 'CAYTRASA', '23', '67465365', '2002', '20.000.000 LBS', 'Neumatica', '3.00 M', '2.00 M', '2.00 M', '7', 'operando', '2020-03-25T06:00:00.000Z', '1970-01-01T00:00:00.000Z', '67567465', '5465467547', '2020-03-09T06:00:00.000Z', '2020-03-10T06:00:00.000Z');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fisico_mecanico`
--

CREATE TABLE `fisico_mecanico` (
  `idfisicomecanico` int(11) NOT NULL,
  `periodo` varchar(100) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `folio` varchar(50) NOT NULL,
  `unidadveifi` varchar(50) NOT NULL,
  `idequipo` varchar(3) NOT NULL,
  `equipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fisico_mecanico`
--

INSERT INTO `fisico_mecanico` (`idfisicomecanico`, `periodo`, `fecha`, `folio`, `unidadveifi`, `idequipo`, `equipo`) VALUES
(6, 'Mayo-Agosto', '2020-07-10T05:00:00.000Z', 'A-8429348', '349839489238492', '10', '37AG4S'),
(8, 'Julio-Octubre', '2020-08-13T05:00:00.000Z', 'A-4893248', '342893489238492', '16', '70-UD-1F'),
(9, 'Julio-Octubre', '2021-08-06T05:00:00.000Z', 'A-2831293', '283921839128391', '16', '70-UD-1F'),
(10, 'Mayo-Agosto', '2002-09-05T05:00:00.000Z', 'A-3424235', 'erwetrwetr32', '4', '37-AG-4S'),
(11, 'Mayo-Agosto', '2012-04-23T05:00:00.000Z', 'A-7890087', '345345345345', '3', '72-4J-4S'),
(12, 'Enero-Abril', '2016-07-03T05:00:00.000Z', 'A-3423423', '23423545345', '7', '34-6E-S4'),
(13, 'Enero-Abril', '2000-02-05T06:00:00.000Z', 'A-3432432', '34242342', '7', '34-6E-S4'),
(14, 'Julio-Octubre', '2020-10-20T05:00:00.000Z', 'A-9876543', 'SCT-001', '9', '17AF1T'),
(15, 'Septiembre-Diciembre', '2020-09-01T05:00:00.000Z', 'A-8976543', 'SCT-001', '5', '859-AE-2');

-- --------------------------------------------------------

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
-- Volcado de datos para la tabla `operador`
--

INSERT INTO `operador` (`idoperador`, `nombre`, `fecha_nacimiento`, `edad`, `curp`, `tipo_sangre`, `estatus`, `num_imss`, `fecha_alta`, `fecha_baje`, `num_licencia`, `vig_desde`, `vig_hasta`, `examen_medico`, `exa_desde`, `exa_hasta`, `domicilio`, `cp`, `ciudad`) VALUES
(1, 'Constantino Trujillo Francisco', '09/10/1989', 30, 'MEMM891009HVZRRG06', '0+', 'Baja', '01748435204', '2020-11-21T00:00:00.000Z', '2019-12-03T15:33:08.250Z', '4892384923  B', '2008-12-12T00:00:00.000Z', '2013-12-12T00:00:00.000Z', '93023', '2017-07-04T23:00:00.000Z', '2019-07-05T05:00:00.000Z', 'Centro Orizaba', '94410', 'Orizaba, VER'),
(2, 'Gutierrez Paz José', '1989-10-09', 30, 'MEMM891009HVZRRG06', '0+', 'Baja', '9320493', '2018-05-23', '', '9042321', '2020-12-02', '2019-12-02', '93023', '2020-01-01', '2019-03-01', 'prueba 1 desde postman', '94410', 'Orizaba'),
(3, 'León Ramos Carlos', '1989-09-10', 30, 'MEMM891009HVZRRG06', '0+', 'Baja', '9320493', '2018-05-23', '2019-11-20', 'VER0118496 BE', '2016-10-07', '2018-10-06', '93023', '2021-01-02', '2018-01-01', 'prueba 1 desde postman', '94410', 'Orizaba'),
(4, 'Jiménez Martínez Alberto Marcos', '1989-10-09', 30, '384928394239434892', '0+', 'Baja', '36336363636', '2015-01-01', '2019-11-18', '48923849239EB', '2015-11-18', '2020-11-17', '348923', '2021-11-12', '2020-11-11', 'Orizab', '94410', 'Orizab, Veracruz'),
(5, 'Hernández Hernández Juan Manuel', '1981-10-09', 38, 'MEMM891009HVZRRG54', '0+', 'Baja', '01748435204', '2010-08-14', '2019-11-18', 'VER0400981  B', '2015-11-09', '2020-11-08', '387164', '2021-08-14', '2018-08-13', 'Centro Orizaba', '94732', 'Orizaba, Ver.'),
(6, 'Amaro Fabian Oscar', '1995-03-08', 23, 'GUPJ541208HVZTZS09', 'O-', 'Alta', '01748435204', '2016-11-21', '', 'OAX0107579 BE', '2014-12-21', '2016-12-20', '764744', '2021-10-09', '2012-10-08', 'Centro, Orizaba', '54321', 'ORIZABA, VERACRUZ'),
(7, 'Mendoza Cueto Victor J.', '1980-08-05', 39, 'GUPJ541208HVZTZS89', 'O+', 'Baja', '01748435255', '2019-11-21', '2019-11-20', 'VER0408015  B', '2015-11-21', '2020-11-20', '387164', '2021-11-21', '2020-11-20', '2DA -  De Cuauhtemoc', '94723', 'Orizaba, Veracruz.'),
(8, 'Cides Oscar', '1989-10-09', 30, 'MEMM891009HVZRRG06', '0+', 'Alta', '9320493', '2018-05-23', '', '9042321', '2017-12-02', '2019-12-02', '93023', '2019-01-01', '2019-03-01', 'prueba 1 desde postman update', '94410', 'Rafael Delgado'),
(9, 'Pérez Serrano Manuel', '1984-03-08', 34, 'GUPJ541208HVZTZS29', 'O+', 'Baja', '01748435244', '2015-11-21', '2019-11-20', 'VER0400415 BE', '2010-06-04', '2012-06-03', '387164', '2010-06-04', '2012-06-03', 'Centro Orizaba', '94732', 'Orizaba, Ver.'),
(10, 'Flores Trejo Abel', '08/03/1990', 29, 'GUPJ541208HVZTZS66', 'O-', 'Baja', '01748435244', '2015-11-21', '2019-11-20T00:00:00.000Z', 'VER0407008 BB', '2017-12-22', '2022-12-22', '387164', '2014-11-22', '2016-11-22', 'Centro Orizaba', '94732', 'Orizaba, Ver.'),
(11, 'Islas Camilo Vicente', '1965-03-09', 53, 'GUPJ541208HVZTZS88', 'O-', 'Alta', '01748435211', '2019-09-14', '', 'VER0406961  B', '2018-09-14', '2023-09-13', '93023', '2018-06-07', '2020-06-06', 'Centro', '94410', 'Orizaba, Ver.'),
(12, 'Cervantes Arturo', '1977-10-09', 42, 'GUPJ541208HVZTZS67', 'O+', 'Baja', '01748435223', '2000-09-23T00:00:00.000Z', '2019-11-20T00:00:00.000Z', 'VER0400140 B', '2013-09-26T00:00:00.000Z', '2018-09-26T00:00:00.000Z', '348923', '2004-09-15T00:00:00.000Z', '2006-09-15T00:00:00.000Z', 'Centro', '94410', 'Orizaba, Veracruz.'),
(13, 'Ixmatlahua Federico', '1978-09-10', 41, 'MEMM891009HVZRRG08', 'O-', 'Baja', '01748435233', '2017-10-14', '2019-11-20', 'VER0413457  B', '2013-10-13', '2018-10-12', '93023', '2014-12-13', '2016-12-12', 'CENTRO', '94410', 'Orizaba, Ver.'),
(14, 'Díaz Zárate Daniel Mario', '1970-01-01', 61, 'DIZD580721HVZRODJ4', 'O+', 'Alta', '28256445231', '2019-11-20', '', 'VER0400115  E', '2019-11-04', '2021-11-04', '23901', '2019-11-01', '2021-11-01', 'Norte 14 No. 938. Col. Zapata. Orizaba, Ver.', '94320', 'Orizaba, VER'),
(15, 'Díaz Trujillo David', '1983-07-09', 36, 'DITD830907HVZZRR01', 'O+', 'Alta', '01748435244', '2019-11-15', '', 'VER0105148  E', '2019-01-01', '2021-01-01', '745624', '2019-02-28', '2021-02-28', 'Conocido', '78459', 'Orizab, Veracruz'),
(16, 'Ixmatlahua Federico', '1978-09-10', 41, 'MEMM891009HVZRRG08', 'O-', 'Alta', '01748435233', '2017-10-14', '', 'VER0413457  B', '2013-10-13', '2018-10-12', '93023', '2014-12-13', '2016-12-12', 'CENTRO', '94410', 'Orizaba, Ver.'),
(17, 'Reyes Sanches Diego', '09/10/1991', 28, 'ioriwoerioewiroeiw', 'O+', 'Alta', '01748435206', '2016-11-19T00:00:00.000Z', '1970-01-01T00:00:00.000Z', '353823940 E', '2015-01-14T00:00:00.000Z', '2017-01-14T00:00:00.000Z', '943049', '2018-01-14T00:00:00.000Z', '2020-01-14T00:00:00.000Z', 'Calle Prueba S/N, Col. Prueba', '38498', 'Orizaba, Veracruz'),
(18, 'Merino Martinez Miguel Angel', '09/10/1989', 30, 'SDKASJKDJ940234902', 'O+', 'Alta', '34902349023', '2019-12-03T06:00:00.000Z', NULL, '482394892384B', '2019-12-13T06:00:00.000Z', '2024-12-14T00:00:00.000Z', '349023', '2019-12-15T06:00:00.000Z', '2021-12-16T00:00:00.000Z', 'Las pruebas a ver que pasa', '34902', 'Orizaba, Veracruz');

-- --------------------------------------------------------

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
(27, 'Postes metalicos conico octagonal'),
(28, 'Hola'),
(29, 'Prueba1'),
(30, 'Prueba2'),
(31, 'Prueba3'),
(32, 'arboles de navidad'),
(33, 'diego1'),
(34, 'diego2'),
(35, 'diego3'),
(36, 'diego4'),
(37, 'diego5'),
(38, 'diego6'),
(39, 'diego7'),
(40, 'diego8'),
(41, 'diego9'),
(42, 'huawei1'),
(43, 'huawei2'),
(44, 'huawei3'),
(45, 'huawei4'),
(46, 'huawei5'),
(47, 'nuevo nuevo intento'),
(48, 'nuevo nuevo intento 2'),
(49, 'renuevo intento'),
(50, 'jose jose'),
(51, 'renuevo intento'),
(52, 'renuevo intento22'),
(53, 'huawei6'),
(54, 'huawei7'),
(55, 'huawei8'),
(56, 'huawei9'),
(57, 'kika1'),
(58, 'Juliancito mejor ni maiz'),
(59, 'Prueba con $scope'),
(60, '$scope.$apply'),
(61, 'Vale verga'),
(62, 'Vale verga la vida'),
(63, 'Vale verga la vida 1.1'),
(64, 'vale verga la vida 1.2.1'),
(65, 'vale verga la vida 1.2.1.2'),
(66, 'kika2'),
(67, 'kika3'),
(68, 'kika4'),
(69, 'kika5'),
(70, 'kika6'),
(71, 'kika7'),
(72, 'diego reyes'),
(73, 'diego reyes 1.2.1.2.1.1.1.1.9'),
(74, 'kika8'),
(75, 'kika9'),
(76, 'Huaweiy9 prime'),
(77, 'trenes'),
(78, 'bolsas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recursos`
--

CREATE TABLE `recursos` (
  `idrecurso` int(5) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `recurso` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `recursos`
--

INSERT INTO `recursos` (`idrecurso`, `fecha`, `recurso`, `id`) VALUES
(8, '2002-09-05T05:00:00.000Z', 'a39db42a-7b60-4a05-bbff-8f63ef2a617a.pdf/CV_MiguelAngelMerinoMartinez.pdf', '10');

-- --------------------------------------------------------

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
(12, 'Elias', 'admin', 'YWRtaW5QQ1YwMTk4MjAxOSQ=', 'admin', 'activo', 'todos'),
(13, 'Diego Reyes Sánchez', 'DiegoRS', 'MTIzNDU2UENWMDE5ODIwMTkk', 'invitado', 'activo', 'alert,operador,cliente,reporte,equipo,bitacora,'),
(14, 'Margarita Sánchez Casimiro', 'MagoSC', 'MTIzNDU2UENWMDE5ODIwMTkk', 'invitado', 'deshabilitado', 'alert,operador,equipo,cliente,'),
(15, 'Lucky Reyes', 'lucky', 'MTIzNDU2UENWMDE5ODIwMTkk', 'invitado', 'activo', 'alert,operador,cliente,'),
(16, 'David Reyes Sánchez', 'DavidRS', 'MTIzNDU2UENWMDE5ODIwMTkk', 'invitado', 'deshabilitado', 'alert,operador,'),
(17, 'Concepción Nava', 'nava', 'bmF2YTAxUENWMDE5ODIwMTkk', 'invitado', 'deshabilitado', 'alert,operador,equipo,cliente,'),
(18, 'Jose Angel Gonzales Mora', 'josegonm', 'MTIzNDU2Nzg5UENWMDE5ODIwMTkk', 'invitado', 'activo', 'cliente,reporte,'),
(19, 'Miguel Angel Merino', 'miguel', 'MTIzNDU2NzhQQ1YwMTk4MjAxOSQ=', 'invitado', 'activo', 'equipo,');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vambiental`
--

CREATE TABLE `vambiental` (
  `idvambiental` int(11) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `folio` varchar(10) NOT NULL,
  `periodo` varchar(25) NOT NULL,
  `unidadveifi` varchar(20) NOT NULL,
  `idequipo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vambiental`
--

INSERT INTO `vambiental` (`idvambiental`, `fecha`, `folio`, `periodo`, `unidadveifi`, `idequipo`) VALUES
(6, '2020-03-16T06:00:00.000Z', 'A-4829348', '1er periodo', '489348923849283', '4'),
(7, '2020-10-15T05:00:00.000Z', 'A-4982349', '2er periodo', '493849839284938', '4'),
(8, '2020-03-25T06:00:00.000Z', 'A-4394023', '1er periodo', '934092304923049', '7'),
(9, '2020-07-09T05:00:00.000Z', 'A-3492384', '2do periodo', '434023940293094', '7'),
(10, '2018-04-04T05:00:00.000Z', 'a-9898989', '1er periodo', '778788787878787', '7'),
(11, '2018-12-06T06:00:00.000Z', 'A54324545', '2do periodo', '787878787878787', '7'),
(12, '2021-01-07T06:00:00.000Z', 'A-3094032', '1er periodo', '342309402394032', '7'),
(13, '2021-10-15T05:00:00.000Z', 'A34932049', '2do periodo', '039402394023940', '7'),
(14, '2021-04-15T05:00:00.000Z', 'A-1029302', '1er periodo', '904923402930492', '4'),
(15, '2020-03-21T06:00:00.000Z', 'A-3429304', '1er periodo', '349320492304923', '6'),
(16, '2020-07-01T05:00:00.000Z', 'A-9312039', '2do periodo', '923012930129301', '6'),
(17, '2021-05-06T05:00:00.000Z', 'A-9203912', '1er periodo', '203920391203901', '6'),
(18, '2021-09-16T05:00:00.000Z', 'A-9230129', '2do periodo', '239120391230192', '6');

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
-- Indices de la tabla `fisico_mecanico`
--
ALTER TABLE `fisico_mecanico`
  ADD PRIMARY KEY (`idfisicomecanico`);

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
-- Indices de la tabla `recursos`
--
ALTER TABLE `recursos`
  ADD PRIMARY KEY (`idrecurso`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`);

--
-- Indices de la tabla `vambiental`
--
ALTER TABLE `vambiental`
  ADD PRIMARY KEY (`idvambiental`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idclientes` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `iddocuments` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `documentos_equipo`
--
ALTER TABLE `documentos_equipo`
  MODIFY `iddocumentse` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `equipo_flotilla`
--
ALTER TABLE `equipo_flotilla`
  MODIFY `idequipo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `fisico_mecanico`
--
ALTER TABLE `fisico_mecanico`
  MODIFY `idfisicomecanico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `operador`
--
ALTER TABLE `operador`
  MODIFY `idoperador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `recursos`
--
ALTER TABLE `recursos`
  MODIFY `idrecurso` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `vambiental`
--
ALTER TABLE `vambiental`
  MODIFY `idvambiental` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
