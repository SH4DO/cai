// controlador del login que conecta al archivo auth.js
app.controller("admin", [
  "$scope",
  "Login",
  function ($scope, Login) {
    $scope.form = {};
    $scope.viewMessage = true;
    $scope.class = "form-control";
    $scope.message = "El usuario y/o password son incorrectos";
    $scope.login = function () {
      var leng = Object.keys($scope.form).length;
      if (leng > 0) {
        Login.login($scope.form).then(function (res) {
          $scope.viewMessage = res;
        });
      } else {
        $scope.class = "form-control is-invalid";
      }
    };
  },
]);
// terminal el controller

// controller reloj ....
app.controller("reloj", [
  "$scope",
  "$timeout",
  function ($scope, $timeout) {
    $scope.tickInterval = 1000;
    var tick = function () {
      $scope.clock = Date.now();
      $timeout(tick, $scope.tickInterval);
    };
    $timeout(tick, $scope.tickInterval);
  },
]);
// termina controller reloj....

// controlador de alertas ....
app.controller("alert", ["alerts", "$scope", function (alerts, $scope) {
    var format;
    var actual;
    var date = new Date();
    if (date.getDay() < 10) {
      var day = "0" + date.getDay();
      var moth = "0" + (date.getMonth() + 1);
      actual = date.getFullYear() + "-" + moth + "-" + date.getDate();
    }else {
      actual = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    date.setDate(date.getDate() + 32);
    if (date.getDay() < 10) {
      var day = "0" + date.getDay();
      var moth = "0" + (date.getMonth() + 1);
      format = date.getFullYear() + "-" + moth + "-" + date.getDate();
    } else {
      format = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    alerts.alert(format, actual).then(function (res) {
      console.log(res);
      $scope.alerts = res.alertas;
    });
  },
]);
// terminal el controller

// controlador general de contenido para admin, invitado, operador ...
app.controller("container-dinamyc", [
  "$scope",
  "role",
  function ($scope, role) {
    var users = JSON.parse(localStorage.getItem("user"));
    $scope.username = role.security(users);
    $scope.menu_admin = role.menu_role(users).menu;
    $scope.menu_lateral = role.menu_role().opciones;
    $scope.logauth = function () {
      role.logauth();
    };
    $scope.configuracion = function () {
      $scope.menu_lateral = role.configuration().content;
      console.log($scope.menu_lateral);
    };
    $scope.home = function () {
      $scope.menu_admin = role.menu_role(users).menu;
      $scope.menu_lateral = role.menu_role().opciones;
      console.log($scope.menu_lateral);
    };
  },
]);
// terminal el controller

// menejo de opcione del menu lateral de operador, admin, invitado
app.controller("Menulateral", [
  "$scope",
  "optionMenu",
  function ($scope, optionMenu) {
    optionMenu.viewOptionMenu().then(function (res) {
      $scope.menuLateral = res;
      var user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) {
        if (user[0].opciones === "todos") {
          $scope.content = "frontend/app/components/admin/alerts/alerts.html";
        }
      }
    });
    $scope.viewTemplate = function (option) {
      optionMenu.activeOption(option);
      $scope.content = optionMenu.viewContent(option);
    };
  },
]);
// terminal el controller

// configuracion de modulo equipo
app.controller("menuEquipo", [
  "$scope",
  "optionMenu",
  "changeMenu",
  function ($scope, optionMenu, changeMenu) {
    $scope.view_equipo = optionMenu.viewContent("equipoflotilla");
    $scope.showPDF = true;
    changeMenu.tabs("equipoflotilla");
    $scope.ruta = function (option) {
      $scope.view_equipo = optionMenu.viewContent(option);
      changeMenu.tabs(option);
    };
  },
]);

//configuracion del modulo  trafico
app.controller("menuTrafico", [
  "$scope",
  "optionMenu",
  "changeMenu",
  function ($scope, optionMenu, changeMenu) {
    $scope.view_equipo = optionMenu.viewContent("origenesdestinos");
    $scope.showPDF = true;
    changeMenu.tabs("origenesdestinos");
    $scope.ruta = function (option) {
      $scope.view_equipo = optionMenu.viewContent(option);
      changeMenu.tabs(option);
    };
  },
]);


// controlador router de la seccion de configuracion ....
app.controller("configuracion", [
  "$scope",
  "configUser",
  "routerConfig",
  function ($scope, configUser, routerConfig) {
    configUser.optionsMenu().then(function (res) {
      $scope.configMenu = res;
    });
    $scope.viewConfig = function (option) {
      routerConfig.viewOption(option);
      $scope.viewTemplate = routerConfig.viewOptionConfig(option);
    };
  },
]);
// terminal el controller

// menejo del crud de configuracion...
app.controller("crudConfig", [
  "$scope",
  "crudUser",
  function ($scope, crudUser) {
    // primer formulario de crud configuraciones...
    var users = JSON.parse(localStorage.getItem("user"));
    $scope.updateUserdata = {};
    $scope.type = "password";
    $scope.ban = true;

    // recibir los datos  del usuario mediante un id ....
    crudUser.readUserId(users[0].iduser).then(function (res) {
      $scope.updateUserdata.iduser = res[0].iduser;
      $scope.updateUserdata.name = res[0].name;
      $scope.updateUserdata.password = res[0].password;
      $scope.updateUserdata.user = res[0].user;
      $scope.updateUserdata.role = res[0].role;
    });
    // visualizar password
    $scope.viewPassword = function (band) {
      if (band === true) {
        $scope.type = "text";
        $scope.ban = false;
      } else {
        $scope.type = "password";
        $scope.ban = true;
      }
    }; // ......

    // acutalizar datos del usuario logeado ....
    $scope.actualizar = function () {
      crudUser.updateUser($scope.updateUserdata).then(function (res) {
        if (res.action === "success") {
          Swal.fire({
            position: "center",
            type: "success",
            title: "Datos actualizado",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    }; /// .......

    // termina la primer seccion.....

    // segunda seccion agregar invitado .....
    $scope.creatUserdata = {};
    var acumulador = "";
    $scope.disabled = true;

    // opciones del menu ....
    crudUser.optionsMenu().then(function (res) {
      $scope.options = res;
    }); // ....

    // registro del usuario invitado ....
    $scope.register = function () {
      $scope.creatUserdata.status = "activo";
      var leng = Object.keys($scope.creatUserdata).length;
      if (leng > 0) {
        crudUser.createUser($scope.creatUserdata).then(function (res) {
          if (res.action === "success") {
            $scope.creatUserdata = {};
            Swal.fire({
              position: "center",
              type: "success",
              title: "Datos actualizado",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
      }
    }; // .....

    // manejo de privilegios del menu lateral
    $scope.opciones = function () {
      if ($scope.creatUserdata.role === "admin") {
        $scope.disabled = true;
        $scope.creatUserdata.opciones = "todos";
      } else {
        $scope.disabled = false;
        $scope.creatUserdata.opciones = "";
      }
    }; // ....

    // agregar al input de opciones.....
    var array = [];
    var i = 0;
    // metodo con el cual no se repetiran las opciones del menu lateral ...
    $scope.agregaLista = function () {
      if ($scope.creatUserdata.lista !== undefined) {
        array.push($scope.creatUserdata.lista);
        var newarray = [...new Set(array)];
        if (newarray.length === i) {
          i = newarray.length;
        } else {
          acumulador = acumulador + newarray[i] + ",";
          $scope.creatUserdata.opciones = acumulador;
          i++;
        }
      }
    }; //.....

    // termina agregar invitado .....

    // tercera seccion ....
    // lista de los usuarios registrados .....
    crudUser.readUsers().then(function (res) {
      $scope.listuser = res;
    });
    // status boton activar, desactivar
    $scope.updateStatus = function (status, id) {
      if (status === "activo") {
        $scope.updatestatus = {
          status: "deshabilitado",
          iduser: id,
        };
        crudUser.statusChange($scope.updatestatus).then(function (res) {
          if (res.action === "success") {
            crudUser.readUsers().then(function (res) {
              $scope.listuser = res;
            });
          } else {
            console.log(res);
          }
        });
      } else {
        $scope.updatestatus = {
          status: "activo",
          iduser: id,
        };
        crudUser.statusChange($scope.updatestatus).then(function (res) {
          if (res.action === "success") {
            crudUser.readUsers().then(function (res) {
              $scope.listuser = res;
            });
          }
        });
      }
    }; // ......

    $scope.hola = {};
    // arrayn que se llena si no se repiden los datos
    var arrayn = [];
    // update usuario .....
    $scope.llenadoForm = function (data) {
      arrayn = [];
      $scope.hola.iduser = data.iduser;
      $scope.hola.name = data.name;
      $scope.hola.password = data.password;
      $scope.hola.user = data.user;
      $scope.hola.role = data.role;
      $scope.hola.opciones = data.opciones;
      if ($scope.hola.role === "admin") {
        $scope.disabled = true;
        $scope.hola.opciones = "todos";
      } else {
        $scope.disabled = false;
      }
      var prueba = $scope.hola.opciones.split(",");
      for (var i = 0; i < prueba.length - 1; i++) {
        arrayn.push(prueba[i]);
      }
    };

    // editar las opciones del menu lateral para usuario invitado ....
    var cont = 0;
    $scope.agregarEdit = function () {
      if ($scope.hola.lista !== undefined) {
        arrayn.push($scope.hola.lista);
        var newarray1 = [...new Set(arrayn)];
        if (newarray1.length > cont) {
          cont = 0;
          acumulador = "";
          for (var j = 0; j < newarray1.length; j++) {
            acumulador = acumulador + newarray1[j] + ",";
            $scope.hola.opciones = acumulador;
            cont++;
          }
        }
      }
    }; // ......

    // actualizar los datos del formulario ......
    $scope.updateUserDataEdit = function () {
      crudUser.updateOption($scope.hola).then(function (res) {
        if (res.action === "success") {
          Swal.fire({
            position: "center",
            type: "success",
            title: "Datos actualizado",
            showConfirmButton: false,
            timer: 1000,
          });
          crudUser.readUsers().then(function (res) {
            $scope.listuser = res;
          });
        }
      });
    }; //.......

    // termina tercera seccion ...
  },
]);
// terminal el controller

//crud de clientes
app.controller("crudClientes", [
  "$scope",
  "client",
  "products",
  function ($scope, client, products) {
    $scope.listCliente;
    $scope.cliente = {};
    $scope.search = "";
    $scope.showMessage = true;
    $scope.listproduct = [];
    $scope.showDisable = true;
    $scope.showCreateCliente = false;
    $scope.showSaveCliente = true;
    $scope.showEditCliente = true;
    $scope.editBan = false;
    $scope.mercancia = {};
    $scope.express = "\\d+";


    // agregar clave de mercancia...
    $scope.clave = function () {
      if ($scope.cliente.mercancia !== "") {
        $scope.cliente.clave_m = $scope.cliente.mercancia;
      }
    }; // ....

    // llenar lista de opciones....
    var listClient = function () {
      products.readProduct().then(function succes(res) {
        $scope.listproduct = res;
      });
    }; //....

    // boton de guardar, crear, modificar y refrescar ....
    $scope.buttonOption = function (option) {
      switch (option) {
        // buton de guardar .....
        case 1:
          {
            $scope.showDisable = false;
            $scope.showCreateCliente = true;
            $scope.showSaveCliente = false;
            //$scope.cliente = {};
            $scope.band = false;
            listClient();
          }
          break;
        // boton de guardar y actualizar .....
        case 2:
          {
            listClient();
            $scope.showCreateCliente = false;
            $scope.showEditCliente = true;
            $scope.showSaveCliente = true;
            $scope.showDisable = true;
            len = Object.keys($scope.cliente).length;
            if (len > 0) {
              if ($scope.band === true) {
                // actualizar cliente .....
                client.updateClient($scope.cliente).then(function succes(res) {
                  if (res.action === "success") {
                    $scope.ban = true;
                    Swal.fire({
                      position: "center",
                      type: "success",
                      title: "Datos actualizado",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    $scope.cliente = {};
                    $scope.reset();
                  } else {
                    console.log(res);
                  }
                });
              } else {
                // crear cliente .....
                client.createClient($scope.cliente).then(function succes(res) {
                  if (res.action === "success") {
                    $scope.ban = true;
                    Swal.fire({
                      position: "center",
                      type: "success",
                      title: "Datos exitosamente agregados",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    $scope.cliente = {};
                  } else {
                    console.log(res);
                  }
                });
              }
            } else {
              $scope.showDisable = false;
              $scope.cliente = {};
            }
          }
          break;
        case 3:
          {
            $scope.showSaveCliente = false;
            $scope.showEditCliente = true;
            $scope.showDisable = false;
            $scope.editBan = true;
          }
          break;
        case 4:
          {
            // resetear .....
            $scope.showCreateCliente = false;
            $scope.showSaveCliente = true;
            $scope.showEditCliente = true;
            $scope.editBan = false;
            $scope.cliente = {};
            $scope.showDisable = true;
          }
          break;
      }
    };

    $scope.ban = true;
    $scope.items = [];
    // seccion de busqueda
    $scope.form = {};
    $scope.search = function (name) {
      if (name !== "") {
        $scope.ban = false;
        $scope.listCliente = client.search(name).then(function succes(res) {
          $scope.items = res;
        });
      } else {
        $scope.ban = true;
      }
    }; // .....


    // secccion de la equis para eliminar lo escrito
    $scope.emptySearch = function () {
      $scope.form.search = "";
      $scope.ban = true;
    }; // ......

    // llenar los datos desplegados en la lista ....
    $scope.llenado = function (search) {
      listClient();
      $scope.form.search = "";
      $scope.showDisable = false;
      $scope.showCreateCliente = true;
      $scope.showSaveCliente = false;
      $scope.showEditCliente = false;
      $scope.band = true;
      $scope.ban = true;
      $scope.cliente.idclientes = search.idclientes;
      $scope.cliente.cliente = search.cliente;
      $scope.cliente.telefono = search.telefono;
      $scope.cliente.plazo_c = search.plazo_cobranza;
      $scope.cliente.encargado = search.encargado;
      $scope.cliente.domicilio = search.domicilio;
      $scope.cliente.ciudad = search.ciudad;
      $scope.cliente.rfc = search.rfc;
      $scope.cliente.clave_m = search.clave_mercancia;
      $scope.cliente.mercancia = search.tipo_mercancia;
      $scope.cliente.plazo_f = search.plazo_factura;
      $scope.cliente.email = search.email;
      $scope.cliente.codigo = search.codigo;
    }; // ......

    // actualizar lista
    $scope.resetLisr = function () {
      listClient();
    }; // ......

    // agregar producto nuevo ......
    $scope.agregaMercancia = function () {
      var lent = Object.keys($scope.mercancia).length;
      if (lent > 0) {
        products.createProduct($scope.mercancia).then(function succes(res) {
          listClient();
          if (res.action === "success") {
            Swal.fire({
              position: "center",
              type: "success",
              title: "Producto agregado",
              showConfirmButton: false,
              timer: 1000,
            });
            $scope.mercancia = {};
          }
        });
      } else {
        document.getElementById("nmercancia").className =
          "form-control is-invalid";
      }
    }; // .....
  },
]);
// termina el controlador de cliente.....

// crud operador

app.controller("crudOperador", [
  "$scope",
  "crudOperator",
  function ($scope, crudOperator) {
    // seccion busqueda ...
    $scope.showDisable = true;
    $scope.showView = true;
    $scope.ban = true;
    $scope.items = [];
    $scope.lista = [];
    $scope.viewFAlta = true;
    $scope.option = true;

    localStorage.removeItem("archive");
    // seccion de busqueda
    $scope.form = {};
    $scope.search = function (name) {
      if (name !== "") {
        $scope.ban = false;
        crudOperator.searchOperator(name).then(function succes(res) {
          $scope.items = res;
        });
      } else {
        $scope.ban = true;
      }
    }; // .....

    // secccion de la equis para eliminar lo escrito
    $scope.emptySearch = function () {
      $scope.form.search = "";
      $scope.ban = true;
    }; // ......
    // termina la seccion de busqueda .....

    $scope.operador = {};

    var formJson = {};

    //view button seccion options...
    $scope.showCreate = false;
    $scope.showSave = true;
    $scope.showReset = true;
    $scope.showfb = true;
    // .....
    $scope.master = {};

    // seccion de botones
    $scope.optionsButton = function (button) {
      switch (button) {
        case "create":
          {
            $scope.showCreate = true;
            $scope.showSave = false;
            $scope.showReset = false;
            $scope.showDisable = false;
          }
          break;
        case "save":
          {
            if ($scope.option === true) {
              createOperator();
            } else {
              updateOperador();
            }
          }
          break;
        case "reset": {
          $scope.showCreate = false;
          $scope.showSave = true;
          $scope.showReset = true;
          $scope.showfb = true;
          $scope.showDisable = true;
          $scope.viewFAlta = true;
          $scope.operador = angular.copy($scope.master);
        }
      } // termina el switch
    };
    // termina la seccion de los botones......

    // llenar formulario con los valores de busqueda .....
    $scope.showSearch = function (data) {
      $scope.ban = true;
      $scope.form.search = "";
      $scope.showView = false;
      $scope.showDisable = false;
      $scope.option = false;
      $scope.operador.idoperador = data.idoperador;
      $scope.operador.nombre = data.nombre;
      $scope.operador.fn = data.fecha_nacimiento;
      $scope.operador.edad = data.edad;
      $scope.operador.curp = data.curp;
      $scope.operador.ts = data.tipo_sangre;
      $scope.operador.status = data.estatus;
      $scope.operador.nimss = data.num_imss;
      $scope.operador.fa = formatDate(data.fecha_alta);
      $scope.operador.fb = formatDate(data.fecha_baje);
      $scope.operador.nl = data.num_licencia;
      $scope.operador.vd = formatDate(data.vig_desde);
      $scope.operador.vh = formatDate(data.vig_hasta);
      $scope.operador.exm = data.examen_medico;
      $scope.operador.exd = formatDate(data.exa_desde);
      $scope.operador.exh = formatDate(data.exa_hasta);
      $scope.operador.nd = data.num_domicilio;
      $scope.operador.domicilio = data.domicilio;
      $scope.operador.cp = data.cp;
      $scope.operador.ciudad = data.ciudad;
      $scope.operador.estado = data.estado;
      // opciones para ver botones .....
      $scope.showCreate = true;
      $scope.showSave = false;
      $scope.showReset = false;
      $scope.viewFAlta = false;

      list(data.idoperador);
    };
    // termina el llenado de busqueda....

    // view pdf ...
    $scope.viewPDF = function (item) {
      $scope.pdf = "backend/upload/" + item;
      document.getElementById("modal").style.display = "block";
    }; // ....

    // funcion crear operador .....
    var createOperator = function () {
      var data = createJson($scope.operador);
      var leng = Object.keys(data).length;
      if (leng > 0) {
        crudOperator.createOperator($scope.operador).then(function (res) {
          console.log(res);
          if (res.action === "success") {
            var message = "Registro Exitoso";
            showMessage(message, "success");
            $scope.showCreate = false;
            $scope.showSave = true;
            $scope.showReset = true;
            $scope.showfb = true;
            $scope.showDisable = true;
            $scope.viewFAlta = true;
            $scope.operador = {};
          }
        });
      } else {
        var message = "Debe llenar todos los campos";
        showMessage(message, "danger");
      }
    }; // .....

    // funcioon actualizar operador
    var updateOperador = function () {
      var data = createJson($scope.operador);
      var leng = Object.keys(data).length;
      if (leng > 0) {
        crudOperator.updateOperator($scope.operador).then(function (res) {
          if (res.action === "success") {
            var message = "Actualizacion Exitosa";
            showMessage(message, "success");
            $scope.showCreate = false;
            $scope.showSave = true;
            $scope.showReset = true;
            $scope.showfb = true;
            $scope.showDisable = true;
            $scope.viewFAlta = true;
            $scope.operador = {};
          }
        });
      }
    }; // .......

    // metodo para colocar la edad....
    $scope.fechadate = function () {
      var date = new Date();
      var fecha = $scope.operador.fn;
      var leng = Object.keys(fecha).length;
      if (fecha !== "") {
        if (leng === 10) {
          var result = fecha.split("/");
          $scope.operador.edad = date.getFullYear() - result[2];
        } //
      }
    }; // ........

    // expresiones regulares.....
    // solo debe contener letras
    $scope.letras = "/^[A-Za-z0-9]+$/g";
    // solo numeros
    $scope.numeros = "\\d+";

    // function formato fecha para type date
    var formatDate = function (fecha) {
      var date = new Date(fecha);
      return date;
    };

    // llenar json create y update
    var createJson = function (data) {
      formJson = {
        ciudad: data.ciudad,
        cp: data.cp,
        curp: data.curp,
        domicilio: data.domicilio,
        edad: data.edad,
        exd: data.exd,
        exh: data.exh,
        exm: data.exm,
        fa: data.fa,
        fn: data.fn,
        fb: data.fb,
        nimss: data.nimss,
        nl: data.nl,
        nombre: data.nombre,
        status: data.status,
        ts: data.ts,
        vd: data.vd,
        vh: data.vh,
      };
      return formJson;
    }; //.......

    // mostar mensaje
    var showMessage = function (message, type) {
      Swal.fire({
        position: "center",
        type: type,
        title: message,
        showConfirmButton: false,
        timer: 1000,
      });
    }; // ....

    // cuando cambien el status del operador
    $scope.changeBaja = function () {
      if ($scope.operador.status === "Baja") {
        $scope.showfb = false;
        $scope.operador.fb = new Date();
      } else {
        $scope.showfb = true;
        $scope.operador.fb = "";
      }
    };

    var year;

    // calcular la fecha de vencimiento segun la tipo sea B,E
    $scope.calcularvh = function () {
      var fecha = document.getElementById("vd").value;
      var fechaN = fecha.split("-");
      var suma = parseInt(fechaN[0]) + year;
      if (parseInt(fechaN[2]) === 31) {
        var newFn = suma + "-" + fechaN[1] + "-" + 31;
        $scope.operador.vh = formatDate(newFn);
      } else {
        var newFn = suma + "-" + fechaN[1] + "-" + (parseInt(fechaN[2]) + 1);
        $scope.operador.vh = formatDate(newFn);
      }
    };

    // obtener el tipo de licencia
    $scope.caracter = function () {
      var ln = $scope.operador.nl;
      var leng = Object.keys(ln).length;
      var ident = ln.charAt(leng - 1);
      if (ident === "B" || ident === "b") {
        year = 5;
      }
      if (ident === "E" || ident === "e") {
        year = 2;
      }
    };

    // calcular la fecha de vencimiento del examen medico
    $scope.calcexmh = function () {
      var fecha = document.getElementById("exd").value;
      var fechaN = fecha.split("-");
      var suma = parseInt(fechaN[0]) + 2;
      if (parseInt(fechaN[2]) === 31) {
        var newFn = suma + "-" + fechaN[1] + "-" + 31;
        $scope.operador.exh = formatDate(newFn);
      } else {
        var newFn = suma + "-" + fechaN[1] + "-" + (parseInt(fechaN[2]) + 1);
        $scope.operador.exh = formatDate(newFn);
      }
    };

    $scope.delete = function (item) {
      var swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Esta seguro que desea eliminar este archivo?",
          showCancelButton: true,
          confirmButtonText: "Si",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.value) {
            var idoperadores = item.idoperador;
            var createjson = {
              iddocuments: item.iddocuments,
              column: item.colum,
              newcontent: null,
            };

            crudOperator.deleteOperador(createjson).then(function (res) {
              if (res.action === "success") {
                swalWithBootstrapButtons.fire("Eliminado!");
                $scope.lista = [];
                list(idoperadores);
              }
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelado");
          }
        });
    };

    var list = function (idoperador) {
      crudOperator.listDocuments(idoperador).then(function (res) {
        var leng = Object.keys(res).length;
        if (leng > 0) {
          $scope.lista = [];
          var i = 0;
          if (res[i].d1 !== null) {
            var split = res[i].d1.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d1",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d2 !== null) {
            var split = res[i].d2.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d2",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d3 !== null) {
            var split = res[i].d3.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d3",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d4 !== null) {
            var split = res[i].d4.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d4",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d5 !== null) {
            var split = res[i].d5.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d5",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d6 !== null) {
            var split = res[i].d6.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d6",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d7 !== null) {
            var split = res[i].d7.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d7",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d8 !== null) {
            var split = res[i].d8.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d8",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d9 !== null) {
            var split = res[i].d9.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d9",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d10 !== null) {
            var split = res[i].d10.split("/", 2);
            $scope.lista.push({
              name: split[1],
              archive: split[0],
              colum: "d10",
              iddocuments: res[i].iddocuments,
              idoperador: idoperador,
              img: "frontend/assets/img/pdf.png",
            });
          }
        } else {
          $scope.lista = [];
        }
      });
    };

    $scope.searchImss = function (num) {
      crudOperator.searchImss(num).then(function (res) {
        var leng = Object.keys(res).length;
        if (leng > 0) {
          $scope.numimss = true;
          $scope.viewFAlta = true;
        } else {
          $scope.numimss = false;
          $scope.viewFAlta = false;
        }
      });
    };
  },
]);

app.controller("crudArchive", [
  "$scope",
  "crudOperator",
  "listGral",
  "upload",
  function ($scope, crudOperator, listGral, upload) {
    // declaracion de atributos a ocupar
    $scope.form = {};
    $scope.options = {};
    $scope.idp = 0;
    $scope.viewSave = false;
    $scope.ban = true;
    $scope.showUpload = true;
    $scope.iteraciones = [];
    $scope.bander = false;
    $scope.optionCrud = true;

    // create documents
    $scope.createDocuments = function () {
      crudDocuments();
    };

    // search operador
    $scope.search = function (data) {
      crudOperator.searchOperator(data).then(function (res) {
        $scope.items = res;
        $scope.ban = false;
      });
    };

    $scope.itemOperario = function (data) {
      $scope.ban = true;
      $scope.showUpload = false;
      $scope.form.search = "";
      $scope.name = data.nombre;
      $scope.idp = data.idoperador;
      vefica(data.idoperador);
    };

    // obtenemos el numero de inputs a visualizar por el usuario
    $scope.iteration = function () {
      if ($scope.iteraciones.length > 0) {
        $scope.iteraciones = [];
        for (var j = 0; j < $scope.options.iteration; j++) {
          var n = j + 1;
          var id = {
            id: "d" + j,
          };
          $scope.iteraciones.push(id);
        }
      } else {
        for (var i = 0; i < $scope.options.iteration; i++) {
          var n = i + 1;
          var id = {
            id: "d" + n,
          };
          $scope.iteraciones.push(id);
        }
      }
    }; // ......

    // verifica update
    var vefica = function (id) {
      crudOperator.listDocuments(id).then(function (res) {
        var leng = Object.keys(res).length;
        if (leng > 0) {
          $scope.optionCrud = false;
          var lista = [];
          for (var i = 0; i < leng; i++) {
            if (res[i].d1 !== null) {
              upload.almacenarArray(res[i].d1);
              var split = res[i].d1.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d2 !== null) {
              upload.almacenarArray(res[i].d2);
              var split = res[i].d2.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d3 !== null) {
              upload.almacenarArray(res[i].d3);
              var split = res[i].d3.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d4 !== null) {
              upload.almacenarArray(res[i].d4);
              var split = res[i].d4.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d5 !== null) {
              upload.almacenarArray(res[i].d5);
              var split = res[i].d5.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d6 !== null) {
              upload.almacenarArray(res[i].d6);
              var split = res[i].d6.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d7 !== null) {
              upload.almacenarArray(res[i].d7);
              var split = res[i].d7.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d8 !== null) {
              upload.almacenarArray(res[i].d8);
              var split = res[i].d8.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d9 !== null) {
              upload.almacenarArray(res[i].d9);
              var split = res[i].d9.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d10 !== null) {
              upload.almacenarArray(res[i].d10);
              var split = res[i].d10.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
          }
          $scope.numarch = [];
          var id = 0;
          for (var i = lista.length; i < 10; i++) {
            id++;
            var option = {
              id: id,
              value: id,
            };
            $scope.numarch.push(option);
          }
        } else {
          $scope.optionCrud = true;
          listGral.listNumber().then(function (res) {
            $scope.numarch = res;
          });
        }
      });
    };

    // subir el nombre con tu estencion a la base de datos ...
    var crudDocuments = function () {
      var jsondata = createJson();
      if (jsondata !== null) {
        if ($scope.optionCrud === true) {
          upload.creteDocuments(jsondata).then(function (res) {
            if (res.action === "success") {
              localStorage.removeItem("archive");
              $scope.form = {};
              $scope.options = {};
              $scope.idp = 0;
              $scope.viewSave = false;
              $scope.ban = true;
              $scope.showUpload = true;
              $scope.iteraciones = [];
              showMessage(
                "Los datos han sido exitosamente agregados",
                "success"
              );
            }
          });
        } else {
          upload.updateUpload(jsondata).then(function (res) {
            if (res.action === "success") {
              localStorage.removeItem("archive");
              $scope.form = {};
              $scope.options = {};
              $scope.idp = 0;
              $scope.viewSave = false;
              $scope.ban = true;
              $scope.showUpload = true;
              $scope.iteraciones = [];
              showMessage(
                "Los datos han sido exitosamente agregados",
                "success"
              );
            }
          });
        }
      }
    }; // .....

    var createJson = function () {
      var array = JSON.parse(localStorage.getItem("archive"));
      if (array !== null) {
        $scope.viewSave = true;
        var list = array.split(",");
        var json = {
          idoperador: $scope.idp,
          d1: list[0],
          d2: list[1],
          d3: list[2],
          d4: list[3],
          d5: list[4],
          d6: list[5],
          d7: list[6],
          d8: list[7],
          d9: list[8],
          d10: list[9],
        };
        return json;
      } else {
        showMessage("Este usuario no tiene archivos cargados", "error");
        return (json = null);
      }
    };

    // mostar mensaje de alertas ....
    var showMessage = function (message, type) {
      Swal.fire({
        position: "center",
        type: type,
        title: message,
        showConfirmButton: false,
        timer: 2000,
      });
    }; // ....

    $scope.reset = function () {
      $scope.form = {};
      $scope.options = {};
      $scope.viewSave = false;
      $scope.ban = true;
      $scope.showUpload = true;
      $scope.iteraciones = [];
      localStorage.removeItem("archive");
    };
  },
]);

// crud de equipo flotilla ....
app.controller("crudEquipoFlotilla", [
  "$scope",
  "equipo",
  "cruddocumentseq",
  function ($scope, equipo, cruddocumentseq) {
    // formulario de busqueda ...
    $scope.form = {};
    // formulario equipo
    $scope.formequipo = {};

    $scope.listar = [];
    // habilitar o deshabilitar un boton ...
    $scope.showView = true;

    // formulario Fisico-Mecanico
    $scope.formFisicoMecanico = {};
    $scope.listfisicomecanico = [];
    $scope.dformFisicoMecanico = {};
    $scope.btnshowFmecanico = true;
    // ...
    $scope.viewForm = {};
    $scope.years = [];

    // formulario para crear verificacion ambiental
    $scope.formAmbiental = {};
    // incia formulario deshabilitado ...
    $scope.showCreateInput = true;

    // habilitar boton de AMBIENTAL
    $scope.btnShowVambiental = true;
    $scope.listambiental = [];
    // exites numero economico
    $scope.valideco = false;
    $scope.valideconext = true;
    // existen las placas
    $scope.validniv = false;
    $scope.validnivnext = true;
    // existe motor
    $scope.validmt = false;
    $scope.validmtnext = true;

    // expresiones regulares.....
    // solo debe contener letras
    $scope.letras = "/^[A-Za-z0-9]+$/g";
    // solo numeros
    $scope.numeros = "\\d+";

    // variable para actualizar o crear
    var banderoption = true;
    $scope.ban = true;

    $scope.search = function (name) {
      if (name !== "") {
        $scope.ban = false;
        equipo.searchEquipo(name).then(function succes(res) {
          $scope.items = res;
        });
      } else {
        $scope.ban = true;
      }
    }; // .....

    // secccion de la equis para eliminar lo escrito
    $scope.emptySearch = function () {
      $scope.form.search = "";
      $scope.ban = true;
    }; // ......
    // termina la seccion de busqueda .....

    for (var i = 1990; i <= 2030; i++) {
      $scope.years.push(i);
    }

    $scope.showSearch = function (data) {
      banderoption = false;
      $scope.ban = true;
      $scope.form.search = "";
      $scope.formequipo.altastc = formatDate(data.altastc);
      $scope.formequipo.alto = data.alto;
      $scope.formequipo.ancho = data.ancho;
      $scope.formequipo.bajastc = formatDate(data.bajastc);
      $scope.formequipo.diferencial = data.diferencial;
      $scope.formequipo.eje = data.eje;
      $scope.formequipo.estatus = data.estatus;
      $scope.formequipo.idequipo = data.idequipo;
      $scope.formequipo.largo = data.largo;
      $scope.formequipo.marca = data.marca;
      $scope.formequipo.modelo = data.modelo;
      $scope.formequipo.motor = data.motor;
      $scope.formequipo.niv = data.niv;
      $scope.formequipo.nume = data.num_economico;
      $scope.formequipo.poliza = data.num_poliza;
      $scope.formequipo.numct = data.numtc;
      $scope.formequipo.placas = data.placas;
      $scope.formequipo.suspension = data.suspencion;
      $scope.formequipo.tipo = data.tipo;
      $scope.formequipo.vd = formatDate(data.vd);
      $scope.formequipo.vh = formatDate(data.vh);
      $scope.showCreate = true;
      $scope.showSave = false;
      $scope.showReset = false;
      $scope.showDisable = false;
      $scope.showCreateInput = false;
      $scope.valideconext = false;
      $scope.validnivnext = false;
      $scope.validmtnext = false;
      $scope.showCreateInput = false;
      $scope.showView = false;
      //$scope.btnShowVambiental = true;
      //console.log($scope.btnShowVambiental);
      if (data.tipo === "Tractor") {
        $scope.btnShowVambiental = false;
        equipo.listVAmbiental(data.idequipo).then(function success(res) {
          $scope.listambiental = res;
        });

        $scope.viewForm.placa = data.placas;
        $scope.viewForm.noeconomic = data.num_economico;
        $scope.formAmbiental.unidad = data.num_economico;
        $scope.formAmbiental.idequipo = data.idequipo;
      } else {
        $scope.placa = "";
        $scope.noeconomic = "";
        $scope.listambiental = [];
        $scope.btnShowVambiental = true;
      }

      if (data.tipo === "Tractor") {
        $scope.btnshowFmecanico = false;
        $scope.formFisicoMecanico.placa = data.placas;
        $scope.formFisicoMecanico.idequipo = data.idequipo;
        $scope.formFisicoMecanico.equipo = data.placas;
        obtenerDigito(data.placas);
        equipo.buscarIdFM(data.idequipo).then(function success(res) {
          $scope.listfisicomecanico = res;
        });
      } else {
        $scope.placa = "";
        $scope.noeconomic = "";
        $scope.listambiental = [];
        $scope.btnShowVambiental = true;
      }
      if (data.tipo === "Plataforma") {
        $scope.btnshowFmecanico = false;
        $scope.formFisicoMecanico.placa = data.placas;
        $scope.formFisicoMecanico.idequipo = data.idequipo;
        $scope.formFisicoMecanico.equipo = data.placas;
        obtenerDigito(data.placas);
        equipo.buscarIdFM(data.idequipo).then(function success(res) {
          $scope.listfisicomecanico = res;
        });
      } else {
        $scope.placa = "";
        $scope.noeconomic = "";
        $scope.listambiental = [];
        $scope.btnShowVambiental = true;
      }

      list(data.idequipo);
    };

    // estado inicial de los botones
    $scope.showCreate = false;
    $scope.showSave = true;
    $scope.showReset = true;
    $scope.showfb = true;

    $scope.optionsButton = function (button) {
      switch (button) {
        case "create":
          {
            $scope.showCreate = true;
            $scope.showSave = false;
            $scope.showReset = false;
            $scope.showDisable = false;
            $scope.showCreateInput = false;
          }
          break;
        case "save":
          {
            // pendiente el de guardar .....
            if (banderoption === true) {
              crearEquipo();
            } else {
              updateEq();
            }
          }
          break;
        case "reset": {
          $scope.showCreate = false;
          $scope.showSave = true;
          $scope.showReset = true;
          banderoption = true;
          $scope.formequipo = {};
          $scope.valideco = false;
          $scope.valideconext = true;
          $scope.validniv = false;
          $scope.validnivnext = true;
          $scope.validmt = false;
          $scope.validmtnext = true;
          $scope.showCreateInput = true;
          $scope.showView = true;
          $scope.btnShowVambiental = true;
          $scope.viewForm = {};
          $scope.listambiental = [];
          $scope.btnshowFmecanico = true;
        }
      } // termina el switch
    }; // termina funcion ....

    var crearEquipo = function () {
      equipo.creteEquipo($scope.formequipo).then(function (res) {
        if (res.action === "success") {
          resetTotal();
          showMessage("Registro Exitoso", "success");
        }
      });
    };

    var updateEq = function () {
      equipo.updateEquipo($scope.formequipo).then(function (res) {
        console.log(res);
        if (res.action === "success") {
          resetTotal();
          showMessage("Datos Actualizados", "success");
        }
      });
    };

    $scope.viewPDF = function (item) {
      $scope.pdf = "backend/upload/" + item;
      document.getElementById("modal").style.display = "block";
    }; //

    $scope.changeStatus = function () {
      if (
        $scope.formequipo.estatus === "baja_definitiva" ||
        $scope.formequipo.estatus === "vendido"
      ) {
        $scope.formequipo.bajastc = new Date();
      } else {
        $scope.formequipo.bajastc = "";
      }
    };

    // veficar numero economico
    $scope.vericaNumE = function (nume) {
      equipo.validNumEco(nume).then(function (res) {
        let leng = Object.keys(res).length;
        if (leng > 0) {
          $scope.valideco = true;
          $scope.valideconext = true;
        } else {
          $scope.valideco = false;
          $scope.valideconext = false;
        }
      });
    };

    // veficicar niv
    $scope.vericaNiv = function (niv) {
      equipo.validNiv(niv).then(function (res) {
        let leng1 = Object.keys(res).length;
        if (leng1 > 0) {
          $scope.validniv = true;
          $scope.validnivnext = true;
        } else {
          $scope.validniv = false;
          $scope.validnivnext = false;
        }
      });
    };

    // verificar Motor
    $scope.vericaMotor = function (motor) {
      equipo.validMotor(motor).then(function (res) {
        let leng2 = Object.keys(res).length;
        if (leng2 > 0) {
          $scope.validmt = true;
          $scope.validmtnext = true;
        } else {
          $scope.validmt = false;
          $scope.validmtnext = false;
        }
      });
    };

    // mostar mensaje de alertas ....
    var showMessage = function (message, type) {
      Swal.fire({
        position: "center",
        type: type,
        title: message,
        showConfirmButton: false,
        timer: 2000,
      });
    }; // ....

    // mostar mensaje de alertas ....
    var showAlerts = function (message, type) {
      Swal.fire({
        position: "center",
        type: type,
        title: message,
        showConfirmButton: false,
        timer: 2500,
      });
    }; // ....

    var resetTotal = function () {
      $scope.showCreate = false;
      $scope.showSave = true;
      $scope.showReset = true;
      banderoption = true;
      $scope.formequipo = {};
      $scope.valideco = false;
      $scope.valideconext = true;
      $scope.validniv = false;
      $scope.validnivnext = true;
      $scope.validmt = false;
      $scope.validmtnext = true;
      $scope.showCreateInput = true;
    };

    var formatDate = function (fecha) {
      var date = new Date(fecha);
      return date;
    };

    var list = function (id) {
      cruddocumentseq.readIdDocuments(id).then(function (res) {
        var leng = Object.keys(res).length;
        if (leng > 0) {
          $scope.listar = [];
          var i = 0;
          if (res[i].d1 !== null) {
            var split = res[i].d1.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d1",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d2 !== null) {
            var split = res[i].d2.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d2",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d3 !== null) {
            var split = res[i].d3.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d3",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d4 !== null) {
            var split = res[i].d4.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d4",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d5 !== null) {
            var split = res[i].d5.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d5",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d6 !== null) {
            var split = res[i].d6.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d6",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d7 !== null) {
            var split = res[i].d7.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d7",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d8 !== null) {
            var split = res[i].d8.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d8",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d9 !== null) {
            var split = res[i].d9.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d9",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
          if (res[i].d10 !== null) {
            var split = res[i].d10.split("/", 2);
            $scope.listar.push({
              name: split[1],
              archive: split[0],
              colum: "d10",
              iddocuments: res[i].iddocumentse,
              idequipo: id,
              img: "frontend/assets/img/pdf.png",
            });
          }
        } else {
          $scope.listar = [];
        }
      });
    };

    $scope.delete = function (item) {
      var swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Esta seguro que desea eliminar este archivo?",
          showCancelButton: true,
          confirmButtonText: "Si",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.value) {
            var idequipo = item.idequipo;
            var createjson = {
              idequipo: item.iddocuments,
              column: item.colum,
              newcontent: null,
            };

            cruddocumentseq.deleteDocuments(createjson).then(function (res) {
              if (res.action === "success") {
                swalWithBootstrapButtons.fire("Eliminado!");
                $scope.lista = [];
                list(idequipo);
              }
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelado");
          }
        });
    };

    // verificacion ambiental

    $scope.crearAmbiental = function () {
      var lentg = Object.keys($scope.formAmbiental).length;
      if (lentg > 0) {
        var id = $scope.formAmbiental.idequipo;
        equipo
          .createVambiental($scope.formAmbiental)
          .then(function success(res) {
            $scope.listambiental = [];
            if (res.action === "success") {
              resertFormAmbietal();
              showMessage("Registro exitoso", "success");
              equipo.listVAmbiental(id).then(function success(res) {
                $scope.listambiental = res;
                var element = angular.element("#crearVambiental");
                element.modal("hide");
              });
            }
          });
      }
    };

    $scope.dateChange = function () {
      var dateMoth = new Date($scope.formAmbiental.fecha);
      var numMoth = dateMoth.getMonth() + 1;
      if ($scope.listambiental.length > 0) {
        if (numMoth > 0 && numMoth < 7) {
          for (var i = 0; i < $scope.listambiental.length; i++) {
            let fecha = new Date($scope.listambiental[i].fecha);
            if ($scope.listambiental[i].periodo === "1er periodo") {
              if (
                dateMoth.getFullYear() === fecha.getFullYear() &&
                fecha.getMonth() + 1 < 7
              ) {
                resertFormAmbietal();
                showAlerts(
                  "La unidad ya esta verificada para este periodo",
                  "error"
                );
                var element = angular.element("#crearVambiental");
                element.modal("hide");
              } else {
                $scope.formAmbiental.periodo = "1er periodo";
              }
            } else {
              $scope.formAmbiental.periodo = "1er periodo";
            }
          }
        } else {
          console.log("Si entra en el else");
          if (numMoth > 6 && numMoth < 13) {
            console.log("Si entra en la condicion");
            for (var i = 0; i < $scope.listambiental.length; i++) {
              let fecha = new Date($scope.listambiental[i].fecha);
              if ($scope.listambiental[i].periodo === "2do periodo") {
                if (
                  dateMoth.getFullYear() === fecha.getFullYear() &&
                  fecha.getMonth() + 1 > 6
                ) {
                  resertFormAmbietal();
                  showAlerts(
                    "La unidad ya esta verificada para este periodo",
                    "error"
                  );
                  var element = angular.element("#crearVambiental");
                  element.modal("hide");
                } else {
                  console.log("Si entra en el else 2do");
                  $scope.formAmbiental.periodo = "2do periodo";
                }
              } else {
                $scope.formAmbiental.periodo = "2do periodo";
              }
            }
          }
        }
      } else {
        if (numMoth > 0 && numMoth < 7) {
          $scope.formAmbiental.periodo = "1er periodo";
        } else {
          if (numMoth > 6 && numMoth < 13) {
            $scope.formAmbiental.periodo = "2do periodo";
          }
        }
      }
    };

    var resertFormAmbietal = function () {
      $scope.formAmbiental.fecha = "";
      $scope.formAmbiental.folio = "";
      $scope.formAmbiental.periodo = "";
      $scope.formAmbiental.noverifi = "";
    };

    $scope.validarFolio = function (data) {
      equipo.validFolio(data).then(function success(res) {
        var length = Object.keys(res).length;
        if (length > 0) {
          showAlerts("Este folio de verificacion ya existe", "warning");
          var element = angular.element("#crearVambiental");
          element.modal("hide");
          $scope.formAmbiental = {};
        }
      });
    };

    $scope.resetearform = function () {
      $scope.formAmbiental = {};
    };

    // seccion de Fisico mecanico...
    $scope.registrarFisicoMecanico = function () {
      var id = $scope.formFisicoMecanico.idequipo;
      equipo
        .createFisicoMecanico($scope.formFisicoMecanico)
        .then(function succes(res) {
          if (res.action === "success") {
            $scope.formFisicoMecanico.equipo = {};
            showMessage("Registro exitoso", "success");
            equipo.buscarIdFM(id).then(function success(res) {
              $scope.listfisicomecanico = res;
              var element = angular.element("#crearVFisico");
              element.modal("hide");
            });
          }
        });
    };

    // verificar folio fisico mecanico
    $scope.vFisicoMecanico = function (data) {
      equipo.validFoliofm(data).then(function succes(res) {
        var length = Object.keys(res).length;
        if (length > 0) {
          showAlerts("Este folio de verificacion ya existe", "warning");
          var element = angular.element("#crearVFisico");
          element.modal("hide");
          $scope.formFisicoMecanico = {};
        }
      });
    };

    $scope.resetFm = function () {
      $scope.formFisicoMecanico = {};
    };

    var obtenerDigito = function (placa) {
      if (placa !== "") {
        var digitos = /(\d+)/g;
        var obdigitos = placa.match(digitos);
        var union = "";
        for (var i = 0; i < obdigitos.length; i++) {
          union = union + obdigitos[i];
        }
        var digit = union.charAt(2);
        if (digit === "5" || digit === "6") {
          $scope.formFisicoMecanico.periodo = "Enero-Abril";
        }
        if (digit === "7" || digit === "8") {
          $scope.formFisicoMecanico.periodo = "Marzo-Junio";
        }
        if (digit === "3" || digit === "4") {
          $scope.formFisicoMecanico.periodo = "Mayo-Agosto";
        }
        if (digit === "1" || digit === "2") {
          $scope.formFisicoMecanico.periodo = "Julio-Octubre";
        }
        if (digit === "9" || digit === "0") {
          $scope.formFisicoMecanico.periodo = "Septiembre-Diciembre";
        }
      } else {
        console.log("debe de llenar el campo");
      }
    };

    $scope.detalleFM = function (fm) {
      $scope.dformFisicoMecanico.placa = fm.equipo;
      $scope.dformFisicoMecanico.periodo = fm.periodo;
      $scope.dformFisicoMecanico.fecha = new Date(fm.fecha);
      $scope.dformFisicoMecanico.folio = fm.folio;
      $scope.dformFisicoMecanico.unidad = fm.unidadveifi;
    };

    $scope.validDateFm = function (data) {
      var fecha = new Date(data);
      for (var i = 0; i < $scope.listfisicomecanico.length; i++) {
        if (
          $scope.listfisicomecanico[i].equipo ===
          $scope.formFisicoMecanico.equipo
        ) {
          var dateFm = new Date($scope.listfisicomecanico[i].fecha);
          if (dateFm.getFullYear() === fecha.getFullYear()) {
            showAlerts(
              "La unidad ya esta verificada para este periodo",
              "error"
            );
            var element = angular.element("#crearVFisico");
            element.modal("hide");
            $scope.formFisicoMecanico = {};
          }
        }
      }
    };

    $scope.jsonUploader = {};

    $scope.archiveUpload = function (item, type) {
      console.log(item);
      switch (type) {
        case "ambiental":
          {
            $scope.jsonUploader = {
              id: item.idvambiental,
              fecha: item.fecha,
            };
          }
          break;
        case "fisico":
          {
            $scope.jsonUploader = {
              id: item.idfisicomecanico,
              fecha: item.fecha,
            };
          }
          break;
      }
    };

    $scope.uploadSubir = function () {
      let archive = JSON.parse(localStorage.getItem("archive"));
      if (archive !== null) {
        let json = {
          id: $scope.jsonUploader.id,
          fecha: $scope.jsonUploader.fecha,
          recurso: archive,
        };

        equipo
          .ValidarUploadFA($scope.jsonUploader.fecha, $scope.jsonUploader.id)
          .then(function succes(res) {
            let leng = Object.keys(res).length;
            if (leng > 0) {
              localStorage.removeItem("archive");
              showAlerts("Este equipo ya tiene un archivo PDF", "error");
            } else {
              equipo.createUpload(json).then(function succes(res) {
                if (res.action === "success") {
                  localStorage.removeItem("archive");
                  showAlerts("Archivo Subido exitosamente", "success");
                }
              });
            }
          });
        /* */
      }
    };

    // checar validaciones por favor .....

    $scope.verArchivo = function (id) {
      console.log(id);
      equipo.searchUploadFA(id).then(function success(res) {
        let oblentgh = Object.keys(res).length;
        if (oblentgh > 0) {
          console.log(res);
          let resour = res[0].recurso.split("/");
          $scope.viewPDF(resour[0]);
        } else {
          showAlerts("No a cargado ningun archivo", "error");
        }
      });
    };
  },
]);

// controlador de subir archivos de equipo flotilla....
app.controller("crudArchivoEquipo", [
  "$scope",
  "cruddocumentseq",
  "equipo",
  "listGral",
  "upload",
  function ($scope, cruddocumentseq, equipo, listGral, upload) {
    // declaracion de atributos a ocupar
    $scope.form = {};
    $scope.options = {};
    $scope.ide = 0;
    $scope.viewSave = false;
    $scope.ban = true;
    $scope.showUpload = true;
    $scope.iteraciones = [];
    $scope.bander = false;
    $scope.optionCrud = true;

    // create documents
    $scope.createDocuments = function () {
      crudDocuments();
    };

    // search operador
    $scope.search = function (data) {
      if (data !== "") {
        equipo.searchEquipo(data).then(function (res) {
          $scope.items = res;
          $scope.ban = false;
        });
      } else {
        $scope.ban = true;
      }
    };

    // secccion de la equis para eliminar lo escrito
    $scope.emptySearch = function () {
      $scope.form.search = "";
      $scope.ban = true;
    }; // ......
    // termina la seccion de busqueda .....

    $scope.itemequipo = function (data) {
      $scope.ban = true;
      $scope.showUpload = false;
      $scope.form.search = "";
      $scope.name = data.num_economico + " / " + data.placas;
      $scope.ide = data.idequipo;
      vefica(data.idequipo);
    };

    // obtenemos el numero de inputs a visualizar por el usuario
    $scope.iteration = function () {
      if ($scope.iteraciones.length > 0) {
        $scope.iteraciones = [];
        for (var j = 0; j < $scope.options.iteration; j++) {
          var n = j + 1;
          var id = {
            id: "d" + j,
          };
          $scope.iteraciones.push(id);
        }
      } else {
        for (var i = 0; i < $scope.options.iteration; i++) {
          var n = i + 1;
          var id = {
            id: "d" + n,
          };
          $scope.iteraciones.push(id);
        }
      }
    }; // ......

    // verifica update
    var vefica = function (id) {
      cruddocumentseq.readIdDocuments(id).then(function (res) {
        var leng = Object.keys(res).length;
        if (leng > 0) {
          $scope.optionCrud = false;
          var lista = [];
          for (var i = 0; i < leng; i++) {
            if (res[i].d1 !== null) {
              upload.almacenarArray(res[i].d1);
              var split = res[i].d1.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d2 !== null) {
              upload.almacenarArray(res[i].d2);
              var split = res[i].d2.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d3 !== null) {
              upload.almacenarArray(res[i].d3);
              var split = res[i].d3.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d4 !== null) {
              upload.almacenarArray(res[i].d4);
              var split = res[i].d4.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d5 !== null) {
              upload.almacenarArray(res[i].d5);
              var split = res[i].d5.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d6 !== null) {
              upload.almacenarArray(res[i].d6);
              var split = res[i].d6.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d7 !== null) {
              upload.almacenarArray(res[i].d7);
              var split = res[i].d7.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d8 !== null) {
              upload.almacenarArray(res[i].d8);
              var split = res[i].d8.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d9 !== null) {
              upload.almacenarArray(res[i].d9);
              var split = res[i].d9.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
            if (res[i].d10 !== null) {
              upload.almacenarArray(res[i].d10);
              var split = res[i].d10.split("/", 2);
              lista.push({
                name: split[1],
              });
            }
          }
          $scope.numarch = [];
          var id = 0;
          for (var i = lista.length; i < 10; i++) {
            id++;
            var option = {
              id: id,
              value: id,
            };
            $scope.numarch.push(option);
          }
        } else {
          $scope.optionCrud = true;
          listGral.listNumber().then(function (res) {
            $scope.numarch = res;
          });
        }
      });
    };

    // subir el nombre con tu estencion a la base de datos ...
    var crudDocuments = function () {
      var jsondata = createJson();
      if (jsondata !== null) {
        if ($scope.optionCrud === true) {
          cruddocumentseq.createDocuments(jsondata).then(function (res) {
            if (res.action === "success") {
              localStorage.removeItem("archive");
              $scope.form = {};
              $scope.options = {};
              $scope.idp = 0;
              $scope.viewSave = false;
              $scope.ban = true;
              $scope.showUpload = true;
              $scope.iteraciones = [];
              showMessage(
                "Los datos han sido exitosamente agregados",
                "success"
              );
            }
          });
        } else {
          cruddocumentseq.updateDocuments(jsondata).then(function (res) {
            if (res.action === "success") {
              localStorage.removeItem("archive");
              $scope.form = {};
              $scope.options = {};
              $scope.idp = 0;
              $scope.viewSave = false;
              $scope.ban = true;
              $scope.showUpload = true;
              $scope.iteraciones = [];
              showMessage(
                "Los datos han sido exitosamente agregados",
                "success"
              );
            }
          });
        }
      }
    }; // .....

    var createJson = function () {
      var array = JSON.parse(localStorage.getItem("archive"));
      if (array !== null) {
        $scope.viewSave = true;
        var list = array.split(",");
        var json = {
          idequipo: $scope.ide,
          d1: list[0],
          d2: list[1],
          d3: list[2],
          d4: list[3],
          d5: list[4],
          d6: list[5],
          d7: list[6],
          d8: list[7],
          d9: list[8],
          d10: list[9],
        };
        return json;
      } else {
        showMessage("Este usuario no tiene archivos cargados", "error");
        return (json = null);
      }
    };

    // mostar mensaje de alertas ....
    var showMessage = function (message, type) {
      Swal.fire({
        position: "center",
        type: type,
        title: message,
        showConfirmButton: false,
        timer: 2000,
      });
    }; // ....

    $scope.reset = function () {
      $scope.form = {};
      $scope.options = {};
      $scope.viewSave = false;
      $scope.ban = true;
      $scope.showUpload = true;
      $scope.iteraciones = [];
      localStorage.removeItem("archive");
    };
  },
]);

// controlador de reportes .....
app.controller("reporte", [
  "$scope",
  "Crudstatus",
  "cratePDF",
  "optionMenu",
  function ($scope, Crudstatus, cratePDF, optionMenu) {
    $scope.showstatus = true;
    $scope.showsvA = true;
    $scope.showsvFM = true;
    $scope.reporteform = {};
    $scope.listStatus = [];
    $scope.tablestatShow = true;
    $scope.tablevAShow = true;
    $scope.tablevFMShow = true;
    $scope.listYear = [];
    $scope.listreporte = [];
    $scope.year;
    // $scope.verificacion = 'Estatus del equipoflotilla';

    $scope.PDF = false;

    $scope.cambio = function () {
      switch ($scope.reporteform.opcion) {
        case "status":
          $scope.verificacion = "EQUIPO";
          $scope.showstatus = false;
          $scope.showsvA = true;
          $scope.showsvFM = true;
          break;
        case "vambiental":
          $scope.verificacion = "VERIFICACIONES AMBIENTALES";
          $scope.showstatus = true;
          $scope.showsvA = false;
          $scope.showsvFM = true;
          $scope.listYear = [];
          Crudstatus.listYear("vambiental").then(function success(res) {
            $scope.listYear = res;
          });
          break;
        case "vfisicomecanico":
          $scope.verificacion = "VERIFICACIONES FISCO MECANICO";
          $scope.showstatus = true;
          $scope.showsvA = true;
          $scope.showsvFM = false;
          $scope.listYear = [];
          Crudstatus.listYear("vfisicomecanico").then(function success(res) {
            $scope.listYear = res;
          });
          break;
      } // termina el switch ....
    }; // termina la funcion

    $scope.cahngeStatus = function () {
      switch ($scope.reporteform.status) {
        case "todos":
          $scope.tablestatShow = false;
          $scope.estatus = "status";
          $scope.mystatus = "todos";
          Crudstatus.busquedaStatus("todos", "").then(function (res) {
            $scope.listreporte = res;
          });
          break;
      }
    };

    $scope.busquedaStatus = function () {
      switch ($scope.reporteform.opcion) {
        case "status":
          $scope.tablestatShow = false;
          $scope.tablevAShow = true;
          $scope.tablevFMShow = true;
          $scope.estatus = "status";
          break;
        case "vambiental":
          $scope.tablestatShow = true;
          $scope.tablevAShow = false;
          $scope.tablevFMShow = true;
          break;
        case "vfisicomecanico":
          $scope.tablestatShow = true;
          $scope.tablevAShow = true;
          $scope.tablevFMShow = false;
          break;
      }
      $scope.mystatus = $scope.reporteform.status;
      Crudstatus.busquedaStatus(
        $scope.reporteform.status,
        $scope.reporteform.tipo
      ).then(function (res) {
        $scope.listreporte = res;
      });
    }; // opcion para buscar

    $scope.reportesF = function () {
      Crudstatus.reportesFmVa(
        $scope.reporteform.opcion,
        $scope.reporteform.fecha
      ).then(function (res) {
        $scope.year = $scope.reporteform.fecha;
        $scope.listreporte = res;
      });
    };

    $scope.resetfecha = function () {
      $scope.reporteform.fecha = {};
      $scope.listreporte = [];
    };

    $scope.view_equipos = optionMenu.viewContent("reporte");

    $scope.rutas = function (option) {
      $scope.view_equipos = optionMenu.viewContent(option);
    };

    $scope.imprimir = function () {
      cratePDF.pdf($scope.verificacion);
    };

    $scope.date = new Date();
  },
]);
//*****************************************************************************************************/
//---------CONTROLLER PROVEEDORES Y VALES DE COMBUSTIBLE (FINICIO:21/08 FFINAL:23/08 2020)------------//
//*****************************************************************************************************/

//---------CRUD PROVEEDOR---------//
app.controller("crudProveedores", [
  "$scope",
  "client",
  "products",
  "prov",
  "TiposProv",
  function ($scope, client, products, prov, TiposProv) {
    $scope.listCliente;
    $scope.cliente = {};
    $scope.search = "";
    $scope.showMessage = true;
    $scope.listproduct = [];
    $scope.showDisable = true;
    $scope.showCreateCliente = false;
    $scope.showSaveCliente = true;
    $scope.showEditCliente = true;
    $scope.editBan = false;
    $scope.mercancia = {};
    $scope.express = "\\d+";

    testito2=[];
    $scope.listProv=[];
    $scope.TiposProveedor = {};

    // agregar clave de mercancia...
    $scope.clave = function () {
      if ($scope.cliente.mercancia !== "") {
        $scope.cliente.clave_m = $scope.cliente.mercancia;
      }
    }; // ....

    // llenar lista de opciones....   
    var listClient = function () {
      TiposProv.readTprov().then(function succes(res) {
        //$scope.listproduct = res;
        testito2=res;
        $scope.listproduct = testito2;
      });
      let test= $scope.listproduct.length;
      console.log(testito2);
    }; 
    
    //....

    // boton de guardar, crear, modificar y refrescar ....  //BOTON DE ACTIVAR OPCIONES DE EDICION....
    $scope.buttonOption = function (option) {
      switch (option) {
        // buton de guardar .....
        case 1:
          {
            $scope.showDisable = false;
            $scope.showCreateCliente = true;
            $scope.showSaveCliente = false;
            //$scope.cliente = {};
            $scope.band = false;
            listClient();
          }
          break;
        // boton de guardar y actualizar .....
        case 2:
          {
            listClient();
            $scope.showCreateCliente = false;
            $scope.showEditCliente = true;
            $scope.showSaveCliente = true;
            $scope.showDisable = true;
            len = Object.keys($scope.cliente).length;
            if (len > 0) {
              if ($scope.band === true) {
                // actualizar cliente .....
                prov.updateProv($scope.cliente).then(function succes(res) {
                  if (res.action === "success") {
                    $scope.ban = true;
                    Swal.fire({
                      position: "center",
                      type: "success",
                      title: "Datos actualizado",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    $scope.cliente = {};
                    $scope.reset();
                  } else {
                    console.log(res);
                  }
                });
              } else {
                // CREATE PROVEEDOR********.....
                prov.createProv($scope.cliente).then(function succes(res) {
                  if (res.action === "success") {
                    $scope.ban = true;
                    Swal.fire({
                      position: "center",
                      type: "success",
                      title: "Datos exitosamente agregados",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    $scope.cliente = {};
                  } else {
                    console.log(res);
                  }
                });
              }
            } else {
              $scope.showDisable = false;
              $scope.cliente = {};
            }
          }
          break;
        case 3:
          {
            $scope.showSaveCliente = false;
            $scope.showEditCliente = true;
            $scope.showDisable = false;
            $scope.editBan = true;
          }
          break;
        case 4:
          {
            // resetear .....
            $scope.showCreateCliente = false;
            $scope.showSaveCliente = true;
            $scope.showEditCliente = true;
            $scope.editBan = false;
            $scope.cliente = {};
            $scope.showDisable = true;
          }
          break;
          case 5:
            {
              //activar edicion .....
              $scope.showCreateCliente = false;
              $scope.showSaveCliente = true;
              $scope.showEditCliente = true;
              //$scope.editBan = false;
              //$scope.cliente = {};
              $scope.showDisable = true;
              //$scope.rfc.disabled=true;
            }
            break;
      }
      
    };

    $scope.ban = true;
    $scope.items = [];
    // seccion de busqueda
    $scope.form = {};
    $scope.search = function (name) {
      if (name !== "") {
        $scope.ban = false;
        $scope.listCliente = prov.search(name).then(function succes(res) {
          $scope.items = res;
        });
      } else {
        $scope.ban = true;
      }
    }; // .....

    // secccion de la equis para eliminar lo escrito
    $scope.emptySearch = function () {
      $scope.form.search = "";
      $scope.ban = true;
    }; // ......

    // llenar los datos desplegados en la lista ....
    $scope.llenado = function (search) {
      listClient();
      $scope.form.search = "";
      $scope.showDisable = false;
      $scope.showCreateCliente = true;
      $scope.showSaveCliente = false;
      $scope.showEditCliente = false;
      $scope.band = true;
      $scope.ban = true;
      $scope.cliente.idclientes = search.idproveedor;
      $scope.cliente.cliente = search.nombreprov;
      $scope.cliente.telefono = search.telprov;
      $scope.cliente.plazo_c = search.plazocprov;
      $scope.cliente.encargado = search.encargadoprov;
      $scope.cliente.domicilio = search.domicilioprov;
      $scope.cliente.ciudad = search.ciudadprov;
      $scope.cliente.rfc = search.rfcprov;
      $scope.cliente.clave_m = search.tipoprov;
      $scope.cliente.mercancia = search.tipoprov;
      $scope.cliente.plazo_f = search.plazofprov;
      $scope.cliente.email = search.correoprov;
      $scope.cliente.codigo = search.pcodigoprov;
    }; // ......

    // actualizar lista
    $scope.resetLisr = function () {
      listClient();
    }; // ......

    // agregar producto nuevo ......   
    //----ALERT: AÑADIR OPCION QUE LLENE A LA BASE DE DATOS Y ENVIE A LA VEZ EL TEXTO AL SELECT DE TiposProv
    //----CONFIRM: OPCION POSIBLEMENTE RESUELTA, ESPERANDO ANALISIS---------//
    $scope.agregaMercancia = function () {
      var lent = Object.keys($scope.mercancia).length;
      if (lent > 0) {
        TiposProv.createTprov($scope.mercancia).then(function succes(res) {     
          //listClient();         
          if (res.action === "success") {
            Swal.fire({
              position: "center",
              type: "success",
              title: "Producto agregado",
              showConfirmButton: false,
              timer: 1000,
            });
            $scope.mercancia = {};
            /********************************** */
            //---INSERT->->-> CODIGO PARA MANDAR EL TEXTO AL SELECT-----//
            //var aux = (testito2.length)+1;
            //****************************** */
            $scope.listproduct = testito2;
            testito2.push({idTProv: aux, Tipo_Proveedor: $scope.mercancia.producto});
           // console.log(testito2);
          }          
        });
      } else {
        document.getElementById("nmercancia").className =
          "form-control is-invalid";
      }
    }; // .....
  },
]);
// termina el controlador de proveedores.....

/*********************************************************************************/
//---------------------CRUD VALES DE COMBUSTIBLE---------------------------------//
//***************CONTROLLER PARA IMPRIMIR EL VALE*******************/
app.controller("valeImp", [
  "$scope",
  "cratePDF",
  "vale",
  function ($scope, cratePDF, vale) {
    $scope.valec={};
    $scope.combs=new Array();
    $scope.empresa="PORTEADORES DEL CENTRO DE VERACRUZ S. DE R.L. DE C.V. ";
    $scope.preciocombs= new Array();

    vale.readCombs().then(function succes(res){
      $.each(res, function(key,val){
        $scope.combs.push(val.nombrecomb);
        $scope.preciocombs.push(val.precio);
      });
    });


    vale.searchLast().then(function succes(res) {
      console.log(res);
      $.each(res, function(key,val){ //--TEST SEGUIR PROBANDO :C
        $scope.valec.cantidad=val.cantidad;
        $scope.valec.cantidadL=NumeroALetras($scope.valec.cantidad).toLowerCase();
        $scope.valec.combustible=$scope.combs[(val.tipocombs)-1];
        $scope.valec.preciocombs=$scope.preciocombs[(val.tipocombs)-1];

        console.log("El tipo de combustible en el array es: "+$scope.combs[(val.tipocombs)-1]);
        console.log("El precio en valec es : "+$scope.valec.combustible);

        console.log("El precio del combustible en el array es: "+$scope.preciocombs[(val.tipocombs)-1]);
        console.log("El precio en valec es : "+$scope.valec.preciocombs);

        $scope.valec.idvale=val.idvale;
        $scope.valec.clave=val.claveflete;
        $scope.valec.fecha=formatDate(val.fechaval);
        console.log($scope.valec.fecha);
        $scope.valec.descripcion=val.descflete;
        $scope.valec.gasolinera=val.nombreprov; // EDITAR CONTROLLER DE VALE PARA QUE GUARDE EL NOMBRE Y NO EL ID
        $scope.valec.equipo=val.noeq;
        $scope.valec.operador=val.nombre; // BUSCAR NOMBRE DE OPERADOR SERVICE JS
        $scope.valec.placa=val.placaeq;
      });
    }); 

    $scope.imprimir = function () {
      console.log("FUNCION DE IMPRESION QUE DEBERIA GENERAR EL PDF");
      vale.pdf();
    };

    //apartado de la busqueda del vale especifico//
      $scope.verPrecios = function (){
        console.log("nada");
        };// Fin de ver precios

    //Seccion de busqueda de VALES (29/09/2020)
      $scope.ban3 = true;
      $scope.items2 = [];
      $scope.form2 = {};
      $scope.search2 = function (name) {
        if (name !== "") {
            $scope.ban3 = false;
            $scope.listCliente = vale.search(name).then(function succes(res) {  
            $scope.items2 = res;
          });
        } else {
          $scope.ban3 = true;
        }
        }; // .....    

    // llenar los datos desplegados en la lista ....
    $scope.llenado = function (val) {
      $scope.form.search2 = "";
      $scope.ban3 = true;

      $scope.valec.cantidad=val.cantidad;
      $scope.valec.cantidadL=NumeroALetras($scope.valec.cantidad).toLowerCase();
      $scope.valec.combustible=$scope.combs[(val.tipocombs)-1];
      $scope.valec.preciocombs=$scope.preciocombs[(val.tipocombs)-1];
      $scope.valec.idvale=val.idvale;
      $scope.valec.clave=val.claveflete;
      $scope.valec.fecha=formatDate(val.fechaval);
      console.log($scope.valec.fecha);
      $scope.valec.descripcion=val.descflete;
      $scope.valec.gasolinera=val.nombreprov;
      $scope.valec.equipo=val.noeq;
      $scope.valec.operador=val.nombre; 
      $scope.valec.placa=val.placaeq;
           
    }; // ......
        
    $scope.imprimir2 = function(){
      const $elementoParaConvertir = document.getElementById('imprimirDiv');
      html2pdf()
        .set({
          margin: 0.2,
          filename: 'valeDeCombustible.pdf',
          image:{
             type:'jpeg',
             quality: 0.98
          },
          html2canvas:{
            scale: 3,
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "letter",
            //orientation: 'portrait'
            //precision: 16
          }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err))
        .finally()
        .then( ()=>{
          console.log("GUARDADO!")
        })

    };

    var formatDate = function (fecha) {
      var date = new Date(fecha);
      var aux =parseInt(date.getMonth())+1;
      var dat2 =date.getDate()+"/"+aux+"/"+date.getFullYear();
      return dat2;
    };


    /**
     * TESTITO
     */
    function Unidades(num){

      switch(num)
      {
          case 1: return "UN";
          case 2: return "DOS";
          case 3: return "TRES";
          case 4: return "CUATRO";
          case 5: return "CINCO";
          case 6: return "SEIS";
          case 7: return "SIETE";
          case 8: return "OCHO";
          case 9: return "NUEVE";
      }
  
      return "";
  }//Unidades()
  
  function Decenas(num){
  
      decena = Math.floor(num/10);
      unidad = num - (decena * 10);
  
      switch(decena)
      {
          case 1:
              switch(unidad)
              {
                  case 0: return 'DIEZ';
                  case 1: return 'ONCE';
                  case 2: return 'DOCE';
                  case 3: return 'TRECE';
                  case 4: return 'CATORCE';
                  case 5: return 'QUINCE';
                  default: return 'DIECI' + Unidades(unidad);
              }
          case 2:
              switch(unidad)
              {
                  case 0: return 'VEINTE';
                  default: return 'VEINTI' + Unidades(unidad);
              }
          case 3: return DecenasY('TREINTA', unidad);
          case 4: return DecenasY('CUARENTA', unidad);
          case 5: return DecenasY('CINCUENTA', unidad);
          case 6: return DecenasY('SESENTA', unidad);
          case 7: return DecenasY('SETENTA', unidad);
          case 8: return DecenasY('OCHENTA', unidad);
          case 9: return DecenasY('NOVENTA', unidad);
          case 0: return Unidades(unidad);
      }
  }//Unidades()
  
  function DecenasY(strSin, numUnidades) {
      if(numUnidades == 1) return strSin + ' Y ' + 'UNO'
      if (numUnidades > 0)
      return strSin + ' Y ' + Unidades(numUnidades)
  
      return strSin;
  }//DecenasY()
  
  function Centenas(num) {
      let centenas = Math.floor(num / 100);
      let decenas = num - (centenas * 100);
  
      switch(centenas)
      {
          case 1:
              if (decenas > 0)
                  return 'CIENTO ' + Decenas(decenas);
              return 'CIEN';
          case 2: return 'DOSCIENTOS ' + Decenas(decenas);
          case 3: return 'TRESCIENTOS ' + Decenas(decenas);
          case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
          case 5: return 'QUINIENTOS ' + Decenas(decenas);
          case 6: return 'SEISCIENTOS ' + Decenas(decenas);
          case 7: return 'SETECIENTOS ' + Decenas(decenas);
          case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
          case 9: return 'NOVECIENTOS ' + Decenas(decenas);
      }
  
      return Decenas(decenas);
  }//Centenas()
  
  function Seccion(num, divisor, strSingular, strPlural) {
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
  
      letras = '';
  
      if (cientos > 0)
          if (cientos > 1)
              letras = Centenas(cientos) + ' ' + strPlural;
          else
              letras = strSingular;
  
      if (resto > 0)
          letras += '';
  
      return letras;
  }//Seccion()
  
  function Miles(num) {
      let divisor = 1000;
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
  
      let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
      let strCentenas = Centenas(resto);
  
      if(strMiles == '')
          return strCentenas;
  
      return strMiles + ' ' + strCentenas;
  }//Miles()
  
  function Millones(num) {
      let divisor = 1000000;
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
  
      let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
      let strMiles = Miles(resto);
  
      if(strMillones == '')
          return strMiles;
  
      return strMillones + ' ' + strMiles;
  }//Millones()
  
  function NumeroALetras(num) {
      let data = {
          numero: num,
          enteros: Math.floor(num),
          centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
          letrasCentavos: '',
          letrasMonedaPlural: '',//“PESOS”, 'Dólares', 'Bolívares', 'etcs'
          letrasMonedaSingular: '', //“PESO”, 'Dólar', 'Bolivar', 'etc'
  
          letrasMonedaCentavoPlural: '',
          letrasMonedaCentavoSingular: ''
      };
  
      if (data.centavos > 0) {
          data.letrasCentavos = 'CON ' + (function (){
              if (data.centavos == 1)
                  return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
              else
                  return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
              })();
      };
  
      if(data.enteros == 0)
          return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      if (data.enteros == 1)
          return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
      else
          return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
  }//NumeroALetras()
    /**
     * ///////////////////////////
     */

  },

  
]);
//TERMINA EL CONTROLL DE IMPRIMIR VALE
//****************CRUD DEL VALE**********************/
app.controller("crudVales", [
  "$scope",
  "prov",
  "TiposProv",
  "vale",
  "client",
  function ($scope, prov, TiposProv, vale,client) {
    $scope.listCliente;
    $scope.cliente = {};
    $scope.search = "";
    $scope.showMessage = true;
    $scope.listproduct = [];
    $scope.showDisable = true;
    $scope.showDisableSearch = true;
    $scope.showCreateCliente = false;
    $scope.showSaveCliente = true;
    $scope.showResetCliente = true;
    $scope.showImpCliente = true;
    $scope.editBan = false;
    $scope.mercancia = {};
    $scope.express = "\\d+";
    $scope.listProv=[];
    $scope.TiposProveedor = {};
    $scope.listEq = [];
    $scope.listGas =[];
    $scope.eq;
    $scope.listC;
    $scope.listcombs = []; // lista de combustibles para el select traido de la BD
    $scope.showVen=true;
    $scope.gasolina ={};
    $scope.showValueCombs=true;
    $scope.mostrarAlert=false;
    $scope.mostrarAlert2=false;
    $scope.mostrarStatusVale=false;
    $scope.precios= new Array();
    $scope.validadores = new Array();
    
    //APARTADO DE IMPRESION DE PDF----//
    $scope.rutas = function (option) {
      $scope.view_equipos = optionMenu.viewContent(option);
    };

    //----apartado de configuracion de precios de Gasolina----//
    $scope.verPrecios = function (){
      var aux3= new Array();
      var aux2 = new Array(); 
      let day = (String)((new Date()).getDate());     
      vale.readCombs().then(function succes(res) {
        $.each(res, function(key,val){
          aux3.push(val.ultcambio);
          aux2.push(val.precio);
        });
        $scope.gasolina.magna=aux2[0];
        $scope.gasolina.premium=aux2[1];
        $scope.gasolina.diesel=aux2[2];
        console.log("el dia de hoy es: "+day);
        console.log(aux3[0]);
        console.log(aux2[0]);
        //--------------------------//
        if(day==aux3[0] && day==aux3[1] && day==aux3[2]){
          $scope.mostrarAlert=true; console.log("LOS DATOS YA HAN SIDO ACTUALIZADOS HOY");}
      });  
    };// Fin de ver precios

    $scope.abrirajustes = function (){
      $scope.showValueCombs=false;
    };

    $scope.guardarajustes = function(){

      let day=(String)((new Date()).getDate());
        vale.UpdateCombs(day,$scope.gasolina.magna,1).then(function succes(res){     
        });
        vale.UpdateCombs(day,$scope.gasolina.premium,2).then(function succes(res){
        });
        vale.UpdateCombs(day,$scope.gasolina.diesel,3).then(function succes(res){
        });
        $scope.precios[0]=$scope.gasolina.magna;
        $scope.precios[1]=$scope.gasolina.premium;
        $scope.precios[2]=$scope.gasolina.diesel;
        $scope.showValueCombs=true;
    };
    
    // agregar clave de mercancia...
    $scope.clave = function () {
      if ($scope.cliente.mercancia !== "") {
        $scope.cliente.clave_m = $scope.cliente.mercancia;
      }
    }; // ....

    // llenar lista de opciones de Operadores....   
    var listClient = function () {
      vale.readOperator().then(function succes(res) {
        $scope.listproduct = res;
      });
    };     
    //....

    // llenar lista de opciones de Equipos....   
      var listEquipo= function () {
        vale.readEquipos().then(function succes(res) {
        $scope.listEq = res;
        console.log($scope.listEq);
        });
      };

    // llenar lista de opciones de Gasolineras....   
    var listGas= function () {
      vale.readGasolinera(1).then(function succes(res) {
      $scope.listGas = res;
      });
    };
    

    // LLENAR VALOR DEL PRECIO DE COMBUSTIBLE DE ACUERDO AL TIPO DE COMBUSTIBLE
    $scope.precioCombs = function(){
      if($scope.cliente.combs !==""){
        $scope.cliente.precioCombustible =$scope.precios[($scope.cliente.combs)-1];
        $scope.cliente.importe=($scope.cliente.precioCombustible)*($scope.cliente.cantidadcombs);
        console.log($scope.cliente.importe);

      }
    };
    // llenar lista de opciones de Combustibles....   
    var listCombustible= function () {
      vale.readCombs().then(function succes(res) {
      $scope.listcombs = res;
      $.each(res, function(key,val){
        $scope.precios.push(val.precio);
      });
      //--------------------------//
      });
    };
    
    //generar total de importe...
    $scope.generarImporte = function(){
      if($scope.cliente.cantidadcombs != null){
        let aux;
        aux=($scope.cliente.precioCombustible)*($scope.cliente.cantidadcombs);
        $scope.cliente.importe=aux.toFixed(2);
      }
      else{
        $scope.cliente.importe=0.00;
      }
    }

    // boton de guardar, crear, modificar y refrescar ....  //BOTON DE ACTIVAR OPCIONES DE EDICION....
    $scope.buttonOption = function (option) {
      switch (option) {
        // buton de guardar .....
        case 1:
          {
            $scope.mostrarStatusVale=false;
            $scope.showCreateCliente = true;
            $scope.showDisable = false;
            $scope.showDisableSearch = false;              
            $scope.showSaveCliente = false;
            $scope.showResetCliente = false;
            $scope.cliente = {};
            $scope.band = false;
            $scope.cliente.fecha=new Date();
            console.log($scope.cliente.fecha);
            listClient();
            listEquipo();
            listGas();
            listCombustible();
            $scope.showVen=false;

            //REVISAR LA ACTUALIZACION DE LOS DATOS DEL COMBUSTIBLE//
            var aux3= new Array();
            let day = (String)((new Date()).getDate());     
            vale.readCombs().then(function succes(res) {
              $.each(res, function(key,val){
                aux3.push(val.ultcambio);
              });
              //--------------------------//
              if(day==aux3[0] && day==aux3[1] && day==aux3[2]){
                $scope.mostrarAlert=true; console.log("LOS DATOS YA HAN SIDO ACTUALIZADOS HOY");}
            });  

          }
          break;
        // boton de guardar y actualizar .....
        case 2:
          {

            if($scope.showSaveCliente==false){

              if(validar()){ //true
                console.log("FALTA ALGUN CAMPO POR LLENAR");                
              }
              else{ //false
            listClient();
            $scope.showCreateCliente = false;
            $scope.showEditCliente = true;
            $scope.showSaveCliente = true;
            $scope.showDisable = true;
                console.log("TODOS LOS CAMPOS ESTAN LLENOS");
                len = Object.keys($scope.cliente).length;
                if (len > 0) {
                  if ($scope.cliente.idvale != null) {
                    $scope.showImpCliente=false;           
                   // actualizar Vale .....
                    vale.updateVal($scope.cliente).then(function succes(res) {
                     if (res.action === "success") {
                       $scope.ban = true;
                        Swal.fire({
                        position: "center",
                        type: "success",
                        title: "Datos actualizado",
                        showConfirmButton: false,
                        timer: 1000,
                      });
                      $scope.cliente = {};
                      }  else {
                        console.log(res);
                      }
                    });
  
                  } else {
                    vale.createVal($scope.cliente).then(function succes(res) {
                      $scope.showImpCliente=false;  
                      if (res.action === "success") {
                        $scope.ban = true;
                        Swal.fire({
                        position: "center",
                        type: "success",
                        title: "Datos exitosamente agregados",
                        showConfirmButton: false,
                        timer: 1000,
                      });
                      $scope.cliente = {};
                      } else {
                      console.log(res);
                      }
                    });
                  }
                } else {
                  $scope.showDisable = false;
                  $scope.cliente = {};
                }
                
              }

            }

          }          
          break;
        case 3:
          {
            if($scope.showResetCliente==false){
              // resetear .....
              $scope.showCreateCliente = false;
              $scope.showSaveCliente = true;
              $scope.showEditCliente = true;
              $scope.editBan = false;
              $scope.cliente = {};
              $scope.showDisable = true;
            }
          }
          break;  
        case 4:
          {
            if($scope.showImpCliente==false){
              vale.pdf();
            }
          }
          break;
      }
      
    };

    //Seccion de busqueda de VALES (29/09/2020)
    $scope.ban3 = true;
    $scope.items2 = [];
    $scope.form2 = {};
    $scope.search2 = function (name) {
      if (name !== "") {
        $scope.ban3 = false;
          $scope.listCliente = vale.search(name).then(function succes(res) {  
          $scope.items2 = res;
        });
      } else {
        $scope.ban3 = true;
      }
    }; // .....


    $scope.ban = true;

    $scope.items = [];
    // seccion de busqueda de FLETES
    $scope.form = {};
    $scope.search = function (name) {
      if (name !== "") {
        $scope.ban = false;
        //$scope.listCliente = prov.search(name).then(function succes(res) {
          $scope.listCliente = vale.searchFlete(name,$scope.cliente.fc).then(function succes(res) {  
          $scope.items = res;
        });
      } else {
        $scope.ban = true;
      }
    }; // .....

    $scope.ban2=true;
    $scope.itemsC = [];
    //seccion de busqueda de cliente y filtrado de flete
    $scope.searchC = function(name){
      if(name!==""){
        $scope.ban2 = false;
        $scope.listC=client.search(name).then(function succes(res){
          $scope.itemsC = res;
        });
        console.log(name);
      }
      else{
        console.log(name);
        $scope.ban2 = true;
      }
    };

    // secccion de la equis para eliminar lo escrito
    $scope.emptySearch = function () {
      $scope.form.search = "";
      $scope.ban = true;
      $scope.ban2 = true;
      $scope.ban3 = true;
    }; // ......

    //filtrar los datos por el nombre de cliente (cambiar por id)
    $scope.filtradoCl = function (search){
      $scope.ban2 = true;
      $scope.cliente.nombrecliente=search.cliente;
      $scope.cliente.fc=search.idclientes;
      console.log("el nombre de cliente es: "+$scope.cliente.nombrecliente);
    }

    //llenar los datos de equipo en el vale de combustible
    $scope.aux=[];
    $scope.llenadoEq = function (){
      let idE=$scope.cliente.equipo;
      if ($scope.cliente.equipo !== "") {
         vale.searchEquipo(idE).then(function succes(res){
            $scope.aux=res;
            $.each(res, function(key,val){ //--TEST SEGUIR PROBANDO :C
              $scope.cliente.nroe=val.num_economico;
              $scope.cliente.placa=val.placas;
            });
          }); 
      }
      else{
        console.log("no hay datos en equipo ID");
      }
    }

    //llenar los datos de fletes en el vale de combustible
    $scope.llenadoFlete = function (search) {
      $scope.form.search = search.flete;
      $scope.band = true;
      $scope.ban = true;
      $scope.cliente.desc=search.descripcion;
      $scope.cliente.claveF=search.flete;
    }; // ......

    // llenar los datos desplegados en la lista ....
    $scope.llenado = function (search) {
      listClient();
      $scope.form.search = "";
      $scope.form.search2 = "";
     // $scope.showDisable = false;
      $scope.showCreateCliente = true;
      $scope.showSaveCliente = false;
      $scope.showEditCliente = false;
      $scope.ban2 = true;
      $scope.ban3 = true;
      $scope.cliente.idvale = search.idvale;
      $scope.cliente.fecha = formatDate(search.fechaval);
      $scope.cliente.nombrecliente = search.cliente;
      $scope.cliente.claveF = search.claveflete;
      $scope.cliente.desc = search.descflete;
      $scope.cliente.mercancia = search.claveop; // PROBAR SI TRAE EL NOMBRE DEL OPERADOR
      $scope.cliente.clave_m = search.claveop;
      $scope.cliente.equipo = search.claveeq;
      $scope.cliente.nroe = search.noeq;
      $scope.cliente.placa = search.placaeq;
      $scope.cliente.gasolinera = search.gasolinera;
      $scope.cliente.combs = search.tipocombs;
      $scope.cliente.precioCombustible = search.precio;
      $scope.cliente.cantidadcombs=search.cantidad;
      $scope.cliente.importe=search.importe;    
      
      if(search.statusV==="1") {$scope.showDisable = true; $scope.showDisableSearch = false;     $scope.mostrarStatusVale=true;}
      else {$scope.showDisable = false;  $scope.mostrarStatusVale=false;}
    }; // ......

    // actualizar lista
    $scope.resetLisr = function () {
      listClient();
      listCombustible();
    }; // ......

    //validar campos llenos
    /**NOTA: si todos los campos estan llenos deberia enviar un data=false si falta alguno un data=true */
    var validar = function (){
      for(i=0;i<7;i++) $scope.validadores[i]=false;
      let data=false;
      if($scope.cliente.claveF==null || $scope.cliente.claveF=="")
      $scope.validadores[0]=true;
      if($scope.cliente.mercancia==null)
        $scope.validadores[1]=true;
      if($scope.cliente.equipo==null)
      $scope.validadores[2]=true;
      if($scope.cliente.gasolinera==null)
      $scope.validadores[3]=true;
      if($scope.cliente.combs==null)
      $scope.validadores[4]=true;
      if($scope.cliente.cantidadcombs==null)
      $scope.validadores[5]=true;
      if($scope.cliente.nombrecliente==null || $scope.cliente.nombrecliente=="")
      $scope.validadores[6]=true;
      
      if($scope.validadores[0]==true || $scope.validadores[1]==true || $scope.validadores[2]==true || $scope.validadores[3]==true
         || $scope.validadores[4]==true || $scope.validadores[5]==true || $scope.validadores[6]==true || $scope.cliente.importe===0){
          data=true;}
      
      console.log($scope.validadores);
      console.log("El valor que retornara data es: "+data);
      return data;
    }

    var formatDate = function (fecha) {
      var date = new Date(fecha);
      return date;
    };

  }
]);
// termina el controlador de vales de combustible.....

/*********************************************************************************/
//-------------------------CRUD DE ANTICIPOS-------------------------------------//
/*********************************************************************************/

app.controller("crudAnticipos",[
  "$scope",
  "anticipos",
  "equipo",
  "crudOperator",
  "client",
  "vale",
  function($scope, anticipos, equipo, crudOperator, client,vale){
    $scope.listanticp;
    $scope.listCompl;
    $scope.anticp = {};
    $scope.anticipo = {};
    $scope.complement = {};
    $scope.liquidm = {};
    $scope.compI={};
    $scope.tractoraux = "";
    $scope.liquid = {};
    $scope.search = "";
    $scope.showMessage = true;
    $scope.showDisable = true;
    $scope.showDisable2 = true;
    $scope.showDisableAUX = true;
    $scope.showDisableV=true;
    $scope.showDisableL=true;
    $scope.mostrarAlert=false;
    $scope.mostrarAlert2=false;
    $scope.mostrarAlert3=false;
    $scope.express = "\\d+";
    $scope.listFlete;
    $scope.listOp;
    $scope.listTruck;
    $scope.listRemo;
    $scope.listRemo2;
    $scope.listDolly;
    $scope.listVale;
    $scope.serviciosOp=["","Estad\u00EDas","Maniobras","Cargos por Seguro","Peajes","Reparto","Otros"];
    $scope.validTarifa=true;
    $scope.validAC=[false,false,false];
    $scope.auxliar;
    $scope.mensajeStatus="";
    $scope.validadores = new Array();
    $scope.verificarAnticipo =false ;
    $scope.auxnum = ["","",""];
    $scope.validadores = new Array();
    $scope.validarButtons = [true,true,false,true,true];

    $scope.listOPAC=["Anticipo","Complemento"];

    $scope.buttonOption = function (option){
      switch(option){
        case 1:
          {
            $scope.showDisable = false; 
            $scope.showDisableL = false;    
            $scope.showDisableAUX = false;
            $scope.mostrarAlert=false;
            $scope.mostrarAlert2=false;
            $scope.mostrarAlert3=false;     
            $scope.validAC=[false,false,false];
            $scope.listVale=[ ];    
            $scope.anticp = {};
            $scope.anticipo = {};
            $scope.complement = {};
            $scope.liquid = {};
            $scope.anticp.fecha=new Date();
            $scope.liquid.fecha=new Date();
            listTractor();
            listRemolque();
            listDollyy();
            listRemolque2();
          }
          break;
        case 2:
          if(validar()){ //true
            console.log("FALTA ALGUN CAMPO POR LLENAR");                
          }
          else{
            unirCadenas();
            auxviaje=0;
            $scope.showDisable = true;                   
                len = Object.keys($scope.anticp).length;
                if (len > 0) {
                  if ($scope.anticp.idanticp != null) {    
                    
                    // actualizar ASIGNACION DE VIAJE .....
                      anticipos.updateViaje($scope.anticp).then(function succes(res) {
                       if (res.action === "success") {
                         $scope.ban = true;
                          Swal.fire({
                          position: "center",
                          type: "success",
                          title: "Datos actualizado",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                        //$scope.mensajeStatus=""; 
                        // segui testeando          
                              $scope.anticipo.idviaje=$scope.anticp.idanticp;
                              $scope.complement.idviaje=$scope.anticp.idanticp;
                              $scope.liquid.idviaje=$scope.anticp.idanticp;
                              console.log("el valor del id traido es de: "+$scope.anticp.idanticp);
                              console.log("el valor de valid AC es: "+$scope.validAC[0]);
                              if($scope.validAC[0]===true && $scope.verificarAnticipo===false){
                                anticipos.createAnticpV($scope.anticipo).then(function succes(res){
                                  if(res.action==="success") console.log("anticipo ya creado ya estas karnal :v");
                                  else console.log("gg wei no quedo a seguirle :^(");
                                });
                              } 
                              if($scope.validAC[1]===true){
                                anticipos.createComplement($scope.complement).then(function succes(res){
                                  if(res.action==="success") console.log("complemento ya creado ya estas karnal :v");
                                  else console.log("Cmp gg wei no quedo a seguirle :^(");
                                });
                              }
                              if($scope.validAC[2]===true){
                                anticipos.updatStatusV($scope.liquid.vale,"1").then(function succes(res){
                                  if(res.action==="success") {
                                    console.log("status de vale actualizado");
                                  }
                                  else console.log("algo salio mal no se hizo el update del vale");
                                });
                                anticipos.createLiquid($scope.liquid).then(function succes(res){
                                  if(res.action==="success") {
                                    console.log("liquidacion ya creado ya estas karnal :v");
                                  }
                                  else console.log("lqd gg wei no quedo a seguirle :^(");
                                });
                              }
                        $scope.anticp = {};
                        $scope.anticipo = {};
                        $scope.complement = {};
                        $scope.liquid = {};
                        $scope.mostrarAlert3=false;                               
                        }  else {
                          console.log(res);
                        }
                      });
                  } else {
                    anticipos.createAnticipo($scope.anticp).then(function succes(res) {
                      if(res.action === "success") {
                        $scope.ban = true;
                        Swal.fire({
                        position: "center",
                        type: "success",
                        title: "Datos exitosamente agregados",
                        showConfirmButton: false,
                        timer: 1000,
                      });
                      $scope.anticp= {};
                       //testear
                      anticipos.searchLastViaje().then(function succes(res2){              
                          $.each(res2, function(key,val){
                              $scope.anticipo.idviaje=val.idviaje;
                              $scope.complement.idviaje=val.idviaje;
                              $scope.liquid.idviaje=val.idviaje;
                              console.log("el valor del id traido es de: "+val.idviaje);
                              console.log("valor a enviar: ");
                              console.log($scope.anticipo);
                              if($scope.validAC[0]===true){
                                anticipos.createAnticpV($scope.anticipo).then(function succes(res){
                                  if(res.action==="success") console.log("anticipo ya creado ya estas karnal :v");
                                  else console.log("gg wei no quedo a seguirle :^(");
                                });
                              }       
                          });
                      });
                    }
                      else{
                        console.log(res);
                      }
                    }); // fin de crear anticipo
                  }
                } else {
                  $scope.showDisable = false;
                  $scope.showDisable2 = false;
                  $scope.anticp= {};
                }  
          } // fin del else de validar
                                                        
          break;
        case 3:
          //$scope.editBan = false;
          $scope.anticp={};
          $scope.anticipo={};
          $scope.complement={};
          $scope.liquid={};

          $scope.showMessage = true;
          $scope.showDisable = true;
          $scope.showDisable2 = true;
          $scope.showDisableAUX = true;
          $scope.showDisableV=true;
          $scope.showDisableL=true;
          $scope.mostrarAlert=false;
          $scope.mostrarAlert2=false;
          $scope.mostrarAlert3=false;
          $scope.validTarifa=true;
          $scope.validAC=[false,false,false];
          break;
        case 4:
          console.log("test de objectos");
          console.log($scope.anticp);
          console.log($scope.anticipo);
          console.log($scope.complement);
          console.log($scope.liquid);
          break;
      }
    };

    //buscar anticipo (viaje)
    $scope.ban4=true;
    $scope.search = function(name){
      $scope.anticp={};
      $scope.anticipo={};
      $scope.complement={};
      $scope.liquid={};
      $scope.validAC=[false,false,false];
      $scope.mostrarAlert=false;
      if(name!==""){
        $scope.ban4=false;
        $scope.listC=anticipos.search(name).then(function succes(res){
          $scope.items = res;
        });
        
      }
      else{
        $scope.ban4=true;
      }
    }

    //seccion de busqueda de Remitente (Cliente)
    $scope.ban=true;
    $scope.items = [];
    $scope.searchC = function(name){
      $scope.anticp.tractor="";
      $scope.anticp.placasT="";
      $scope.anticp.remolque="";
      $scope.anticp.placasR1="";
      $scope.anticp.dolly="";
      $scope.anticp.remolque2="";
      $scope.anticp.placasD="";
      $scope.anticp.placasR2="";
      $scope.anticp.claveFlete="";
      $scope.validTarifa=true;
      if(name!==""){
        $scope.ban= false;
        $scope.listC=client.search(name).then(function succes(res){
          $scope.items = res;
        });
      }
      else{
        $scope.ban = true;
      }
    };

    //llenar los datos del cliente
    $scope.filtradoCl = function (search){
      $scope.ban = true;
      $scope.anticp.cliente=search.cliente;
      $scope.anticp.idcliente=search.idclientes;
      $scope.anticp.home=search.domicilio;     
      
    }

    //LLenar select con los equipos tipo tractor
    var listTractor= function () {
      let aux="Tractor";
      anticipos.readEquiposA(aux).then(function succes(res) {
      $scope.listTruck = res;
      });
    };

    //LLenar select con los equipos tipo remolque (plataforma)
    var listRemolque= function () {
      anticipos.readEquiposA("Plataforma").then(function succes(res) {
        $scope.listRemo=res;
      anticipos.readEquiposA("Plataforma encortinada").then(function succes(res) {
        $scope.listRemo=res.concat($scope.listRemo);
        });
      });

    };
    
    //LLenar select con los equipos tipo dolly
    var listDollyy= function () {
      anticipos.readEquiposA("Dolly").then(function succes(res) {
      $scope.listDolly = res;
      });
    };

    //LLenar select con los equipos tipo plataforma encotinada
    var listRemolque2= function () {
      anticipos.readEquiposA("Plataforma").then(function succes(res) {
        $scope.listRemo2=res;
      anticipos.readEquiposA("Plataforma encortinada").then(function succes(res) {
        $scope.listRemo2=res.concat($scope.listRemo2);
        });
      });
    };

    //llenar los datos de placas del tractor
    $scope.llenadoTruck = function (){
      let idE=$scope.anticp.tractor;
      if ($scope.anticp.tractor !== "") {
         anticipos.searchEq(idE).then(function succes(res){
            $.each(res, function(key,val){
              $scope.anticp.nroT=val.num_economico;
              $scope.anticp.placasT=val.placas;
              $scope.llenarVales(val.placas);
            });
          });
  
      }
      else{
        console.log("no hay datos en equipo ID");
      }
    }

    //llenar los datos de vales de combustible
    $scope.llenarVales= function(val){
      console.log("VALORES DE BUSQUEDA PARA LOS VALES: "+$scope.anticp.cliente+" -- "+$scope.anticp.claveFlete);      
      anticipos.readVales($scope.anticp.cliente,$scope.anticp.claveFlete,val).then(function succes(res) {
        $scope.listVale = res;
        }); 
    };

    //llenar los datos de placas de remolque
    $scope.llenadoRemolque = function (){
      let idE=$scope.anticp.remolque;
      if ($scope.anticp.remolque !== "") {
         anticipos.searchEq(idE).then(function succes(res){
            $.each(res, function(key,val){
              $scope.anticp.nroR1=val.num_economico;
              $scope.anticp.placasR1=val.placas;
              /********************************/
              anticipos.readEquiposAfil("Plataforma",val.num_economico).then(function succes(res) {
                $scope.listRemo2=res;
              anticipos.readEquiposAfil("Plataforma encortinada",val.num_economico).then(function succes(res) {
                $scope.listRemo2=res.concat($scope.listRemo2);
                });
              });
              /********************************/ 
            });

          }); 
      }
      else{console.log("no hay datos en equipo ID");}
      
      /*
      anticipos.readEquiposA("Plataforma").then(function succes(res) {
        $scope.listRemo2=res;
      anticipos.readEquiposA("Plataforma encortinada").then(function succes(res) {
        $scope.listRemo2=res.concat($scope.listRemo);
        });
      });
      */

    }

    //llenar los datos de placas de remolque 2
    $scope.llenadoRemolque2 = function (){
      let idE=$scope.anticp.remolque2;
      if ($scope.anticp.remolque2 !== "") {
         anticipos.searchEq(idE).then(function succes(res){
            $.each(res, function(key,val){
              $scope.anticp.nroR2=val.num_economico;
              $scope.anticp.placasR2=val.placas;
              /********************************/
              anticipos.readEquiposAfil("Plataforma",val.num_economico).then(function succes(res) {
                $scope.listRemo=res;
              anticipos.readEquiposAfil("Plataforma encortinada",val.num_economico).then(function succes(res) {
                $scope.listRemo=res.concat($scope.listRemo);
                });
              });
              /********************************/ 
            });
          }); 
      }
      else{
        console.log("no hay datos en equipo ID");
      }
    }

    //llenar los datos de placas de Dolly
    $scope.llenadoDolly = function (){
      let idE=$scope.anticp.dolly;
      if ($scope.anticp.dolly !== "") {
         anticipos.searchEq(idE).then(function succes(res){
            $.each(res, function(key,val){
              $scope.anticp.nroD=val.num_economico;
              $scope.anticp.placasD=val.placas;
            });
          }); 
      }
      else{
        console.log("no hay datos en equipo ID");
      }
    }

    //llenar los datos de fletes 
    $scope.llenadoFlete = function (val) {
      $scope.ban5=true;
      $scope.anticp.clave=val.idorigen;
      $scope.anticp.claveFlete=val.flete;
      $scope.anticp.recolecta=val.Lcarga;
      $scope.anticp.destino=val.destino;
      $scope.anticp.destinro=val.destinatario;
      $scope.anticp.homeD=val.Odomicilio;
      $scope.anticp.merch=val.Omercancia;
      $scope.anticp.entrega=val.Lentrega;
      $scope.anticp.distancia=val.distancia;
      $scope.anticp.tarifa=val.tarifas;
      $scope.anticp.tipoT=val.costo;
      $scope.anticp.descripcionS=val.descripcion;
      //$scope.anticp.merch=val.mercancia;
      if(val.tarifas!=="Tonelada"){ 
        $scope.anticp.importe=val.costo;
        //prender o apagar dolly y remolque 2
        if(val.tarifas==="T3-S2") {$scope.showDisable2=true;}
          else {$scope.showDisable2=false;}
      }
      else {$scope.anticp.importe=""; $scope.validTarifa=false;
            }

        

    }; // ......

    
    //seccion de busqueda de Operador
    $scope.ban2=true;
    $scope.searchOp = function(name){
      if(name!==""){
        $scope.ban2 = false;
        $scope.listOp=crudOperator.searchOperator(name).then(function succes(res){
          $scope.items = res;
        });
      }
      else  $scope.ban2 = true;
    };

    $scope.ban5=true;
    //seccion de busqueda de flete del cliente
    $scope.searchFlete = function (name) {
      if (name !== "") {
        $scope.ban5 = false;
        $scope.listC = vale.searchFlete(name,$scope.anticp.idcliente).then(function succes(res) {  
          $scope.items = res;
        });
      } else {
        $scope.ban5 = true;
      }
    }; // .....

    //llenar los datos del Operador
    $scope.filtradoOp = function (search){
      $scope.ban2 = true;
      $scope.anticp.idop=search.idoperador;
      $scope.anticp.operator=search.nombre;
      $scope.anticp.license=search.num_licencia;
      $scope.anticp.validity=formatDate(search.vig_hasta);
    }

    //seccion de busqueda de Equipo
    $scope.ban3=true;
    $scope.searchEq= function(name){
      if(name!==""){
        $scope.ban3 = false;
        $scope.listOp=equipo.searchEquipo(name).then(function succes(res){
          $scope.items = res;
        });
      }
      else  $scope.ban3 = true;
    };

    //Operaciones del importe y sumas
    $scope.Operaciones= function (){

      let val=0, val1=0,val2=0,val3=0,auxt=0, subt=0, ivaA=0;
      if($scope.anticp.importe) {subt+=(parseFloat($scope.anticp.importe));}
      if($scope.anticp.importe1) {subt+=(parseFloat($scope.anticp.importe1));}
      if($scope.anticp.importe2) {subt+=(parseFloat($scope.anticp.importe2));}
      if($scope.anticp.importe3) {subt+=(parseFloat($scope.anticp.importe3));}
      val=parseInt($scope.anticp.importe);

      if($scope.anticp.servicio1=="Reparto") val1=$scope.anticp.importe1;
      if($scope.anticp.servicio2=="Reparto") val2=$scope.anticp.importe2;
      if($scope.anticp.servicio3=="Reparto") val3=$scope.anticp.importe3;
      $scope.anticp.subtotal=parseFloat(subt).toFixed(2);  //CORREGIR /////////////////
      ivaA=subt*0.16;
      $scope.anticp.iva=ivaA.toFixed(2);
      auxt=((val+val1+val2+val3)*0.04);
      $scope.anticp.retencion=auxt.toFixed(2);
      $scope.anticp.total=(subt+(ivaA)-auxt).toFixed(2);
    }

    //generar importe por tonelada
    $scope.importeTon = function (val){
      let aux;
      //if($scope.anticp.tarifa==="Tonelada"){$scope.anticp.importe=$scope.anticp.tipoT; $scope.validTarifa = validTonelada(val);}
      if(($scope.anticp.tarifa==="T3-S2-R4" && val<30) || ($scope.anticp.tarifa==="T3-S2" && val>32)){
        $scope.validadores[5]=true; //$scope.showDisable2=true;
      }
      else $scope.validadores[5]=false;
      
      if($scope.validTarifa==false && $scope.anticp.tarifa==="Tonelada"){
        if(validTonelada(val)){$scope.showDisable2=true; $scope.anticp.dolly=""; $scope.anticp.remolque2=""; $scope.anticp.placasD=""; $scope.anticp.placasR2="";}
        else $scope.showDisable2=false;
        aux=(val*$scope.anticp.tipoT).toFixed(2);
        $scope.anticp.importe=aux;
      }
    }

    //operaciones de Anticipos y Complementos
    $scope.operacionesAC= function () {

      if($scope.anticp.fecha){
      $scope.showDisableV=true;
      console.log($scope.anticp.cliente);
      if($scope.anticp.opeAC=="Anticipo"){
        console.log($scope.anticipo);
        $scope.validAC[1]=false;
        if(!$scope.validAC[0]){
          $scope.anticp.ACfecha=new Date();
          $scope.anticp.ACimporte="";
          $scope.anticp.ACdesc= "";
          $scope.showDisableV=false;
          $scope.mostrarAlert=false;
        }else{
          $scope.mostrarAlert=true;
          $scope.anticp.ACfecha=$scope.anticipo.fecha;
          $scope.anticp.ACimporte=$scope.anticipo.importe;
          $scope.anticp.ACdesc= $scope.anticipo.desc;
          console.log("Mensaje alerta: Anticipo ya creado");
        }
      }
      else{
        if($scope.anticp.statusL==="1"){
          $scope.validAC[1]=true;
        }
        $scope.anticp.ACfecha=new Date();
        $scope.anticp.ACimporte="";
        $scope.anticp.ACdesc= "";
        $scope.showDisableV=false;
        $scope.mostrarAlert=false;
        console.log($scope.complement);
        if($scope.anticp.statusL==="1"){
          $scope.showDisableV=true;
          $scope.mostrarAlert=false;
          $scope.anticp.ACfecha="";
          $scope.anticp.ACimporte="";
          $scope.anticp.ACdesc= "";
        }
      }
      }
      else{
        console.log("NO SE HA DADO A NUEVO PARA ABRIR LOS FORMULARIOS");
      }
    }

    //agregar anticipo o complemento
    $scope.agregaAC = function(){

      $scope.showDisableV=true;
      if($scope.anticp.opeAC=="Anticipo"){
        $scope.validAC[0]=true;
        $scope.anticipo.fecha=$scope.anticp.ACfecha;
        $scope.anticipo.importe=$scope.anticp.ACimporte;
        $scope.anticipo.desc=$scope.anticp.ACdesc;
      }
      if($scope.anticp.opeAC=="Complemento"){
        $scope.validAC[1]=true;
        $scope.complement.fecha=$scope.anticp.ACfecha;
        $scope.complement.importe=$scope.anticp.ACimporte;
        $scope.complement.desc=$scope.anticp.ACdesc;
      }
      /********************/
        Swal.fire({
          position: "center",
          type: "success",
          title: "Anticipo/Complemento Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
        $scope.anticp.ACfecha="";
        $scope.anticp.ACimporte="";
        $scope.anticp.ACdesc="";
        $scope.anticp.opeAC=""
    }

    //agregar liquidacion
    $scope.agregaLiquid = function(){

      if(!$scope.validAC[2]){
        let util1, utilpor1;
          $scope.validAC[2]=true;
          $scope.showDisableL=false;
          $scope.mostrarAlert2=true;
          anticipos.sumComplement($scope.anticp.idanticp).then(function succes(res){
            $.each(res, function(key,val){
              if(val.total!=null) {$scope.liquid.sumCom=val.total;}
              else $scope.liquid.sumCom=0;
              
              $scope.importesLiquid();
              //util1=((parseFloat($scope.anticp.subtotal)-parseFloat($scope.liquid.total))).toFixed(2);
              util1=((parseFloat($scope.anticp.subtotal)-parseFloat($scope.liquid.suma))).toFixed(2);
              utilpor1=((util1*100)/parseFloat($scope.anticp.total)).toFixed(2);
              let color = '';

              $scope.liquidm.suma = parseFloat($scope.liquid.suma).toFixed(2);
              $scope.liquidm.anticipo = parseFloat($scope.anticipo.importe).toFixed(2);
              $scope.liquidm.complementos = parseFloat($scope.liquid.sumCom).toFixed(2);
              $scope.liquidm.total = parseFloat($scope.liquid.total).toFixed(2);
              $scope.liquidm.fletes = parseFloat($scope.anticp.subtotal).toFixed(2);
              $scope.liquidm.util = parseFloat(util1).toFixed(2);

              if(utilpor1<30 ) color = 'red';
              else if(utilpor1>30 && utilpor1<40) color='orange';
              else if(utilpor1>40) color = 'green';

              /********************/
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success'
                },
                buttonsStyling: false
              })              
              //let sumaux = $scope.liquid.suma.toFixed(2);
              //let sumaux = $scope.liquid.suma.toFixed(2);
              //let sumaux = $scope.liquid.suma.toFixed(2);
              swalWithBootstrapButtons.fire({
                  position: "center",
                  type: "success",
                  title: "Liquidacion Agregada",
                   html:
                   "<div class='row'> <div class='col-md-6 col-xs-6 col-lg-6'>" +
                   "<b><span class='float-right'>Total de gastos de viaje: </span></div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right'> $"+parseFloat($scope.liquid.suma).toFixed(2)+" </span></b></div></div><br>"+
                   "<div class='row'> <div class='col-md-6 col-xs-6 col-lg-6' ><b><span class='float-right'>Anticipos:</span> </div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right'> $ -"+parseFloat($scope.anticipo.importe).toFixed(2)+"</span></b></div></div>"+
                   "<div class='row'> <div class='col-md-6 col-xs-6 col-lg-6'><b><span class='float-right'>Complementos: </span></div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right'> $ -"+parseFloat($scope.liquid.sumCom).toFixed(2)+"</span></b></div></div>"+
                   "<div class='row'> <div class='col-md-6 col-xs-6 col-lg-6'><b><span class='float-right'>Vale de Combustible: </span></div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right'> $ -"+parseFloat($scope.liquid.importeVale).toFixed(2)+"</span></b></div></div>"+
                   "<div class='row'> <div class='col-md-6 col-xs-6 col-lg-6'><b><span class='float-right'>Sueldo a pagar: </span></div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right'> $ "+parseFloat(parseFloat($scope.liquid.total).toFixed(2)-parseFloat($scope.liquid.importeVale).toFixed(2)).toFixed(2)+"</span></b></div></div>"+
                   "<br><div class='row'> <div class='col-md-6 col-xs-6 col-lg-6'><b><span class='float-right'>Importe de fletes : </span></div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right'> $ "+parseFloat($scope.anticp.subtotal).toFixed(2)+"</span></b></div></div>"+
                   "<div class='row'> <div class='col-md-6 col-xs-6 col-lg-6'><b><span class='float-right' >Utilidad: </span></div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right' style='color:"+color+";'> $"+parseFloat(util1).toFixed(2)+"</span></b></div></div>"+
                   "<div class='row'> <div class='col-md-6 col-xs-6 col-lg-6'><b><span class='float-right'>Utilidad en porcentaje: </span></div><div class='col-md-6 col-xs-6 col-lg-6'><span class='float-right'  style='color:"+color+";'> "+utilpor1+"%</span></b></div></div>",                   
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true,
                   
                });
              });           
          });  
          
      }
    };

    //funcion para generar la liquidacion
    $scope.generarLiquid = function(){
      let aux=0;
      $scope.liquidm.sueldo=$scope.liquid.sueldo;
      console.log("testitoooo :cccc"+$scope.anticp.idviaje);
      if($scope.liquid.caseta) $scope.liquidm.caseta=$scope.liquid.caseta; else $scope.liquidm.caseta=parseFloat(aux).toFixed(2);
      if($scope.liquid.aguas)$scope.liquidm.aguas=$scope.liquid.aguas; else $scope.liquidm.aguas=parseFloat(aux).toFixed(2);
      if($scope.liquid.diesel)$scope.liquidm.diesel=$scope.liquid.diesel; else $scope.liquidm.diesel=parseFloat(aux).toFixed(2);
      if($scope.liquid.ruta)$scope.liquidm.ruta=$scope.liquid.ruta; else $scope.liquidm.ruta=parseFloat(aux).toFixed(2);
      if($scope.liquid.maniobra)$scope.liquidm.maniobra=$scope.liquid.maniobra; else $scope.liquidm.maniobra=parseFloat(aux).toFixed(2);
      if($scope.liquid.tel)$scope.liquidm.tel=$scope.liquid.tel; else $scope.liquidm.tel=parseFloat(aux).toFixed(2);
      if($scope.liquid.estancia)$scope.liquidm.estancia=$scope.liquid.estancia; else $scope.liquidm.estancia=parseFloat(aux).toFixed(2);
      if($scope.liquid.pension)$scope.liquidm.pension=$scope.liquid.pension; else $scope.liquidm.pension=parseFloat(aux).toFixed(2);
      $scope.importesLiquid();
    };

    // llenar los datos desplegados en la lista ....
    $scope.llenado = function (search) {
      //listanticp();
      $scope.liquid.fecha=new Date();
      $scope.ban4=true;
      $scope.form.search = "";
      $scope.showDisable = false;
      $scope.mostrarAlert2=false;
      $scope.anticp.idanticp = search.idviaje;
      $scope.anticp.fecha = formatDate(search.fecha);
      $scope.anticp.lugar = search.lugarexp;
      $scope.anticp.idcliente=search.idremi;
      $scope.anticp.cliente = search.cliente;
      $scope.anticp.home = search.domicilio;
      $scope.anticp.clave= search.idorigen;
      $scope.anticp.claveFlete = search.flete;
      $scope.anticp.merch = search.Omercancia;
      $scope.anticp.recolecta = search.Lcarga;
      $scope.anticp.destino = search.destino;
      $scope.anticp.destinro = search.destinatario;
      $scope.anticp.homeD = search.Odomicilio;
      $scope.anticp.entrega = search.Lentrega;
      $scope.anticp.distancia = search.distancia;
      $scope.anticp.idop=search.idope;
      $scope.anticp.operator = search.nombre;
      $scope.anticp.license = search.num_licencia;
      $scope.anticp.validity = formatDate(search.vig_hasta);
      $scope.anticp.tarifa = search.tarifas;
      let arrV = search.vehiculo.split("-");
      let arrP = search.placas.split("/");
      let arrS = search.servicio.split("/");
      let arrDs = search.descS.split("/");
      let arrIs = search.importeS.split("/");
      $scope.llenarVales(arrP[0]);
      if(search.tarifas==="T3-S2"){
        $scope.anticp.tractor = arrV[0]; $scope.anticp.remolque = arrV[1];
        $scope.anticp.placasT = arrP[0];$scope.anticp.placasR1 = arrP[1];
      }
      else{
        $scope.showDisable2=false;
        $scope.anticp.tractor = arrV[0];$scope.anticp.remolque = arrV[1];
        $scope.anticp.dolly = arrV[2];$scope.anticp.remolque2 = arrV[3];   
        
        $scope.anticp.placasT = arrP[0];$scope.anticp.placasR1 = arrP[1];
        $scope.anticp.placasD = arrP[0];$scope.anticp.placasR2 = arrP[2];
      }
      
      if($scope.anticp.tarifa==="Tonelada") $scope.validTarifa= false;

      $scope.anticp.documentos = search.documentos;
      $scope.anticp.peso = search.peso;
      $scope.anticp.tipoT = search.costo;
      $scope.anticp.carta = search.cartap;

      if(arrS.length == 1){
        $scope.anticp.servicio = arrS[0];
        $scope.anticp.descripcionS = arrDs[0];
        $scope.anticp.importe = parseFloat(arrIs[0]).toFixed(2);
      }
      else if(arrS.length == 2){
        $scope.anticp.servicio = arrS[0];$scope.anticp.servicio1 = arrS[1];

        $scope.anticp.descripcionS = arrDs[0];$scope.anticp.descripcionS1 = arrDs[1];

        $scope.anticp.importe = parseFloat(arrIs[0]).toFixed(2);$scope.anticp.importe1 = parseFloat(arrIs[1]).toFixed(2);
      }
      else if(arrS.length == 3){
        $scope.anticp.servicio = arrS[0];$scope.anticp.servicio1 = arrS[1];$scope.anticp.servicio2 = arrS[2];

        $scope.anticp.descripcionS = arrDs[0];$scope.anticp.descripcionS1 = arrDs[1];$scope.anticp.descripcionS2 = arrDs[2];

        $scope.anticp.importe = parseFloat(arrIs[0]).toFixed(2);$scope.anticp.importe1 =parseFloat(arrIs[1]).toFixed(2);$scope.anticp.importe2 =parseFloat(arrIs[2]).toFixed(2);
      }
      else if(arrS.length == 4){
        $scope.anticp.servicio = arrS[0];$scope.anticp.servicio1 = arrS[1];
        $scope.anticp.servicio2 = arrS[2];$scope.anticp.servicio3 = arrS[3];

        $scope.anticp.descripcionS = arrDs[0];$scope.anticp.descripcionS1 = arrDs[1];
        $scope.anticp.descripcionS2 = arrDs[2];$scope.anticp.descripcionS3 = arrDs[3];

        $scope.anticp.importe = parseFloat(arrIs[0]).toFixed(2);$scope.anticp.importe1 =parseFloat(arrIs[1]).toFixed(2);
        $scope.anticp.importe2 =parseFloat(arrIs[2]).toFixed(2);$scope.anticp.importe3 =parseFloat(arrIs[3]).toFixed(2);
      }

      let arrT =search.total.split("/");
      $scope.anticp.subtotal = parseFloat(arrT[0]).toFixed(2);
      $scope.anticp.iva= parseFloat(arrT[1]).toFixed(2);
      $scope.anticp.retencion= parseFloat(arrT[2]).toFixed(2);
      $scope.anticp.total= parseFloat(arrT[3]).toFixed(2);

      $scope.mostrarAlert3=true;
      if(search.statusA!=""){$scope.anticp.statusA = search.statusA; $scope.validAC[0]=true; $scope.verificarAnticipo=true; $scope.validarButtons[0]=false;}
      else $scope.validarButtons[0]=true;
      if(search.statusL!=""){$scope.anticp.statusL = search.statusL; $scope.validAC[2]=true; 
                             $scope.mensajeStatus="VIAJE LIQUIDADO"; $scope.showDisable=true;
                            $scope.showDisable2=true; $scope.validarButtons[3]=false;}
      else {$scope.mensajeStatus="VIAJE EN TR\u00C1NSITO"; $scope.showDisable=false;$scope.showDisableL=false; $scope.validarButtons[3]=true;}                     
      

      // VALIDAR SI EXISTE O NO ANTICIPOS, COMPLEMENTOS Y/o LIQUDICACION , CAMBIAR POSIBLEMENTE A OTRA FUNCTION
      if(search.statusA==="1") {
        anticipos.searchAnticipo(search.idviaje).then(function succes(res) {
          $.each(res, function(key,val){ //--TEST SEGUIR PROBANDO :C
            $scope.anticipo.idant=val.idanticipo;
            $scope.anticipo.fecha=formatDate(val.fecha);
            $scope.anticipo.fechaImprimir=formatDate2(val.fecha);
            $scope.anticipo.importe=val.importe;
            $scope.anticipo.desc=val.descripcion;
            $scope.anticipo.idviaje=val.idviaje;
            $scope.auxnum[0]=NumeroALetras(val.importe).toLowerCase();
            console.log($scope.anticipo);
          });
        });
      }

      //validar si existe la liqudiacion
      if(search.statusL==="1"){
        $scope.showDisableV=true;
        $scope.showDisableL=true;
        anticipos.searchLiquid(search.idviaje).then(function succes(res) {
          $.each(res, function(key,val){
            $scope.liquid.idliq=val.idliquid;
            $scope.liquid.fecha=formatDate(val.fecha);
            $scope.liquid.fechaImprimir=formatDate2(val.fecha);
            $scope.liquid.vale=val.idcomb;
            $scope.liquid.sueldo=val.sueldo;
            $scope.liquid.caseta=val.caseta;
            $scope.liquid.aguas=val.aguas;
            $scope.liquid.diesel=val.diesel;
            $scope.liquid.ruta=val.ruta;
            $scope.liquid.maniobra=val.maniobra;
            $scope.liquid.tel=val.tel;
            $scope.liquid.estancia=val.estancia;
            $scope.liquid.pension=val.pension;
            $scope.liquid.idviaje=val.idviaje;
            $scope.llenadoVale();
          });
        });
      } 

      if(search.tarifas==="Tonelada"){
        if(validTonelada(search.peso)){$scope.showDisable2=true;}
        else $scope.showDisable2=false; 
      }

      anticipos.readCompl($scope.anticp.idanticp).then(function succes(res) {
        $scope.listCompl=res;
        if(res.length){
          $scope.validarButtons[1]=false;
          $scope.validarButtons[2]=true;
        }
        else{
          $scope.validarButtons[1]=true;
          $scope.validarButtons[2]=false;          
        }
        });
      anticipos.searchTruck(arrV[0]).then(function succes(res) {
          $.each(res, function(key,val){
              $scope.tractoraux=val.num_economico;
            });
        });        
      console.log(arrS);      
    }; // ......  
    
    // llenar datos del vale de combustible
    $scope.llenadoVale = function (){
      let idE=$scope.liquid.vale;
      if ($scope.liquid.vale !== "") {
         anticipos.searchValeE(idE).then(function succes(res){
            $.each(res, function(key,val){
              $scope.liquid.importeVale=val.importe;
              $scope.liquid.valeComb=val.idvale;
            });
          }); 
      }
      else{
        console.log("no hay datos en equipo ID");
      }
    };

    // llenar datos del complemento para imprimir
    $scope.llenarComp = function (){
      let idE=$scope.compI.folio;
      if ($scope.compI.folio !== "") {
         anticipos.searchComp(idE).then(function succes(res){
            $.each(res, function(key,val){
              $scope.compI.fecha=formatDate2(val.fecha);
              $scope.compI.importe=val.importe;
              $scope.auxnum[1]=NumeroALetras(val.importe).toLowerCase();
            });
          }); 
      }
      else{
        console.log("no hay datos en equipo ID");
      }
    };

    //juntar los datos extra para la bd
    var unirCadenas = function (){
      if($scope.anticp.remolque2 && $scope.anticp.dolly){
        $scope.anticp.vehiculo =$scope.anticp.tractor+"-"+$scope.anticp.remolque+"-"+$scope.anticp.dolly+"-"+$scope.anticp.remolque2;
        $scope.anticp.vplacas=$scope.anticp.placasT+"/"+$scope.anticp.placasR1+"/"+$scope.anticp.placasD+"/"+$scope.anticp.placasR2;
      }
      else{ 
        $scope.anticp.vehiculo =$scope.anticp.tractor+"-"+$scope.anticp.remolque;
        $scope.anticp.vplacas=$scope.anticp.placasT+"/"+$scope.anticp.placasR1;      
      }
      console.log("el vehiculo creado es: "+$scope.anticp.vehiculo);
      console.log("las placas a enviar son: "+$scope.anticp.vplacas);

      //servicios -nombres
      $scope.anticp.services="Flete";
      if($scope.anticp.servicio1){$scope.anticp.services+="/"+$scope.anticp.servicio1;}
      if($scope.anticp.servicio2){$scope.anticp.services+="/"+$scope.anticp.servicio2;}
      if($scope.anticp.servicio3){$scope.anticp.services+="/"+$scope.anticp.servicio3;}
      console.log("los servicios a mandar son: "+$scope.anticp.services);

      //descripciones
      $scope.anticp.descS=$scope.anticp.descripcionS;
      if($scope.anticp.descripcionS1){$scope.anticp.descS+="/"+$scope.anticp.descripcionS1;}
      if($scope.anticp.descripcionS2){$scope.anticp.descS+="/"+$scope.anticp.descripcionS2;}
      if($scope.anticp.descripcionS3){$scope.anticp.descS+="/"+$scope.anticp.descripcionS3;}
      console.log("las descripciones a mandar son: "+$scope.anticp.descS);

      //importes 
      $scope.anticp.importeS=$scope.anticp.importe;
      if($scope.anticp.importe1) $scope.anticp.importeS+="/"+$scope.anticp.importe1;
      if($scope.anticp.importe2) $scope.anticp.importeS+="/"+$scope.anticp.importe2;
      if($scope.anticp.importe3) $scope.anticp.importeS+="/"+$scope.anticp.importe3;
      console.log("los importes a enviar son: "+$scope.anticp.importeS);

      //guardar totales
      $scope.anticp.totales=$scope.anticp.subtotal+"/"+$scope.anticp.iva+"/"+$scope.anticp.retencion+"/"+$scope.anticp.total;
      console.log("los totales a enviar son: "+$scope.anticp.totales);

      if($scope.anticipo.fecha && $scope.anticipo.importe && $scope.anticipo.desc) 
          $scope.anticp.statusA=true;
      else $scope.anticp.statusA=false;   

      if($scope.mostrarAlert2) 
          $scope.anticp.statusL=true;
      else $scope.anticp.statusL=false;   
    };

    //var validar la tarifa y peso cuando es tonelada true = sencillo false=full
    var validTonelada = function (val){
      if(val<30) return true;
      else if (30<val && val<52) return false;
      //corregir a futuro y retirar else o preguntar
      else return false;
    };

    // function formato fecha para type date
    var formatDate = function (fecha) {
      var date = new Date(fecha);
      return date;
    };

    var formatDate2 = function (fecha) {
      var date = new Date(fecha);
      var aux =parseInt(date.getMonth())+1;
      var dat2 =date.getDate()+"/"+aux+"/"+date.getFullYear();
      return dat2;
    };

    $scope.limpiarServicio = function(val){
      if(val==="" && ($scope.anticp.importe1 || $scope.anticp.descripcionS1)) {
        $scope.anticp.importe1 ="";
        $scope.anticp.descripcionS1=""; 
      }
      else if(val==="" && ($scope.anticp.importe2 || $scope.anticp.descripcionS2)) {
        $scope.anticp.importe2 ="";
        $scope.anticp.descripcionS2 =""; 
      }
      else if(val==="" && ($scope.anticp.importe3 || $scope.anticp.descripcionS3)) {
        $scope.anticp.importe3 ="";
        $scope.anticp.descripcionS3 =""; 
      }
    }

    // function para tener los totales de liquidacion
    $scope.importesLiquid = function(){
      let vaux=[0,0,0,0,0,0,0,0,0,0];
      let aux=0,aux2=0,aux3=0,aux4=0,aux5=0,aux6=0,aux7=0,aux8=0,aux9=0,aux10=0,aux11="";
      let util1, utilpor1;
      if($scope.liquid.sueldo) aux=parseFloat($scope.liquid.sueldo);
      if($scope.liquid.caseta) aux2=parseFloat($scope.liquid.caseta);
      if($scope.liquid.aguas) aux3=parseFloat($scope.liquid.aguas);
      if($scope.liquid.diesel) aux4=parseFloat($scope.liquid.diesel);
      if($scope.liquid.importeVale) aux5=parseFloat($scope.liquid.importeVale); else $scope.liquid.importeVale=0;
      if($scope.liquid.ruta) aux6=parseFloat($scope.liquid.ruta);
      if($scope.liquid.maniobra) aux7=parseFloat($scope.liquid.maniobra);
      if($scope.liquid.tel) aux8=parseFloat($scope.liquid.tel);
      if($scope.liquid.estancia) aux9=parseFloat($scope.liquid.estancia);
      if($scope.liquid.pension) aux10=parseFloat($scope.liquid.pension);
               
      $scope.liquid.suma= (aux+aux2+aux3+aux4+aux5+aux6+aux7+aux8+aux9+aux10).toFixed(2);
      if($scope.liquid.sumCom)
      $scope.liquid.total=(parseFloat($scope.liquid.suma)-parseFloat($scope.anticipo.importe)-parseFloat($scope.liquid.sumCom)).toFixed(2);
      else       $scope.liquid.total=(parseFloat($scope.liquid.suma)-parseFloat($scope.anticipo.importe)).toFixed(2);
      
      // para imprimir 
      if($scope.anticp.statusL!==""){
        anticipos.sumComplement($scope.anticp.idanticp).then(function succes(res){
          $.each(res, function(key,val){
            if(val.total!=null) {$scope.liquid.sumCom=val.total;}
            else $scope.liquid.sumCom=0;
            
            if($scope.liquid.sumCom)
            $scope.liquid.total=(parseFloat($scope.liquid.suma)-parseFloat($scope.anticipo.importe)-parseFloat($scope.liquid.sumCom)).toFixed(2);
            else       $scope.liquid.total=(parseFloat($scope.liquid.suma)-parseFloat($scope.anticipo.importe)).toFixed(2);
            console.log("el valor de la suma de complementos es : "+$scope.liquid.sumCom);
            util1=((parseFloat($scope.anticp.subtotal)-parseFloat($scope.liquid.suma))).toFixed(2);
            utilpor1=((util1*100)/parseFloat($scope.anticp.total)).toFixed(2);
      
            $scope.liquidm.suma = parseFloat($scope.liquid.suma).toFixed(2);
            $scope.liquidm.anticipo = parseFloat($scope.anticipo.importe).toFixed(2);
            $scope.liquidm.complementos = parseFloat($scope.liquid.sumCom).toFixed(2);
            $scope.liquidm.total = parseFloat($scope.liquid.total).toFixed(2);
            $scope.liquidm.fletes = parseFloat($scope.anticp.subtotal).toFixed(2);
            $scope.liquidm.util = parseFloat(util1).toFixed(2);
            // sueldo = (subtotal - suma)- vale 
            $scope.liquidm.sueldo =parseFloat(parseFloat($scope.liquid.total).toFixed(2)-parseFloat($scope.liquid.importeVale).toFixed(2)).toFixed(2);
            //$scope.liquidm.sueldo = parseFloat($scope.anticp.subtotal).toFixed(2)-parseFloat($scope.liquid.suma).toFixed(2);  
          });
          });




      }
    };

    //imprimir anticipo
    $scope.imprimir = function(){
      const $elementoParaConvertir = document.getElementById('imprimirDivAnt');
      html2pdf()
        .set({
          margin: 0.2,
          filename: 'anticipo.pdf',
          image:{
             type:'jpeg',
             quality: 0.98
          },
          html2canvas:{
            scale: 3,
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "letter",
            //orientation: 'portrait'
            //precision: 16
          }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err))
        .finally()
        .then( ()=>{
          console.log("GUARDADO!")
        })

    };

    //imprimir complemento
    $scope.imprimir2 = function(){
      const $elementoParaConvertir = document.getElementById('imprimirDivComp');
      html2pdf()
        .set({
          margin: 0.2,
          filename: 'complemento.pdf',
          image:{
             type:'jpeg',
             quality: 0.98
          },
          html2canvas:{
            scale: 3,
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "letter",
            //orientation: 'portrait'
            //precision: 16
          }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err))
        .finally()
        .then( ()=>{
          console.log("GUARDADO!")
        })

    }; 
    
    //imprimir liquidacion
    $scope.imprimir3 = function(){
      const $elementoParaConvertir = document.getElementById('imprimirDivLiq');
      html2pdf()
        .set({
          margin: 0.2,
          filename: 'liquidacion.pdf',
          image:{
             type:'jpeg',
             quality: 0.98
          },
          html2canvas:{
            scale: 3,
            letterRendering: true,
          },
          jsPDF: {
            unit: "in",
            format: "letter",
            //orientation: 'portrait'
            //precision: 16
          }
        })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err))
        .finally()
        .then( ()=>{
          console.log("GUARDADO!")
        })

    };

    var validar = function (){
      for(i=0;i<12;i++) $scope.validadores[i]=false;
      let data=false;
      if($scope.anticp.fecha==null || $scope.anticp.fecha=="")
      $scope.validadores[0]=true;
      if($scope.anticp.lugar==null || $scope.anticp.lugar=="")
        $scope.validadores[1]=true;
      if($scope.anticp.cliente==null || $scope.anticp.cliente=="")
      $scope.validadores[2]=true;
      if($scope.anticp.claveFlete==null || $scope.anticp.claveFlete=="")
      $scope.validadores[3]=true;
      if($scope.anticp.documentos==null || $scope.anticp.documentos=="")
      $scope.validadores[4]=true;
      if($scope.anticp.peso==null || $scope.anticp.peso=="")
      $scope.validadores[5]=true;
      if($scope.anticp.carta==null || $scope.anticp.carta=="")
      $scope.validadores[6]=true;
      if($scope.anticp.operator==null || $scope.anticp.operator=="")
      $scope.validadores[7]=true;
      if(($scope.anticp.tractor==null||$scope.anticp.tractor=="") && $scope.showDisable==false)
      $scope.validadores[8]=true;
      if(($scope.anticp.remolque==null||$scope.anticp.remolque=="") && $scope.showDisable==false)
      $scope.validadores[9]=true;
      if(($scope.anticp.dolly==null||$scope.anticp.dolly=="") && $scope.showDisable2==false)
      $scope.validadores[10]=true;
      if(($scope.anticp.remolque2==null||$scope.anticp.remolque2=="") && $scope.showDisable2==false)
      $scope.validadores[11]=true;
      if($scope.anticp.subtotal==null || $scope.anticp.subtotal=="") $scope.validadores[12]=true;

      if($scope.validadores[0]==true || $scope.validadores[1]==true || $scope.validadores[2]==true || $scope.validadores[3]==true
         || $scope.validadores[4]==true || $scope.validadores[5]==true || $scope.validadores[6]==true || $scope.validadores[7]==true
         || $scope.validadores[8]==true || $scope.validadores[9]==true || $scope.validadores[10]==true || $scope.validadores[11]==true
         || $scope.validadores[12]==true){
          data=true;}
      
      console.log($scope.validadores);
      console.log("El valor que retornara data es: "+data);
      return data;
    }
    
    
    /******/
        /**
     * convertir numeros a letras
     */
    function Unidades(num){

      switch(num)
      {
          case 1: return "UN";
          case 2: return "DOS";
          case 3: return "TRES";
          case 4: return "CUATRO";
          case 5: return "CINCO";
          case 6: return "SEIS";
          case 7: return "SIETE";
          case 8: return "OCHO";
          case 9: return "NUEVE";
      }
  
      return "";
  }//Unidades() 
  function Decenas(num){
  
      decena = Math.floor(num/10);
      unidad = num - (decena * 10);
  
      switch(decena)
      {
          case 1:
              switch(unidad)
              {
                  case 0: return 'DIEZ';
                  case 1: return 'ONCE';
                  case 2: return 'DOCE';
                  case 3: return 'TRECE';
                  case 4: return 'CATORCE';
                  case 5: return 'QUINCE';
                  default: return 'DIECI' + Unidades(unidad);
              }
          case 2:
              switch(unidad)
              {
                  case 0: return 'VEINTE';
                  default: return 'VEINTI' + Unidades(unidad);
              }
          case 3: return DecenasY('TREINTA', unidad);
          case 4: return DecenasY('CUARENTA', unidad);
          case 5: return DecenasY('CINCUENTA', unidad);
          case 6: return DecenasY('SESENTA', unidad);
          case 7: return DecenasY('SETENTA', unidad);
          case 8: return DecenasY('OCHENTA', unidad);
          case 9: return DecenasY('NOVENTA', unidad);
          case 0: return Unidades(unidad);
      }
  }//Unidades()  
  function DecenasY(strSin, numUnidades) {
      if(numUnidades == 1) return strSin + ' Y ' + 'UNO'
      if (numUnidades > 0)
      return strSin + ' Y ' + Unidades(numUnidades)
  
      return strSin;
  }//DecenasY()  
  function Centenas(num) {
      let centenas = Math.floor(num / 100);
      let decenas = num - (centenas * 100);
  
      switch(centenas)
      {
          case 1:
              if (decenas > 0)
                  return 'CIENTO ' + Decenas(decenas);
              return 'CIEN';
          case 2: return 'DOSCIENTOS ' + Decenas(decenas);
          case 3: return 'TRESCIENTOS ' + Decenas(decenas);
          case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
          case 5: return 'QUINIENTOS ' + Decenas(decenas);
          case 6: return 'SEISCIENTOS ' + Decenas(decenas);
          case 7: return 'SETECIENTOS ' + Decenas(decenas);
          case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
          case 9: return 'NOVECIENTOS ' + Decenas(decenas);
      }
  
      return Decenas(decenas);
  }//Centenas()  
  function Seccion(num, divisor, strSingular, strPlural) {
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
  
      letras = '';
  
      if (cientos > 0)
          if (cientos > 1)
              letras = Centenas(cientos) + ' ' + strPlural;
          else
              letras = strSingular;
  
      if (resto > 0)
          letras += '';
  
      return letras;
  }//Seccion() 
  function Miles(num) {
      let divisor = 1000;
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
  
      let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
      let strCentenas = Centenas(resto);
  
      if(strMiles == '')
          return strCentenas;
  
      return strMiles + ' ' + strCentenas;
  }//Miles()  
  function Millones(num) {
      let divisor = 1000000;
      let cientos = Math.floor(num / divisor)
      let resto = num - (cientos * divisor)
  
      let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
      let strMiles = Miles(resto);
  
      if(strMillones == '')
          return strMiles;
  
      return strMillones + ' ' + strMiles;
  }//Millones() 
  function NumeroALetras(num) {
      let data = {
          numero: num,
          enteros: Math.floor(num),
          centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
          letrasCentavos: '',
          letrasMonedaPlural: '',//“PESOS”, 'Dólares', 'Bolívares', 'etcs'
          letrasMonedaSingular: '', //“PESO”, 'Dólar', 'Bolivar', 'etc'
  
          letrasMonedaCentavoPlural: '',
          letrasMonedaCentavoSingular: ''
      };
  
      if (data.centavos > 0) {
          data.letrasCentavos = 'CON ' + (function (){
              if (data.centavos == 1)
                  return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
              else
                  return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
              })();
      };
  
      if(data.enteros == 0)
          return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      if (data.enteros == 1)
          return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
      else
          return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
  }//NumeroALetras()
    /******/

  },
]);


/*********************************************************************************/
/*********************************************************************************/
//---------------------LA OTRA PARTE DEL PROYECTO--------------------------------//
/*********************************************************************************/
/*********************************************************************************/

//****************CRUD DE ORIGENES Y DESTINOS******************/
app.controller("crudOrigenesD", [
  "$scope",
  "client",
  "products",
  "origenes",
  "anticipos",
  function ($scope, client, products, origenes,anticipos) {
    $scope.listCliente;
    $scope.cliente = {};
    $scope.search = "";
    $scope.showMessage = true;
    $scope.listproduct = [];
    $scope.showDisable = true;
    $scope.showCreateCliente = false;
    $scope.showSaveCliente = true;
    $scope.showEditCliente = true;
    $scope.editBan = false;
    $scope.mercancia = {};
    $scope.express = "\\d+";
    $scope.listC;

    // agregar ID cliente.
   $scope.clave = function () {
      if ($scope.cliente.mercancia !== "") {
        $scope.cliente.clave_m = $scope.cliente.mercancia;
      }
    }; // ....

    // llenar lista de opciones....
    var listClient = function () {
      origenes.readFletes().then(function succes(res) {
        $scope.listproduct = res;
      });
    }; //....

/**BUSCAR CLIENTES POR UN SEARCH*/
    //seccion de busqueda de Remitente (Cliente)
    $scope.ban2=true;
    $scope.items = [];
    $scope.searchC = function(name){
      if(name!==""){
        $scope.ban2= false;
        $scope.listC=client.search(name).then(function succes(res){
          $scope.items = res;
        });
      }
      else{
        $scope.ban2 = true;
      }
    };

    //llenar los datos del cliente
    $scope.filtradoCl = function (search){
      $scope.ban2 = true;
      $scope.cliente.nombrecl=search.cliente;
      $scope.cliente.clave_m=search.idclientes;
      anticipos.searchMerch(search.clave_mercancia).then(function succes(res){
        $.each(res,function(key,val){
          $scope.cliente.Omercancia=val.nombre_producto;
        });
      });      
      //listClaveF();
    }    
/************************************/
/*************************************/

    // boton de guardar, crear, modificar y refrescar ....
    $scope.buttonOption = function (option) {
      switch (option) {
        // buton de guardar .....
        case 1:
          {
            $scope.showDisable = false;
            $scope.showCreateCliente = true;
            $scope.showSaveCliente = false;
            //$scope.cliente = {};
            $scope.band = false;
            listClient();
          }
          break;
        // boton de guardar y actualizar .....
        case 2:
          {
            listClient();
            $scope.showCreateCliente = false;
            $scope.showEditCliente = true;
            $scope.showSaveCliente = true;
            $scope.showDisable = true;
            len = Object.keys($scope.cliente).length;
            if (len > 0) {
               if ($scope.band === true) {
                console.log($scope.cliente);
                // actualizar viajes .....
                origenes.updateViajes($scope.cliente).then(function succes(res) {
                  if (res.action === "success") {
                    $scope.ban = true;
                    Swal.fire({
                      position: "center",
                      type: "success",
                      title: "Datos actualizados satisfactoriamente",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    $scope.cliente = {};
                    $scope.reset();
                  } else {
                    console.log(res);
                  }
                });
              } else {
                // crear cliente .....
                origenes.crearViaje($scope.cliente).then(function succes(res) {
                  if (res.action === "success") {
                    $scope.ban = true;
                    Swal.fire({
                      position: "center",
                      type: "success",
                      title: "Datos exitosamente agregados",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    $scope.cliente = {};
                  } else {
                    console.log(res);
                  }
                });
              }
            } else {
              $scope.showDisable = false;
              $scope.cliente = {};
            }
          }
          break;
        case 3:
          {
            $scope.showSaveCliente = false;
            $scope.showEditCliente = true;
            $scope.showDisable = false;
            $scope.editBan = true;
          }
          break;
        case 4:
          {
            // resetear .....
            $scope.showCreateCliente = false;
            $scope.showSaveCliente = true;
            $scope.showEditCliente = true;
            $scope.editBan = false;
            $scope.cliente = {};
            $scope.showDisable = true;
          }
          break;
      }
    };

    $scope.ban = true;
    $scope.items = [];
    // seccion de busqueda
    $scope.form = {};
    $scope.search = function (name) {
      if (name !== "") {
        $scope.ban = false;
        origenes.searchViajes(name).then(function succes(res) {
          $scope.items = res;
        });
      } else {
        $scope.ban = true;
      }
    }; // .....

    // secccion de la equis para eliminar lo escrito
    $scope.emptySearch = function () {
      $scope.form.search = "";
      $scope.ban = true;
    }; // ......

    // llenar los datos desplegados en la lista ....
    $scope.llenado = function (search) {
      listClient();
       $scope.form.search = "";
      $scope.showDisable = false;
      $scope.showCreateCliente = true;
      $scope.showSaveCliente = false;
      $scope.showEditCliente = false;
      $scope.band = true;
      $scope.ban = true;
      $scope.cliente.idviaje = search.idorigen;
      $scope.cliente.flete = search.flete
      $scope.cliente.descripcion = search.descripcion;
      $scope.cliente.origen = search.origen;
      $scope.cliente.destino = search.destino;
      $scope.cliente.distancia  = search.distancia;
      $scope.cliente.Lcarga = search.Lcarga;
      $scope.cliente.destinatario = search.destinatario;
      $scope.cliente.clave_m = search.idclientes;
      $scope.cliente.nombrecl = search.cliente
      $scope.cliente.Omercancia = search.Omercancia;
      $scope.cliente.domicilio = search.Odomicilio;
      $scope.cliente.Lentrega = search.Lentrega;
      $scope.cliente.tarifas = search.tarifas;
      $scope.cliente.costo = search.costo;


    }; // ......

    //funcion para verificar que el flete no exista
    $scope.verificaFlete = function (flete) {
      origenes.validarFlete(flete).then(function (res) {
        if(res.length){
          $scope.validflete = true;
          $scope.validfletenext = true;
          //showMessage("CLAVE EXISTENTE", "success");
          console.log("el flete ya existe");
          console.log(res);
        }else{
          $scope.validflete = false;
          $scope.validfletenext = false;
          console.log("el flete no se encontro en la bd");
        }
       
      });
    };

    // actualizar lista
    $scope.resetLisr = function () {
      listClient();
    }; // ......

    // agregar producto nuevo ......
    $scope.agregaMercancia = function () {
      var lent = Object.keys($scope.mercancia).length;
      if (lent > 0) {
        products.createProduct($scope.mercancia).then(function succes(res) {
          listClient();
          if (res.action === "success") {
            Swal.fire({
              position: "center",
              type: "success",
              title: "Producto agregado",
              showConfirmButton: false,
              timer: 1000,
            });
            $scope.mercancia = {};
          }
        });
      } else {
        document.getElementById("nmercancia").className =
          "form-control is-invalid";
      }
    }; // .....
  },
]);
// termina el controlador de origenes.....

