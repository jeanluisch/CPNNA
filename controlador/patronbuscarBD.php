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
  include("../modelo/clasepatron.php");
  $patron=new patron();
  $obj=new conexion();
  $obj->conectar();
  
 $ced=$_REQUEST['cedula'];
 $patron->cedula=$_REQUEST['cedula'];
 $_SESSION['cedula']=$ced;
  
  if($_REQUEST['btnBuscar']){
  
    	
	 $result=$patron->consultar();
         $num=0;	 
	 
	 $num=$patron->contar();

	 if($num==0){
	   echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/patronincluir.php'>";	   
	 }
	 else{	 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/patronModificar.php'>"; 	 
	 while($registro=mysql_fetch_array($result)){	     
	     $_SESSION['nombre']= $registro['nombre'];
	     $_SESSION['rif_empresa']= $registro['rif_empresa'];
	   	    }
	$rif_emp= $_SESSION['rif_empresa'];
	$strsql="SELECT * FROM empresa WHERE rif='$rif_emp' "; 
	$result=mysql_query($strsql);
	
	while($registro=mysql_fetch_array($result)){     
	    
	     $_SESSION['rif_nombre']= $registro['nombre'];
	     
	   					   } //FIN DE ci_rm
      }
	  }
?>
</body>
</html>
