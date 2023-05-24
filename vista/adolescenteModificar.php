<?php 
include ("funcionModificar.php");
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>

<html>
<head><title>Adolescente</title>
<link rel="stylesheet" type="text/css" href="../css/estilo.css">
<link rel="stylesheet" type="text/css" href="../css/styles.css"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<script type="text/javascript" src="../js/adolescenteincluir.js"></script>
<script src="../js/jquery-1.9.1.js"></script>
<script src="../js/jquery-ui-1.10.4.custom.js"></script>
<link rel="stylesheet" href="../css/jquery-ui-1.10.4.custom.css" >
<script src="../js/ocultar/jquery-1.3.2.min.js" type="text/javascript"></script>
<script>
$(document).ready(function(){
   $("#si").click(function(evento){
      if ($("#si").attr("checked")){
         $("#representantes").css("display", "block");
      }else{
         $("#representantes").css("display", "none");
      }
   });
});

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

<form action="../controlador/adolescenteModificarBD.php" method="post" name="form1" onsubmit="return validarForm(document.form1);">

	</table>
<tr> 	<center> <h2> Adolescente </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			Cedula
		</td>
		<td>
			<select name="ci" disabled="disabled"> 
			<option value="V">V</option>
 			<option value="E">E</option>
			<?php echo '<input name="cedula" type="text" size="20" id="cedula" value="'.$_SESSION['cedula'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	</tr>
	<tr>
		<td>
			Nombres
		</td>
		
		<td>
			 <?php echo '<input name="nombre" type="text" maxlength="30" size="24" id="nombre" value="'.$_SESSION['nombre'].'" /> ';?>
		</td>
	</tr>

	<tr>
		<td>
			Apellidos
		</td>
		
		<td>
			<?php echo '<input name="apellido" type="text" maxlength="30" size="24" id="apellido"  value="'.$_SESSION['apellido'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td>
			Fecha de Nacimiento
		</td>
		
		<td>
			<?php echo '<input name="f_nacimiento" type="text" size="24" id="f_nacimiento"  value="'.$_SESSION['f_nacimiento'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td>
			N. Partida de Nacimiento
		</td>
		
		<td>
			<?php echo '<input name="n_pnac" type="text" size="24" id="n_pnac"  value="'.$_SESSION['n_pnac'].'" /> ';?>
		</td>
	</tr>

	<tr>
		<td>
			Lugar de Nacimiento
		</td>
		
		<td>
			<?php echo '<input name="lugar_nac" type="text" size="24" id="lugar_nac" value="'.$_SESSION['lugar_nac'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td>
			Direccion
		</td>
		
		<td>
			<?php echo '<input name="direccion" type="text" maxlength="100" size="24" id="direccion" value="'.$_SESSION['direccion'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td align="right">
			<p> ¿Conflicto Entre Padres? </p>
		</td>
		<td>
			<input type="checkbox" name="conflicto" value="si" id="si"> Si
		</td>
	</tr>
		
	<tr>
		<td>
			Cedula Representante
		</td>
			<td>
				<?php
				echo representantem();
				?>
			</td>
	</tr>
</table>
	<div id="representantes" style="display: none;">
	<table align="center" border="0" width="650">
		<tr>
			<td align="right" width="280">
			Representante (Padre)
			</td>
			<td >
			<?php
			echo representantep();
			?>
	    	</td>
		</tr>
	<tr>
		<td colspan="2" valign="top">
			<p align= "justify"> <h5> NOTA: no se preocupe si en algunos de los select encuentra un (0), eso indica
					 que no <br> existe Cedula de ese representante registrado. por lo tanto dejelo tal cual.
					 o si desea modificar indique en el select <h5>
			</p>
		</td>
	</tr>
</table>
</div>

	<table align ="center">
		<tr>
			
         	<td><input type="submit" disabled="disabled"  name="btnBuscar" id="btnBuscar" value="Buscar" /></td>
			<td><input type="submit" name="btnModificar" id="btnModificar" value="Modificar" /></td>
			<td><input type="submit" name="btnEliminar"  id="btnEliminar"  value="Eliminar" /></td>
			<td><input type="submit" disabled="disabled" name="btnGuardar"   id="btnGuardar"   value="Guardar" /></td>		
			
		 </tr>
	</table>

</form>
</div>


</body>
</html>
