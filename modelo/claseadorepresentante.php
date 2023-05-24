<?php
	class adorepresentante{
		public $ci_ado;
		public $ci_rm;
		public $ci_rp;
	function consultar()
	{
		$strsql="SELECT * FROM adorepresentante WHERE ci_ado='$this->ci_ado';";
		$num=0;
		$result=mysql_query($strsql);//ejecuta la tira sql
		return $result;
	}

	function contar()
	{
		$strsql="SELECT * FROM adorepresentante WHERE ci_ado='$this->ci_ado';"; 
		$num=0;	 
		$result=mysql_query($strsql); 
		$num=mysql_num_rows($result);
		return $num;
	}

	function incluir()
	{

		$strsql="INSERT INTO adorepresentante (ci_ado ,ci_rm, ci_rp) VALUES ('$this->ci_ado', '".$this->ci_rm."', '".$this->ci_rp."');";
		$result=mysql_query($strsql);
	}
	function eliminar()
	{
		 $strsql="delete from adorepresentante where ci_ado ='$this->ci_ado'";	 
		 $result=mysql_query($strsql); 
	}
	function modificar()
	{
		$strsql="update adorepresentante set ci_rm='".$this->ci_rm."', ci_rp='".$this->ci_rp."' where ci_ado ='$this->ci_ado'";
		$result=mysql_query($strsql);	 
	}


}
