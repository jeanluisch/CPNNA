<?php
class patron{
public $cedula;
public $nombre;
public $rif_empresa;
function consultar()
{
$strsql="SELECT * FROM patron WHERE cedula='$this->cedula';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM patron WHERE cedula='$this->cedula';"; // Consulta SQL..
	 
     $num=0;	 
	 $result=mysql_query($strsql); // "$strsql" es el argumento que se le pasa a la funcion "mysql_query"
				       // es decir: la cadena que contiene la consulta SQL por realizar.
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO patron ( cedula ,nombre, rif_empresa) VALUES 
	        ('$this->cedula', '".$this->nombre."', '".$this->rif_empresa."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 $strsql="delete from patron where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update patron set nombre='".$this->nombre."', rif_empresa='".$this->rif_empresa."' where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}


}
