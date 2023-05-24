<?php
   session_start();
	if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<html>
<head><title>Eligir Tipo de Reporte</title>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/ValidarCI.js"></script>
<!--<script type="text/javascript" src="../js/validarci.js"></script>-->
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


<form action="../controlador/adolescentebuscarBD.php" method="get" name="form1">
<br><br><br>
<center> <h2> Haga Clic en el tipo de reporte que desea generar  <h2> </center>

	<table border ="0" align ="center" >

	<tr>
		<td>
			<?php echo "<h2> Reporte de la C.I: $_SESSION[ci_adot] </h2>" ?>
		</td>
	</tr>
	</table>
	<br>
	<table border ="0" align ="center" >
	<tr>
		<td>
			<a href='../controlador/reporte_solicitud.php?solicitud=registro' target="_blank"><img src='../image/reportetrabajo3.png' height='125'  title=' Solicitud de registro adolescente trabajador'> </a>
		</td>
		<td>
			<a href='../controlador/reporte_registro.php?solicitud=solicitud' target="_blank"><img src='../image/reportetrabajo2.png' height='125' title=' Registro adolecente trabajador'> </a>
		</td>
		<td >
			<a href='../controlador/reporte_carnet.php?carnet=carnet' target="_blank"><img src='../image/reportetrabajo.png' height='125' title=' Carnet del Adolescente'></a>
		</td>
	</tr>


	</table>

</form>
</div>


</body>
</html>
