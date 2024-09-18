"use strict";

let listaNombreGastos = [];
let listaValorGastos = [];
let listaDescripcionGastos = [];

/*Esta funcion se invoca en el momento en el cual el usuario realiza click en el botón*/
function clickBoton() {
  /*Se definen las variables con let, tomadas de los id nombre gasto y valor gasto del formulario */
  let nombreGasto = document.getElementById("nombreGasto").value;
  let valorGasto = document.getElementById("valorGasto").value;
  let descripcionGasto = document.getElementById("textArea").value;

  /*Utiliza le método push para realizar la inserción de los valores en los array*/
  listaNombreGastos.push(nombreGasto);

  listaValorGastos.push(Number(valorGasto));

  listaDescripcionGastos.push(descripcionGasto);

  if (valorGasto.value > 150) {
    alert("El valor del gasto es muy elevado");
  }
  /*Se invoca la funcion de adicionar gastos en el arreglo*/
  actualizarListaGastos();
}

function actualizarListaGastos() {
  const listaElementos = document.getElementById("listaDeGastos");
  const totalElementos = document.getElementById("totalGastos");
  let htmlLista = "";
  let totalGastos = 0;
  listaNombreGastos.forEach((elemento, posicion) => {
    const valorGasto = listaValorGastos[posicion];
    const descripcionGasto = listaDescripcionGastos[posicion];
    htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(
      2
    )} - ${descripcionGasto}
    <button onclick="modificarGasto(${posicion});">Modificar</button>
    <button onclick="eliminarGasto(${posicion});">Eliminar</button>
    </li>`;

    /*Se cálcula el total de los gastos generales*/
    totalGastos += valorGasto;
    console.log(totalGastos);
  });

  listaElementos.innerHTML = htmlLista;
  totalElementos.innerHTML = totalGastos.toFixed(2);
  limpiar();
}

function limpiar() {
  document.getElementById("nombreGasto").value = "";
  document.getElementById("valorGasto").value = "";
  document.getElementById("textArea").value = "";
}

function eliminarGasto(posicion) {
  listaNombreGastos.splice(posicion, 1);
  listaValorGastos.splice(posicion, 1);
  listaDescripcionGastos.splice(posicion, 1);
  actualizarListaGastos();
}

function modificarGasto(posicion) {
  // Cargar los valores actuales en los campos de entrada para que el usuario los edite
  document.getElementById("nombreGasto").value = listaNombreGastos[posicion];
  document.getElementById("valorGasto").value = listaValorGastos[posicion];
  document.getElementById("textArea").value = listaDescripcionGastos[posicion];

  // Cambiar el texto del botón
  const botonFormulario = document.getElementById("botonFormulario");
  botonFormulario.innerText = "Guardar Modificación";

  // Cambiar la función del botón para guardar los cambios
  botonFormulario.onclick = function () {
    // Obtener los nuevos valores
    const nuevoNombre = document.getElementById("nombreGasto").value;
    const nuevoValor = document.getElementById("valorGasto").value;
    const nuevaDescripcion = document.getElementById("textArea").value;

    // Llamar a la función pasando los parámetros correctos
    valoresModificados(posicion, nuevoNombre, nuevoValor, nuevaDescripcion);

    // Restaurar la función original del botón
    botonFormulario.innerText = "Agregar Gasto";
    botonFormulario.onclick = clickBoton; // Asegúrate de que esta función exista
  };
}

// Actualizar los arreglos con los nuevos valores
function valoresModificados(
  posicion,
  nuevoNombre,
  nuevoValor,
  nuevaDescripcion
) {
  listaNombreGastos[posicion] = nuevoNombre;
  listaValorGastos[posicion] = Number(nuevoValor);
  listaDescripcionGastos[posicion] = nuevaDescripcion;

  actualizarListaGastos();
  limpiar();
}
