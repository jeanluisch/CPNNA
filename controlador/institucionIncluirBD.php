<?php
   session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Documento sin t&iacute;tulo</title>
</head>

<body>
<?php
  include ("../modelo/claseinstitucion.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $obj->conectar();
$institucion=new institucion();  
  
  $nom=$_SESSION['nombre'];
  $direccion= $_REQUEST['direccion'];

  $institucion->nombre=$nom;
  $institucion->direccion=$direccion;
  
  if($_REQUEST['btnGuardar']){
  
     $institucion->incluir();

	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/institucion.php'>";	//Envio hacia otra p�gina
	 echo "<script> alert('Institucion Registrada con �xito. ...') </script>";
		 
  }
?>
</body>
</html>
