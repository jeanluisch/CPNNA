		
		function validarForm()
		{
		var direccion = document.getElementById("direccion").value;
		if( direccion == null || direccion.length == 0 || /^\s+$/.test(direccion) ){
		alert("No puede dejar el Campo DIRECCION vacio")
		document.form1.direccion.focus()
		return false;
		   }
		   
		 }
