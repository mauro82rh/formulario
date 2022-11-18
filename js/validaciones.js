export function valida(input) {
  const tipoDeInpunt = input.dataset.tipo;
  if (validadores[tipoDeInpunt]) {
    validadores[tipoDeInpunt](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInpunt, input);
  }
}

const tiposDeError = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajeDeError = {
  nombre: {
    valueMissing: "Este campo no puede estar vacio",
  },
  email: {
    valueMissing: "Este campo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch:
      "6 caracteres minimo 12 caracteres maximo, una letra minuscula, una letra mayuscula, un numero no puede contener caracteres especiales",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes tener almenos 18 años de edad",
  },
  numero: {
    valueMissing: " Este campo no puede estar vacio",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros",
  },
  direccion: {
    valueMissing: " Este campo no puede estar vacio",
    patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: " Este campo no puede estar vacio",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
  },
  estado: {
    valueMissing: " Este campo no puede estar vacio",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInpunt, input) {
  let mensaje = "";
  tiposDeError.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInpunt, error);
      console.log(input.validity[error]);
      console.log(mensajeDeError[tipoDeInpunt][error]);
      mensaje = mensajeDeError[tipoDeInpunt][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener almenos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();

  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
