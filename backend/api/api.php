<?php


  require '../controller/controller.php';

  class PCV extends ControllerSIDF{

    public function apiPCV(){

      $enpoint = $_GET['api'];

  switch ($enpoint) {

      case 'auth':
        // autentification and user
        header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$auth = json_decode(file_get_contents('php://input'));
				ControllerSIDF::authLogin($auth);
        break;

			case 'user':
				// create user privilegi admin
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$user = json_decode(file_get_contents('php://input'));
				ControllerSIDF::createUser($user);
				break;

			case 'userId':
				// search user the iduser
				header('Access-Control-Allow-Origin: * ');
        header('Access-Control-Allow-Headers: * ');
				$iduser = $_GET['iduser'];
				ControllerSIDF::userId($iduser);
				break;

			case 'upuser':
			 	// update user ..
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$user = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updateUser($user);
				 break;

			case 'upoptions':
				header('Access-Control-Allow-Origin: * ');
			 	header('Access-Control-Allow-Headers: * ');
				$user = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updateopciones($user);
				 break;
			case 'upstatus':
				 // update user ..
				 header('Access-Control-Allow-Origin: * ');
				 header('Access-Control-Allow-Headers: * ');
				 $user = json_decode(file_get_contents('php://input'));
				 ControllerSIDF::updateStatu($user);
				 break;
			case 'users':
				// read users..
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::users();
				break;
			// clientes
			case 'client':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$client = json_decode(file_get_contents('php://input'));
				ControllerSIDF::creatClient($client);
				break;

			case 'searchClient':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$client = $_GET['search'];
				ControllerSIDF::search($client);
				break;

			case 'upclient':
				// code...
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$client = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updatClient($client);
				break;
			// productos
			case 'product':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$product= json_decode(file_get_contents('php://input'));
				ControllerSIDF::creatProduct($product);
				break;

			case 'products':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::listeProducts();
				break;
			/********************************************************/
			/*CAMBIOS AL SWITCH DE LA API AÑADIENDO  PROVEEDORES (INICIO 21/08)*/	  		  
			// proveedores
			case 'prov':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$product= json_decode(file_get_contents('php://input'));
				ControllerSIDF::creatProv($product);
				break;
			
			case 'searchProv':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$prov = $_GET['search'];
				ControllerSIDF::searchProv($prov);
				break;
	
			case 'upProv':
				// code...
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$prov = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updatProv($prov);
				break;
			case 'TipoProv':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$prov= json_decode(file_get_contents('php://input'));
				ControllerSIDF::creatTipoprov($prov);
				break;			
			case 'TiposProv':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::listeProv();
				break;
			/********************************************************/
			/********************************************************/
			/*********SECCION PARA LOS VALES DE COMBUSTIBLE**************/
			case 'TiposEquipo':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::listeTiposE();
				break;
			case 'TiposOperator':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::listeTiposO();
				break;
			case 'searchVE':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$prov = $_GET['search'];
				ControllerSIDF::searchVE($prov);
				break;
			case 'searchFlete':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$prov = $_GET['search'];
				$fc = $_GET['fc'];
				ControllerSIDF::searchFlete($prov,$fc);
				break;
			case 'TiposGas':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$val = $_GET['search'];
				ControllerSIDF::listeGas($val);
				break;
			case 'TiposCombs':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::listeCombs();
				break;
			case 'upCombs':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$val = $_GET['val'];
				$pre = $_GET['pre'];
				$id = $_GET['id'];
				ControllerSIDF::updatCombs($val,$pre,$id);
				break;
			case 'createVal':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$val= json_decode(file_get_contents('php://input'));
				ControllerSIDF::createVal($val);
				break;
			case 'searchVal':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$prov = $_GET['search'];
				ControllerSIDF::searchVal($prov);
				break;
			case 'upVal':
				// code...
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$prov = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updateVal($prov);
				break;
			case 'searchLast':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::searchLast();
				break;																			
			/////////////////////////////////////////////////////////////
			/*****************SECCION DE ANTICIPOS******************/
			case 'searchRemi':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$data = $_GET['search'];
				ControllerSIDF::searchRemi($data);
				break;			
			/*******************************************************/
			// seccion de operadores ...
			case 'operador':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$operador= json_decode(file_get_contents('php://input'));
				ControllerSIDF::createOperador($operador);
				break;
			case 'searchOperador':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$operador = $_GET['search'];
				ControllerSIDF::searchOperador($operador);
				break;
			case 'upOperador':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$operador= json_decode(file_get_contents('php://input'));
				ControllerSIDF::updateOperador($operador);
				break;

			case 'operadores':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				ControllerSIDF::readOp();
				break;
			// subir archivos al servidor ...
			case 'upload':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$nombre= $_FILES['file']['name'];
				$url = $_FILES['file']['tmp_name'];
				ControllerSIDF::upload($nombre, $url);
				break;

			case 'imss':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$numberimss = $_GET['search'];
				ControllerSIDF::numImss($numberimss);
			break;
			// documentos - operador
			case 'documents':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$documents = json_decode(file_get_contents('php://input'));
				ControllerSIDF::documents($documents);
			break;

			case 'documentsid':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$id = $_GET['idoperador'];
				ControllerSIDF::documentsId($id);
			break;

			case 'ddocuments':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$documents = json_decode(file_get_contents('php://input'));
				ControllerSIDF::documentsDelete($documents);
			break;

			case 'updocuments':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$documents = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updateDocuments($documents);
			break;
			// equipo-flotilla

			case 'equipo':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$equipo = json_decode(file_get_contents('php://input'));
				ControllerSIDF::createEquipoF($equipo);
			break;

			case 'upequipo':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$equipo = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updateEquipoF($equipo);
			break;

			case 'searche':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$equipo = $_GET['equipo'];
				ControllerSIDF::searchEquipoF($equipo);
			break;

			case 'validNumEco':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$numeco = $_GET['nume'];
				ControllerSIDF::validEco($numeco);
			break;

			case 'validNiv':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$niv = $_GET['niv'];
				ControllerSIDF::validNiv($niv);
			break;

			case 'validMotor':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$motor = $_GET['motor'];
				ControllerSIDF::validMotor($motor);
			break;

			// documentos equipo flotilla ....
			case 'documentseq':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$documents = json_decode(file_get_contents('php://input'));
				ControllerSIDF::createDocumentsEq($documents);
			break;

			case 'updocuemtseq':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$documents = json_decode(file_get_contents('php://input'));
				ControllerSIDF::updateDocumentsEq($documents);
			break;

			case 'ddocumentseq':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$documents = json_decode(file_get_contents('php://input'));
				ControllerSIDF::deleteDocumentsEq($documents);
			break;

			case 'documentseqId':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$id = $_GET['idequipo'];
				ControllerSIDF::readDocumentsIdEq($id);
			break;

			case 'alerts':
				header('Access-Control-Allow-Origin: * ');
				header('Access-Control-Allow-Headers: * ');
				$date = $_GET['dates'];
				$factual = $_GET['actual'];
				ControllerSIDF::alerts($date, $factual);
			break;

	      # busqueda de unidad por status
	      case 'repostatus':
	        header('Access-Control-Allow-Origin: * ');
	        header('Access-Control-Allow-Headers: * ');
	        $status = $_GET['status'];
	        $tipo = $_GET['tipo'];
	        ControllerSIDF::status($status, $tipo);
	        break;
	      # crear los datos de verificacion ambiental...
	      case 'vambiental':
	        header('Access-Control-Allow-Origin: * ');
	        header('Access-Control-Allow-Headers: * ');
	        $ambiental = json_decode(file_get_contents('php://input'));
	        ControllerSIDF::ambiental($ambiental);
	        break;
	      case 'listambiental':
	        header('Access-Control-Allow-Origin: * ');
	        header('Access-Control-Allow-Headers: * ');
	        $idequipo = $_GET['idequipo'];
	        ControllerSIDF::listAmbiental($idequipo);
	        break;
	      case 'varfyFoliovamb':
	        header('Access-Control-Allow-Origin: * ');
	        header('Access-Control-Allow-Headers: * ');
	        $folio = $_GET['folio'];
	        ControllerSIDF::validFolio($folio);
	        break;

		     case 'verifperiodo':
		       // code...
		       header('Access-Control-Allow-Origin: * ');
		       header('Access-Control-Allow-Headers: * ');
		       $periodo= $_GET['periodo'];
		       ControllerSIDF::periodo($periodo);
		       break;

		       case 'createFm':
		          header('Access-Control-Allow-Origin: * ');
		          header('Access-Control-Allow-Headers: * ');
		          $fismeca = json_decode(file_get_contents('php://input'));
		          ControllerSIDF::crearFM($fismeca);
		         break;

		      case 'listFm':
		          header('Access-Control-Allow-Origin: * ');
		          header('Access-Control-Allow-Headers: * ');
		          ControllerSIDF::listFisicoMecanico();
		        break;

		      case 'validFoliofm':
		          header('Access-Control-Allow-Origin: * ');
		          header('Access-Control-Allow-Headers: * ');
		          $folio = $_GET['folio'];
		          ControllerSIDF::validarFolioFM($folio);
		        break;

			      case 'searchPlaca':
			        header('Access-Control-Allow-Origin: * ');
			        header('Access-Control-Allow-Headers: * ');
			        $placa = $_GET['placa'];
			        ControllerSIDF::buscarPlaca($placa);
			        break;

			      case 'fmideq':
			        header('Access-Control-Allow-Origin: * ');
			        header('Access-Control-Allow-Headers: * ');
			        $id = $_GET['idequipo'];
			        ControllerSIDF::FMideq($id);
			        break;

			      case 'reportesFmVa':
			        header('Access-Control-Allow-Origin: * ');
			        header('Access-Control-Allow-Headers: * ');
			        $tipo = $_GET['tipo'];
			        $fecha = $_GET['fecha'];
			        ControllerSIDF::reportesFmVa($tipo, $fecha);
			        break;

			      case 'listfecha':
			        // code...
			        header('Access-Control-Allow-Origin: * ');
			        header('Access-Control-Allow-Headers: * ');
			        $table = $_GET['table'];
			        ControllerSIDF::getYear($table);
			        break;

			      case 'uploadFA':
			        	# code...
			        header('Access-Control-Allow-Origin: * ');
			        header('Access-Control-Allow-Headers: * ');
			        $data = json_decode(file_get_contents('php://input'));
			        ControllerSIDF::uploadArchivoFA($data);
			        break;
			      case 'searchFA':
			        	# code...
			        header('Access-Control-Allow-Origin: * ');
			        header('Access-Control-Allow-Headers: * ');
			        $id = $_GET['id'];
			        ControllerSIDF::searchArchivoFA($id);
			        break;
			      case 'validuploadFA':
			      	# code...
			      	header('Access-Control-Allow-Origin: * ');
			        header('Access-Control-Allow-Headers: * ');
			        $fecha = $_GET['fecha'];
			        $id = $_GET['id'];
			        ControllerSIDF::ValidarUpload($fecha, $id);
					  break;

    } // end switch ...
  } // end function api
} // end class PCV...


  $api = new PCV();
  $api->apiPCV();

?>
