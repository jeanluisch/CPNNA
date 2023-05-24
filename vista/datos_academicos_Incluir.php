<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<?php 
include ("funcion.php");
?>

<html>
<head><title>Datos Academicos</title>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/academicos.js"></script>
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

	
<form action="../controlador/datos_academicos_IncluirBD.php" method="post" name="form1" onsubmit="return validarForm();" >

	</table>
<tr> 	<center> <h2> Datos academicos </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			Cédula
		</td>
		<td>
			<select name="ci"> 
			<option value="V">V</option>
 			<option value="E">E</option>
</select>
			<?php echo '<input name="cedula" type="text" id="Cedula_a" value="'.$_SESSION['cedula'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	
	<tr>
		<td>
			Grado
		</td>
		
		<td>
			<input type="text" maxlength="50" size="25" name="grado" id="grado" onkeyup="this.value=this.value.toUpperCase()" >
		</td>
	</tr>

	<tr>
		<td>
			Sección
		</td>
		
		<td>
			<input type="text" maxlength="50" size="25"  name="seccion" id="seccion" onkeyup="this.value=this.value.toUpperCase()" >
		</td>
	</tr>
	<tr>
		<td>
			Horario
		</td>
		
		<td>
			<input type="text" maxlength="30" size="25"  name="horario" id="horario"  onkeyup="this.value=this.value.toUpperCase()">
		</td>
	</tr>
	<tr>
		<td>
			Otros
		</td>
		
		<td>
			<input type="text" maxlength="15" size="25"  name="otros" id="otros" onkeyup="this.value=this.value.toUpperCase()" >
		</td>
	</tr>
	<tr>
		<td>
			Institución
		</td>
		
		<td>
			<?php
				echo institucion();
			?>
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
