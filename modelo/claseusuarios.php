<?php
class usuarios{
public $ci_usuario;
public $nombre;
public $apellido;
public $usuario;
public $contrasenia;
public $tipo_usuario;
public $trabajador;
function consultar()
{
$strsql="SELECT * FROM usuarios WHERE usuario='$this->usuario';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM usuarios WHERE usuario='$this->usuario';";
	 
     $num=0;	 
	 $result=mysql_query($strsql); //ejecuta la tira sql
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO usuarios ( usuario, contrasenia, ci_usuario, nombre, apellido, trabajador, tipo_usuario) VALUES ('$this->usuario', '".$this->contrasenia."', '".$this->ci_usuario."', '".$this->nombre."', '".$this->apellido."', '".$this->trabajador."', '".$this->tipo_usuario."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 $strsql="delete from usuarios where usuario ='$this->usuarios'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update usuarios set usuario='".$this->usuario."', contrasenia='".$this->contrasenia."' , ci_usuario='".$this->ci_usuario."', nombre='".$this->nombre."',apellido='".$this->apellido."', trabajador='".$this->trabajador."', tipo_usuario='".$this->tipo_usuario."' where usuario ='$this->usuario'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}


}
?>
