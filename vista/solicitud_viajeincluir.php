<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<?php 

include ("funcion.php");

?>



<html>
<head><title>Solicitud Viaje</title>
<meta charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="../css/estilo.css">
<link rel="stylesheet" type="text/css" href="../css/styles.css"/>

<script type="text/javascript" src="../js/viajeincluir.js"></script>
<script src="../js/jquery-1.9.1.js"></script>
<script src="../js/jquery-ui-1.10.4.custom.js"></script>
<script src="../js/ocultar/jquery-1.3.2.min.js" type="text/javascript"></script> 
<link rel="stylesheet" href="../css/jquery-ui-1.10.4.custom.css" >
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
	
<form action="../controlador/solicitud_viajeIncluirBD.php" method="post"  name="form1" onsubmit="return validarForm();" >
<br><br>
<tr> 	<center> <h2> Procesar Solicitud de Viaje </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			Cedula Adolescente
		</td>
		<td>
			<select name="ci" disabled="disabled"> 
			<option value="V" >V</option>
 			<option value="E" >E</option>
			</select>
			<?php echo '<input name="ci_ado" type="text" id="ci_ado" value="'.$_SESSION['ci_ado'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	
	<tr>
		<td>
			<p> Tipo de Viaje </p>
		</td>
		<td>
			<input type="checkbox" name="tipo_viaje" value="1" id="solo"> Acompañado
		</td>
	</tr>
	<tr>
		<td>
			Motivo de Viaje
		</td>
		
		<td>
			<input type="text" maxlength="50" size="30" name="motivo_viaje" id="motivoviaje"  >
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
			<input type="text" maxlength="50" size="30"  name="destino_viaje" id="destinoviaje"  >
		</td>
	</tr>
	<tr>
		<td>
			Fecha de salida
		</td>
		
		<td>
			<input type="text" maxlength="15" size="30"  name="fecha_salida" id="fecha_salida"  >
		</td>
	</tr>
	<tr>
		<td>
			Fecha de regreso
		</td>
		
		<td>
			<input type="text" maxlength="15" size="30"  name="fecha_regreso" id="fecha_regreso"  >
		</td>
	</tr>
	<tr>
			<td>
			Representante
			</td>
			<td>
			    <?php echo '<input name="ci_rm" type="text"  size="10" value="'.$_SESSION['ci_rm'].'"  readonly />'; ?>
			    <?php echo '<input type="text" size="17"   value="'.$_SESSION['nombre_rm'].'"  readonly />'; ?>
	   		
	   		</td>
			
	</tr>
	<tr>
			<td>
			   <?php echo '<input name="ci_rp" type="hidden"  size="10" value="'.$_SESSION['ci_rp'].'"  readonly />'; ?>
	    	</td>
	</tr>
	<tr>
		<td>
			Cedula del Acompa&ntildeante
		</td>
		
		<td>
			<?php

			$str="SELECT * FROM acompaniante";
			$res=mysql_query($str);
	
			$num=0;	 
			 
			$num=mysql_num_rows($res);

			if($num>0){ 
		?>
		
		<select id='ciacom' name='ci_acom' >
		<option value=''>Seleccione...</option>
		<?php
		
		while($registro=mysql_fetch_array($res))
		{
			  
			     echo "<option value=".$registro['cedula'].">".$registro['cedula']." ".$registro['nombre']."</option>";
		}
		echo "</select>" ;
		}
		  else {
			echo 'NO EXISTEN ACOMPAÑANTE REGISTRADOS';
		}

		?>
		</td>
	</tr>


</table>
</div>

<br>

	<table align ="center">
		<tr>
		<td><input type="submit" name="btnGuardar" id="btnGuardar" value="Guardar" /></td>
		</tr>
	</table>

</form>

</body>
</html>
