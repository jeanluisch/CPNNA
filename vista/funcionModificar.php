<?php
   session_start();
?>
<?php
include ("../modelo/BD.php");
$conectar1 = new  conexion();
$conectar1->conectar();

	function representantem(){
	
	$str ="SELECT * FROM representante";
	$res = mysql_query($str);
	$num = 0;	 	 
	$num = mysql_num_rows($res);
	if($num>0){ 
	?>
	<select id='cirm' name='ci_rm' >
	<?php echo "<option value=".$_SESSION['ci_rm'].">".$_SESSION['ci_rm']."  ".$_SESSION['ci_rmnomb']."</option>";?>
	<?php
	while($registro = mysql_fetch_array($res)) 
	{
	 echo "<option value=".$registro['cedula'].">".$registro['cedula']."  ".$registro['nombre']."</option>";
	}
	
	}		
	}
		///////////////////////////////////////////////////////////////////////////
	

	function representantep(){
	
	$str="SELECT * FROM representante";
	$res=mysql_query($str);
	$num=0;	 	 
	$num=mysql_num_rows($res);
	if($num>0){ 
	?>
	<select id='cirp' name='ci_rp' >
		
	<?php echo "<option value=".$_SESSION['ci_rp'].">".$_SESSION['ci_rp']."  ".$_SESSION['ci_rpnomb']."</option>";?>
	<option value=''>(Sin conflicto)</option>
	<?php
	while($registro=mysql_fetch_array($res))
	{
	 echo "<option value=".$registro['cedula'].">".$registro['cedula']."  ".$registro['nombre']."</option>";
	}
	
	}
				
	}
		///////////////////////////////////////////////////////////////////////////
			
	function institucion(){
			
	$str="SELECT * FROM institucion";
	$res=mysql_query($str);
	$num=0;	 	 
	$num=mysql_num_rows($res);
	if($num>0){ 
	?>
	<select id='id_inst' name='id_inst' >
				
	<?php echo "<option value=".$_SESSION['id_inst'].">".$_SESSION['id_instnomb']."</option>";?>
	<?php
	while($registro=mysql_fetch_array($res))
	{
	 echo "<option value=".$registro['id_inst'].">".$registro['nombre']."</option>";
	}
				
	}
				
	}
			
		///////////////////////////////////////////////////////////////////////////
			
			function empresa(){
				
			$str="SELECT * FROM empresa";
			$res=mysql_query($str);
			$num=0;	 	 
			$num=mysql_num_rows($res);
			 if($num>0){ 
			?>
			<select id='rif_empresa' name='rif_empresa' >
				
			<?php echo "<option value=".$_SESSION['rif_empresa'].">".$_SESSION['rif_empresa']." ".$_SESSION['rif_nombre']." </option>";?>
			<?php
			while($registro=mysql_fetch_array($res))
			{
			echo "<option value=".$registro['rif'].">".$registro['rif']." ".$registro['nombre']."</option>";
			}
			
			}
				 
			}
			
			///////////////////////////////////////////////////////////////////////////
			
			function patron(){
				
			$str="SELECT * FROM patron";
			$res=mysql_query($str);
			$num=0;	 	 
			$num=mysql_num_rows($res);

			 if($num>0){ 
			?>
			<select id='ci_patron' name='ci_patron'>
				
			<?php echo "<option value=".$_SESSION['ci_patron'].">".$_SESSION['ci_patron']." (".$_SESSION['nombre_patront'].")  </option>";?>
			<?php
			while($registro=mysql_fetch_array($res))
			{
				 echo "<option value=".$registro['cedula'].">".$registro['cedula']." (".$registro['nombre'].")</option>";
			}
					
			}
				 
			}
////////////////////////////////////////////////////////////
		function acompaniante(){
	
	$str="SELECT * FROM acompaniante";
	$res=mysql_query($str);
	$num=0;	 	 
	$num=mysql_num_rows($res);
	if($num>0){ 
	?>
	<select id='ci_acom' name='ci_acom' >
		
	<?php echo "<option value=".$_SESSION['ci_acom'].">".$_SESSION['ci_acom']."  ".$_SESSION['ci_acomnomb']."</option>";?>
	<?php
	while($registro=mysql_fetch_array($res))
	{
	 echo "<option value=".$registro['cedula'].">".$registro['cedula']."  ".$registro['nombre']."</option>";
	}
	
	}
				
	}
		///////////////////////////////////////////////////////////////////////////


?>
