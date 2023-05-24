<?php
class representante{
public $cedula;
public $nombre;
public $apellido;
public $f_nacimiento;
public $direccion;
public $edo_civil;
public $telefono;
function consultar()
{
$strsql="SELECT * FROM representante WHERE cedula='$this->cedula';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM representante WHERE cedula='$this->cedula';";
	 
     $num=0;	 
	 $result=mysql_query($strsql); //ejecuta la tira sql
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO representante ( cedula ,nombre ,apellido, f_nacimiento, direccion, edo_civil, telefono) VALUES 
	        ('$this->cedula', '".$this->nombre."','".$this->apellido."', '".$this->f_nacimiento."', '".$this->direccion."', '".$this->edo_civil."', '".$this->telefono."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 $strsql="delete from representante where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update representante set nombre='".$this->nombre."', apellido='".$this->apellido."' , f_nacimiento='".$this->f_nacimiento."', direccion='".$this->direccion."', edo_civil='".$this->edo_civil."', telefono='".$this->telefono."' where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}


}
