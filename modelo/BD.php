<?php 
class conexion
{
public $servidor ;
public $usuario ;
public $clave ;
public $cpnna ;
function  conexion(){

$this->servidor="localhost";
$this->usuario="root";
$this->clave="";
$this->bd="cpnna";
}
  function conectar(){
    
    $idConn=mysql_connect($this->servidor,$this->usuario,$this->clave);

	  if($idConn==0)
		{
	     echo "Imposible de conectar con MySQL";
		}else
                    { $bdSelect= mysql_select_db($this->bd,$idConn);	
          
                if(!$bdSelect){
	         echo "Imposible de conectar con la Base de Datos ".$bd;
		 			 
		 }
		}	
	} 

  }
  
?>

