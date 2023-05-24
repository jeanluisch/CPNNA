<?php
   session_start();
?>
<?php error_reporting (0);?>
<html>
<head>

<title>Configurando Datos Academicos....</title>
<meta charset="UTF-8"/>
</head>

<body>
<?php
include ("../modelo/clase_datos_academicos.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $datos_academicos=new datos_academicos();
  $obj->conectar();
  
  $ced=$_SESSION['cedula'];
  $grado= $_REQUEST['grado'];
  $seccion=$_REQUEST['seccion'];
  $horario=$_REQUEST['horario'];
  $otros=$_REQUEST['otros'];
  $id_inst = $_REQUEST['id_inst'];

  $datos_academicos->cedula=$ced;   // introduce valores en cada atributo
  $datos_academicos->grado=$grado;
  $datos_academicos->seccion=$seccion;
  $datos_academicos->horario=$horario;
  $datos_academicos->otros=$otros;
  $datos_academicos->id_inst = $id_inst;
  if($_REQUEST['btnModificar']=='Modificar'){
  $datos_academicos->modificar();
      
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/datos_academicos.php'>";
	 echo "<script> alert('Datos modificados con éxito!!.') </script>";	 
  }
  
  if($_REQUEST['btnEliminar']=='Eliminar'){

     $datos_academicos->eliminar(); 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/datos_academicos.php'>";	
	 echo "<script> alert('DATOS ACADEMICOS ELIMINADOS...') </script>";
  }
?>
</body>
</html>
