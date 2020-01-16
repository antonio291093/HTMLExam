// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
var fechaAct, fechaEve;
var eventosPasados = new Array();
var eventosFuturos = new Array();

$(document).ready(function () {

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  /*El archivo json se encuentra en la carpeta htdocs junto a los demas documentos del proyecto
  por eso solo se referencia el nombre del archivo*/
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
      }else {
        eventosFuturos.push(item);
      }
    });

    function OrdenamientoProximos(a, b) {
      var dateA = new Date(a.fecha).getTime();
      var dateB = new Date(b.fecha).getTime();
      return dateA > dateB ? 1 : -1;
    };

    function OrdenamientoPasados(a, b) {
      var dateA = new Date(a.fecha).getTime();
      var dateB = new Date(b.fecha).getTime();
      return dateA < dateB ? 1 : -1;
    };

    eventosFuturos.sort(OrdenamientoProximos);
    eventosPasados.sort(OrdenamientoPasados);

    //Ciclo para mostrar 2 eventos
    for (var i = 0; i < 2; i++) {
      //Extrae solo dos eventos
      //Modifica el DOM agregando el html generado
      $("#pasados").append(
        //Crea un string que contenga el HTML que describe el detalle del evento
        '<div class="col-xl-5 mr-4" style="background-color:#FFFFFF;border-radius:10px 10px 10px 10px;">' +
        '<h2 style="color:#0288d1;"><a href="detalle.html?id='+eventosPasados[i].id+'">' + eventosPasados[i].nombre + '</a></h2>' +
        '<p style="color:#9e9e9e;">' + eventosPasados[i].fecha + '</p>'+
        '<p style="font-family:cursive;">' + eventosPasados[i].descripcion + '</p>' +
        '</div>'
      );

      //Extrae solo dos eventos
      //Modifica el DOM agregando el html generado
      $("#proximos").append(
        //Crea un string que contenga el HTML que describe el detalle del evento
        '<div class="col-xl-5 mr-4" style="background-color:#FFFFFF;border-radius:10px 10px 10px 10px;">' +
        '<h2 style="color:#0288d1;"><a href="detalle.html?id='+eventosFuturos[i].id+'">' + eventosFuturos[i].nombre + '</a></h2>' +
        '<p style="color:#9e9e9e;">' + eventosFuturos[i].fecha + '</p>'+
        '<span style="font-family:cursive;">' + eventosFuturos[i].descripcion + '</span>' +
        '</div>'
      );
    }

  })
  //Ordena los eventos segun la fecha (los mas cercanos primero)
});
