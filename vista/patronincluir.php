<?php
   session_start();
if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<?php 
include ("../modelo/BD.php");
$conectar1=new  conexion();
$conectar1->conectar();
?>

<html>
<head><title>Patr&oacuten</title>
<script src="../js/patron.js"></script>
<meta charset="UTF-8"/>
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

	
<form action="../controlador/patronIncluirBD.php" method="post" name="form1" onsubmit="return validarForm();">

	</table>
<tr> 	<center> <h2> Patr&oacuten </center> <h2> </tr>

	<table border ="0" align ="center" >


		<tr>
		<td>
			C&eacutedula
		</td>
		<td>
			<select name="ci"> 
			<option value="V">V</option>
 			<option value="E">E</option>
</select>
			<?php echo '<input name="Cedula" type="text" id="Cedula" size="15" value="'.$_SESSION['cedula'].'" disabled="disabled" />'; ?>
		</td>
		
		</tr>
	</tr>
	<tr>
		<td>
			Nombres
		</td>
		
		<td>
			<input type="text" maxlength="70" size="20" name="nombre" id="nombre"  >
		</td>
	</tr>

		<tr>
			<td>
			Empresa
			</td>
		<td>
		<?php

		$str="SELECT * FROM empresa";
		$res=mysql_query($str);
	
		$num=0;	 
			 
		$num=mysql_num_rows($res);

		if($num>0){ 
		?>
		<select id='rifempresa' name='rif_empresa' >
		<option value=''>Seleccione...</option>
		<?php
		while($registro=mysql_fetch_array($res))
		{
			  
			     echo "<option value=".$registro['rif'].">".$registro['nombre']."</option>";
		}
		echo "</select>" ;
		}
		  else {
			echo '<br>No exite Empresas Registradas.';
		}

		?>

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
