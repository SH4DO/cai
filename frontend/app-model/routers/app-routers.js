var template_admin = "frontend/app/components/admin/";
var theme = "frontend/app/theme/";

var routerDirectory = {
    alert: 'alerts/alerts.html',
    almacen: 'almacen/almacen.html',
    ambiental: 'v-ambiental/v-ambiental.html',
    clientes: 'clientes/clientes.html',
    configuracion: 'configuracion/configuracion.html',
    equipo: 'equipo/equipo.html',
    fisicoMecanico: 'fisicomecanico/fisicomecanico.html',
    home: 'home/home.html',
    menu: 'menu/menu.html',
    operador: 'operador/operador.html',
    proveedores: 'proveedores/proveedores.html',
    reporte: 'reporte/reporte.html',
    trafico: 'trafico/trafico.html',
    bitacora: 'bitacora/bitacora.html',
    navbarGral: 'navbar-gral/navbar-gral.html',
    navbarAdmin: 'navbar-admin/navbar-admin.html',
    contendor: 'contenedor/contenedor.html',
    configUser: 'config-user/config-user.html',
    createinvitado: 'createinvitado/createinvitado.html',
    listUser: 'listarUser/listarUser.html',
    documents: 'documents/documents.html',
    documentse: 'documents-equipo/documents.html',
	poliza: 'poliza/poliza.html',
	equipoflotilla: 'equipoflotilla/equipoflotilla.html',
    reporte_equipo: 'reporte-equipo/reporte-equipo.html',
    imprmir_reporte: 'repo-imprimir/repo-imprimir.html',
    origenesdestinos: 'origenesdestinos/origenesdestinos.html',
    vales: 'vales/vales.html',
    imprimir_vale: 'vale-imp/vale-imprimir.html',
    anticipos: 'anticipos/anticipos.html'
};

app.factory('role', ['$location', function($location) {
    return {
        menu_role: function(users) {
            if (users !== null) {
                return {
                    menu: theme + routerDirectory.navbarAdmin,
                    opciones: theme + routerDirectory.menu
                }
            } else {
                return {
                    menu: theme + routerDirectory.navbarGral,
                    opciones: theme + routerDirectory.menu
                }
            }
        }, // termina roles
        security: function(users) {
            var url = window.location.hash;
            var cadena = url.split("#!/", 2);
            if (cadena[1] === "menu") {
                if (users === null) {
                    $location.url('/admin');
                } else {
                    return users[0].user;
                }
            }
        }, // termina security
        logauth: function() {
            localStorage.removeItem('user')
            localStorage.removeItem('invitado');
            $location.url('/admin');
        }, // termina el logauth
        configuration: function() {
                return {
                    content: template_admin + routerDirectory.configuracion
                }
            } // termina el de configuracion..
    }
}]);


app.factory('optionMenu', ['$location', 'listGral', function($location, listGral) {
    return {
        viewOptionMenu: function() {
            var url = window.location.hash;
            var cadena = url.split("#!/", 2);
            if (cadena[1] === "menu") {
                var user = JSON.parse(localStorage.getItem('user'));
                if (user[0].opciones === "todos") {
                    return listGral.admin();
                } // termina el if
                else {
                    return listGral.admin().then(function(res) {
                        var option = user[0].opciones;
                        var invitado = [];
                        var lista = option.split(",", 11);
                        for (i = 0; i < Object.keys(lista).length; i++) {
                            switch (lista[i]) {
                                case 'alert':
                                    invitado.push(res[0]);
                                    break;
                                case 'operador':
                                    invitado.push(res[1]);
                                    break;
                                case 'equipo':
                                    invitado.push(res[2]);
                                    break;
                                case 'cliente':
                                    invitado.push(res[3]);
                                    break;
                                case 'reporte':
                                    invitado.push(res[4]);
                                    break;
                                case 'bitacora':
                                    invitado.push(res[5]);
                                    break;
                                case 'almacen':
                                    invitado.push(res[6]);
                                    break;
                                case 'proveedores':
                                    invitado.push(res[7]);
                                    break;
                                case 'trafico':
                                    invitado.push(res[8]);
                                    break;
                            } // termina el switch
                        } // termina el for
                        localStorage.setItem('invitado', JSON.stringify(invitado));
                        return invitado;
                    });
                    /**/
                }
            }
            if (cadena[1] === "operario") {
                return listGral.operador();
            }
        }, // termina viewOptionMenu
        viewContent: function(option) {
            switch (option) {
                case 'alert':
                    return template_admin + routerDirectory.alert;
                    break;
                case 'operador':
                    return template_admin + routerDirectory.operador;
                    break;
                case 'equipo':
                    return template_admin + routerDirectory.equipo;
                    break;
                case 'cliente':
                    return template_admin + routerDirectory.clientes;
                    break;
                case 'reporte':
                    return template_admin + routerDirectory.reporte;
                    break;
                case 'bitacora':
                    return template_admin + routerDirectory.bitacora;
                    break;
                case 'almacen':
                    return template_admin + routerDirectory.almacen;
                    break;
                case 'proveedores':
                    return template_admin + routerDirectory.proveedores;
                    break;
                case 'trafico':
                    return template_admin + routerDirectory.trafico;
                    break;
                case 'origenesdestinos':
                    return template_admin + routerDirectory.origenesdestinos;
                    break;
                case 'vales':
                    return template_admin + routerDirectory.vales;
                    break;
                case 'documents':
                    return template_admin + routerDirectory.documents;
                    break;
                case 'documentse':
                    return template_admin + routerDirectory.documentse;
                    break;
                case 'equipoflotilla':
                    return template_admin + routerDirectory.equipoflotilla;
                    break;
                case 'fisicomecanico':
                    return template_admin + routerDirectory.fisicoMecanico;
                    break;
                case 'poliza':
                    return template_admin + routerDirectory.poliza;
                    break;
                case 'ambiental':
                    return template_admin + routerDirectory.ambiental;
                    break;
                case 'report-equipo':
                    return template_admin + routerDirectory.reporte_equipo;
                    break;
                case 'report-imprimir': 
                    return template_admin + routerDirectory.imprmir_reporte;
                    break;
                case 'vale-imprimir':    //AÑADIDO PARA IMPRIMIR VALE
                    return template_admin + routerDirectory.imprimir_vale;
                    break;
                case 'anticipos':
                    return template_admin + routerDirectory.anticipos;
                    break;    
                case 'salir':
                    $location.url('/');
                    break;
            }
        },
        activeOption: function(option) {
            var invitado = JSON.parse(localStorage.getItem('invitado'));
            var url = window.location.hash;
            var cadena = url.split("#!/", 2);
            switch (option) {
                case 'alert':
                    document.getElementById('alert').className = "list-group-item active ";
                    //var invitado = JSON.parse(localStorage.getItem('invitado'));
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'alert') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {

                        document.getElementById('operador').className = "list-group-item  cursor";
                        document.getElementById('equipo').className = "list-group-item  cursor";
                        document.getElementById('cliente').className = "list-group-item  cursor";
                        document.getElementById('reporte').className = "list-group-item  cursor";
                        document.getElementById('bitacora').className = "list-group-item  cursor";
                        document.getElementById('almacen').className = "list-group-item  cursor";
                        document.getElementById('proveedores').className = "list-group-item  cursor";
                        document.getElementById('trafico').className = "list-group-item  cursor";
                    }
                    break;
                case 'operador':
                    document.getElementById('operador').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'operador') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        document.getElementById('alert').className = "list-group-item cursor";
                        document.getElementById('equipo').className = "list-group-item  cursor";
                        document.getElementById('cliente').className = "list-group-item  cursor";
                        document.getElementById('reporte').className = "list-group-item  cursor";
                        document.getElementById('bitacora').className = "list-group-item  cursor";
                        document.getElementById('almacen').className = "list-group-item  cursor";
                        document.getElementById('proveedores').className = "list-group-item  cursor";
                        document.getElementById('trafico').className = "list-group-item  cursor";
                    }

                    break;
                case 'equipo':
                    document.getElementById('equipo').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'equipo') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        document.getElementById('alert').className = "list-group-item cursor";
                        document.getElementById('operador').className = "list-group-item cursor";
                        document.getElementById('cliente').className = "list-group-item  cursor";
                        document.getElementById('reporte').className = "list-group-item  cursor";
                        document.getElementById('bitacora').className = "list-group-item  cursor";
                        document.getElementById('almacen').className = "list-group-item  cursor";
                        document.getElementById('proveedores').className = "list-group-item  cursor";
                        document.getElementById('trafico').className = "list-group-item  cursor";
                    }

                    break;
                case 'cliente':
                    document.getElementById('cliente').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'cliente') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        document.getElementById('equipo').className = "list-group-item cursor";
                        document.getElementById('alert').className = "list-group-item cursor";
                        document.getElementById('operador').className = "list-group-item cursor";
                        document.getElementById('reporte').className = "list-group-item  cursor";
                        document.getElementById('bitacora').className = "list-group-item  cursor";
                        document.getElementById('almacen').className = "list-group-item  cursor";
                        document.getElementById('proveedores').className = "list-group-item  cursor";
                        document.getElementById('trafico').className = "list-group-item  cursor";
                    }
                    break;
                case 'reporte':
                    document.getElementById('reporte').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'reporte') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        if (cadena[1] === "menu") {
                            document.getElementById('cliente').className = "list-group-item  cursor";
                            document.getElementById('equipo').className = "list-group-item cursor";
                            document.getElementById('alert').className = "list-group-item cursor";
                            document.getElementById('operador').className = "list-group-item cursor";
                            document.getElementById('bitacora').className = "list-group-item  cursor";
                            document.getElementById('almacen').className = "list-group-item  cursor";
                            document.getElementById('proveedores').className = "list-group-item  cursor";
                            document.getElementById('trafico').className = "list-group-item  cursor";
                        } else {
                            document.getElementById('bitacora').className = "list-group-item  cursor";
                        }

                    }

                    break;
                case 'bitacora':
                    document.getElementById('bitacora').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'bitacora') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        if (cadena[1] === "menu") {
                            document.getElementById('reporte').className = "list-group-item  cursor";
                            document.getElementById('cliente').className = "list-group-item  cursor";
                            document.getElementById('equipo').className = "list-group-item cursor";
                            document.getElementById('alert').className = "list-group-item cursor";
                            document.getElementById('operador').className = "list-group-item cursor";
                            document.getElementById('almacen').className = "list-group-item  cursor";
                            document.getElementById('proveedores').className = "list-group-item  cursor";
                            document.getElementById('trafico').className = "list-group-item  cursor";
                        } else {
                            document.getElementById('reporte').className = "list-group-item  cursor";
                        }
                    }

                    break;
                case 'almacen':
                    document.getElementById('almacen').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'almacen') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        document.getElementById('bitacora').className = "list-group-item cursor";
                        document.getElementById('reporte').className = "list-group-item  cursor";
                        document.getElementById('cliente').className = "list-group-item  cursor";
                        document.getElementById('equipo').className = "list-group-item cursor";
                        document.getElementById('alert').className = "list-group-item cursor";
                        document.getElementById('operador').className = "list-group-item cursor";
                        document.getElementById('proveedores').className = "list-group-item  cursor";
                        document.getElementById('trafico').className = "list-group-item  cursor";
                    }

                    break;
                case 'proveedores':
                    document.getElementById('proveedores').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'proveedores') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        document.getElementById('almacen').className = "list-group-item  cursor";
                        document.getElementById('bitacora').className = "list-group-item cursor";
                        document.getElementById('reporte').className = "list-group-item  cursor";
                        document.getElementById('cliente').className = "list-group-item  cursor";
                        document.getElementById('equipo').className = "list-group-item cursor";
                        document.getElementById('alert').className = "list-group-item cursor";
                        document.getElementById('operador').className = "list-group-item cursor";
                        document.getElementById('trafico').className = "list-group-item  cursor";
                    }

                    break;
                case 'trafico':
                    document.getElementById('trafico').className = "list-group-item active cursor";
                    if (invitado !== null) {
                        for (i = 0; i < invitado.length; i++) {
                            if (invitado[i].id !== 'proveedores') {
                                document.getElementById(invitado[i].id).className = "list-group-item cursor";
                            }
                        }
                    } else {
                        document.getElementById('proveedores').className = "list-group-item  cursor";
                        document.getElementById('almacen').className = "list-group-item  cursor";
                        document.getElementById('bitacora').className = "list-group-item cursor";
                        document.getElementById('reporte').className = "list-group-item  cursor";
                        document.getElementById('cliente').className = "list-group-item  cursor";
                        document.getElementById('equipo').className = "list-group-item cursor";
                        document.getElementById('alert').className = "list-group-item cursor";
                        document.getElementById('operador').className = "list-group-item cursor";
                    }

                    break;
            }
        }
    } // termina el return ....
}]);

//menu equipo
app.factory('changeMenu', function(){
  return {
    tabs: function(data){
      switch (data) {
        case 'equipoflotilla':
          document.getElementById('equipof').className = "nav-item nav-link active btn-primary";
          document.getElementById('vamb').className = "nav-item nav-link";
          document.getElementById('vmeca').className = "lnav-item nav-link";
          break;
        case 'ambiental':
          document.getElementById('equipof').className = "nav-item nav-link";
          document.getElementById('vamb').className = "nav-item nav-link active btn-primary";
          document.getElementById('vmeca').className = "lnav-item nav-link";
         break;
        case 'fisicomecanico':
          document.getElementById('equipof').className = "nav-item nav-link";
          document.getElementById('vamb').className = "nav-item nav-link";
          document.getElementById('vmeca').className = "lnav-item nav-link active btn-primary";
         break;

      }
    }
  }
});

//menu origenes y destinos
app.factory('changeMenu', function(){
  return {
    tabs: function(data){
      switch (data) {
        case 'anticipos':
          document.getElementById('anti').className = "nav-item nav-link active btn-primary";
          document.getElementById('origen').className = "lnav-item nav-link";
          document.getElementById('val').className = "lnav-item nav-link";
          document.getElementById('repor').className = "lnav-item nav-link";
          break;
        case 'complementos':
          document.getElementById('anti').className = "nav-item nav-link";
          document.getElementById('origen').className = "lnav-item nav-link";
          document.getElementById('val').className = "lnav-item nav-link";
          document.getElementById('repor').className = "lnav-item nav-link";
         break;
        case 'liquidaciones':
          document.getElementById('anti').className = "nav-item nav-link";
          document.getElementById('origen').className = "lnav-item nav-link";
          document.getElementById('val').className = "lnav-item nav-link";
          document.getElementById('repor').className = "lnav-item nav-link";
         break;
         case 'origenesdestinos':
          document.getElementById('anti').className = "nav-item nav-link";
          document.getElementById('origen').className = "lnav-item nav-link active btn-primary";
          document.getElementById('val').className = "lnav-item nav-link";
          document.getElementById('repor').className = "lnav-item nav-link";
         break;
         case 'vales':
          document.getElementById('anti').className = "nav-item nav-link";
          document.getElementById('origen').className = "lnav-item nav-link";
          document.getElementById('val').className = "lnav-item nav-link active btn-primary";
          document.getElementById('repor').className = "lnav-item nav-link";
         break;
         case 'reportes':
          document.getElementById('anti').className = "nav-item nav-link";
          document.getElementById('origen').className = "lnav-item nav-link";
          document.getElementById('val').className = "lnav-item nav-link";
          document.getElementById('repor').className = "lnav-item nav-link  active btn-primary";
         break;
         


      }
    }
  }
});


// almacena el arreglo en el localStorage
app.factory('saveUser', function() {
    return {
        saveLocalStorage: function(user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
});

// opcions del menu ...
app.factory('configUser', ['listGral', function(listGral) {
    return {
        optionsMenu: function() {
                var user = JSON.parse(localStorage.getItem('user'));
                if (user[0].role === "admin") {
                    return listGral.config();
                } {
                    return listGral.configinv();
                }
            } // termina la opcion de menu
    }
}]);


app.factory('routerConfig', function() {
    return {
        viewOptionConfig: function(option) {
            switch (option) {
                case 'cuenta':
                    return theme + routerDirectory.configUser;
                    break;
                case 'addinvitado':
                    return template_admin + routerDirectory.createinvitado;
                    break;
                case 'listUser':
                    return template_admin + routerDirectory.listUser;
                    break;
            }
        },
        viewOption: function(option) {
            var invitado = JSON.parse(localStorage.getItem('invitado'));
            switch (option) {
                case 'cuenta':
                    if (invitado !== null) {
                        document.getElementById('cuenta').className = "list-group-item active cursor";
                    } else {
                        document.getElementById('cuenta').className = "list-group-item active cursor";
                        document.getElementById('addinvitado').className = "list-group-item cursor";
                        document.getElementById('listUser').className = "list-group-item  cursor";
                    }
                    break;
                case 'addinvitado':
                    document.getElementById('cuenta').className = "list-group-item  cursor";
                    document.getElementById('addinvitado').className = "list-group-item  active cursor";
                    document.getElementById('listUser').className = "list-group-item  cursor";
                    break;
                case 'listUser':
                    document.getElementById('cuenta').className = "list-group-item  cursor";
                    document.getElementById('addinvitado').className = "list-group-item cursor";
                    document.getElementById('listUser').className = "list-group-item active cursor";
                    break;
            }
        }
    } // termina el return
});
