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
  include("../modelo/claseadolescente.php");
  include("../modelo/claseadorepresentante.php");
  $obj=new conexion();
  $obj->conectar();
  $adolescente=new adolescente();
  $adorepresentante=new adorepresentante();
  
	$ced=$_REQUEST['cedula'];
	$adolescente->cedula = $_REQUEST['cedula'];
	$adorepresentante->ci_ado = $_REQUEST['cedula'];
	$_SESSION['cedula']= $ced;
  
  if($_REQUEST['btnBuscar']){
  
     $consult=$adorepresentante->consultar();
	 $result=$adolescente->consultar();
     $num=0;	 
	 $num=$adolescente->contar();

	 if($num==0){
	   echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/adolescenteincluir.php'>";	   
	 }
	else
	{	 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/adolescenteModificar.php'>"; 	 
	 while($registro=mysql_fetch_array($result))
	 {	     
	     $_SESSION['nombre']= $registro['nombre'];
	     $_SESSION['apellido']= $registro['apellido'];
	     $_SESSION['f_nacimiento']= $registro['f_nacimiento'];	
	     $_SESSION['n_pnac']= $registro['n_pnac'];
	     $_SESSION['lugar_nac']= $registro['lugar_nac'];
	     $_SESSION['direccion']= $registro['direccion'];
	 }//fin while
	 
	 while($registro=mysql_fetch_array($consult))
	 {	     
	     $_SESSION['ci_rm']= $registro['ci_rm'];
	     $_SESSION['ci_rp']= $registro['ci_rp'];    
	 }//fin while
	 
	}//FIN ELSE
}
?>
</body>
</html>
