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
		font-size:14px;
		line-height:35px;
}
 div p{
line-height:15px;
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
		<table align="center" width="480">
			<tr> 
				<td align="right">
					
							AÑO 204 Y 155°
				</td>
		</tr>
		</table>
		<br>
		<table align="center">
			<tr> 
				<td align="center">
					
							<b>SOLICITUD DE REGISTRO DE ADOLESCENTE TRABAJADOR</b>
				</td>
			</tr>
		</table>
		<table width="480" align="center">
			<tr> 
				<td align="justify">
					<p>
						Solicitud '.$_SESSION['codigo_trabajo'].'
					</p>
				</td>
			</tr>
		</table>
		<table align="center" width="480">
			<tr> 
				<td align="justify" >
					<div>
					<p align="justify" >
					CIUDADANOS <br>
					CONSEJEROS(AS) DE PROTECCIÓN DEL NIÑO, NIÑA Y ADOLECENTE DEL MUNICIPIO LA TRINIDAD EDO. YARACUY <br>
					SU DESPACHO.-
					</p>
					</div>
				</td>
			</tr>

		<table align="center" width="480" border="0">
			<tr> 
				<td align="center" >
					<p align="justify">
						Yo:<b>'.$_SESSION['nombre_rts'].' '.$_SESSION['apellido_rts'].'</b> C.I.N°: <b>'.$_SESSION['ci_rts'].'</b> 
						de nacionalidad  Venezolana  Estado Civil:  <b>'.$_SESSION['edo_civilts'].'</b>. representante legal de mi hijo (a)
						el adolescente:  <b>'.$_SESSION['nombre_ats'].' '.$_SESSION['apellido_ats'].'</b> de:  ('.$_SESSION['edad_adoles'].') años C.I.N°  <b>'.$_SESSION['ci_adot'].'</b> 
						quien nació en:  <b>'.$_SESSION['lugar_nacats'].'</b>.   El día:  <b>'.$_SESSION['f_nacimientoats'].'</b>.  Residenciado en <b>'.$_SESSION['direccionats'].'</b> 
						Y sobre quien ejerzo la <b>PATRIA POTESTAD</b>, según consta en la copia certificada de la Partidad de Nacimiento,
						asiganda con el N° <b>'.$_SESSION['n_pnacats'].'</b> solicito ante el consejo de proteccion del N.N.A sea inscrito en el 
						<b> REGISTRO DE ADOLESCENTE TRABAJADOR </b> de conformidad y en acatamiento a lo dispuesto en el Título II Capítulo III, Artículos N° 96 y
						98, de la Ley Orgánica para la Protección del Niño, Niña y Adolescente, <b> AUTORIZANDO </b> a mi hijo (a), para trabajar en:
						<b>'.$_SESSION['nombrets'].'</b>  bajo la dependencia patronal de:  <b>'.$_SESSION['nombrepts'].'</b>  a partir de la fecha  <b>'.$_SESSION['fecha_ingresos'].'</b>  
						en un horario comprendido de:   <b>'.$_SESSION['horario_trabajos'].'</b>.<br>
						
						En  BORAURE, a los '.$_SESSION['fe_dia'].' dias del mes de '.$_SESSION['fe_mes'].' del año '.$_SESSION['fe_anio'].'
						
					</p>
				</td>
			</tr>
			<table width="480" align="center">
			<tr>
					<td align="left">
					<p> Solicitante  <br>
					 Representante</p>
					</td>
					<td align="right">
					<p> Solicitante  <br>
					 (Adolescente)</p>
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
$dompdf->stream("SolicitudRegistro.pdf");
?>
