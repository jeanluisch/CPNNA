<?php
   session_start();
?>

<html>
<head>
<meta charset="UTF-8"/>
<title>Documento sin t&iacute;tulo</title>
</head>

<body>
<?php
 
	$id_trabajo= $_GET['id'];
	$_SESSION['id_trabajo']= $id_trabajo;
	
  
	if($_GET['id'])
	{
	 echo "<META HTTP-EQUIV='refresh' CONTENT='0; URL=../vista/reporte_trabajoMul.php'>";

	}
?>
</body>
</html>
