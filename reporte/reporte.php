<?php
   session_start();
?>
<?php
	include("../modelo/BD.php");
	$obj=new conexion();
	$obj->conectar();
	require('../fpdf/fpdf.php');

	
	
$pdf = new FPDF('P','mm','A4');//tipo de hoja 
$pdf->Ln(40);
$pdf->SetMargins(35, 25 , 35); 
$pdf->AddPage();//agregar paginas 
$pdf->Image('../image/LogoIzquierdo.jpg',35,18,-200);
$pdf->Image('../image/LogoDerecho.jpg',160,18,-200);
$pdf->SetFont('Arial','',10);//tipo de letras 
$pdf->SetFontSize(10);
$pdf->SetXY(38,15);
$pdf->Cell(0,8,utf8_decode(" REPÚBLICA BOLIVARIANA DE VENEZUELA "),0,0,'C',false);
$pdf->Ln(5);
$pdf->Cell(0,8,utf8_decode(" ALCALDIA BOLIVARIANA DEL MUNICIPIO LA TRINIDAD"),0,0,'C',false);
$pdf->Ln(5);
$pdf->Cell(0,8,utf8_decode(" CONSEJO DE PROTECCIÓN DEL NIÑO, NIÑA Y ADOLESCENTE"),0,0,'C',false);
$pdf->Ln(5);
$pdf->Cell(0,8,utf8_decode(" BORAURE ESTADO YARACUY "),0,0,'C',false);
$pdf->Ln(20);

$pdf->SetFont('Arial','',14);
$pdf->Cell(0,8,utf8_decode(" AUTORIZACIÓN DE VIAJES"),0,0,'C',false);
$pdf->Ln(10);

$pdf->SetFont('Arial','',10);//tipo de letras 
$pdf->MultiCell(0,8,utf8_decode("        El Consejo de Protección del Niño, Niña y Adolescente del MUNICIPIO LA TRINIDAD, en uso de sus atribuciones conferidas en el articulo 160 literal j.- Expedir autorizaciones de viaje dentro y fuera del territorio Nacional. Previa autorización de su representante, ". $_SESSION['nombre_r']. " ". $_SESSION['apellido_r']. " Titular de la cédula de identida. ". $_SESSION['ci_rm']. ", Residente " .$_SESSION['direccion_r']. ", AUTORIZO al niño, niña y/o adolescente plenamente identificado como ". $_SESSION['nombre_a']. " ". $_SESSION['apellido_a']. " titular de la cédula de identidad ". $_SESSION['cedula']. " de (14) años de edad. para que viaje con el ciudadano ". $_SESSION['nombre_acom']. " ". $_SESSION['apellido_acom']. ", titular de la cédula de identida ". $_SESSION['ci_acom']. " a la Ciudad de ". $_SESSION['destino_viaje']. " dicho viaje se debe a un ". $_SESSION['motivo_viaje'] ) ,0,"J", false);
$pdf->Ln();
$pdf->MultiCell(0,8,utf8_decode("          Autorización que se expide en BORAURE, a los ".$_SESSION["fecha_expedicionvs"]. "  CON FINES LEGALES"),0,"J", false );
$pdf->Ln();
$pdf->MultiCell(0,8,utf8_decode("Art. 391 de la ley orgánica para la protección del niño, niña y adolescente (LOPNNA) "),0,"C", false );
$pdf->Ln();
$pdf->MultiCell(0,8,utf8_decode("        \"Los niños,niñas\" y adolescentes pueden viajar dentro del país acompañadp de sus padres, representantes o responsables. En caso de viajar solos o con terceras personas requiere la autorización de un representante legal. Expedida por el consejo de protección de niños niñas y adolescentes, por una jefatura civil o mediante documento auntenticado. "),0,"J", false );
$pdf->Ln();
$pdf->Cell(0,8,utf8_decode(" CONSEJO DE PROTECCIÓN N.N.A"),0,0,'C',false);


$pdf->Output();

?>
