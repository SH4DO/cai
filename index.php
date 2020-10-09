<!DOCTYPE html>
<html ng-app="SIDF" lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   	<title>SISTEMA DE INFORMACIÓN Y ADMINISTRACIÓN DE FLOTILLAS</title>
	<link rel="stylesheet" href="frontend/assets/css/bootstrap.min.css">
	<link rel="icon" type="image/png" href="frontend/assets/img/pcv.jpg" />
	<link rel="stylesheet" href="frontend/assets/css/style.css">
	<link rel="stylesheet" href="frontend/assets/css/dropzone.css">
	<link rel="stylesheet" href="frontend/assets/fontawesome/css/all.css">
	<script src="frontend/assets/js/jquery/jquery-3.2.1.slim.min.js"></script>
	<script src="frontend/assets/js/popper/popper.min.js"></script>
	<script src="frontend/assets/js/bootstrap/bootstrap.min.js"></script>
	<script src="frontend/assets/js/angular/angular.min.js"></script>
	<script src="frontend/assets/js/pdfMake/pdfmake.min.js"></script>
	<script src="frontend/assets/js/pdfMake/html2canvas.min.js"></script>
	<script src="frontend/assets/js/angular/angular-route.js"></script>
	<script src="frontend/app-model/appconfig/app.js"></script>
	<script src="frontend/app-model/controller/controller.js"></script>
	<script src="frontend/app-model/service/service.js"></script>
	<script src="frontend/app-model/routers/app-routers.js"></script>
	<script src="frontend/app-model/auth/auth.js"></script>
	<script src="frontend/app-model/crud/crud.js"></script>
	<script src="frontend/app-model/pipe/pipe.js"></script>
	<script src="frontend/assets/js/dropzone/dropzone.js"></script>
	<script src="frontend/assets/js/sweetalert/sweetalert2@8"></script>
	<script src="frontend/assets/js/pdfMake/html2pdf.bundle.min.js"></script>
</head>

<body>
    <div ng-view=""></div>
</body>

</html>
