// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
var fechaAct, fechaEve;
var eventosPasados = new Array();

$(document).ready(function () {
  $.ajax({
    url : 'info.json'
  }).done(function(respuesta){
    //Guarda el resultado en variables
    respuesta.eventos.forEach((item, i) => {
      fechaAct = new Date(respuesta.fechaActual);
      fechaEve = new Date(item.fecha);
    //Clasifica los eventos segun la fecha actual del JSON
      if (fechaAct > fechaEve) {
        eventosPasados.push(item);
      }
    });

    function OrdenamientoPasados(a, b) {
      var dateA = new Date(a.fecha).getTime();
      var dateB = new Date(b.fecha).getTime();
      return dateA < dateB ? 1 : -1;
    };
    
    eventosPasados.sort(OrdenamientoPasados);
    //Ciclo para mostrar eventos
    eventosPasados.forEach((item,i) =>{
      //Extrae solo dos eventos
      //Modifica el DOM agregando el html generado
      $("#pasados").append(
        //Crea un string que contenga el HTML que describe el detalle del evento
        '<div class="col-xl-12 mb-4" style="background-color:#FFFFFF;border-radius:10px 10px 10px 10px;">' +
        '<h2 style="color:#0288d1;"><a href="detalle.html?id='+item.id+'">' + item.nombre + '</a></h2>' +
        '<p style="color:#9e9e9e;">' + item.fecha + ' - ' + item.lugar + '</p>'+
        '<p style="font-family:cursive;">' + item.descripcion + '</p>' +
        '<p style="color:#03a9f4;">Invitados: ' + item.invitados + '<p>' +
        '</div>'
      );
    });

  })
});
