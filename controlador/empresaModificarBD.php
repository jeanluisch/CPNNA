<?php
   session_start();
?>
<?php error_reporting (0);?>
<html>
<head>
<meta charset="UTF-8"/>
<title>AdolescenteModificarBD</title>
</head>

<body>
<?php
include ("../modelo/claseempresa.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $empresa=new empresa();
  $obj->conectar();
  
  $rif=$_SESSION['rif'];
  $nombre= $_REQUEST['nombre'];
  $direccion=$_REQUEST['direccion'];

  $empresa->rif=$rif;
  $empresa->nombre=$nombre;
  $empresa->direccion=$direccion;
	
	
  if($_REQUEST['btnModificar']=='Modificar'){
  $empresa->modificar();
      
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/empresa.php'>";
	 echo "<script> alert('Datos modificados con éxito!!.') </script>";	 
  }
  
  if($_REQUEST['btnModificar']=='Eliminar'){

     $strsql="delete from empresa where rif ='".$rif."'";	 
   
	 $result=mysql_query($strsql);	 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/empresa.php'>";	
	 echo "<script> alert('LA EMPRESA HA SIDO ELIMINADA...') </script>";
  }
?>
</body>
</html>
