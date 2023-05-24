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
	include ("../modelo/claseadolescente.php");
	include("../modelo/claseadorepresentante.php");
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
  
  if(isset($_REQUEST['btnModificar'])){
  $adolescente->modificar();
  $adorepresentante->modificar();
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/adolescente.php'>";
	 echo "<script> alert('Datos modificados con éxito!!') </script>";	 
  }
  
  if($_REQUEST['btnEliminar']=='Eliminar'){

     $adolescente->eliminar();	 
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/adolescente.php'>";	
	 echo "<script> alert('EL ADOLESCENTE HA SIDO ELIMINADO...') </script>";
  }
?>
</body>
</html>
