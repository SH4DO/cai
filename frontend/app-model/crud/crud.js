var ENPOINT = "backend/api/api.php?api=";
var LOCALRESOURCE = "frontend/app-model/resorces/";

app.factory('crudService', ['$http', '$q', function($http, $q) {
  return {
    // metodo post que envia datos a nuestro backend ...
    crudPost: function(url, body) {
      return $http({
        method: 'POST',
        url: ENPOINT + url,
        data: body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function succes(res) {
        return res.data;
      }, function(errResponse) {
        $q.reject(errResponse);
      });
    }, // metodo get para obtener datos de la base.
    crudGet: function(url) {
      return $http({
        method: 'GET',
        url: ENPOINT + url
      }).then(function (res) {
          return res.data
        },
        function errorCallback(response) {
          $q.reject(response)
        });
    }, // termina el metodo get
    crudUpload: function(url, body){
      return $http({
        method: 'POST',
        url: ENPOINT + url,
        data: body,
        headers: {
          'Content-Type': undefined
        }
      }).then(function succes(res) {
        return res.data;
      }, function(errResponse) {
        $q.reject(errResponse);
      });
    }
  } // termina el return ....
}]);


app.factory('localResorce', ['$http', '$q', function($http, $q) {
  return {
    crudGet: function(url) {
      return $http({
        method: 'GET',
        url: LOCALRESOURCE+url
      }).then(function (res) {
          return res.data
        },
        function errorCallback(response) {
          $q.reject(response)
        });
    } // termina el metodo get
  } // termina el return ....
}]);
