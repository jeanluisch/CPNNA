<?php
   session_start();
?>
<html>
<head>
<meta charset="UTF-8"/>
<title>PROCESO...</title>
</head>

<body>
<?php
  include ("../modelo/clase_datos_academicos.php");
  include("../modelo/BD.php");
  $obj=new conexion();
  $obj->conectar();
  $datos_academicos=new datos_academicos();  
  
  $ced=$_SESSION['cedula'];
  $grado= $_REQUEST['grado'];
  $seccion=$_REQUEST['seccion'];
  $horario=$_REQUEST['horario'];
  $otros=$_REQUEST['otros'];
  $id_inst = $_REQUEST['id_inst'];
	
  $datos_academicos->cedula=$ced;
  $datos_academicos->grado=$grado;
  $datos_academicos->seccion=$seccion;
  $datos_academicos->horario=$horario;
  $datos_academicos->otros=$otros;
  $datos_academicos->id_inst=$id_inst;
  
  if($_REQUEST['btnGuardar']){
  
     $datos_academicos->incluir();

	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/datos_academicos.php'>";	//Envio hacia otra página
	echo "<audio src='asd.mp3' autoplay>
		</audio>";
	 echo "<script> alert('Registro Éxitoso. ...') </script>";
		 
  }
?>
</body>
</html>
