	<?php

require '../conection/conection.php';

class CrudSIDF extends Conection
{

    /*
     * auth login user
     */
    public function auth($auth)
    {
        $pass = $this->encrytar($auth->password);
        $query = "SELECT iduser, name, role, user, opciones FROM users WHERE user=:user AND password=:password AND status='activo' ";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':user', $auth->user, PDO::PARAM_STR);
        $stm->bindParam(':password', $pass, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /*
     *    create user ....
     */
    public function createUser($user)
    {
        $password = $this->encrytar($user->password);
        $query = "INSERT INTO users ( name, user, password, role, status, opciones) VALUES (:name, :user, :password, :role, :status, :opciones)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':name', $user->name, PDO::PARAM_STR);
        $stm->bindParam(':user', $user->user, PDO::PARAM_STR);
        $stm->bindParam(':password', $password, PDO::PARAM_STR);
        $stm->bindParam(':role', $user->role, PDO::PARAM_STR);
        $stm->bindParam(':status', $user->status, PDO::PARAM_STR);
        $stm->bindParam(':opciones', $user->opciones, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /*
     * search user and id
     */
    public function UserId($iduser)
    {
        $query = "SELECT * FROM users WHERE iduser=:iduser";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam('iduser', $iduser, PDO::PARAM_STR);
        if ($stm->execute()) {
            $resultado = $stm->fetchAll(PDO::FETCH_ASSOC);
            $resultado[0]['password'] =  $this->dencrytar($resultado[0]['password']);
            return printf(json_encode($resultado));
        } else {
            return printf(json_encode(array('action' => "error")));
        }

    }

    /*
     * update user and id
     */
    public function updateUserId($user)
    {
        $password = $this->encrytar($user->password);
        $query = "UPDATE users SET name=:name, user=:user, password=:password WHERE iduser=:iduser";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':password', $password, PDO::PARAM_STR);
        $stm->bindParam(':iduser', $user->iduser, PDO::PARAM_STR);
        $stm->bindParam(':name', $user->name, PDO::PARAM_STR);
        $stm->bindParam(':user', $user->user, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    public function updateOptions($user)
    {
        $password = $this->encrytar($user->password);
        $query = "UPDATE users SET password=:password, opciones=:opciones WHERE iduser=:iduser";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':password', $password, PDO::PARAM_STR);
        $stm->bindParam(':iduser', $user->iduser, PDO::PARAM_STR);
        $stm->bindParam(':opciones', $user->opciones, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    public function updateStatus($user)
    {
        $query = "UPDATE users SET status=:status WHERE iduser=:iduser";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':status', $user->status, PDO::PARAM_STR);
        $stm->bindParam(':iduser', $user->iduser, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /*
     * read user
     */
    public function readUsers()
    {
        $query = "SELECT * FROM users";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            $res = $stm->fetchAll(PDO::FETCH_ASSOC);
            $leng = count($res);
            for ($i = 0; $i < $leng; $i++) {
                $res[$i]['password'] = $this->dencrytar($res[$i]['password']);
            }
            return printf(json_encode($res));
        } else {
            return printf(json_encode(array('action' => "error")));
        }

    }

    /*
     * seccion Clientes
     */

    // create client

    public function createClient($client)
    {
        $query = "INSERT INTO clientes (cliente, telefono, plazo_cobranza, encargado, domicilio, ciudad, rfc, clave_mercancia,tipo_mercancia, plazo_factura, email, codigo)
			VALUES ( :cliente, :telefono, :plazo_c, :encargado, :domicilio, :ciudad, :rfc, :clave_m , :mercancia, :plazo_f, :email, :codigo)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':cliente', $client->cliente, PDO::PARAM_STR);
        $stm->bindParam(':telefono', $client->telefono, PDO::PARAM_STR);
        $stm->bindParam(':plazo_c', $client->plazo_c, PDO::PARAM_STR);
        $stm->bindParam(':encargado', $client->encargado, PDO::PARAM_STR);
        $stm->bindParam(':domicilio', $client->domicilio, PDO::PARAM_STR);
        $stm->bindParam(':ciudad', $client->ciudad, PDO::PARAM_STR);
        $stm->bindParam(':rfc', $client->rfc, PDO::PARAM_STR);
        $stm->bindParam(':clave_m', $client->clave_m, PDO::PARAM_STR);
        $stm->bindParam(':mercancia', $client->mercancia, PDO::PARAM_STR);
        $stm->bindParam(':plazo_f', $client->plazo_f, PDO::PARAM_STR);
        $stm->bindParam(':email', $client->email, PDO::PARAM_STR);
        $stm->bindParam(':codigo', $client->codigo, PDO::PARAM_STR);

        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // search cliente por nombre

    public function searchClient($client)
    {
        $query = "SELECT * FROM clientes WHERE cliente LIKE '%$client%'";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // update cliente
    public function updateClient($client)
    {
        $query = "UPDATE clientes SET cliente=:cliente, telefono=:telefono, plazo_cobranza=:plazo_c, encargado= :encargado, domicilio=:domicilio, ciudad=:ciudad, rfc=:rfc, clave_mercancia=:clave_m, tipo_mercancia=:mercancia, plazo_factura=:plazo_f, email=:email, codigo=:codigo WHERE  idclientes=:idclientes";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':idclientes', $client->idclientes, PDO::PARAM_STR);
        $stm->bindParam(':cliente', $client->cliente, PDO::PARAM_STR);
        $stm->bindParam(':telefono', $client->telefono, PDO::PARAM_STR);
        $stm->bindParam(':plazo_c', $client->plazo_c, PDO::PARAM_STR);
        $stm->bindParam(':encargado', $client->encargado, PDO::PARAM_STR);
        $stm->bindParam(':domicilio', $client->domicilio, PDO::PARAM_STR);
        $stm->bindParam(':ciudad', $client->ciudad, PDO::PARAM_STR);
        $stm->bindParam(':rfc', $client->rfc, PDO::PARAM_STR);
        $stm->bindParam(':clave_m', $client->clave_m, PDO::PARAM_STR);
        $stm->bindParam(':mercancia', $client->mercancia, PDO::PARAM_STR);
        $stm->bindParam(':plazo_f', $client->plazo_f, PDO::PARAM_STR);
        $stm->bindParam(':email', $client->email, PDO::PARAM_STR);
        $stm->bindParam(':codigo', $client->codigo, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de producto
     */

    public function createProduct($product)
    {
        $query = "INSERT INTO  producto (nombre_producto) VALUES (:product)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':product', $product->producto, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // list producto ordenados de forma asendente A-Z

    public function listProducts()
    {
        $query = "SELECT * FROM producto ORDER BY nombre_producto ASC";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /*
    seccion operadores
     */

    // create operador
    public function createOperator($operador)
    {
        $query = "INSERT INTO operador (nombre, fecha_nacimiento, edad, curp, tipo_sangre, estatus, num_imss, fecha_alta,
			fecha_baje, num_licencia, vig_desde, vig_hasta, examen_medico, exa_desde, exa_hasta, domicilio, cp, ciudad)
			VALUES ( :nombre, :fn, :edad, :curp, :ts, :estatus, :nimss, :fa, :fb, :nl, :vd, :vh,
			:exm, :exd, :exh, :domicilio, :cp, :ciudad)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':nombre', $operador->nombre, PDO::PARAM_STR);
        $stm->bindParam(':fn', $operador->fn, PDO::PARAM_STR);
        $stm->bindParam(':edad', $operador->edad, PDO::PARAM_STR);
        $stm->bindParam(':curp', $operador->curp, PDO::PARAM_STR);
        $stm->bindParam(':ts', $operador->ts, PDO::PARAM_STR);
        $stm->bindParam(':estatus', $operador->status, PDO::PARAM_STR);
        $stm->bindParam(':nimss', $operador->nimss, PDO::PARAM_STR);
        $stm->bindParam(':fa', $operador->fa, PDO::PARAM_STR);
        $stm->bindParam(':fb', $operador->fb, PDO::PARAM_STR);
        $stm->bindParam(':nl', $operador->nl, PDO::PARAM_STR);
        $stm->bindParam(':vd', $operador->vd, PDO::PARAM_STR);
        $stm->bindParam(':vh', $operador->vh, PDO::PARAM_STR);
        $stm->bindParam(':exm', $operador->exm, PDO::PARAM_STR);
        $stm->bindParam(':exd', $operador->exd, PDO::PARAM_STR);
        $stm->bindParam(':exh', $operador->exh, PDO::PARAM_STR);
        $stm->bindParam(':domicilio', $operador->domicilio, PDO::PARAM_STR);
        $stm->bindParam(':cp', $operador->cp, PDO::PARAM_STR);
        $stm->bindParam(':ciudad', $operador->ciudad, PDO::PARAM_STR);

        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // search operador
    public function searchOperator($operador)
    {
        $query = "SELECT * FROM operador WHERE nombre LIKE '%$operador%' ORDER BY nombre ASC";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // read operador
    public function readOperator()
    {
        $query = "SELECT * FROM operador";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // update Operador....
    public function updateOperator($operador)
    {
        $query = "UPDATE operador SET nombre=:name, fecha_nacimiento=:fn, edad=:edad, curp=:curp, tipo_sangre=:ts, estatus=:estatus, num_imss=:nimss, fecha_alta=:fa, fecha_baje=:fb, num_licencia=:nl, vig_desde=:vd, vig_hasta=:vh, examen_medico=:exm, exa_desde=:exd, exa_hasta=:exh, domicilio=:domicilio, cp=:cp, ciudad=:ciudad WHERE idoperador=:idoperador";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':name', $operador->nombre, PDO::PARAM_STR);
        $stm->bindParam(':fn', $operador->fn, PDO::PARAM_STR);
        $stm->bindParam(':edad', $operador->edad, PDO::PARAM_STR);
        $stm->bindParam(':curp', $operador->curp, PDO::PARAM_STR);
        $stm->bindParam(':ts', $operador->ts, PDO::PARAM_STR);
        $stm->bindParam(':estatus', $operador->status, PDO::PARAM_STR);
        $stm->bindParam(':nimss', $operador->nimss, PDO::PARAM_STR);
        $stm->bindParam(':fa', $operador->fa, PDO::PARAM_STR);
        $stm->bindParam(':fb', $operador->fb, PDO::PARAM_STR);
        $stm->bindParam(':nl', $operador->nl, PDO::PARAM_STR);
        $stm->bindParam(':vd', $operador->vd, PDO::PARAM_STR);
        $stm->bindParam(':vh', $operador->vh, PDO::PARAM_STR);
        $stm->bindParam(':exm', $operador->exm, PDO::PARAM_STR);
        $stm->bindParam(':exd', $operador->exd, PDO::PARAM_STR);
        $stm->bindParam(':exh', $operador->exh, PDO::PARAM_STR);
        $stm->bindParam(':domicilio', $operador->domicilio, PDO::PARAM_STR);
        $stm->bindParam(':cp', $operador->cp, PDO::PARAM_STR);
        $stm->bindParam(':ciudad', $operador->ciudad, PDO::PARAM_STR);
        $stm->bindParam(':idoperador', $operador->idoperador, PDO::PARAM_STR);

        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /*
    verificar si ya exite el numero del imss
     */

    public function verificarImss($numberimss)
    {
        $query = "SELECT * FROM operador WHERE num_imss LIKE '$numberimss' ORDER BY num_imss ASC";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /*
    secccion de documentos
     */

    public function createDocuments($documents)
    {
        $query = "INSERT INTO documentos (idoperador, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10)
			VALUES (:idoperador, :d1, :d2, :d3, :d4, :d5, :d6, :d7, :d8, :d9, :d10)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':idoperador', $documents->idoperador, PDO::PARAM_STR);
        $stm->bindParam(':d1', $documents->d1, PDO::PARAM_STR);
        $stm->bindParam(':d2', $documents->d2, PDO::PARAM_STR);
        $stm->bindParam(':d3', $documents->d3, PDO::PARAM_STR);
        $stm->bindParam(':d4', $documents->d4, PDO::PARAM_STR);
        $stm->bindParam(':d5', $documents->d5, PDO::PARAM_STR);
        $stm->bindParam(':d6', $documents->d6, PDO::PARAM_STR);
        $stm->bindParam(':d7', $documents->d7, PDO::PARAM_STR);
        $stm->bindParam(':d8', $documents->d8, PDO::PARAM_STR);
        $stm->bindParam(':d9', $documents->d9, PDO::PARAM_STR);
        $stm->bindParam(':d10', $documents->d10, PDO::PARAM_STR);

        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // read documents id

    public function readDocumentsId($id)
    {
        $query = "SELECT * FROM documentos WHERE idoperador=$id";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // acutalizar documentos por columna
    public function deleteDocuments($documents)
    {
        $query = "UPDATE documentos SET $documents->column=:d  WHERE iddocuments=:id";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':d', $documents->newcontent, PDO::PARAM_STR);
        $stm->bindParam(':id', $documents->iddocuments, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // update documents

    public function updateDocumentos($documents)
    {
        $query = "UPDATE documentos SET d1=:d1, d2=:d2, d3=:d3, d4=:d4, d5=:d5, d6=:d6, d7=:d7, d8=:d8, d9=:d9, d10=:d10 WHERE idoperador=:idoperador";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':idoperador', $documents->idoperador, PDO::PARAM_STR);
        $stm->bindParam(':d1', $documents->d1, PDO::PARAM_STR);
        $stm->bindParam(':d2', $documents->d2, PDO::PARAM_STR);
        $stm->bindParam(':d3', $documents->d3, PDO::PARAM_STR);
        $stm->bindParam(':d4', $documents->d4, PDO::PARAM_STR);
        $stm->bindParam(':d5', $documents->d5, PDO::PARAM_STR);
        $stm->bindParam(':d6', $documents->d6, PDO::PARAM_STR);
        $stm->bindParam(':d7', $documents->d7, PDO::PARAM_STR);
        $stm->bindParam(':d8', $documents->d8, PDO::PARAM_STR);
        $stm->bindParam(':d9', $documents->d9, PDO::PARAM_STR);
        $stm->bindParam(':d10', $documents->d10, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *    Seccion equipo flotilla
     */

    // Insertar los datos de equipo
    public function createEquipo($equipo)
    {
        $query = "INSERT INTO equipo_flotilla
			(num_economico, placas, tipo, marca, niv, motor, modelo,
			 diferencial, suspencion, largo, ancho, alto, eje, estatus, altastc, bajastc,
			 numtc, num_poliza, vd, vh) VALUES
			 (:nume, :placas,:tipo ,:marca , :niv, :motor, :modelo, :diferencial,
			 :suspension, :largo, :ancho, :alto, :eje, :estatus, :altastc,
			 :bajastc, :numct, :poliza, :vd ,:vh)";

        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':nume', $equipo->nume, PDO::PARAM_STR);
        $stm->bindParam(':placas', $equipo->placas, PDO::PARAM_STR);
        $stm->bindParam(':tipo', $equipo->tipo, PDO::PARAM_STR);
        $stm->bindParam(':marca', $equipo->marca, PDO::PARAM_STR);
        $stm->bindParam(':niv', $equipo->niv, PDO::PARAM_STR);
        $stm->bindParam(':motor', $equipo->motor, PDO::PARAM_STR);
        $stm->bindParam(':modelo', $equipo->modelo, PDO::PARAM_STR);
        $stm->bindParam(':diferencial', $equipo->diferencial, PDO::PARAM_STR);
        $stm->bindParam(':suspension', $equipo->suspension, PDO::PARAM_STR);
        $stm->bindParam(':largo', $equipo->largo, PDO::PARAM_STR);
        $stm->bindParam(':ancho', $equipo->ancho, PDO::PARAM_STR);
        $stm->bindParam(':alto', $equipo->alto, PDO::PARAM_STR);
        $stm->bindParam(':eje', $equipo->eje, PDO::PARAM_STR);
        $stm->bindParam(':estatus', $equipo->estatus, PDO::PARAM_STR);
        $stm->bindParam(':altastc', $equipo->altastc, PDO::PARAM_STR);
        $stm->bindParam(':bajastc', $equipo->bajastc, PDO::PARAM_STR);
        $stm->bindParam(':numct', $equipo->numct, PDO::PARAM_STR);
        $stm->bindParam(':poliza', $equipo->poliza, PDO::PARAM_STR);
        $stm->bindParam(':vd', $equipo->vd, PDO::PARAM_STR);
        $stm->bindParam(':vh', $equipo->vh, PDO::PARAM_STR);

        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }

    }

    // actualizar datso de equipo
    public function updateEquipo($equipo)
    {
        $query = "UPDATE equipo_flotilla SET num_economico=:nume , placas=:placas ,
		tipo=:tipo , marca=:marca , niv=:niv , motor=:motor , modelo=:modelo , diferencial=:diferencial ,
		suspencion=:suspension  , largo=:largo  , ancho=:ancho  , alto=:alto  ,
		eje=:eje  , estatus=:estatus  , altastc=:altastc  , bajastc=:bajastc  , numtc=:numct  ,
		num_poliza=:poliza  ,vd=:vd  , vh=:vh  WHERE idequipo=:id";

		$stm = Conection::DBconection()->prepare($query);
		$stm->bindParam(':id', $equipo->idequipo, PDO::PARAM_STR);
		$stm->bindParam(':nume', $equipo->nume, PDO::PARAM_STR);
        $stm->bindParam(':placas', $equipo->placas, PDO::PARAM_STR);
        $stm->bindParam(':tipo', $equipo->tipo, PDO::PARAM_STR);
        $stm->bindParam(':marca', $equipo->marca, PDO::PARAM_STR);
        $stm->bindParam(':niv', $equipo->niv, PDO::PARAM_STR);
        $stm->bindParam(':motor', $equipo->motor, PDO::PARAM_STR);
        $stm->bindParam(':modelo', $equipo->modelo, PDO::PARAM_STR);
        $stm->bindParam(':diferencial', $equipo->diferencial, PDO::PARAM_STR);
        $stm->bindParam(':suspension', $equipo->suspension, PDO::PARAM_STR);
        $stm->bindParam(':largo', $equipo->largo, PDO::PARAM_STR);
        $stm->bindParam(':ancho', $equipo->ancho, PDO::PARAM_STR);
        $stm->bindParam(':alto', $equipo->alto, PDO::PARAM_STR);
        $stm->bindParam(':eje', $equipo->eje, PDO::PARAM_STR);
        $stm->bindParam(':estatus', $equipo->estatus, PDO::PARAM_STR);
        $stm->bindParam(':altastc', $equipo->altastc, PDO::PARAM_STR);
        $stm->bindParam(':bajastc', $equipo->bajastc, PDO::PARAM_STR);
        $stm->bindParam(':numct', $equipo->numct, PDO::PARAM_STR);
        $stm->bindParam(':poliza', $equipo->poliza, PDO::PARAM_STR);
        $stm->bindParam(':vd', $equipo->vd, PDO::PARAM_STR);
        $stm->bindParam(':vh', $equipo->vh, PDO::PARAM_STR);

        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }

    }

    // buscar por numero economico o placas ...
    public function searchEquipo($search)
    {
        $query = "SELECT * FROM equipo_flotilla WHERE num_economico LIKE '%$search%' ||  placas  LIKE '%$search%' ";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // validar el numero economico si existe
    public function validarNumEco($numeco)
    {
        $query = "SELECT * FROM equipo_flotilla WHERE num_economico  LIKE '$numeco'";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // validar Niv
    public function validarNiv($niv)
    {
        $query = "SELECT * FROM equipo_flotilla WHERE niv  LIKE '$niv'";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // validar Motor
    public function validarMotor($motor)
    {
        $query = "SELECT * FROM equipo_flotilla WHERE motor LIKE '$motor' ";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  Documentos equipo/flotilla
     */

    // crear documentos equipo flotilla
    public function creeateDocumentsE($documents)
    {
        $query = "INSERT INTO documentos_equipo (d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, idequipo)
			VALUES (:d1, :d2, :d3, :d4, :d5, :d6, :d7, :d8, :d9, :d10, :idequipo)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':idequipo', $documents->idequipo, PDO::PARAM_STR);
        $stm->bindParam(':d1', $documents->d1, PDO::PARAM_STR);
        $stm->bindParam(':d2', $documents->d2, PDO::PARAM_STR);
        $stm->bindParam(':d3', $documents->d3, PDO::PARAM_STR);
        $stm->bindParam(':d4', $documents->d4, PDO::PARAM_STR);
        $stm->bindParam(':d5', $documents->d5, PDO::PARAM_STR);
        $stm->bindParam(':d6', $documents->d6, PDO::PARAM_STR);
        $stm->bindParam(':d7', $documents->d7, PDO::PARAM_STR);
        $stm->bindParam(':d8', $documents->d8, PDO::PARAM_STR);
        $stm->bindParam(':d9', $documents->d9, PDO::PARAM_STR);
        $stm->bindParam(':d10', $documents->d10, PDO::PARAM_STR);

        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // actualizar equipo flotilla

    public function updateDocumentosE($documents)
    {
        $query = "UPDATE documentos_equipo SET d1=:d1, d2=:d2, d3=:d3, d4=:d4, d5=:d5, d6=:d6, d7=:d7, d8=:d8, d9=:d9, d10=:d10 WHERE idequipo=:idequipo";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':idequipo', $documents->idequipo, PDO::PARAM_STR);
        $stm->bindParam(':d1', $documents->d1, PDO::PARAM_STR);
        $stm->bindParam(':d2', $documents->d2, PDO::PARAM_STR);
        $stm->bindParam(':d3', $documents->d3, PDO::PARAM_STR);
        $stm->bindParam(':d4', $documents->d4, PDO::PARAM_STR);
        $stm->bindParam(':d5', $documents->d5, PDO::PARAM_STR);
        $stm->bindParam(':d6', $documents->d6, PDO::PARAM_STR);
        $stm->bindParam(':d7', $documents->d7, PDO::PARAM_STR);
        $stm->bindParam(':d8', $documents->d8, PDO::PARAM_STR);
        $stm->bindParam(':d9', $documents->d9, PDO::PARAM_STR);
        $stm->bindParam(':d10', $documents->d10, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  actualizar por columna equipo flotilla
     */

    // acutalizar documentos por columna
    public function deleteDocumentsE($documents)
    {
        $query = "UPDATE documentos_equipo SET $documents->column=:d  WHERE iddocumentse=:id";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':d', $documents->newcontent, PDO::PARAM_STR);
        $stm->bindParam(':id', $documents->idequipo, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // read documentos equipo flotilla id

    public function readDocumentsIdE($id)
    {
        $query = "SELECT * FROM documentos_equipo WHERE idequipo=$id";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }


    /*
    *  listar alertas
     */

     public function alertasD($fecha, $factual){
        $opeadorVg ="SELECT * FROM operador WHERE vig_hasta <= '$fecha' ORDER by vig_hasta DESC";
        $operadorEx = "SELECT * FROM operador WHERE exa_hasta <= '$fecha' ORDER BY exa_hasta DESC";
		$equipoVh = "SELECT * FROM equipo_flotilla WHERE `vh` <='$fecha' ORDER BY vh DESC";
        $vambiental = "SELECT f.fecha, f.periodo, f.folio, eq.placas, eq.tipo FROM vambiental f INNER JOIN equipo_flotilla eq on eq.idequipo = f.idequipo WHERE YEAR(fecha) = '$fecha' AND fecha <= (CURDATE() - INTERVAL 30 DAY) ORDER BY f.idvambiental ASC";
        $vfisico = "SELECT f.fecha, f.periodo, f.folio, eq.placas, eq.tipo FROM fisico_mecanico f INNER JOIN equipo_flotilla eq on eq.idequipo = f.idequipo WHERE YEAR(fecha) = '$fecha' AND fecha <= (CURDATE() - INTERVAL 30 DAY) ORDER BY f.idfisicomecanico ASC";
        $stm = Conection::DBconection()->prepare($opeadorVg);
        $stmm = Conection::DBconection()->prepare($operadorEx);
		$stmmn = Conection::DBconection()->prepare($equipoVh);
        $stmmn1 = Conection::DBconection()->prepare($vambiental);
        $stmmn2 = Conection::DBconection()->prepare($vfisico);
        $stm->execute();
        $stmm->execute();
		$stmmn->execute();
        $stmmn1->execute();
        $stmmn2->execute();
        $json=  array(
            "alertas"=>array("licencia"=>$stm->fetchAll(PDO::FETCH_ASSOC),
                "examen_medico"=>$stmm->fetchAll(PDO::FETCH_ASSOC),
                "equipo"=>$stmmn->fetchAll(PDO::FETCH_ASSOC),
                "vambiental" => $stmmn1->fetchAll(PDO::FETCH_ASSOC),
                "vfisico" => $stmmn2->fetchAll(PDO::FETCH_ASSOC) 

            ));
        return printf(json_encode($json));
     }

    /*
     *  Codifica a base64 para crear una seguridad en el password.
     */
    public function encrytar($password)
    {
        $methoHas = 'PCV01982019$';
        $encryt = $password . $methoHas;
        return base64_encode($encryt);
    }

    /*
     *  para decodificar y mostrar el password  base64_decode
     */
    public function dencrytar($password)
    {
        $encrytPassword = base64_decode($password);
        $methoHas = 'PCV01982019$';
        $password = str_replace($methoHas, '', $encrytPassword);
        return $password;
    }


		// busqueda por status del equipo ...
		public function statusCrud($status, $tipo)
		{
			switch ($status) {
				case 'todos':
					$query = "SELECT * FROM equipo_flotilla";
				break;
				case 'operando':
					$query = "SELECT * FROM equipo_flotilla WHERE estatus='operando' AND tipo='$tipo' ";
				break;
				case 'baja_definitiva':
					$query = "SELECT * FROM equipo_flotilla WHERE estatus='baja_definitiva' AND tipo='$tipo' ";
				break;
				case 'vendido':
					$query = "SELECT * FROM equipo_flotilla WHERE estatus='vendido' AND tipo='$tipo' ";
				break;
				case 'accidentado':
					$query = "SELECT * FROM equipo_flotilla WHERE estatus='accidentado' AND tipo='$tipo' ";
				break;
				case 'robado':
					$query = "SELECT * FROM equipo_flotilla WHERE estatus='robado' AND tipo='$tipo' ";
					break;
			}

			$stm = Conection::DBconection()->prepare($query);
			$stm->bindParam(':status', $status, PDO::PARAM_STR);
			if ($stm->execute()) {
					return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
			} else {
					return printf(json_encode(array('action' => "error")));
			}
		}


		/**
		 *
		 */

		public function reporteFAFM($tipo, $fecha)
		{
			switch ($tipo) {
				case 'vfisicomecanico':
					$query ="SELECT va.folio, va.periodo, va.unidadveifi, eqf.num_economico, eqf.placas, eqf.tipo, eqf.estatus FROM fisico_mecanico va
									INNER JOIN equipo_flotilla eqf on eqf.idequipo = va.idequipo
									WHERE YEAR(va.fecha)='$fecha'";
					break;
				case 'vambiental':
					$query = "SELECT va.folio, va.periodo, va.unidadveifi, eqf.num_economico, eqf.placas, eqf.tipo, eqf.estatus FROM vambiental va
										INNER JOIN equipo_flotilla eqf on eqf.idequipo = va.idequipo
										WHERE YEAR(va.fecha)='$fecha'";
					break;
			}

			$stm = Conection::DBconection()->prepare($query);
			if ($stm->execute()) {
					return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
			} else {
					return printf(json_encode(array('action' => "error")));
			}

		}



		/*
		*  Ingresar los datos de verificacion ambiental
		 */
		public function vambiental($ambiental)
		{
			$query = "INSERT INTO vambiental (fecha, folio, periodo, unidadveifi, idequipo)
			VALUES ( :fecha, :folio, :periodo, :noverifi, :idequipo)";
			$stm = Conection::DBconection()->prepare($query);
			$stm->bindParam(':fecha', $ambiental->fecha, PDO::PARAM_STR);
			$stm->bindParam(':folio', $ambiental->folio, PDO::PARAM_STR);
			$stm->bindParam(':periodo', $ambiental->periodo, PDO::PARAM_STR);
			$stm->bindParam(':noverifi', $ambiental->noverifi, PDO::PARAM_STR);
			$stm->bindParam(':idequipo', $ambiental->idequipo, PDO::PARAM_STR);
			if ($stm->execute()) {
					return printf(json_encode(array('action' => "success")));
			} else {
					return printf(json_encode(array('action' => "error")));
			}
		}

		/*
		* Listar las verificaciones de acuerdo al equipo mediante el id equipo...
		 */
		public function listarVambiental($idequipo)
		{
			$query ="SELECT * FROM vambiental WHERE idequipo=:idequipo ORDER BY fecha DESC";
			$stm = Conection::DBconection()->prepare($query);
			$stm->bindParam(':idequipo', $idequipo, PDO::PARAM_STR);
			if ($stm->execute()) {
					return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
			} else {
					return printf(json_encode(array('action' => "error")));
			}
		}

		/* Validar si exite o no el numero de folio */
		public function validarFoliovamb($folio)
		{
			$query = "SELECT * FROM vambiental WHERE folio='$folio'";
			$stm = Conection::DBconection()->prepare($query);
			if ($stm->execute()) {
					return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
			} else {
					return printf(json_encode(array('action' => "error")));
			}
		}



		 // seccion de fisico mecanico

		 // crear datos fisico Mecanica..
		 public function crearFisicoMecanico($fismeca){
		 		$query = "INSERT INTO fisico_mecanico (periodo, fecha, folio,
					unidadveifi, idequipo, equipo)
				VALUES (:periodo, :fecha, :folio, :unidad, :idequipo, :equipo)";
				$stm = Conection::DBconection()->prepare($query);
					$stm->bindParam(':periodo', $fismeca->periodo, PDO::PARAM_STR);
				$stm->bindParam(':fecha', $fismeca->fecha, PDO::PARAM_STR);
				$stm->bindParam(':folio', $fismeca->folio, PDO::PARAM_STR);
				$stm->bindParam(':unidad', $fismeca->unidad, PDO::PARAM_STR);
				$stm->bindParam(':idequipo', $fismeca->idequipo, PDO::PARAM_STR);
				$stm->bindParam(':equipo', $fismeca->equipo, PDO::PARAM_STR);
				if ($stm->execute()) {
						return printf(json_encode(array('action' => "success")));
				} else {
						return printf(json_encode(array('action' => "error")));
				}

		 }


		 // listar todos los datos del fisico Mecanico
		 public function listFisicoMecanico(){
		 		$query = "SELECT * FROM fisico_mecanico";
				$stm = Conection::DBconection()->prepare($query);
				if ($stm->execute()) {
						return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
				} else {
						return printf(json_encode(array('action' => "error")));
				}
		 }

		 // Validar el folio de fisico Mecanico
		 public function ValidFoliofm($folio)
		 {
		 		$query = "SELECT * FROM fisico_mecanico WHERE folio='$folio'";
				$stm = Conection::DBconection()->prepare($query);
				if ($stm->execute()) {
						return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
				} else {
						return printf(json_encode(array('action' => "error")));
				}
		 }

		 // buscar equipo por placa
		 public function searchPlaca($placa){
			 $query = "SELECT * FROM equipo_flotilla WHERE placas='$placa' ";
			 $stm = Conection::DBconection()->prepare($query);
			 if ($stm->execute()) {
					 return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
			 } else {
					 return printf(json_encode(array('action' => "error")));
			 }
		 }


		 // buscar equipo por placa
		 public function searchFMId($id){
			 $query = "SELECT * FROM fisico_mecanico WHERE idequipo='$id'  ";
			 $stm = Conection::DBconection()->prepare($query);
			 if ($stm->execute()) {
					 return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
			 } else {
					 return printf(json_encode(array('action' => "error")));
			 }
		 }


		 public function getYearConsult($table){

			 switch ($table) {
			 	case 'vfisicomecanico':
			 		// code...
			 		$query = "SELECT DISTINCT YEAR(fm.fecha)from fisico_mecanico fm ORDER BY YEAR(fm.fecha) DESC";
			 		break;
				case 'vambiental':
					// code...
					$query = "SELECT DISTINCT YEAR(fm.fecha)from vambiental fm ORDER BY YEAR(fm.fecha) DESC";
					break;
			 }

			 $stm = Conection::DBconection()->prepare($query);
			 if ($stm->execute()) {
					 return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
			 } else {
					 return printf(json_encode(array('action' => "error")));
			 }
		 }


        // subir archivo fisico mecanido - ambiental
        public function subirArchivoFA($dato){
            $query = "INSERT INTO recursos (fecha, recurso, id) VALUES ( :fecha, :recurso, :id)";
            $stm = Conection::DBconection()->prepare($query);
                $stm->bindParam(':recurso', $dato->recurso, PDO::PARAM_STR);
                $stm->bindParam(':fecha', $dato->fecha, PDO::PARAM_STR);
                $stm->bindParam(':id', $dato->id, PDO::PARAM_STR);
                if ($stm->execute()) {
                        return printf(json_encode(array('action' => "success")));
                } else {
                        return printf(json_encode(array('action' => "error")));
                }
        }


        public function searchIdFA($id)
        {
            # code...
            $query = "SELECT recurso, idrecurso FROM recursos WHERE id=$id";
            $stm = Conection::DBconection()->prepare($query);
             if ($stm->execute()) {
                     return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
             } else {
                     return printf(json_encode(array('action' => "error")));
             }
        }


        public function ValidarSubirArchivoFA($fecha, $id)
        {
            # code...
            $query = "SELECT * FROM recursos WHERE fecha='$fecha' AND id=$id";
            $stm = Conection::DBconection()->prepare($query);
             if ($stm->execute()) {
                     return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
             } else {
                     return printf(json_encode(array('action' => "error")));
             }
        }
    
//*****************************************************************************************************/
//---------CRUD PHP PROVEEDORES Y VALES DE COMBUSTIBLE (FINICIO:21/08 FFINAL:23/08 2020)------------//
//*****************************************************************************************************/        
    
    /**
     *  seccion de proveedores
    */
    // create proveedor

        public function createProv($client)
        {
            $query = "INSERT INTO proveedores (nombreprov, telprov, plazocprov, encargadoprov, domicilioprov, 
                                            ciudadprov, rfcprov, tipoprov, plazofprov, correoprov, pcodigoprov)
                VALUES ( :provedor, :telefono, :plazo_c, :encargado, :domicilio, :ciudad, :rfc, :clave_m , :plazo_f, :email, :codigo)";
            $stm = Conection::DBconection()->prepare($query);
            $stm->bindParam(':provedor', $client->cliente, PDO::PARAM_STR);
            $stm->bindParam(':telefono', $client->telefono, PDO::PARAM_STR);
            $stm->bindParam(':plazo_c', $client->plazo_c, PDO::PARAM_STR);
            $stm->bindParam(':encargado', $client->encargado, PDO::PARAM_STR);
            $stm->bindParam(':domicilio', $client->domicilio, PDO::PARAM_STR);
            $stm->bindParam(':ciudad', $client->ciudad, PDO::PARAM_STR);
            $stm->bindParam(':rfc', $client->rfc, PDO::PARAM_STR);
            $stm->bindParam(':clave_m', $client->clave_m, PDO::PARAM_STR);
            $stm->bindParam(':plazo_f', $client->plazo_f, PDO::PARAM_STR);
            $stm->bindParam(':email', $client->email, PDO::PARAM_STR);
            $stm->bindParam(':codigo', $client->codigo, PDO::PARAM_STR);
    
            if ($stm->execute()) {
                return printf(json_encode(array('action' => "success")));
            } else {
                return printf(json_encode(array('action' => "error")));
            }
        }
    
        // search provedor por nombre
    
        public function searchProv($client)
        {
            $query = "SELECT * FROM proveedores WHERE nombreprov LIKE '%$client%'";
            $stm = Conection::DBconection()->prepare($query);
            if ($stm->execute()) {
                return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
            } else {
                return printf(json_encode(array('action' => "error")));
            }
        }
    
        // update provedor
        public function updateProv($client)
        {
            $query = "UPDATE proveedores SET nombreprov=:cliente, telprov=:telefono, plazocprov=:plazo_c, 
            encargadoprov= :encargado, domicilioprov=:domicilio, ciudadprov=:ciudad, rfcprov=:rfc, tipoprov =:clave_m, 
            plazofprov=:plazo_f, correoprov=:email, pcodigoprov=:codigo WHERE  idproveedor=:idclientes";
            $stm = Conection::DBconection()->prepare($query);
            $stm->bindParam(':idclientes', $client->idclientes, PDO::PARAM_STR);
            $stm->bindParam(':cliente', $client->cliente, PDO::PARAM_STR);
            $stm->bindParam(':telefono', $client->telefono, PDO::PARAM_STR);
            $stm->bindParam(':plazo_c', $client->plazo_c, PDO::PARAM_STR);
            $stm->bindParam(':encargado', $client->encargado, PDO::PARAM_STR);
            $stm->bindParam(':domicilio', $client->domicilio, PDO::PARAM_STR);
            $stm->bindParam(':ciudad', $client->ciudad, PDO::PARAM_STR);
            $stm->bindParam(':rfc', $client->rfc, PDO::PARAM_STR);
            $stm->bindParam(':clave_m', $client->clave_m, PDO::PARAM_STR);
            $stm->bindParam(':plazo_f', $client->plazo_f, PDO::PARAM_STR);
            $stm->bindParam(':email', $client->email, PDO::PARAM_STR);
            $stm->bindParam(':codigo', $client->codigo, PDO::PARAM_STR);
            if ($stm->execute()) {
                return printf(json_encode(array('action' => "success")));
            } else {
                return printf(json_encode(array('action' => "error")));
            }
        }

    /**
     *  seccion de tipos_proveedores
     */
    public function createTProv($product)
    {
        $query = "INSERT INTO  tiposprov (Tipo_Proveedor) VALUES (:product)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':product', $product->producto, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    // list tipos_proveedores ordenados de forma ascendente A-Z
    //------------- $query = "SELECT * FROM tiposprov ORDER BY Tipo_Proveedor ASC";
    //------------- $query = "SELECT * FROM producto ORDER BY nombre_producto ASC";

    public function listProv()
    {
        $query = "SELECT * FROM tiposprov ORDER BY Tipo_Proveedor ASC";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de tipos_Equipos
     */
    public function listEq()
    {
        $query = "SELECT * FROM equipo_flotilla WHERE tipo='Tractor'";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de Operadores_Vales de Combustible
     */
    public function listOp()
    {
        $query = "SELECT * FROM operador WHERE estatus='Alta'";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de Operadores_Vales de Combustible
     */
    public function searchVEq($val)
    {
        $query = "SELECT * FROM equipo_flotilla WHERE idequipo=$val";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de busqueda de Fletes de viaje
     */
    public function searchFlet($client,$fc)
    {
        //$query = "SELECT * FROM viajes WHERE claveFlete LIKE '%$client%' AND cliente=$fc";
        $query = "SELECT * FROM origenesd WHERE flete LIKE '%$client%' AND idclientes=$fc";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de Gasolineras - Vales de Combustible
     */
    public function listGas($val)
    {
        $query = "SELECT * FROM proveedores WHERE tipoprov=$val";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de Combustibles --- LISTADO de BD
     */
    public function listCombs()
    {
        $query = "SELECT * FROM combustibles ";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }
    
    /**
     *  seccion de Actualizacion de precios de combustible
     */
    public function updateCombs($val,$pre,$id)
    {
        $query = "UPDATE combustibles SET ultcambio=$val,precio=$pre WHERE idcomb=$id";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de vales -- creacion de un nuevo vale
     */
    public function creatVal($client)
    {
        $query = "INSERT INTO vales (fechaval, cliente, claveflete, descflete, nombreop, claveop, claveeq, noeq, 
                                    placaeq, gasolinera, tipocombs, precio, cantidad, importe)
            VALUES (:fechaval, :cliente, :claveflete, :descflete, :nombreop, :claveop, :claveeq, :noeq, :placaeq, :gasolinera, :tipocombs, :precio, :cantidad, :importe)";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':fechaval', $client->fecha, PDO::PARAM_STR);
        $stm->bindParam(':cliente', $client->nombrecliente, PDO::PARAM_STR);
        $stm->bindParam(':claveflete', $client->claveF, PDO::PARAM_STR);
        $stm->bindParam(':descflete',  $client->desc, PDO::PARAM_STR);
        $stm->bindParam(':nombreop',  $client->mercancia, PDO::PARAM_STR);
        $stm->bindParam(':claveop',  $client->clave_m, PDO::PARAM_STR);
        $stm->bindParam(':claveeq',  $client->equipo, PDO::PARAM_STR);
        $stm->bindParam(':noeq',  $client->nroe, PDO::PARAM_STR);
        $stm->bindParam(':placaeq',  $client->placa, PDO::PARAM_STR);
        $stm->bindParam(':gasolinera',  $client->gasolinera, PDO::PARAM_STR);
        $stm->bindParam(':tipocombs',  $client->combs, PDO::PARAM_STR);
        $stm->bindParam(':precio',  $client->precioCombustible, PDO::PARAM_STR);
        $stm->bindParam(':cantidad',  $client->cantidadcombs, PDO::PARAM_STR);
        $stm->bindParam(':importe',  $client->importe, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de Busqueda de Vales
     */
    public function searchVale($val)
    {   
        /*
        $query = "SELECT V.idvale, V.fechaval, V.cliente, V.claveflete, V.descflete, O.nombre, V.claveop, V.claveeq,
		                    V.noeq, V.placaeq, V.gasolinera, V.tipocombs, C.precio, V.cantidad, V.importe 
                  FROM vales V,operador O,combustibles C 
                  WHERE idvale LIKE '%$val%' AND V.claveop=O.idoperador AND V.tipocombs=C.idcomb";  
                  */
        $query="SELECT V.idvale, V.fechaval, V.cliente, V.claveflete, V.descflete, O.nombre, V.claveop, V.claveeq,
        V.noeq, V.placaeq, V.gasolinera, V.tipocombs, C.precio, V.cantidad, V.importe, P.nombreprov
                FROM vales V,operador O,combustibles C, proveedores P 
                WHERE idvale LIKE '%$val%' AND V.claveop=O.idoperador AND V.tipocombs=C.idcomb AND V.gasolinera=P.idproveedor";                  
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de Update de Vales
     */
    public function updateVale($client)
    {
        $query = "UPDATE vales SET fechaval=:fechaval, cliente=:cliente, claveflete=:claveflete, 
        descflete=:descflete, nombreop=:nombreop, claveop=:claveop, claveeq=:claveeq, noeq=:noeq, placaeq=:placaeq, 
        gasolinera=:gasolinera, tipocombs=:tipocombs, precio=:precio, cantidad=:cantidad, importe=:importe
        WHERE  idvale=:idvale";
        $stm = Conection::DBconection()->prepare($query);
        $stm->bindParam(':idvale', $client->idvale, PDO::PARAM_STR);
        $stm->bindParam(':fechaval', $client->fecha, PDO::PARAM_STR);
        $stm->bindParam(':cliente', $client->nombrecliente, PDO::PARAM_STR);
        $stm->bindParam(':claveflete', $client->claveF, PDO::PARAM_STR);
        $stm->bindParam(':descflete',  $client->desc, PDO::PARAM_STR);
        $stm->bindParam(':nombreop',  $client->mercancia, PDO::PARAM_STR);
        $stm->bindParam(':claveop',  $client->clave_m, PDO::PARAM_STR);
        $stm->bindParam(':claveeq',  $client->equipo, PDO::PARAM_STR);
        $stm->bindParam(':noeq',  $client->nroe, PDO::PARAM_STR);
        $stm->bindParam(':placaeq',  $client->placa, PDO::PARAM_STR);
        $stm->bindParam(':gasolinera',  $client->gasolinera, PDO::PARAM_STR);
        $stm->bindParam(':tipocombs',  $client->combs, PDO::PARAM_STR);
        $stm->bindParam(':precio',  $client->precioCombustible, PDO::PARAM_STR);
        $stm->bindParam(':cantidad',  $client->cantidadcombs, PDO::PARAM_STR);
        $stm->bindParam(':importe',  $client->importe, PDO::PARAM_STR);
        if ($stm->execute()) {
            return printf(json_encode(array('action' => "success")));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  seccion de busqueda de Fletes de viaje
     */
    public function searchLastV()
    {
        $query = "SELECT * FROM vales ORDER by idvale DESC LIMIT 1";
        $query = "SELECT V.idvale,V.fechaval, V.claveflete, V.descflete,O.nombre, P.nombreprov, V.noeq,V.placaeq, V.tipocombs, V.cantidad, V.tipocombs
                  FROM vales V, proveedores P, operador O
                  WHERE V.gasolinera = P.idproveedor AND V.claveop=O.idoperador
                  ORDER by idvale DESC LIMIT 1
        ";
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

    /**
     *  SECCION DE ANTICIPOS
     */
    
    //buscar remitente
    public function searchRemit($data) {
        $query="";                  
        $stm = Conection::DBconection()->prepare($query);
        if ($stm->execute()) {
            return printf(json_encode($stm->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            return printf(json_encode(array('action' => "error")));
        }
    }

} // end class CrudPCV .. 



?>
