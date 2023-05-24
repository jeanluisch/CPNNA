<?php
   session_start();
	if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<html>
<head><title>Reporte Estadistica</title>
<meta charset="UTF-8"/>
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
                            $( "#desde" ).datepicker({
                                changeMonth: true,
                                changeYear: true,
                                dateFormat: "yy-mm-dd",
                                onClose: function(){
                             

                                }
                                /*maxDate: hoy,*/
                                /*minDate : hoy*/
                            });
                        });
		
		 $(function() {
                            var hoy = new Date();
                            var minimaFecha = new Date();
                            minimaFecha.setFullYear(1930, 0, 1);
                            $( "#hasta" ).datepicker({
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


<form action="../controlador/reporte_estadisticabuscarBD.php" method="post" name="form1" onsubmit="return validarForm();">

<center> <h2> Reporte   <h2> </center>

	<table border ="0" align ="center" >

	<tr>
		<td align ="right">
			Fecha Desde:
		</td>
		<td>
			<input type= "text" name= "fecha_desde" id="desde" maxlength ="11" placeholder="Fecha Desde" required="required">
		</td>
		<td align ="right">
			Fecha Hasta:
		</td>
		<td>
			<input type= "text" name= "fecha_hasta" id="hasta" maxlength ="11" placeholder="Fecha Hasta" required="required">
		</td>
		
	</tr>

		
	</table>
	<br><br>
	<table align="center">
	<tr align="center">
			<td align="center">
				<input type="submit" name="btnBuscar" id="btnBuscar" value="Buscar" />
			</td>
		</tr>
	</table>


</form>
</div>


</body>
</html>
