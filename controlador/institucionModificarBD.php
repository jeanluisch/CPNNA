<?php
   session_start();
?>
<?php error_reporting (0);?>
<html>
<head>
<meta charset="UTF-8"/>
<title></title>
</head>

<body>
<?php
include ("../modelo/claseinstitucion.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $institucion=new institucion();
  $obj->conectar();
  
  $nom=$_SESSION['nombre'];
  $direccion=$_REQUEST['direccion'];

  $institucion->nombre=$nom;   // introduce valores en cada atributo
  $institucion->direccion=$direccion;
	
	
  if($_REQUEST['btnModificar']=='Modificar'){
  $institucion->modificar();
      
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/institucion.php'>";
	 echo "<script> alert('Datos modificados con éxito!!.') </script>";	 
  }
  
  if($_REQUEST['btnEliminar']=='Eliminar'){

     $strsql="delete from institucion where nombre ='".$nom."'";	 
   
	 $result=mysql_query($strsql);	 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/institucion.php'>";	
	 echo "<script> alert('LA INSTITUCION HA SIDO ELIMINADA...') </script>";
  }
?>
</body>
</html>
