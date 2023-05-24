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
		font-size:15px;
		line-height:30px;
		text-indent: 2.5em
}


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
					<div align="right">'.$_SESSION['codigosnc'].'</div>
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
				<td align="center">
					<p>
						<h4>
							AUTORIZACIÓN DE VIAJES
						</h4>
					</p>
				</td>
			</tr>
		</table>

		<table align="center" width="480">
			<tr> 
				<td align="center" >
					<p align="justify">
						
						El Consejo de Protección del Niño, Niña y Adolescente del MUNICIPIO LA TRINIDAD, en uso de sus atribuciones
						conferidas en el articulo 160 literal j.- Expedir autorizaciones de viaje dentro y fuera del territorio Nacional.
						Previa autorización de su representante, <b> '. $_SESSION['nombre_rmsnc']. ' '. $_SESSION['apellido_rmsnc']. '</b>
						 Titular de la cédula de identida. <b> '. $_SESSION['ci_rmsnc']. '</b>, Residente: <b> ' .$_SESSION['direccion_rmsnc']. '</b>, AUTORIZO al
						 niño, niña y/o adolescente plenamente identificado como <b> '. $_SESSION['nombre_asnc']. ' '. $_SESSION['apellido_asnc']. '</b> 
						 de '.$_SESSION['f_nacimientoaasnc'].' años de edad, titular de la cédula de identidad <b> '. $_SESSION['ci_adosnc']. '</b> para que viaje SOLO POR TODO EL 
						 TERRITORIO NACIONAL por motivo de '. $_SESSION['motivo_viajesnc'].'. Autorización Valida por un año
						
					</p>
					<p align="justify">
					Autorización que se expide en BORAURE, a los '.$_SESSION['fe_diasnc'].' dias del mes de '.$_SESSION['fe_messnc'].' del año '.$_SESSION['fe_aniosnc'].' CON FINES LEGALES.
					</p>
					
					<p align="justify">
					<b>Art. 391 de la ley orgánica para la protección del niño, niña y adolescente (LOPNNA)</b>
					</p> 
					
					<p align="justify">
					“Los niños, niñas, y adolescentes pueden viajar dentro del país acompañado de sus padres, representantes o responsables. En caso de viajar solos o con terceras personas requiere la autorización de un representante legal. Expedida por el consejo de protección de niños niñas y adolescentes, por una jefatura civil o mediante documento auntenticado. ”
					</p>
					
					<p align="center">
					CONSEJO DE PROTECCIÓN N.N.A
					</p>
					
				</td>
			</tr>
		</table>
</body>
</html>';

$dompdf=new DOMPDF();
$dompdf->load_html($codigoHTML);
ini_set("memory_limit","128M");
$dompdf->render();
$dompdf->stream("SolicitudRegistro.pdf");
?>
