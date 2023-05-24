<?php
   session_start();
	if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>

<?php 

include ("funcion.php");

?>
<html>
<head><title>Adolescente</title>
<script src="../js/adolescente.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="../css/estilo.css">
<link rel="stylesheet" type="text/css" href="../css/styles.css"/>
<script src="../js/jquery-1.9.1.js"></script>
<script src="../js/jquery-ui-1.10.4.custom.js"></script>
<link rel="stylesheet" href="../css/jquery-ui-1.10.4.custom.css" >
<script src="../js/ocultar/jquery-1.3.2.min.js" type="text/javascript"></script>

<script>

$(document).ready(function(){
   $("#si").click(function(evento){
      if ($("#si").attr("checked")){
         $("#adolescente").css("display", "block");
      }else{
         $("#adolescente").css("display", "none");
      }
   });
});


		             $(function() {
                            var hoy = new Date();
                            var minimaFecha = new Date();
                            minimaFecha.setFullYear(1930, 0, 1);
                            $( "#fnacimiento" ).datepicker({
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

	
<form action="../controlador/adolescenteIncluirBD.php" method="post" name="form1" onsubmit="return validarForm();" >

	</table>
<tr> 	<center> <h2> Adolescente </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td align="right">
			Cédula
		</td>
		<td>
			<select name="ci"> 
			<option value="V">V</option>
 			<option value="E">E</option>
</select>
			<?php echo '<input name="Cedula" type="text" id="Cedula" value="'.$_SESSION['cedula'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	
	<tr>
		<td align="right">
			Nombres
		</td>
		
		<td>
			<input type="text" maxlength="50" size="25" name="nombre" id="nombre" onkeyup="this.value=this.value.toUpperCase()"  >
		</td>
	</tr>

	<tr>
		<td align="right">
			Apellidos
		</td>
		
		<td>
			<input type="text" maxlength="50" size="25"  name="apellido" id="apellido" onkeyup="this.value=this.value.toUpperCase()"  >
		</td>
	</tr>
	<tr>
		<td align="right"> 
			Fecha de Nacimiento
		</td>
		
		<td>
			<input type="text" maxlength="10" size="25"  name="f_nacimiento" id="fnacimiento"  >
		</td>
	</tr>

	
	<tr>
		<td align="right">
			N. Partida de Nacimiento
		</td>
		
		<td>
			<input type="text" maxlength="15" size="25"  name="n_pnac" id="n_pnac"  >
		</td>
	</tr>

	<tr>
		<td align="right">
			Lugar de Nacimiento
		</td>
		
		<td>
			<input type="text" maxlength="50" size="25"  name="lugar_nac" id="lugar_nac" onkeyup="this.value=this.value.toUpperCase()" >
		</td>
	</tr>
	<tr>
		<td align="right">
			Dirección
		</td>
		
		<td>
			<input type="text" maxlength="200" size="25"  name="direccion" id="direccion" onkeyup="this.value=this.value.toUpperCase()" >
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
			<td align="right">
			Representante (Madre)
			</td>
			<td>
			<?php
			echo representantem();
			?>
	    	</td>
		</tr>
</table>
<div id="adolescente" style="display: none;">
<table align="center" border="0" width="910">
		<tr>
			<td align="right">
			Representante (Padre)
			</td>
		<td>
		<?php
		echo representantep();
		?>
	    </td>
		</tr>
		
</table>
</div>
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


</body>
</html>
