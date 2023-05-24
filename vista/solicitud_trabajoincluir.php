<?php
   session_start();
?>
<?php 
include ("funcion.php");
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<html>
<head><title>Solicitud Trabajo</title>
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

	
<form action="../controlador/solicitud_trabajoIncluirBD.php" method="post" name="solicitud_trabajoIncluir" >

	</table>
<tr> 	<center> <h2> Solicitud de Trabajo </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			Cedula Ni&ntilde@ / Adolescente
		</td>
		<td>
			<select name="ci" disabled="disabled"> 
			<option value="V" >V</option>
 			<option value="E" >E</option>
			</select>
			<?php echo '<input name="ci_ado" type="text" id="ci_ado" value="'.$_SESSION['ci_ado'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	</tr>
	<tr>
		<td>
			Cédula del representate
		</td>
		
		<td>
			<?php echo '<input name="ci_rm" type="text" size="7" value="'.$_SESSION['ci_rmt'].'" readonly />'; ?>
			<?php echo '<input type="text" size="15" value="'.$_SESSION['nombre_rmt'].'" readonly />'; ?>
		</td>
	</tr>
	<tr>
		<td>
			Patrón
		</td>
		
		<td>
			<?php
				echo patron();
			?>
		</td>
	</tr>
	
	<tr>
		<td>
			Trabajo a Desempeñar
		</td>
		
		<td>
			<input type="text" maxlength="100" size="25"  name="t_desempenia" id="tdesempenia"  onkeyup="this.value=this.value.toUpperCase()">
		</td>
	</tr>
	<tr>
		<td>
			Fecha de Ingreso
		</td>
		
		<td>
			<input type="text" maxlength="11" size="25"  name="fecha_ingreso" id="fecha_ingreso"  >
		</td>
	</tr>
	<tr>
		<td>
			Horario de Trabajo
		</td>
		
		<td>
			<input type="text" maxlength="50" size="25"  name="horario_trabajo" id="horario_trabajo"  onkeyup="this.value=this.value.toUpperCase()">
		</td>
	</tr>
	<tr>
		<td>
			Descripción Examen Médico
		</td>
		
		<td>
			<input type="text" maxlength="80" size="25"  name="examen_medico" id="examen_medico"  onkeyup="this.value=this.value.toUpperCase()">
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
