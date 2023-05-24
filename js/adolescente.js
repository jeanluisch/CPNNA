


function validarForm() 
		{	
		
			
			var nombre = document.getElementById("nombre").value;
			var apellido = document.getElementById("apellido").value;
			var fnacimiento = document.getElementById("fnacimiento").value;
			var n_pnac = document.getElementById("n_pnac").value;
			var lugar_nac = document.getElementById("lugar_nac").value;
			var direccion = document.getElementById("direccion").value;
			
			if(! /^[a-zA-Z\s]*$/.test(nombre)  ){
			alert("Solo se Permiten letras en nombre")
			document.form1.nombre.focus()
			return false;
			}
			else if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) ){
			alert("No puede dejar el Campo NOMBRE vacio")
			document.form1.nombre.focus()
			return false;
			}
			
			if(! /^[a-zA-Z\s]*$/.test(apellido)  ){
			alert("Solo se Permiten letras en APELLIDO")
			document.form1.apellido.focus()
			return false;
			}
			if( apellido == null || apellido.length == 0 || /^\s+$/.test(apellido) ){
			alert("No puede dejar el Campo APELLIDO vacio")
			document.form1.apellido.focus()
			return false;
			}
			
			if( fnacimiento == null || fnacimiento.length == 0 || /^\s+$/.test(fnacimiento) ){
			alert("No puede dejar el Campo Fecha Nacimiento vacio")
			document.form1.fnacimiento.focus()
			return false;
			}
			if (n_pnac!=parseInt(n_pnac)) {
			alert('Debe escribir solo numeros');
			document.form1.n_pnac.focus()
			return false;
			}

			if(! /^[a-zA-Z\s]*$/.test(lugar_nac)  ){
			alert("Solo se Permiten letras en LUGAR NACIMIENTO")
			document.form1.lugar_nac.focus()
			return false;
			}
			if( lugar_nac == null || lugar_nac.length == 0 || /^\s+$/.test(lugar_nac) ){
			alert("No puede dejar el Campo NACIMIENTO vacio")
			document.form1.lugar_nac.focus()
			return false;
			}

			if( direccion == null || direccion.length == 0 || /^\s+$/.test(direccion) ){
			alert("No puede dejar el Campo DIRECCION vacio")
			document.form1.direccion.focus()
			return false;
			}
			
		}
