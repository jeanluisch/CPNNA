

<?php

function codigo_viaje(){
	
	

	$anio_extraido = 0;
	$cod_extraido = 0;
	$cod_viaje=0;
	$cod_n="N°VN";
	$anio_actual=date("y");
	$mes_actual= date("m");
	$cod_reinicia=$cod_n.'01'.$mes_actual.$anio_actual;
	//$ultimo_cod="N°VN010814";
	
	
	$str="select codigo from viaje order by id_viaje DESC LIMIT 1; ";
	$ejecuta=mysql_query($str);
	$num=0;
	$num=mysql_num_rows($ejecuta);
	if($num==1){
		while($registro=mysql_fetch_array($ejecuta)){
		$_SESSION['codigo']=$registro['codigo'];
		
		}
	
	}
	$ultimo_cod=$_SESSION['codigo'];
	if ($num==0){
	/**     asigno nuevo codigo, iniciando en 01, + mes + año   **/
	$cod_viaje= $cod_reinicia; 
	
	}
	/**descompongo el codigo extraido de la BD   **/
	else{
		$anio_extraido = substr("$ultimo_cod", 6);
		$cod_extraido = substr("$ultimo_cod", -6, 2);
		
		if($anio_extraido < $anio_actual){ // si es menor el año extraido que el actual, entonces reinicio el cod
			$cod_viaje = $cod_reinicia;
		}
		else{ //si el año es igual, entonces incremento 1 al codigo.
			$cod_viaje= $cod_extraido+1;
			$cod_viaje= $cod_n.'0'.$cod_viaje.$mes_actual.$anio_actual;
		}
		
	}
	return $cod_viaje;
	}
	
	function codigo_trabajo(){
	
	

	$anio_extraido = 0;
	$cod_extraido = 0;
	$cod_trabajo=0;
	$cod_n="N°";
	$anio_actual=date("y");
	$mes_actual= date("m");
	$cod_reinicia=$cod_n.'01'.$mes_actual.$anio_actual;
	
	
	
	$str="select codigo_trabajo from trabajo order by id_trabajo DESC LIMIT 1; ";
	$ejecuta=mysql_query($str);
	$num=0;
	$num=mysql_num_rows($ejecuta);
	if($num==1){
		while($registro=mysql_fetch_array($ejecuta)){
		$_SESSION['codigo_trabajo']=$registro['codigo_trabajo'];
		
		}
	
	}
	$ultimo_cod=$_SESSION['codigo_trabajo'];
	if ($num==0){
	/**     asigno nevo codigo, iniciando en 01, + mes + año   **/
	$cod_trabajo= $cod_reinicia; 
	
	}
	/**descompongo el codigo traido de la BD   **/
	else{
		$anio_extraido = substr("$ultimo_cod", 6);
		$cod_extraido = substr("$ultimo_cod", -6, 2);
		
		if($anio_extraido < $anio_actual){ // si es menor el año extraido que el actual, entonces reinicio el cod
			$cod_trabajo = $cod_reinicia;
		}
		else{ //si el año es igual, entonces incremento 1 al codigo.
			$cod_trabajo= $cod_extraido+1;
			$cod_trabajo= $cod_n.'0'.$cod_trabajo.$mes_actual.$anio_actual;
		}
		
	}
	return $cod_trabajo;
	}
?>
