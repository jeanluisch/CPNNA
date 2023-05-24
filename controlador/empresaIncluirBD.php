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
  include ("../modelo/claseempresa.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $obj->conectar();
$empresa=new empresa();  
  
  $rif=$_SESSION['rif'];
  $nombre= $_REQUEST['nombre'];
  $direccion=$_REQUEST['direccion'];

  $empresa->rif=$rif;
  $empresa->nombre=$nombre;
  $empresa->direccion=$direccion;

  if($_REQUEST['btnGuardar']){
  
     $empresa->incluir();

	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/empresa.php'>";	//Envio hacia otra página
	 echo "<script> alert('Empresa Registrada con éxito. ...') </script>";
		 
  }
?>
</body>
</html>
