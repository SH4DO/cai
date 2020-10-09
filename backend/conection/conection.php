<?php
  /**
   * conection DB pcvcontrol ...
   */
  class Conection {
      public function DBconection(){
        $conexion = new PDO("mysql:host=localhost; dbname=pcvcontrol", "root", "");
        return $conexion;
      }
  }

 ?>
