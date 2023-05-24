<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>

<html>
<head><title>Usuario</title>
<meta charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="../css/estilo.css">
<link rel="stylesheet" type="text/css" href="../css/styles.css"/>
<script type="text/javascript" src="../js/representanteincluir.js"></script>
<script src="../js/jquery-1.9.1.js"></script>
<script src="../js/jquery-ui-1.10.4.custom.js"></script>
<link rel="stylesheet" href="../css/jquery-ui-1.10.4.custom.css" >


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
	
<form action="../controlador/usuariosModificarBD.php" method="post" name="form1">

	</table>
	<tr> 	<center> <h2> Usuario </center> <h2> </tr>

	<table border ="0" align ="center" >

	<tr>
		<td>
			Cedula
		</td>
		<td>
			<?php echo '<input name="ci_usuario" type="text" maxlength="8" id="cedula" size="20" value="'.$_SESSION['ci_usuario'].'" />'; ?>
		</td>
		
	</tr>
	<tr>
		<td>
			Nombres
		</td>
		
		<td>
			 <?php echo '<input name="nombre" type="text" size="24" id="nombre" value="'.$_SESSION['nombre'].'" /> ';?>
		</td>
	</tr>

	<tr>
		<td>
			Apellidos
		</td>
		
		<td>
			<?php echo '<input name="apellido" type="text" size="24" id="apellido"  value="'.$_SESSION['apellido'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td>
			Trabajador
		</td>
		
		<td>
			<?php echo '<input name="usu_trabajador" id="usu_trabajador" type="text"size="24"  value="'.$_SESSION['trabajador'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td>
			Usuario
		</td>
		
		<td>
			<?php echo '<input name="usuario" size="24" type="text" id="usuario" value="'.$_SESSION['usuario'].'"  readonly/>'; ?>
		</td>
	</tr>

	<tr>
		<td>
			Contraseña
		</td>
		
		<td>
			<?php echo '<input name="contrasenia" id="contrasenia" type="password" size="24" value="'.$_SESSION['contrasenia'].'" /> ';?>
		</td>
	</tr>

	</tr>
	<tr>
		<td>
			Tipo de Usuario
		</td>
		<td>
			<select name="tipo_usuario">  
				<option value="ADMINISTRADOR">ADMINISTRADOR</option>
		 		<option value="USUARIO">USUARIO</option>
			</select>
		</td>
	</tr>
</table>
<br>

	<table align ="center">
		<tr>
			<td><input type="submit" name="btnModificar" id="btnModificar" value="Modificar" /></td>
			<td><input type="submit"  disabled="disabled" name="btnEliminar"  id="btnEliminar"  value="Eliminar" /></td>
		 </tr>
	</table>

</form>
</div>


</body>
</html>
