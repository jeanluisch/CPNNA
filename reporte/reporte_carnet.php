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
		font-size:9px;
		line-height:10px;
    }
    </style>
</head>

<body>
	<table width="520px" border="0.01">
		<tr>
			<td>
				<table border="0" width="470px" align="center">
					<tr>
		    			<td width="220px">
							<p align="justify"> cursa estudios <br>
							en: <b>'.$_SESSION['nombreits'].'</b> <br>
							horario: <b>'.$_SESSION['horariots'].'</b> <br>
							fecha de ingreso <br>
							laboral: <b>'.$_SESSION['fecha_ingresos'].'</b> <br>
							dirección y tipo de trabajo:<br> <b>'.$_SESSION['direccionets'].'</b>. <b>'.$_SESSION['t_desempenias'].'</b> <br><br>
							REPRESENTANTE LEGAL:<br> <b>'.$_SESSION['nombre_rts'].'</b> <b>'.$_SESSION['apellido_rts'].' </b> <br>
							EN ATENCIÓN AL CAPITULO III, DERECHO A LA PROTECCIÓN EN MATERIA DE TRABAJO. <br>
							ARTICULOS 94. 95. 98. 99. 100 6 102, DE LA LOPNNA <br><br>
		
							ARTICULO 102... "la jornada de trabajo de los adolescentes no podrá exceder de seis (6) horas diarias y deberá dividirse en dos periodos, la semana no podrá exceder de 30 horas".. <br>
							CREDENCIAL QUE SE EXPIDE EN ATRIBUCION AL ARTICULO 160 LITERAL i.  DE LA LOPNNA. <br>
							   UNA VES REUNIDOS LOS REQUISITOS LEGALES PARA REGISTRAR COMO ADOLESCENTE TRABAJADOR BAJO <b>'.$_SESSION['codigo_trabajo'].' </b> <br>
							EN FECHA '.$_SESSION['fecha_ingresos'].' EN EL LIBRO DE REGISTRO DE ADOLESCENTE TRABAJADOR, MUNICIPIO LA TRINIDAD. <br><br>
							CPNNA
							</p>
</td>
        <td>
							<table  border="0.01" width="215px" align="center"> 
				 			<tr>
					   			<td>
									<table border="0" width="195px" align="center" >
										<tr>
											<td width="10px" >
													<IMG SRC="../image/LogoIzquierdo.jpg" WIDTH="30" HEIGHT="30" >
											</td>
											<td align="center" width="183px" >
												<p>
													República Bolivariana de Venezuela <br> 
													Alcaldia Bolivariana del Municipio la Trinidad <br>
													Consejo de Protección del NNA<br>
													Boraure  Estado Yaracuy
													<hr width="100" noshade="noshade" />
												<p/>
											</td>
										</tr>
									</table>
									
									<table border="0" width="220px" align="center">
									<tr>
										<td>
											<p align="center">
												CREDENCIAL ADOLESCENTE TRABAJADOR(A)<br><br><br><br><br><br><br><br>
											<p/>
											<p align="center">
												Nombre y apellido:
											<p/>
											<p align="justify">
												<b>'.$_SESSION['nombre_ats'].'</b> <b>'.$_SESSION['apellido_ats'].'</b><br>
												C.I.N°V-:  <b>'.$_SESSION['ci_adot'].'</b><br>
												Fecha de Nacimiento:  <b>'.$_SESSION['fs_dia'].'</b> de <b>'.$_SESSION['fs_mes'].' del <b>'.$_SESSION['fs_anio'].'  </b> </b>  <br>
												Dirección:  <b>'.$_SESSION['direccionats'].'</b> <br>
											<p/>
											<p align="center"> Empresa:  </p>
											<p align="justify">
												<b>'.$_SESSION['nombrets'].'</b><br>
												Valido por:   Un (1)año
											<p/>
											
										</td> 
									</tr>
									</table>
									
								</td>
		      				</tr>
		      				
		    				</table>
						</td>
     				 </tr>
				</table>
    		</td>
		</tr>
	</table>


</body>
</html>';

$dompdf=new DOMPDF();
$dompdf->load_html($codigoHTML);
ini_set("memory_limit","128M");
$dompdf->render();
$dompdf->stream("CredencialAdolescente.pdf");
?>
