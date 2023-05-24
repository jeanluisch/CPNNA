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
	include ("../modelo/claseadolescente.php");
	include ("../modelo/claseadorepresentante.php");
	include("../modelo/BD.php");
	$obj=new conexion();
	$obj->conectar();
	$adolescente=new adolescente();  
  	$adorepresentante=new adorepresentante();
  	
  	
 if (empty($_REQUEST['conflicto'])){
  $no="no";
  $adolescente->conflicto=$no;
  
  }else
   {
    $si=$_REQUEST['conflicto'];
    $adolescente->conflicto=$si;
   
    }
   
  	  
  $ced=$_SESSION['cedula'];
  $nombre= $_REQUEST['nombre'];
  $apellido=$_REQUEST['apellido'];
  $f_nacimiento=$_REQUEST['f_nacimiento'];
  $n_pnac=$_REQUEST['n_pnac'];
  $lugar_nac=$_REQUEST['lugar_nac'];
  $direccion=$_REQUEST['direccion'];
  $ci_rm=$_REQUEST['ci_rm'];
  $ci_rp=$_REQUEST['ci_rp'];

  $adolescente->cedula=$ced;
  $adolescente->nombre=$nombre;
  $adolescente->apellido=$apellido;
  $adolescente->f_nacimiento=$f_nacimiento;
  $adolescente->n_pnac=$n_pnac;
  $adolescente->lugar_nac=$lugar_nac;
  $adolescente->direccion=$direccion;
  
  $adorepresentante->ci_ado=$ced;
  $adorepresentante->ci_rm=$ci_rm;
  $adorepresentante->ci_rp=$ci_rp;
  
  if($_REQUEST['btnGuardar']){
  
     $adolescente->incluir();
     $adorepresentante->incluir(); //esta es la tabla externa que debo enviar los datos
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/adolescente.php'>";	//Envio hacia otra página
	 echo "<script> alert('Adolescente Registrado con éxito. ...') </script>";
		 
  }
?>
</body>
</html>
