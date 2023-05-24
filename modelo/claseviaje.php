<?php
class viaje{
public $solicitud;
public $ced_adolescente;
public $ced_acompaniante;
public $motivo;
public $destino;
public $fecha_salida;
public $fecha_llegada;

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

$strsql="INSERT INTO adolescente ( cedula ,nombre ,apellido, f_nacimiento, n_pnac, lugar_nac, direccion, id_inst, ci_r) VALUES ('$this->cedula', '".$this->nombre."','".$this->apellido."', '".$this->f_nacimiento."', '".$this->n_pnac."', '".$this->lugar_nac."', '".$this->direccion."', '".$this->id_inst."', '".$this->ci_r."');";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sqL 
	 
}
function eliminar()
{

 $strsql="delete from adolescente where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 
}
function modificar()
{

	$strsql="update adolescente set nombre='".$this->nombre."', apellido='".$this->apellido."' , f_nacimiento='".$this->f_nacimiento."',n_pnac='".$this->n_pnac."', lugar_nac='".$this->lugar_nac."', direccion='".$this->direccion."' where cedula ='$this->cedula'";	 
   
	 $result=mysql_query($strsql);//ejecuta la tira sql	 	 
	 
}


}
