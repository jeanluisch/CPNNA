<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<?php
include("../modelo/BD.php");
  include("../modelo/clasesolicitud_viaje.php");
  $solicitud_viaje=new solicitud_viaje();
  $obj=new conexion();
  $obj->conectar();
?>


<html>
<head><title>Solicitud de Viaje</title>
<meta charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="../css/estilo.css">
<link rel="stylesheet" type="text/css" href="../css/styles.css"/>

</head>
<body>
<div id="contenedor">
			<div id="banner">
				<br> <br><br><br> <br><br><br> <br><br><br> <br><br>
					
				<div id="ter">
					<div id='cssmenu'>
						<ul>
							<li class='active'><a href='solicitud.php'><span>Inicio</span></a></li>
							<li class='has-sub'><a href='#'><span>Configuraci&oacute;n</span></a>
								<ul>
									<li align="left"><a href="representante.php">Representante</a></li>
									<li align="left"><a href="adolescente.php">Adolescente</a></li>
									<li align="left"><a href="institucion.php">Instituci&oacuten</a></li>
									<li align="left"><a href="datos_academicos.php">Datos Academicos</a></li>
									<li align="left"><a href="acompaniante.php">Acompa&ntildeante</a></li>
									<li align="left"><a href="empresa.php">Empresa</a></li>
									<li align="left"><a href="patron.php">Patron</a></li>
								</ul>
							</li>
							<li class='has-sub'><a href='#'><span>Solicitud</span></a>
								<ul>
									<li align="left"><a href="#" >Trabajo</a></li>
									<li align="left"><a href="#" >Viaje</a></li>
								</ul>
							</li>
							<li class='has-sub'><a href='#'><span>Reporte</span></a>
								<ul>
									<li align="left"><a href="reporte_trabajo.php" >Trabajador</a></li>
									<li align="left"><a href="reporte_viaje.php" >Viaje</a></li>
									<li align="left"><a href="reporte_estadistica.php" >Estadistica</a></li>
								</ul>
							</li>
							<li class='active'><a href='usuarios.php'><span>Usuario</span></a></li>
							</li>
							<li class='active'><a href='../controlador/destruir.php'><span>Salir</span></a></li>
							</li>
						</ul>
					</div>
				</div>
			</div>
	
	<center> <h2> Solicitud de Viaje </h2> </center>  
	
	<?php
      
	 $ced= $_SESSION['ci_ado'];
	 $solicitud_viaje->ci_ado=$ced;
  
	 $result=$solicitud_viaje->consultar();
         $num=0;	 
	 
	 $num=$solicitud_viaje->contar();
	 echo "
        <center><font size='5'>
		<table cellpadding='5' border='0' width='550px' bgcolor='#3E3E3E'>
          <tr>
		      <th bgcolor='#FE4B4B'><font size='4' color='white' face='arial'><span class='icon-profile' ><font size='4'></font></span>Núm. Solicitud</font></th>
		      <th bgcolor='#FE4B4B'><font size='4' color='white' face='arial'><span class='icon-profile' ><font size='4'></font></span>Codigo Solicitud</font></th>
			  <th bgcolor='#0081CC'><font size='4' color='white' face='arial'><span class='icon-file' ><font size='4'></font></span>C.I. Adolescente</font></th>
			  <th bgcolor='#0081CC'><font size='4' color='white' face='arial'><span class='icon-file' ><font size='4'></font></span>C.I. Representante</font></th>
			  <th bgcolor='#0081CC'><font size='4' color='white' face='arial'><span class='icon-file' ><font size='4'></font></span>Fecha Regreso</font></th>
			  <th bgcolor='#0081CC'><font size='4' color='white' face='arial'><span class='icon-file' ><font size='4'></font></span>Opción</font></th>
		  </tr>";
	 while($registro=mysql_fetch_array($result)){
		echo "<tr> <center>
			<td bgcolor='#F0F0F0' align='center'><font size='4' color='black' face='arial'>$registro[id_viaje]</font></td>
			<td bgcolor='#F0F0F0' align='center'><font size='4' color='black' face='arial'>$registro[codigo]</font></td>
			<td bgcolor='#F0F0F0' align='center'><font size='4' color='black' face='arial'>$registro[ci_ado]</font></td> 
			<td bgcolor='#F0F0F0' align='center'><font size='4' color='black' face='arial'>$registro[ci_rm]</font></td>
			<td bgcolor='#F0F0F0' align='center'><font size='4' color='black' face='arial'>$registro[fecha_regreso]</font></td>
			<td bgcolor='#F0F0F0' align='center'><a href='../controlador/solicitud_viajeMostrarBD.php?id= $registro[id_viaje] '><img src='../image/modificar.gif' title='Modificar' height='20'></a><font size='4' color='black' face='arial'></font></td>
			</center>
			</tr>";
	   	    }
?>

<form action="../controlador/solicitud_ViajeNuevaBD.php" method="post" name="form1" >
	
	<table>
		<tr>
			<td><br>
				<input type="submit" name="btnSolicitud" id="btnSolicitud" value="Nueva Solicitud" />
			</td>
		</tr>
	</table>
<form>
</body>
</html>
