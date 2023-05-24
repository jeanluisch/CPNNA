<?php

class solicitud_viaje{
public $id_viaje;
public $codigo;
public $tipo_viaje;
public $ci_ado;
public $motivo_viaje;
public $destino_viaje;
public $fecha_salida;
public $fecha_regreso;
public $ci_rm;
public $ci_rp;
public $ci_acom;
public $fecha_expedicion;

function consultar()
{
$strsql="SELECT * FROM viaje WHERE ci_ado='$this->ci_ado' ORDER BY id_viaje DESC;";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM viaje WHERE ci_ado='$this->ci_ado';"; // Consulta SQL..
	 
     $num=0;	 
	 $result=mysql_query($strsql); // "$strsql" es el argumento que se le pasa a la funcion "mysql_query"
									// es decir: la cadena que contiene la consulta SQL por realizar.
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO viaje (codigo, ci_ado, tipo_viaje, motivo_viaje, destino_viaje, fecha_salida, fecha_regreso, ci_rm, ci_rp, ci_acom, fecha_expedicion) VALUES ('$this->codigo', '".$this->ci_ado."', '".$this->tipo_viaje."', '".$this->motivo_viaje."','".$this->destino_viaje."', '".$this->fecha_salida."', '".$this->fecha_regreso."', '".$this->ci_rm."', '".$this->ci_rp."', '".$this->ci_acom."', '".$this->fecha_expedicion."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 	 $strsql="delete from viaje where ci_ado ='$this->ci_ado'";	 
	 $result=mysql_query($strsql);
}
function modificar()
{
	$strsql="update viaje set tipo_viaje='".$this->tipo_viaje."', motivo_viaje='".$this->motivo_viaje."', destino_viaje='".$this->destino_viaje."' , fecha_salida='".$this->fecha_salida."', fecha_regreso='".$this->fecha_regreso."', ci_rm='".$this->ci_rm."', ci_rp='".$this->ci_rp."', ci_acom='".$this->ci_acom."' where id_viaje ='$this->id_viaje' and ci_ado ='$this->ci_ado'";	 
	$result=mysql_query($strsql);//ejecuta la tira sql	 	  
}

}
