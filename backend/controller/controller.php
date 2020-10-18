<?php

require '../crud/crud.php';

class ControllerSIDF extends CrudSIDF
{

    /*
        autentificacion de usuario
     */
    public function authLogin($user)
    {
        CrudSIDF::auth($user);
    }

    /*
        crear usuario
     */
    public function createUser($user)
    {
        CrudSIDF::createUser($user);
    }

    /*
     *  retornar usuario por ID
     */
    public function userId($iduser)
    {
        CrudSIDF::UserId($iduser);
    }


    /*
     * actualizar el estatus del usuario
     */
    public function updateStatu($user)
    {
        CrudSIDF::updateStatus($user);
    }

    /*
     * listar todos los usuarios
     */
    public function users()
    {
        CrudSIDF::readUsers();
    }

    /*
     * acualizar usuario
     */
    public function updateUser($user)
    {
        // code...
        CrudSIDF::updateUserId($user);
    }

    /**
     *  update opciones and password
     */

    public function updateopciones($user)
    {
        CrudSIDF::updateOptions($user);
    }

    /*
     *  seccion tabla cliente
     */

    // crear client
    public function creatClient($client)
    {
        CrudSIDF::createClient($client);
    }

    // buscar client
    public function search($client)
    {
        CrudSIDF::searchClient($client);
    }
    /*
     * actualizar cliente
     */
    public function updatClient($client)
    {
        CrudSIDF::updateClient($client);
    }


    /**
     *  seccion tabla productos
     */

    // crear producto
    public function creatProduct($product)
    {
        CrudSIDF::createProduct($product);
    }

    // listar productos
    public function listeProducts()
    {
        CrudSIDF::listProducts();
    }

    /*
     * seccion de operador
     */

    // crear operador .....
    public function createOperador($operador)
    {
        CrudSIDF::createOperator($operador);
    }

    // buscar operador
    public function searchOperador($operador)
    {
        CrudSIDF::searchOperator($operador);
    }

    // actualizar operador
    public function updateOperador($operador)
    {
        CrudSIDF::updateOperator($operador);
    }

    // todo los  operador
    public function readOp()
    {
        CrudSIDF::readOperator();
    }

    // validar numero del IMSS
    public function numImss($numberimss){
        CrudSIDF::verificarImss($numberimss);
    }


    /**
     *  seccion de documentos.....
     */
    public function documentsDelete($documents){
        CrudSIDF::deleteDocuments($documents);
    }
    // crear documento
    public function documents($documents)
    {
        CrudSIDF::createDocuments($documents);
    }

    // buscar todos los documentos por id de operador..
    public function documentsId($id)
    {
        CrudSIDF::readDocumentsId($id);
    }

    // actualizar documentos
    public function updateDocuments($documents){
        CrudSIDF::updateDocumentos($documents);
    }

    // subir archivos a nuestro servidor
    public function upload($uuid, $url){
        $router = '/caiN/cai/backend/upload/';
        $directori = $_SERVER['DOCUMENT_ROOT'].$router;
        move_uploaded_file($url, $directori.$uuid);
        return print_r(json_encode(array('action' => 'success')));
    }

    // seccion equipo-flotilla


    // crear equipo
    public function createEquipoF($equipo){
        CrudSIDF::createEquipo($equipo);
    }

    // actualizar equipo
    public function updateEquipoF($equipo){
        CrudSIDF::updateEquipo($equipo);
    }

    // buscar por placas o numero economico al equipo
    public function searchEquipoF($dato){
        CrudSIDF::searchEquipo($dato);
    }

    // validar numero economico
    public function validEco($data){
        CrudSIDF::validarNumEco($data);
    }

    // validar niv
    public function validNiv($data){
        CrudSIDF::validarNiv($data);
    }

    // validar motor
    public function validMotor($data){
        CrudSIDF::validarMotor($data);
    }

    /***
     * seccion documentos equipo flotilla
     */

     // insertar datos a la tabla documentos_equipo

    public function createDocumentsEq($documents){
        CrudSIDF::creeateDocumentsE($documents);
    }

    // actualizar documentos equipo flotilla
    public function updateDocumentsEq($documents){
        CrudSIDF::updateDocumentosE($documents);
    }

    // remplazar la informacion por la nueva
    public function deleteDocumentsEq($documents){
        CrudSIDF::deleteDocumentsE($documents);
    }


    // visualizar todos los documentos por su id.
    public function readDocumentsIdEq($id){
        CrudSIDF::readDocumentsIdE($id);
    }


    /**
    *   seccion de alertas
     */

     public function alerts($date, $factual){
         # code...
         CrudSIDF::alertasD($date, $factual);
     }

     /*
      busqueda por status de equipo ...
     */

     public function status($status, $tipo){
       CrudSIDF:: statusCrud($status, $tipo);
     }

     /*
        crear verificacion ambiental
     */
     public function ambiental($ambiental)
     {
       CrudSIDF::vambiental($ambiental);
     }

     /*
        listar verficacion Ambiental
     */
     public function listAmbiental($idequipo)
     {
       CrudSIDF::listarVambiental($idequipo);
     }

     /*
     * Validar folio verificacion ambiental
      */
      public function validFolio($folio)
      {
        CrudSIDF::validarFoliovamb($folio);
      }

      /* validar si el periodo ya esta ingreado */
      public function periodo($periodo)
      {
        // code...
        //CrudSIDF::lost($periodo);
      }

      /*
        Seccion de Fisico mecanico
       */

       // crear fisico Mecanico
       public function crearFM($fismeca)
       {
         CrudSIDF::crearFisicoMecanico($fismeca);
       }

       // listar fisico mecanico
       public function listarFM()
       {
         CrudSIDF::listFisicoMecanico();
       }

       // Validar Folio
       public function validarFolioFM($folio)
       {
         CrudSIDF::ValidFoliofm($folio);
       }

       // buscar por placa
       public function buscarPlaca($placa)
       {
         CrudSIDF::searchPlaca($placa);
       }

       // buscar por idequipo Fisico mecanico
       public function FMideq($id)
       {
         CrudSIDF::searchFMId($id);
       }

       // reporte FM y VA
       public function reportesFmVa($tipo, $fecha)
       {
         CrudSIDF::reporteFAFM($tipo, $fecha);
       }

       // listar year agregagos en base de datos

       public function getYear($table)
       {
         // code...
         CrudSIDF::getYearConsult($table);
       }

       // subir archivo Fisico Mecanido - ambiental
       public function uploadArchivoFA($data)
       {
        CrudSIDF::subirArchivoFA($data);
       }

       // buscar pid de ambietal y ficiso mecanico
       public function searchArchivoFA($id)
       {
           # code...
           CrudSIDF::searchIdFA($id);
       }

       // validar si exite el archivo
       public function ValidarUpload($fecha, $id)
       {
           # code...
           CrudSIDF::ValidarSubirArchivoFA($fecha, $id);
       }

//*****************************************************************************************************/
//---------CONTROLLER  PHP PROVEEDORES Y VALES DE COMBUSTIBLE (FINICIO:21/08 FFINAL:23/08 2020)------------//
//*****************************************************************************************************/

    /*
     *  seccion Proveedores
     */
    // crear proveedor    
    public function creatProv($prov) {CrudSIDF::createProv($prov);}
    // buscar proveedor
    public function searchProv($prov) {CrudSIDF::searchProv($prov);}
    //update provedor  
    public function updatProv($prov) {CrudSIDF::updateProv($prov);}   

    /**
     *  seccion lista tipos_proveedores
     */
    // crear tipos de  proveedor 
    public function creatTipoprov($Tprov) {CrudSIDF::createTProv($Tprov);}
    // listar tipos_proveedores
    public function listeProv() {CrudSIDF::listProv();}

    /**
     *  seccion de VALES DE COMBUSTIBLE
     */
    public function listeTiposE() {CrudSIDF::listEq();}

    public function listeTiposO() {CrudSIDF::listOp();}

    public function searchVE($val) {CrudSIDF::searchVEq($val);}

    public function searchFlete($val,$fc) {CrudSIDF::searchFlet($val,$fc);}

    public function listeGas($val) {CrudSIDF::listGas($val);}

    public function listeCombs() {CrudSIDF::listCombs();}

    public function updatCombs($val,$pre,$id) {CrudSIDF::updateCombs($val,$pre,$id);}

    public function createVal($val) {CrudSIDF::creatVal($val);}

    public function searchVal($val) {CrudSIDF::searchVale($val);}

    public function updateVal($val) {CrudSIDF::updateVale($val);}

    public function searchLast() {CrudSIDF::searchLastV();}

    /**
    *  seccion de ANTICIPOS INICIO-->(08/10/2020) FIN -->(//2020)
    */
    public function searchRemi($val){CrudSIDF::searchRemit($val);}

    public function searchDesti($val){CrudSIDF::searchDestin($val);}

    public function readClaveF($val){CrudSIDF::readClaveFlete($val);}

    public function searchFleteA($val){CrudSIDF::searchFleteV($val);}

}


