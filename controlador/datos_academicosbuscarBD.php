<?php
   session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8"/>
<title>Documento sin t&iacute;tulo</title>
</head>

<body>
<?php
  include("../modelo/BD.php");
  include("../modelo/clase_datos_academicos.php");
  $datos_academicos=new datos_academicos();
  $obj=new conexion();
  $obj->conectar();
  
 $ced=$_REQUEST['cedula'];
 $datos_academicos->cedula=$_REQUEST['cedula'];
 $_SESSION['cedula']=$ced;
  
  if($_REQUEST['btnBuscar']){
  
    	
	 $result=$datos_academicos->consultar();
         $num=0;	 
	 
	 $num=$datos_academicos->contar();

	 if($num==0){
	   echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/datos_academicos_Incluir.php'>";	   
	 }
	 else
	{	 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/datos_academicos_modificar.php'>"; 	 
	 while($registro=mysql_fetch_array($result))
		{	     
	     $_SESSION['grado']= $registro['grado'];
	     $_SESSION['seccion']= $registro['seccion'];
	     $_SESSION['horario']= $registro['horario'];	
	     $_SESSION['otros']= $registro['otros'];
	   	 $_SESSION['id_inst']= $registro['id_inst'];
		 }
		
		$idinst= $_SESSION['id_inst'];
		$strsql="SELECT * FROM institucion WHERE id_inst='$idinst' "; 
		$result=mysql_query($strsql);
	
		while($registro=mysql_fetch_array($result))
		{    
	    	$_SESSION['id_instnomb']= $registro['nombre'];
	    }
			
		
      }
	
	  }
?>
</body>
</html>
