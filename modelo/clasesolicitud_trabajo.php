<?php
class solicitud_trabajo{
public $id_trabajo;
public $codigo_trabajo;
public $ci_ado;
public $ci_r;
public $t_desempenia;
public $ci_patron;
public $fecha_ingreso;
public $horario_trabajo;
public $examen_medico;
public $fecha_expedicion;
function consultar()
{
$strsql="SELECT * FROM trabajo WHERE ci_ado='$this->ci_ado';";
	 
     $num=0;	 
	 $result=mysql_query($strsql);//ejecuta la tira sql
	 return $result;
	 

}

function contar()
{
$strsql="SELECT * FROM trabajo WHERE ci_ado='$this->ci_ado';";
	 
     $num=0;	 
	 $result=mysql_query($strsql); //ejecuta la tira sql
	 $num=mysql_num_rows($result);
	 return $num;
}

function incluir()
{

$strsql="INSERT INTO trabajo ( codigo_trabajo, ci_ado ,ci_r ,ci_patron, t_desempenia, horario_trabajo, examen_medico, fecha_ingreso, fecha_expedicion) VALUES ('$this->codigo_trabajo', '".$this->ci_ado."',  '".$this->ci_r."','".$this->ci_patron."', '".$this->t_desempenia."', '".$this->horario_trabajo."', '".$this->examen_medico."', '".$this->fecha_ingreso."', '".$this->fecha_expedicion."');";	 
   
	 $result=mysql_query($strsql); 
	 
}
function eliminar()
{

 $strsql="delete from trabajo where ci_ado ='$this->ci_ado'";	 
   	 
}
function modificar()
{

	$strsql="update trabajo set ci_r='".$this->ci_r."', ci_patron='".$this->ci_patron."', t_desempenia='".$this->t_desempenia."', horario_trabajo='".$this->horario_trabajo."', examen_medico='".$this->examen_medico."', fecha_ingreso='".$this->fecha_ingreso."' where id_trabajo='$this->id_trabajo' and ci_ado ='$this->ci_ado'";	 
   
	 $result=mysql_query($strsql);	 
	 
}


}
