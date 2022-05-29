let view = getLocalStorage("view");

if (!view) {
	setLocalStorage("view", "formulario");
}

if (view == "formulario") {
	mostrarFormulario();
} else {
	mostrarTabla();
}

if (!getLocalStorage("arrayProyectos")) {
	setLocalStorage("arrayProyectos", JSON.stringify([]));
}

let proyecto = {
	codigo: "",
	nombre: "",
	descripcion: "",
	fecha: "",
	tipo: ""
};

let arrayProyectos = JSON.parse(getLocalStorage("arrayProyectos"));

const inputCodigo = document.getElementById("campoCodigo");
const errorInputCodigo = document.getElementById("invalidoCampoCodigo");

const inputNombre = document.getElementById("campoNombre");
const errorInputNombre = document.getElementById("invalidoCampoNombre");

const inputDescripcion = document.getElementById("campoDescripcion");
const errorInputDescripcion = document.getElementById("invalidoCampoDescripcion");

const inputFecha = document.getElementById("campoFecha");
const errorInputFecha = document.getElementById("invalidoCampoFecha");

const inputSeleccion = document.getElementById("campoSeleccion");
const errorInputSeleccion = document.getElementById("invalidoCampoSeleccion");

const inputBuscador = document.getElementById("campoBuscar");

function setProyecto(proyectoAsignar) {
	proyecto = proyectoAsignar;
}

function limpiarProyecto() {
	proyecto.codigo = "";
	proyecto.nombre = "";
	proyecto.descripcion = "";
	proyecto.fecha = "";
	proyecto.tipo = "";
}

function llenarFormularioProyecto() {
	inputCodigo.value = proyecto.codigo;
	inputNombre.value = proyecto.nombre;
	inputDescripcion.value = proyecto.descripcion;
	inputFecha.value = proyecto.fecha;
	inputSeleccion.value = proyecto.tipo;
}

function validarCodigo() {

	let mensajeError = "";

	if (proyecto.codigo.length > 0) {
		if (/^[0-9]{3,15}$/.test(proyecto.codigo)) {

			let mismo_proyecto = arrayProyectos.find(function (proyectoEnArray) {
				return proyectoEnArray.codigo == proyecto.codigo;
			});

			if (mismo_proyecto && mismo_proyecto != proyecto) {
				mensajeError = "Ya existe un proyecto con el mismo código.";
			}

		} else {
			mensajeError = "El codigo debe contener entre 3 y 15 caracteres numericos.";
		}
	} else {
		mensajeError = "";
	}

	if (mensajeError != "") {
		errorInputCodigo.style.display = "block";
		errorInputCodigo.innerText = mensajeError;
		return false;
	} else {
		errorInputCodigo.style.display = "none";
		errorInputCodigo.innerText = "";
		return true;
	}
}

function validarNombre() {

	let mensajeError = "";

	if (proyecto.nombre.length > 0 && !/^[a-zA-Z0-9\s]{10,50}$/.test(proyecto.nombre)) {
		mensajeError = "El nombre debe contener entre 10 y 50 caracteres de texto.";
	}

	if (mensajeError != "") {
		errorInputNombre.style.display = "block";
		errorInputNombre.innerText = mensajeError;
		return false;
	} else {
		errorInputNombre.style.display = "none";
		errorInputNombre.innerText = "";
		return true;
	}
}

function validarDescripcion() {

	let mensajeError = "";

	if (proyecto.descripcion.length > 0 && !/^[a-zA-Z0-9\s]{20,300}$/.test(proyecto.descripcion)) {
		mensajeError = "La descripcion debe contener entre 20 y 300 caracteres de texto.";
	}

	if (mensajeError != "") {
		errorInputDescripcion.style.display = "block";
		errorInputDescripcion.innerText = mensajeError;
		return false;
	} else {
		errorInputDescripcion.style.display = "none";
		errorInputDescripcion.innerText = "";
		return true;
	}
}

function validarFecha() {

	let mensajeError = "";

	if (proyecto.fecha.length > 0 && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(proyecto.fecha)) {
		mensajeError = "La fecha debe tener el formato YYYY-MM-DD.";
	}

	if (mensajeError != "") {
		errorInputFecha.style.display = "block";
		errorInputFecha.innerText = mensajeError;
		return false;
	} else {
		errorInputFecha.style.display = "none";
		errorInputFecha.innerText = "";
		return true;
	}
}

function validarTipo() {

	let mensajeError = "";

	if (proyecto.tipo.length > 0 && proyecto.tipo != "Investigacion" && proyecto.tipo != "Extension") {
		mensajeError = "El tipo debe ser Investigacion o Extension.";
	}

	if (mensajeError != "") {
		errorInputSeleccion.style.display = "block";
		errorInputSeleccion.innerText = mensajeError;
		return false;
	} else {
		errorInputSeleccion.style.display = "none";
		errorInputSeleccion.innerText = "";
		return true;
	}
}

function validarProyecto() {

	let validacion = true;

	for (const campo in proyecto) {
		if (proyecto[campo] == "") {
			validacion = false;
			break;
		}
	}

	return validacion;
}

function listarProyectos(array) {
	const body_tablas = document.getElementById("listadoProyectos");
	body_tablas.innerHTML = "";

	let html = "";

	array.forEach(pro => {
		html += `
			<tr>
				<th scope="row">${pro.codigo}</th>
				<td>${pro.nombre}</td>
				<td>${pro.descripcion}</td>
				<td>${pro.fecha}</td>
				<td>${pro.tipo}</td>
				<td>
					<div class="form-check">
						<button type="button" onclick="editarProyecto(${pro.codigo})" class="btn btn-success btn-sm">Editar</button>
						<button type="button" onclick="eliminarProyecto(${pro.codigo})" class="btn btn-danger btn-sm">Eliminar</button>
					</div>
				</td>
			</tr>
		`;
	});

	body_tablas.innerHTML = html;
}

listarProyectos(arrayProyectos);

inputCodigo.addEventListener("change", (event) => {
	proyecto.codigo = event.target.value;
	validarCodigo();
});

inputCodigo.addEventListener("keyup", (event) => {
	proyecto.codigo = event.target.value;
	validarCodigo();
});

inputNombre.addEventListener("keyup", (event) => {
	proyecto.nombre = event.target.value;
	validarNombre();
});

inputDescripcion.addEventListener("keyup", (event) => {
	proyecto.descripcion = event.target.value;
	validarDescripcion();
});

inputFecha.addEventListener("change", (event) => {
	proyecto.fecha = event.target.value;
	validarFecha();
});

inputSeleccion.addEventListener("change", (event) => {
	proyecto.tipo = event.target.value;
	validarTipo();
});

inputBuscador.addEventListener("keyup", (event) => {
	let busqueda = event.target.value;
	if (busqueda.length > 0) {
		buscarEnTabla(busqueda);
	} else {
		listarProyectos(arrayProyectos);
	}
});

document.getElementById("formularioRegistro").addEventListener("submit", (event) => {

	event.preventDefault();

	if (
		validarCodigo() &&
		validarNombre() &&
		validarDescripcion() &&
		validarFecha() &&
		validarTipo()
	) {
		if (validarProyecto()) {

			let indexProyecto = arrayProyectos.findIndex(function (proyectoEnArray) {
				return proyectoEnArray.codigo == proyecto.codigo;
			});

			let titulo = "Registro de Proyectos";
			let mensaje = `El proyecto ${proyecto.codigo} se ha registrado correctamente.`;

			if (indexProyecto >= 0) {
				arrayProyectos[indexProyecto] = proyecto;

				titulo = "Actualizacion de Proyectos";
				mensaje = `El proyecto ${proyecto.codigo} se ha actualizado correctamente.`;
			} else {
				arrayProyectos.push(proyecto);
			}

			setLocalStorage("arrayProyectos", JSON.stringify(arrayProyectos));

			arrayProyectos = JSON.parse(getLocalStorage("arrayProyectos"));

			limpiarProyecto();
			llenarFormularioProyecto();

			listarProyectos(arrayProyectos);
			mostrarMensaje(titulo, mensaje, "success");

			mostrarTabla();
		} else {
			mostrarMensaje("", "Algun campo o todos estan vacios", "error");
		}
	} else {
		mostrarMensaje("", "El formulario contiene errores", "error");
	}
});

function editarProyecto(codigo) {
	let proyectoBuscado = arrayProyectos.find(proyecto => proyecto.codigo == codigo);
	setProyecto(proyectoBuscado);
	llenarFormularioProyecto();
	mostrarFormulario();
}

function eliminarProyecto(codigo) {
	mostrarMensaje("Elimincacion de Proyectos", `¿Esta seguro de eliminar el proyecto ${codigo}?`, "warning", true, true)
		.then(respuesta => {
			if (respuesta == "confirmado") {
				let indexProyecto = arrayProyectos.findIndex(function (proyectoEnArray) {
					return proyectoEnArray.codigo == codigo;
				});

				arrayProyectos.splice(indexProyecto, 1);

				setLocalStorage("arrayProyectos", JSON.stringify(arrayProyectos));

				arrayProyectos = JSON.parse(getLocalStorage("arrayProyectos"));

				listarProyectos(arrayProyectos);
				mostrarMensaje("Elimincacion de Proyectos", "El proyecto ha sido eliminado con exito.", "success");
			}
		});
}

function buscarEnTabla(busqueda) {

	let proyectos = arrayProyectos.filter(proyecto => {

		let existe = false;

		busqueda = busqueda.toUpperCase().trim();

		let data_comparacion = [
			proyecto.codigo.toUpperCase(),
			proyecto.nombre.toUpperCase()
		];

		for (const comparacion of data_comparacion) {
			if (comparacion.includes(busqueda)) {
				existe = true;
				break;
			}
		}

		return existe;

	});

	listarProyectos(proyectos);
}