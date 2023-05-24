<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<html>
<head><title>Adolescente</title>
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


	
<form action="../controlador/empresaIncluirBD.php" method="post" name="form1" >

	</table>
<tr> 	<center> <h2> Empresa </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			Rif
		</td>
		<td>

		<?php echo '<input name="Rif" type="text" size="20" id="Rif" value="'.$_SESSION['rif'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	</tr>
	<tr>
		<td>
			Nombre
		</td>
		
		<td>
			<input type="text" maxlength="50" size="20" name="nombre" id="nombre"  onkeyup="this.value=this.value.toUpperCase()" >
		</td>
	</tr>
	<tr>
		<td>
			Direccion
		</td>
		<td>
			<input type="text" maxlength="80" size="20"  name="direccion" id="direccion" onkeyup="this.value=this.value.toUpperCase()"  >
		</td>
	</tr>


</table>


<br>

	<table align ="center">
		<tr>
         		<td><input type="submit" disabled="disabled"  name="btnBuscar" id="btnBuscar" value="Buscar" /></td>
			<td><input type="submit" disabled="disabled" name="btnModificar" id="btnModificar" value="Modificar" /></td>
			<td><input type="submit" disabled="disabled" name="btnEliminar" id="btnEliminar" value="Eliminar" /></td>
			<td><input type="submit" name="btnGuardar" id="btnGuardar" value="Guardar" /></td>		

		 </tr>
	</table>

</form>
</div>


</body>
</html>
