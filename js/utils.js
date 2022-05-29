function setLocalStorage(llave, valor) {
	localStorage.setItem(llave, valor);
};

function getLocalStorage(llave) {
	return localStorage.getItem(llave);
};

function mostrarTabla() {
	setLocalStorage("view", "tabla");
	document.getElementById("contenedor-table").style.display = "grid";
	document.getElementById("contenedor-form").style.display = "none";
}

function mostrarFormulario() {
	setLocalStorage("view", "formulario");
	document.getElementById("contenedor-table").style.display = "none";
	document.getElementById("contenedor-form").style.display = "grid";
}

async function mostrarMensaje(titulo, mensaje, icono = "info", verBtnConfirmar = false, verBtnDenegar = false) {
	
	const resultado = await Swal.fire({
		icon: icono,
		title: titulo,
		text: mensaje,
		showConfirmButton: verBtnConfirmar,
		showDenyButton: verBtnDenegar,
		confirmButtonText: "Confirmar",
		denyButtonText: "Cancelar",
	});

	if((verBtnConfirmar || verBtnDenegar)) {
		if(resultado.isConfirmed){
			return "confirmado";
		} else {
			return "denegado";
		}
	}
}