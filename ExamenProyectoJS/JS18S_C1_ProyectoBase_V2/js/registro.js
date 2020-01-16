// Hemos omitido los acentos en los comentarios por compatibilidad

function validar(formulario) {
  var validarCampos = 0;
  if (formulario.nombres.value.trim().length == 0) {
    $("#errornombres").html('Este campo es obligatorio.');
    validarCampos++;
  }else {
    $("#errornombres").html('');
  }

  if (formulario.contrasena.value.trim().length < 7) {
    $("#errorContrasena").html('Debe tener al menos 7 caracteres.');
    validarCampos++;
  }else {
    $("#errorContrasena").html('');
  }

  var password = formulario.confirmacion.value;
  var confirmacion = formulario.contrasena.value;
  password.trim();
  confirmacion.trim();
  if ( password != confirmacion ) {
    $("#errorConfirmacion").html('No coincide con contraseña.');
    validarCampos++;
  }else {
    $("#errorConfirmacion").html('');
  }

  if (formulario.tipo.value == -1) {
    $("#errorTipo").html('Este campo es obligatorio.');
    validarCampos++;
  }else {
    $("#errorTipo").html('');
  }

  if (formulario.acepto.checked == false) {
    $("#errorAcepto").html('Este campo es obligatorio.');
    validarCampos++;
  }else {
    $("#errorAcepto").html('');
  }
  //Expresion regular del correo
  var expresionEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  if (formulario.email.value.match(expresionEmail)) {
    $("#errorEmail").html('');
  }else {
    $("#errorEmail").html('Campo Invalido.');
    validarCampos++;
  }

  if (validarCampos>0) {
    return false;
  }
  return true;

}
