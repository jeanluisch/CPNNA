		function validarForm()
		{
		
		var nombre = document.getElementById("nombre").value;

		if(! /^[a-zA-Z\s]*$/.test(nombre)  ){
		alert("Solo se Permiten letras en la INSTITUCIÓN")
		return false;
		}

		if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) )
		{
			alert("No puede dejar el Campo NOMBRE vacio")
			document.form1.nombre.focus()
			return false;
		}
		}

/*
function validarForm(letra){
 	if(!/([a-z])/.test(letra)  ){
	alert("Solo se Permiten letras en la INSTITUCIÓN")
	return false;
	}

}
/*
FUNCTIONvalidar_letra(letra){
if (!/([a-z])/.test(letra)  )
alert....
return false  
}
onblur= validar_letra(this.vale);
*/
