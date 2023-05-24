<?php
   session_start();
?>
<?php error_reporting (0);?>
<html>
<head>
<meta charset="UTF-8"/>
<title>Procensando Inf...</title>
</head>

<body>
<?php
include ("../modelo/claseacompaniante.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $acompaniante=new acompaniante();
  $obj->conectar();
  
  $ced=$_SESSION['cedula'];
  $nombre= $_REQUEST['nombre'];
  $apellido=$_REQUEST['apellido'];
  

  $acompaniante->cedula=$ced;   // introduce valores en cada atributo
  $acompaniante->nombre=$nombre;
  $acompaniante->apellido=$apellido;
 
	
	
  if($_REQUEST['btnModificar']=='Modificar'){
  $acompaniante->modificar();
      
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/acompaniante.php'>";
	 echo "<script> alert('Datos modificados con éxito!!.') </script>";	 
  }
  
  if($_REQUEST['btnEliminar']=='Eliminar'){

     $acompaniante->Eliminar();
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/acompaniante.php'>";	
	 echo "<script> alert('DATOS DEL ACOMPAÑANTE ELIMINADOS...') </script>";
  }
?>
</body>
</html>
