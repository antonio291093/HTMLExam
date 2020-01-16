// Hemos omitido los acentos en los comentarios por compatibilidad

$(document).ready(function () {

  //Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
  var url = document.URL;
  var id = url.substring(url.lastIndexOf('=') + 1);
  id = parseInt(id,10);
  $.ajax({
    url : 'info.json'
  }).done(function(respuesta){
    //Guarda el resultado en variables
    respuesta.eventos.forEach((item, i) => {
    //Clasifica los eventos segun la fecha actual del JSON
      if (item.id == id) {
        $("#evento").append(
          //Crea un string que contenga el HTML que describe el detalle del evento
          '<div class="col-xl-12 mb-4" style="background-color:#FFFFFF;border-radius:10px 10px 10px 10px;">' +
          '<h2 style="color:#0288d1;"><a href="detalle.html?id='+item.id+'">' + item.nombre + '</a></h2>' +
          '<p style="color:#9e9e9e;">' + item.fecha + '</p>'+
          '<p style="font-family:cursive;">' + item.descripcion + '</p>' +
          '<p style="color:#03a9f4;">Precio: ' + item.precio + '<p>' +
          '<p style="color:#ff9800;">Invitados: ' + item.invitados + '<p>' +
          '</div>'
        );
      }
    });
  })
  //Carga los datos que estan en el JSON (info.json) usando AJAX

  //Guarda el resultado en una variable

  //Busca el elemento en el arreglo

  //Crea un string que contenga el HTML que describe el detalle del evento

  //Modifica el DOM agregando el html generado dentro del div con id=evento

});
