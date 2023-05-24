<?php
   session_start();
	if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<html>
<head><title>Acompa&ntildeante</title>
<meta charset="UTF-8"/>
<script type="text/javascript" src="../js/acompaniante.js"></script>
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
	
<form action="../controlador/acompanianteIncluirBD.php" method="post" name="form1" onsubmit="return validarForm();" >

	</table>
<tr> 	<center> <h2> Acompa&ntildeante </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			Cedula
		</td>
		<td>
			<select name="ci"> 
			<option value="V">V</option>
 			<option value="E">E</option>
</select>
			<?php echo '<input name="Cedula" size="15" type="text" id="Cedula" value="'.$_SESSION['cedula'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	</tr>
	<tr>
		<td>
			Nombres
		</td>
		
		<td>
			<input type="text" maxlength="50" size="20" name="nombre" id="nombre"  >
		</td>
	</tr>

	<tr>
		<td>
			Apellidos
		</td>
		
		<td>
			<input type="text" maxlength="50" size="20"  name="apellido" id="apellido"  >
		</td>
	</tr>
<br>

	<table align ="center">
		<tr>
         		
			<td><input type="submit" name="btnGuardar" id="btnGuardar" value="Guardar" /></td>		

		 </tr>
	</table>

</form>
</div>


</body>
</html>
