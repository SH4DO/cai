var ruta = "frontend/app/";

var app = angular.module('SIDF', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: ruta + 'theme/home/home.html'
    }).when('/admin', {
        templateUrl: ruta + 'theme/login/login-admin.html',
        controller: 'admin'
    }).when('/menu', {
        templateUrl: ruta + 'theme/contenedor/contenedor.html',
        controller: 'container-dinamyc'
    }).when('/operario', {
        templateUrl: ruta + 'theme/contenedor/contenedor.html',
        controller: 'container-dinamyc'
    });

}]);
