<?php
include ("../modelo/BD.php");
$conectar1=new  conexion();
$conectar1->conectar();

		/////////////////////////
		
		function representantem()
		{
				$str="SELECT * FROM representante";
				$res=mysql_query($str);
			
				$num=0;	 
					 
				$num=mysql_num_rows($res);

				 if($num>0){ 
				?>
				<select id='cirm' name='ci_rm' >
				<option value=''>Seleccione...</option>
				<?php
				while($registro=mysql_fetch_array($res))
				{
					  
				echo "<option value=".$registro['cedula'].">".$registro['cedula'].". ".$registro['nombre']."</option>";
				}
				echo "</select>" ;
				}
				  else {
					echo 'NO EXISTE REPRESENTANTES REGISTRADOS.. POR FAVOR REGISTRE ANTES DE PROCEDER';
				}
		}
		
		/////////////////////////
		
		
		function representantep()
		{
				$str="SELECT * FROM representante";
				$res=mysql_query($str);
			
				$num=0;	 
					 
				$num=mysql_num_rows($res);

				 if($num>0){ 
				?>
				<select id='cirp' name='ci_rp' >
				<option value=''>Seleccione...</option>
				<?php
				while($registro=mysql_fetch_array($res))
				{
					  
						 echo "<option value=".$registro['cedula'].">".$registro['cedula']."  ".$registro['nombre']."</option>";
				}
				echo "</select>" ;
				}
				  else {
					echo 'NO EXISTE REPRESENTANTES REGISTRADOS.. POR FAVOR REGISTRE ANTES DE PROCEDER';
				}
		}
		///////////////////////////////////////////////////////////////////////////
		function institucion()
		{
			$str="SELECT * FROM institucion";
			$res=mysql_query($str);
		
			$num=0;	 
				 
			$num=mysql_num_rows($res);

			 if($num>0){ 
			?>
			<select id='id_inst' name='id_inst' >
			<option value=''>Seleccione...</option>
			<?php
			while($registro=mysql_fetch_array($res))
			{
				  
					 echo "<option value=".$registro['id_inst']."> ".$registro['nombre']."</option>";
			}
			echo "</select>" ;
			}
			  else {
				echo 'NO EXISTE INSTITUCIONES REGISTRADAS.. POR FAVOR REGISTRE ANTES DE PROCEDER.';
			}
		}
		/////////////////////////////////////////////////////////////////////////////////////////////
		
		function empresa()
		{
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
				  
					 echo "<option value=".$registro['rif_empresa']."> ".$registro['nombre']."</option>";
			}
			echo "</select>" ;
			}
			  else {
				echo 'NO EXISTE EMPRESA REGISTRADAS.. POR FAVOR REGISTRE ANTES DE PROCEDER.';
			}
		}
		/////////////////////////////////////////////////////////////////////////////////////////////
		
		function patron()
		{
				$str="SELECT * FROM patron";
				$res=mysql_query($str);
			
				$num=0;	 
					 
				$num=mysql_num_rows($res);

				 if($num>0){ 
				?>
				<select id='ci_patron' name='ci_patron' >
				<option value=''>Seleccione...</option>
				<?php
				while($registro=mysql_fetch_array($res))
				{
						 echo "<option value=".$registro['cedula'].">".$registro['cedula']." (".$registro['nombre'].")</option>";
				}
				echo "</select>" ;
				}
				  else {
					echo '<br> NO EXISTE PATRÓN REGISTRADO.. POR FAVOR REGISTRE ANTES DE PROCEDER';
				}
		}
		
		
		
		
		
		
?>
