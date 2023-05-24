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
  include("../modelo/BD.php");
  include("../modelo/claseinstitucion.php");
  $institucion=new institucion();
  $obj=new conexion();
  $obj->conectar();
  
 $nom=$_REQUEST['nombre'];
 $institucion->nombre=$_REQUEST['nombre'];
 $_SESSION['nombre']=$nom;
  
  if($_REQUEST['btnBuscar']){
  
    	
	 $result=$institucion->consultar();
         $num=0;	 
	 
	 $num=$institucion->contar();

	 if($num==0){
	   echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/institucionincluir.php'>";	   
	 }
	 else{	 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/institucionModificar.php'>"; 	 
	 while($registro=mysql_fetch_array($result)){	     
	     $_SESSION['direccion']= $registro['direccion'];
	   	   }
      }
	  }
?>
</body>
</html>
