<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<html>
<head><title>Incluir Representante</title>
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


<form action="../controlador/usuariosIncluirBD.php" method="post" name="form1" onsubmit="return validarForm();">
		
	<table border ="0" align ="center">


	<tr> 	<center> <h2> Usuario </center> <h2> </tr>

	<tr>
		<td align ="right">
			Cédula
		</td>
		<td >
			<input type="text" maxlength="8" size="25"  name="ci_usuario" id="ci_usuario">
		</td>
		
	</tr>
	<tr>
		<td align ="right">
			Nombres
		</td>
		
		<td>
			<input type="text" maxlength="50" size="25"  name="nombre" id="nombre" onkeyup="this.value=this.value.toUpperCase()">
		</td>
	</tr>

	<tr>
		<td align ="right">
			Apellidos
		</td>
		
		<td align ="right">
			<input type="text" maxlength="50" size="25"  name="apellido" id="apellido" onkeyup="this.value=this.value.toUpperCase()" > 
		</td>
	</tr>
	
	<tr>
		<td align ="right">
			Trabajador
		</td>
		
		<td>
			<input type="text" maxlength="20" size="25"  name="usu_trabajador" id="usu_trabajador" onkeyup="this.value=this.value.toUpperCase()" >
		</td>
	</tr>
	<tr>
		<td align ="right">
			Usuario
		</td>
		
		<td >
			<?php echo '<input name="usuario" size="25" type="text" id="usuario" value="'.$_SESSION['usuario'].'"  readonly/>'; ?>
		</td>
	</tr>
	<tr>
		<td align ="right">
			Contraseña
		</td>
		
		<td>
			<input type="password" maxlength="20" size="25"  name="contrasenia" id="contrasenia" onkeyup="this.value=this.value.toLowerCase()" >
		</td>
	</tr>

	<tr>
		<td align ="right">
			Tipo Usuario
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
         	
			<td><input type="submit" name="btnGuardar" id="btnGuardar" value="Guardar" /></td>		

		 </tr>
	</table>

</form>
</div>


</body>
</html>
