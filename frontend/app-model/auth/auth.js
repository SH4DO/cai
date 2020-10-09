app.factory('Login', ['auth', '$location', 'saveUser', function(auth, $location, saveUser) {
  return {
    login: function(data) {
      return auth.login(data).then(function succes(res) {
        var lentg = Object.keys(res).length;
        if (lentg > 0) {
          saveUser.saveLocalStorage(res);
          $location.url('/menu');
          return true;
        } else {
          return false;
        }
      });
    }
  } // termina el return
}]);
