<?php
class adolescente{
public $cedula;
public $nombre;
public $apellido;
public $f_nacimiento;
public $n_pnac;
public $lugar_nac;
public $direccion;
public $conflicto;
public $fecha;
function consultar()
{
$strsql="SELECT * FROM adolescente WHERE cedula='$this->cedula';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM adolescente WHERE cedula='$this->cedula';"; // Consulta SQL..
	 
     $num=0;	 
	 $result=mysql_query($strsql); // "$strsql" es el argumento que se le pasa a la funcion "mysql_query"
				       // es decir: la cadena que contiene la consulta SQL por realizar.
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO adolescente (cedula, conflicto, nombre ,apellido, f_nacimiento, n_pnac, lugar_nac, direccion) VALUES ('$this->cedula', '".$this->conflicto."', '".$this->nombre."','".$this->apellido."', '".$this->f_nacimiento."', '".$this->n_pnac."', '".$this->lugar_nac."', '".$this->direccion."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 $strsql="delete from adolescente where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update adolescente set conflicto='".$this->conflicto."', nombre='".$this->nombre."', apellido='".$this->apellido."' , f_nacimiento='".$this->f_nacimiento."',n_pnac='".$this->n_pnac."', lugar_nac='".$this->lugar_nac."', direccion='".$this->direccion."' where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}

function calcularedad()
{
	 $fecha= $this->fecha;
	 $anio = substr("$fecha", 0, 4);
	 $mest = substr("$fecha", -5, 2);
	 $dia = substr("$fecha", 8);

     $dia_nac = $dia; 
     $mes_nac = $mest;
     $anio_nac = $anio; 

     $dia_act =date("d");
     $mes_act =date("m");
     $anio_act =date("Y");
      
      if ($mes_act<$mes_nac)
      {
      	$edad_aux= $anio_act -1;
      	$edad = $edad_aux - $anio_nac;
      	
      }
      
      if ($mes_act>$mes_nac)
      {
      	$edad = $anio_act - $anio_nac;
      	
      }
      
      if ($mes_act==$mes_nac)
      {
      	if($dia_act < $dia_nac)
      	{
      		$edad_aux= $anio_act -1;
      		$edad = $edad_aux - $anio_nac;
      		
      	}
      	if($dia_act >= $dia_nac)
      	{
      		$edad = $anio_act - $anio_nac;	
      	}
      }
   	 
	 return $edad;
}

}
