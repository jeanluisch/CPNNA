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
  include ("../modelo/clasepatron.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $obj->conectar();
$patron=new patron();  
  
  $ced=$_SESSION['cedula'];
  $nombre= $_REQUEST['nombre'];
  $rif_empresa= $_REQUEST['rif_empresa'];

  $patron->cedula=$ced;
  $patron->nombre=$nombre;
  $patron->rif_empresa=$rif_empresa;
  if($_REQUEST['btnGuardar']){
  
     $patron->incluir();

	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/patron.php'>";	//Envio hacia otra página
	 echo "<script> alert('Patron Registrado con éxito. ...') </script>";
		 
  }
?>
</body>
</html>
