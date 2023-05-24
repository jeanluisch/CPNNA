<?php
   session_start();
	if (!isset($_SESSION['usuario']))
    header("location:../index.html");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Documento sin t&iacute;tulo</title>
</head>

<body>
<?php 
$identificador = $_GET['id']; 

echo "El identificador de este cliente es: $identificador"; 
?> 
</body>
</html>
