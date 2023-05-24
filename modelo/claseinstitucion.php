<?php
class institucion{

public $nombre;
public $direccion;

function consultar()
{
$strsql="SELECT * FROM institucion WHERE nombre='$this->nombre';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM institucion WHERE nombre='$this->nombre';"; // Consulta SQL..
	 
     $num=0;	 
	 $result=mysql_query($strsql); // "$strsql" es el argumento que se le pasa a la funcion "mysql_query"
				       // es decir: la cadena que contiene la consulta SQL por realizar.
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO institucion (nombre, direccion) VALUES ('$this->nombre', '".$this->direccion."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 $strsql="delete from institucion where nombre ='$this->nombre'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update institucion set direccion='".$this->direccion."' where nombre ='$this->nombre'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}


}
