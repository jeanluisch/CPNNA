<?php 
include ("funcionModificar.php");
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>

<html>
<head><title>Solicitud de Viaje</title>
<meta charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="../css/estilo.css">
<link rel="stylesheet" type="text/css" href="../css/styles.css"/>
<script src="../js/jquery-1.9.1.js"></script>
<script src="../js/jquery-ui-1.10.4.custom.js"></script>
<link rel="stylesheet" href="../css/jquery-ui-1.10.4.custom.css" >
<script src="../js/ocultar/jquery-1.3.2.min.js" type="text/javascript"></script> 
<script>
$(document).ready(function(){
   $("#solo").click(function(evento){
      if ($("#solo").attr("checked")){
         $("#formulariomayores").css("display", "block");
      }else{
         $("#formulariomayores").css("display", "none");
      }
   });
});

		             $(function() {
                            var hoy = new Date();
                            var minimaFecha = new Date();
                            minimaFecha.setFullYear(1930, 0, 1);
                            $( "#fecha_salida, #fecha_regreso" ).datepicker({
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
	
<form action="../controlador/solicitud_viajeModificarBD.php" method="post" name="form1" >

	<table>

<center> <h2> Solicitud de Viaje </center> <h2> </tr>

	<table border ="0" align ="center" >


	<tr>
		<td>
			Cedula
		</td>
		<td>
			<select name="ci" disabled="disabled"> 
			<option value="V">V</option>
 			<option value="E">E</option>
			<?php echo '<input name="ci_ado" type="text" id="ci_ado" value="'.$_SESSION['ci_ado'].'" disabled="disabled" />'; ?>
		</td>
		
	</tr>
	
	<tr>
		<td>
			<p> Tipo de Viaje </p>
		</td>
		<td>
			<input type="checkbox" name="tipo_viaje" value="acompaniado" id="solo"> Acompañado
		</td>
	</tr>
	
	<tr>
		<td>
			Motivo de Viaje
		</td>
		
		<td>
			 <?php echo '<input name="motivo_viaje" size="25" type="text" id="motivo_viaje" value="'.$_SESSION['motivo_viaje'].'" /> ';?>
		</td>
	</tr>
	</table>
	<div id="formulariomayores" style="display: none;">
	<table align="center" border="0" width="505">
	<tr>
	
		<td>
			Destino de Viaje
		</td>
		
		<td>
			<?php echo '<input name="destino_viaje" size="30" type="text" id="destino_viaje"  value="'.$_SESSION['destino_viaje'].'" /> ';?>
		</td>
	</tr>
	<tr>
		<td>
			Fecha de salida
		</td>
		
		<td>
			<?php echo '<input name="fecha_salida" size="30" type="text" id="fecha_salida"  value="'.$_SESSION['fecha_salida'].'" /> ';?>
		</td>
	</tr>
	
	<tr>
		<td>
			Fecha de Regreso
		</td>
		
		<td>
			<?php echo '<input name="fecha_regreso" size="30" type="text" id="fecha_regreso"  value="'.$_SESSION['fecha_regreso'].'" /> ';?>
		</td>
	</tr>
	<td>
			Representante
			</td>
			<td>
			    <?php echo '<input name="ci_rm" type="text"  size="10" value="'.$_SESSION['ci_rm'].'"  readonly />'; ?>
			    <?php echo '<input type="text" size="17"   value="'.$_SESSION['ci_rmnomb'].'"  readonly />'; ?>
	   		
	   		</td>
			
	</tr>
	<tr>
			<td>
			   <?php echo '<input name="ci_rp" type="hidden"  size="10" value="'.$_SESSION['ci_rp'].'"  readonly />'; ?>
	    	</td>
	</tr>
	<tr>
			<td>
			Cedula Acompañante
			</td>
			<td>
			<?php
			echo acompaniante();
			?>
	    	</td>
	</tr>

</table>
</div>


<br>

	<table align ="center">
		<tr>
			<td><input type="submit" name="btnModificar" id="btnModificar" value="Modificar" /></td>
			
		 </tr>
	</table>

</form>
</div>


</body>
</html>
