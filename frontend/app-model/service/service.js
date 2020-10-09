/* Envia los datos a la base para verificar si el usuario exite o no.. */
app.factory('auth', ['crudService', function(crudService) {
    return {
        login: function(data) {
            return crudService.crudPost('auth', data);
        }
    }
}]);

// servicio crud de la tabla usuario ...
app.factory('crudUser', ['crudService', 'localResorce', function(crudService, localResorce) {
    return {
        createUser: function(data) {
            return crudService.crudPost('user', data);
        },
        readUsers: function() {
            //console.log(crudService.crudGet('users'));
            return crudService.crudGet('users');
        },
        readUserId: function(id) {
            return crudService.crudGet('userId&iduser=' + id);
        },
        updateUser: function(data) {
            return crudService.crudPost('upuser', data);
        },
        optionsMenu: function() {
            return localResorce.crudGet('listadmin.json');
        },
        statusChange: function(data) {
            return crudService.crudPost('upstatus', data);
        },
        updateOption: function(data) {
            return crudService.crudPost('upoptions', data);
        }
    } // termina el json return.
}]);


/* verify user and true o false and remove logauth user */
app.factory('verifyUser', ['$location', function($location) {
    let users = JSON.parse(localStorage.getItem('user'));
    return {
        // verfica si el usuario exite o no...
        token: function() {
            if (users === null) {
                $location.url('/admin');
            } else {
                return users;
            }
        },
        logauth: function() {
            localStorage.removeItem('user');
            $location.url('/admin');
        },
        salirOperario: function() {
            $location.url('/');
        }
    } // termina el json...
}]);

/* alerts and Data Base request */
app.factory('alerts', ['crudService', function(crudService) {
    return {
        alert: function(date, actual) {
            return crudService.crudGet('alerts&dates=' + date + '&actual='+actual);
        }
    }
}]);


// cliente crud
app.factory('client', ['crudService', function(crudService) {
    return {
        createClient: function(data) {
            return crudService.crudPost('client', data);
        },
        search: function(client) {
            return crudService.crudGet('searchClient&search=' + client);
        },
        updateClient: function(data) {
            return crudService.crudPost('upclient', data);
        }
    }
}]);


app.factory('products', ['crudService', function(crudService) {
    return {
        createProduct: function(data) {
            return crudService.crudPost('product', data);
        },
        readProduct: function() {
            return crudService.crudGet('products');
        }
    } // termina el return ....
}]);


app.factory('listGral', ['localResorce', function(localResorce) {
    return {
        admin: function() {
            return localResorce.crudGet('listadmin.json');
        },
        operador: function() {
            return localResorce.crudGet('listoperator.json');
        },
        config: function() {
            return localResorce.crudGet('listconfig.json');
        },
        configinv: function() {
            return localResorce.crudGet('configin.json');
        },
        listNumber: function() {
            return localResorce.crudGet('number.json');
        }

    }
}]);


app.factory('crudOperator', ['crudService', function(crudService) {
    return {
        createOperator: function(data) {
            return crudService.crudPost('operador', data);
        },
        searchOperator: function(nameop) {
            return crudService.crudGet('searchOperador&search=' + nameop);
        },
        updateOperator: function(data) {
            return crudService.crudPost('upOperador', data);
        },
        listOperator: function() {
            return crudService.crudGet("operadores");
        },
        listDocuments: function(id) {
            return crudService.crudGet("documentsid&idoperador=" + id);
        },
        deleteOperador: function(data) {
            return crudService.crudPost("ddocuments", data);
        },
        searchImss: function(imss) {
            return crudService.crudGet('imss&search=' + imss);
        }

    }
}]);


app.factory('upload', ['crudService', function(crudService) {
    return {
        uuid: function() {
            var seed = Date.now();
            if (window.performance && typeof window.performance.now === "function") {
                seed += performance.now();
            }

            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (seed + Math.random() * 16) % 16 | 0;
                seed = Math.floor(seed / 16);

                return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
            });

            return uuid;
        },
        uploads: function(fromdata) {
            return crudService.crudUpload('upload', fromdata);
        },
        creteDocuments: function(data) {
            return crudService.crudPost('documents', data);
        },
        almacenarArray: function(dato) {
            var local = JSON.parse(localStorage.getItem('archive'));
            if (local === null) {
                localStorage.setItem('archive', JSON.stringify(dato));
            } else {
                var newLocal = local + ',' + dato;
                localStorage.setItem('archive', JSON.stringify(newLocal));
            }

        },
        updateUpload: function(data) {
            return crudService.crudPost("updocuments", data);
        }
    }

}]);


app.factory('equipo', ['crudService', function(crudService) {
    return {
        creteEquipo: function(data) {
            return crudService.crudPost('equipo', data);
        },
        updateEquipo: function(data) {
            return crudService.crudPost('upequipo', data);
        },
        validNumEco: function(data) {
            return crudService.crudGet('validNumEco&nume=' + data);
        },
        validNiv: function(data) {
            return crudService.crudGet('validNiv&niv=' + data);
        },
        validMotor: function(data) {
            return crudService.crudGet('validMotor&motor=' + data);
        },
        searchEquipo: function(data) {
            return crudService.crudGet('searche&equipo=' + data);
        },
        createVambiental: function(data){
            return crudService.crudPost('vambiental', data);
        },
        listVAmbiental: function(idequipo){
            return crudService.crudGet('listambiental&idequipo='+idequipo);
        },
        validFolio: function(folio){
            return crudService.crudGet('varfyFoliovamb&folio='+folio);
        },
        validPeriodo: function(periodo){
            return crudService.crudGet('verifperiodo&periodo='+periodo);
        },
        createFisicoMecanico: function(data){
            return crudService.crudPost('createFm', data);
        },
        buscarPlaca: function(placa){
            return crudService.crudGet('searchPlaca&placa='+placa);
        },
        validFoliofm: function(folio){
            return crudService.crudGet('validFoliofm&folio='+folio);
        },
        listarFismeca: function(){
            return crudService.crudGet('listFm');
        },
        buscarIdFM: function (id) {
            return crudService.crudGet('fmideq&idequipo='+id);
        },
        createUpload: function(data){
            return crudService.crudPost('uploadFA', data);
        },
        searchUploadFA: function(id){
            return crudService.crudGet('searchFA&id='+id);
        },
        ValidarUploadFA: function(fecha, id){
            return crudService.crudGet('validuploadFA&fecha='+fecha+'&id='+id);
        }

    }

}]);


app.factory('cruddocumentseq', ['crudService', function(crudService) {

    return {
        createDocuments: function(data) {
            return crudService.crudPost('documentseq', data);
        },
        updateDocuments: function(data) {
            return crudService.crudPost('updocuemtseq', data);
        },
        readIdDocuments: function(data) {
            return crudService.crudGet('documentseqId&idequipo=' + data);
        },
        deleteDocuments: function(data) {
            return crudService.crudPost('ddocumentseq', data);
        }
    }

}]);


// busqueda por estatus, verificacion ambiental y fisico.mecanico

app.factory('Crudstatus', ['crudService', function(crudService) {
    return {
        busquedaStatus: function(status, tipo) {
            return crudService.crudGet('repostatus&status=' + status + '&tipo=' + tipo);
        },
        reportesFmVa: function(tipo, fecha){
            return crudService.crudGet('reportesFmVa&tipo='+tipo+'&fecha='+fecha);
        },
        listYear: function list(table) {
            return crudService.crudGet('listfecha&table='+table);
        }
    }
}]);


app.factory('cratePDF', function() {
    return {
        pdf: function(name) {
            html2canvas(document.getElementById('tabledata'), {
                onrendered: function(canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        pageSize: 'A4',
                        pageOrientation: 'landscape',
                        pageMargins: [40, 60, 40, 60],
                        info: {
                            title: 'awesome Document',
                            author: 'john doe',
                            subject: 'subject of document',
                            keywords: 'keywords for document',
                        },
                        content: [{
                                image: data,
                                width: 800
                            }
                        ]
                    };
                    pdfMake.createPdf(docDefinition).download(name+".pdf");
                }
            });
        }
    }
});

//*****************************************************************************************************/
//---------SERVICE PROVEEDORES Y VALES DE COMBUSTIBLE (FINICIO:21/08 FFINAL:23/08 2020)------------//
//*****************************************************************************************************/

// proveedor crud
app.factory('prov', ['crudService', function(crudService) {
    return {
        createProv: function(data) {
            return crudService.crudPost('prov', data);
        },
        search: function(prov) {
            return crudService.crudGet('searchProv&search=' + prov);
        },
        updateProv: function(data) {
            return crudService.crudPost('upProv', data);
        }
    }
}]);

//tipos de proveedor crud
app.factory('TiposProv', ['crudService', function(crudService) {  //products ---> TiposProv
    return {
        createTprov: function(data) {
            return crudService.crudPost('TipoProv', data); //product ---> tprov
        },
        readTprov: function() { //readProduct
            return crudService.crudGet('TiposProv'); //products---> tprovs
        }
    } // termina el return ....
}]);

/**************SERVICE PARA VALES DE COMBUSTIBLE*********/

//vales crud 
app.factory('vale', ['crudService', function(crudService) {
    return {
        createVal: function(data) {
            return crudService.crudPost('createVal', data);
        },
        search: function(val) {
            return crudService.crudGet('searchVal&search=' + val);
        },
        updateVal: function(data) {
            return crudService.crudPost('upVal', data);
        },
        readEquipos: function() { //leer todos los equipos
            return crudService.crudGet('TiposEquipo'); //products---> tprovs
        },
        readOperator: function() { //leer todos los operador
            return crudService.crudGet('TiposOperator'); //products---> tprovs
        },
        searchEquipo: function(val) { //leer todos los equipos
            return crudService.crudGet('searchVE&search=' + val); //products---> tprovs
        },
        searchFlete: function(val,fc) { //leer todos los fletes  FC => filtrado del cliente
            return crudService.crudGet('searchFlete&search=' + val+'&fc='+fc); //products---> tprovs
        },
        readGasolinera: function(val) { //leer todas las gasolineras
            return crudService.crudGet('TiposGas&search=' + val); //products---> tprovs
        },
        readCombs: function() { //leer todos los combustibles
            return crudService.crudGet('TiposCombs'); 
        },
        UpdateCombs: function(data,pre,id) {
            return crudService.crudPost('upCombs&val='+data+'&pre='+pre+'&id='+id);
        },
        searchLast: function() {
            return crudService.crudGet('searchLast');
        }
    }
}]);

//Anticipos Service
app.factory('anticipos',['crudService', function(crudService){
    return{
        createAnticipo: function(data){
            return crudService.crudPost('anticipos', data); // crear anticipos
        },
        searchRemitente: function(data){
            return crudService.crudGet('searchRemi&search='+data);
        },
        searchDestinatario: function(data){
            return crudService.crudGet('searchDesti&search='+data);
        },
    }
}]);

/******************************************************************/
/******************************************************************/
/***********SERVICE DE LA OTRA PARTE DEL PROYECTO******************/
/******************************************************************/
/******************************************************************/

// service origenes y destinos
app.factory('origenes', ['crudService', function(crudService) {
    return {
        readFletes: function() {
            return crudService.crudGet('nomCliente');
        },
        crearViaje: function(data){
            return crudService.crudPost('crearViaje', data);

        }
    } // termina el return ....
}]);