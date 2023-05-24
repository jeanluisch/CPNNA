<?php
   session_start();
?>
<?php
	
	require_once("../dompdf/dompdf_config.inc.php");
	include("../modelo/BD.php");
 	 $obj=new conexion();
 	 $obj->conectar();

$codigoHTML='
<html>
<head>
<meta charset="UTF-8"/>
<title>Lista</title>

<style type="text/css">
  p {
		font-size:13px;
		line-height:25px;
}
p span { font-size:14.5px;
		line-height:25px; }



  </style>
</head>

<body>
		<table align="center">
			<tr> 
				<td>
					<IMG SRC="../image/LogoIzquierdo.jpg" WIDTH=110 HEIGHT=110 >
				</td>
				<td align="center">
					<p> <h4> República Bolivariana de Venezuela <br> 
						Alcaldia Bolivariana del Municipio la Trinidad <br>
						Consejo de Protección del Niño, Niña y Adolescente <br>
						Boraure - Estado Yaracuy
					<p/>
				</td>
				<td>
					<IMG SRC="../image/LogoDerecho.jpg" WIDTH=110 HEIGHT=110 >
				</td>
			</tr>
		</table>
		<br>
		
		<center> <hr width="75%" /> </center>
		<table align="center" width="480" border="0">
		<tr>
			<td>
				<p align="right">
					<div align="right"></div>
				<p>
			</td>
		</tr>
		<tr>
			<td>
				<p align="right">
					<div align="right">AÑO 204° Y 155 </div>
				<p>
			</td>
		</tr>
		</table>
		
		
		<table align="center">
			<tr> 
				<td align="center" width="480">
					<p>
						<h4>
							REGISTRO DE ADOLESCENTE TRABAJADOR (A)
						</h4>
					</p>
				</td>
			</tr>
			<tr>
				<td align="right">
					<p>
						<h5>
							Articulo N° 98 LOPNNA <br>
							Valido por un (1) año
						</h5>
					</p>
				</t>
			</tr> <br>
		</table>
		
		<table align="center" width="480">
			<tr> 
				<td align="justify" >
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1- DATOS DEL ADOLESCENTE
				</td>
			</tr>
			<tr> 
				<td align="justify" >
					<p align="justify">
					<span><b>Nombre y Apellido:</b></span> '.$_SESSION['nombre_at'].' '.$_SESSION['apellido_at'].' <span><b> C.I.N°: </b></span> '.$_SESSION['ci_adot'].'. 
					<span><b> Fecha de Nacimiento:</b></span> '.$_SESSION['f_nacdia'].' de '.$_SESSION['f_nacmes'].' del '.$_SESSION['f_nacanio'].'  
					<span><b>Dirección:</b></span> '.$_SESSION['direccionat'].'.
					</p>
				</td>
			</tr>
			<tr> 
				<td align="justify" >
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2- DATOS DEL REPRESENTANTE
				</td>
			</tr>
			<tr> 
				<td align="justify" >
					<p align="justify">
					<span><b>Nombre y Apellido:</b></span> '.$_SESSION['nombre_rt'].' '.$_SESSION['apellido_rt'].' <span><b> C.I.N°: </b></span> '.$_SESSION['ci_rt'].'. 
					<span><b> Fecha de Nacimiento:</b></span> '.$_SESSION['f_nacrdia'].' de '.$_SESSION['f_nacrmes'].' del '.$_SESSION['f_nacranio'].'  
					<span><b>Dirección:</b></span> '.$_SESSION['direccionat'].'.
					</p>
				</td>
			</tr>
			
			<tr> 
				<td align="justify" >
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3- INSTITUTO DONDE ESTUDIA
				</td>
			</tr>
			<tr> 
				<td align="justify" >
					<p align="justify">
					<span><b>Nombre: </b></span> '.$_SESSION['nombreit'].' <span><b> Grado: </b></span> '.$_SESSION['gradot'].'  
					<span><b> Sección: </b></span> &nbsp;&nbsp;'.$_SESSION['secciont'].' &nbsp;&nbsp; <span><b>Otros:</b></span> '.$_SESSION['otrost'].' 
					<span><b> Horario:</b></span> '.$_SESSION['horariodt'].'.
					</p>
				</td>
			</tr>
			
			<tr> 
				<td align="justify" >
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4- DATOS DEL TRABAJO
				</td>
			</tr>
			<tr> 
				<td align="justify" >
					<p align="justify">
					<span><b> Lugar de trabajo: </b></span> '.$_SESSION['direccionet'].' <span> <b> Trabajo que desempeña: </b></span> '.$_SESSION['t_desempenia'].'  
					<span><b> Horario de trabajo: </b></span> &nbsp;&nbsp;'.$_SESSION['horario_trabajo'].' &nbsp;&nbsp;<span><b>Fecha de ingreso:</b></span> &nbsp; '.$_SESSION['f_ingresodia'].' de '.$_SESSION['f_ingresomes'].' del '.$_SESSION['f_ingresoanio'].'  
					<span><b> Nombre del Patrón:</b></span> '.$_SESSION['nombrept'].'.
					</p>
				</td>
			</tr><br>
			<tr> 
				<td align="justify" >
					<p align="justify">
					<span><b> Informe de exámenes médicos: </b></span> &nbsp;'.$_SESSION['examen_medicot'].'.
					</p>
				</td>
			</tr>
			<table width="480" align="center">
			<tr>
					<td align="left">
					
					<p> Consejera(o)  </p>
					
					</td>
					
					<td align="right">
					<p> Adolescente </p>
					
					
					</td>
			</tr>
			</table>
				
		</table>
</body>
</html>';

$dompdf=new DOMPDF();
$dompdf->load_html($codigoHTML);
ini_set("memory_limit","128M");
$dompdf->render();
$dompdf->stream("RegistroAdolescente.pdf");
?>
