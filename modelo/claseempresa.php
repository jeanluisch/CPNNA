<?php
class empresa{

public $rif;
public $nombre;
public $direccion;
function consultar()
{
$strsql="SELECT * FROM empresa WHERE rif='$this->rif';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM empresa WHERE rif='$this->rif';"; // Consulta SQL..
	 
     $num=0;	 
	 $result=mysql_query($strsql); // "$strsql" es el argumento que se le pasa a la funcion "mysql_query"
				       // es decir: la cadena que contiene la consulta SQL por realizar.
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO empresa ( rif ,nombre ,direccion) VALUES ('$this->rif', '".$this->nombre."','".$this->direccion."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 

}
function eliminar()
{

 $strsql="delete from empresa where rif ='$this->rif'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update empresa set nombre='".$this->nombre."', direccion='".$this->direccion."' where rif ='$this->rif'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}


}
