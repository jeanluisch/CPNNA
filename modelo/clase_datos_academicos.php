<?php
class datos_academicos{
public $cedula;
public $grado;
public $seccion;
public $horario;
public $otros;
public $id_inst;
function consultar()
{
$strsql="SELECT * FROM datos_academicos WHERE cedula='$this->cedula';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 
}

function contar()
{
$strsql="SELECT * FROM datos_academicos WHERE cedula='$this->cedula';"; // Consulta SQL..
	 
     $num=0;	 
	 $result=mysql_query($strsql); // "$strsql" es el argumento que se le pasa a la funcion "mysql_query"
				       // es decir: la cadena que contiene la consulta SQL por realizar.
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO datos_academicos ( cedula ,grado ,seccion, horario, otros, id_inst ) VALUES ('$this->cedula', '".$this->grado."','".$this->seccion."', '".$this->horario."', '".$this->otros."', '".$this->id_inst."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 $strsql="delete from datos_academicos where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update datos_academicos set grado='".$this->grado."' , seccion='".$this->seccion."',horario='".$this->horario."',otros='".$this->otros."', id_inst='".$this->id_inst."' where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}


}
