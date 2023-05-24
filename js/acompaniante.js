		function validarForm()
		{
		
		var nombre = document.getElementById("nombre").value;
		var apellido = document.getElementById("apellido").value;

		if(! /^[a-zA-Z\s]*$/.test(nombre)  ){
		alert("Solo se Permiten letras en el campo NOMBRE")
		document.form1.nombre.focus()
		return false;
		}

		if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) )
		{
			alert("No puede dejar el Campo NOMBRE vacio")
			document.form1.nombre.focus()
			return false;
		}
		
	
		if(! /^[a-zA-Z\s]*$/.test(apellido)  ){
		alert("Solo se Permiten letras en el campo APELLIDO")
		document.form1.apellido.focus()
		return false;
		}

		if( apellido == null || apellido.length == 0 || /^\s+$/.test(apellido) )
		{
			alert("No puede dejar el Campo APELLIDO vacio")
			document.form1.apellido.focus()
			return false;
		}
		
}


