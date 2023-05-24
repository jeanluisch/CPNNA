
function validarForm() 
		{	
			
			var grado = document.getElementById("grado").value;
			var seccion = document.getElementById("seccion").value;
			var horario = document.getElementById("horario").value;
			var otros = document.getElementById("otros").value;
			var id_inst = document.getElementById("id_inst").selectedIndex;
			
			if( grado == null || grado.length == 0 || /^\s+$/.test(grado) ){
					alert("No puede dejar el Campo GRADO vacio")
					document.form1.grado.focus()
					return false;
				}

				if(! /^[a-zA-Z\s]*$/.test(seccion)  ){
				alert("Solo se Permiten letras en SECCIÓN")
				document.form1.seccion.focus()
				return false;
				}
				if( seccion == null || seccion.length == 0 || /^\s+$/.test(seccion) ){
					alert("No puede dejar el Campo SECCIÓN vacio")
					document.form1.seccion.focus()
					return false;
				}
				
				if( horario == null || horario.length == 0 || /^\s+$/.test(horario) ){
					alert("No puede dejar el Campo HORARIO vacio")
					document.form1.horario.focus()
					return false;
				}
				
			
				if( id_inst == null || id_inst == 0 ) {
				alert("Seleccione una INSTITUCIÓN")
				document.form1.cirm.focus()
				return false;
				}
				
					
			}
