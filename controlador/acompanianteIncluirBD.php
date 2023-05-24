<?php
   session_start();
?>
<html>
<head>
<title>Guardando Datos...</title>
<meta charset="UTF-8"/>
</head>

<body>
<?php
  include ("../modelo/claseacompaniante.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $obj->conectar();
$acompaniante=new acompaniante();  
  
  $ced=$_SESSION['cedula'];
  $nombre= $_REQUEST['nombre'];
  $apellido=$_REQUEST['apellido'];
 

  $acompaniante->cedula=$ced;
  $acompaniante->nombre=$nombre;
  $acompaniante->apellido=$apellido;
 
  if($_REQUEST['btnGuardar']){
  
     $acompaniante->incluir();

	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/acompaniante.php'>";	//Envio hacia otra página
	 echo "<script> alert('Registro Exitoso...') </script>";
		 
  }
?>
</body>
</html>
