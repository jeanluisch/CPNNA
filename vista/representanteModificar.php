<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>

<html>
<head><title>Representante</title>
<script type="text/javascript" src="../js/representanteincluir.js"></script>
<link rel="stylesheet" type="text/css" href="../css/estilo.css">
<link rel="stylesheet" type="text/css" href="../css/styles.css"/>
<script src="../js/jquery-1.9.1.js"></script>
<script src="../js/jquery-ui-1.10.4.custom.js"></script>
<link rel="stylesheet" href="../css/jquery-ui-1.10.4.custom.css" >
<script>
		             $(function() {
                            var hoy = new Date();
                            var minimaFecha = new Date();
                            minimaFecha.setFullYear(1930, 0, 1);
                            $( "#f_nacimiento" ).datepicker({
                                changeMonth: true,
                                changeYear: true,
                                dateFormat: "yy-mm-dd",
                                onClose: function(){
                             

                                }
                                /*maxDate: hoy,*/
                                /*minDate : hoy*/
                            });
                        });
		
		
		</script>

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

	
<form action="../controlador/representanteModificarBD.php" method="post" name="form1" onsubmit="return validarForm(document.form1);">

	</table>
<tr> 	<center> <h2> Representante </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			Cedula
		</td>
		<td>
			<select name="ci" disabled="disabled"> 
			<option value="V">V</option>
 			<option value="E">E</option>
			<?php echo '<input name="cedula" type="text" id="cedula" size="20" value="'.$_SESSION['cedula'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
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
			Fecha de Nacimiento
		</td>
		
		<td>
			<?php echo '<input name="f_nacimiento" type="text"size="24" id="f_nacimiento"  value="'.$_SESSION['f_nacimiento'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td>
			Direccion
		</td>
		
		<td>
			<?php echo '<input name="direccion" type="text" size="24" id="direccion" value="'.$_SESSION['direccion'].'" /> ';?>
		</td>
	</tr>

	<tr>
		<td>
			Estado Civil
		</td>
		
		<td>
			<?php echo '<input name="edo_civil" type="text" size="24" id="edo_civil" value="'.$_SESSION['edo_civil'].'" /> ';?>
		</td>
	</tr>

	</tr>
	<tr>
		<td>
			Telefono
		</td>
		
		<td>
			<?php echo '<input name="telefono" type="text"size="24" id="telefono" value="'.$_SESSION['telefono'].'" /> ';?>
		</td>
	</tr>
</table>
<br>

	<table align ="center">
		<tr>
			<td><input type="submit" name="btnModificar" id="btnModificar" value="Modificar" /></td>
			<td><input type="submit" name="btnEliminar"  id="btnEliminar"  value="Eliminar" /></td>
			
		 </tr>
	</table>

</form>
</div>


</body>
</html>
