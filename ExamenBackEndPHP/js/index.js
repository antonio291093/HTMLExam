/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

var minimo;
var maximo;
var valorTipo;
var valorCiudad;
var ciudad;
var tipo;
var todos;
/*
  Función para llenar los Selects al cargar la pagina.
*/
function cargarSelects(){
  var ciudades = new Array();
  var tipo = new Array();

  $.ajax({
    url : 'data-1.json',
    type : 'GET',
    data : {},
    beforeSend: function(){},
    success: function(data){

      data.forEach(function(val, i){
        if (!ciudades.includes(val.Ciudad)) {
          ciudades.push(val.Ciudad);
        }

        if (!tipo.includes(val.Tipo)) {
          tipo.push(val.Tipo);
        }
      })

      ciudades.forEach(function(val,i){
        $("#selectCiudad").append(`<option value = `+ (i + 1) + `>` + val);
      });

      tipo.forEach(function(val,i){
        $("#selectTipo").append(`<option value = `+ (i + 1) + `>` + val);
      });

    }
  })
}

function mostrarResultados(precioMinimo, precioMaximo){
  var precio;
  $.ajax({
    url : 'data-1.json',
    type : 'GET',
    data : {},
    beforeSend: function(){},
    success: function(data){

      data.forEach(function(val, i){
        precio = val.Precio.slice(1);
        precio = precio.replace(",","");
        precio = parseFloat(precio);
        if (todos == 1) {
          $( ".tituloContenido" ).after( '<div class="imagen" style="width:30%; padding:10px 10px 10px 10px;" style="display:flex;direction:row;"> '+
                                  '<img src="img/home.jpg" style="width:100%;"> '+
                                '</div>' +
                                '<div class="datos" style="width:70%; padding:10px 10px 10px 10px;">'+
                                  '<span> <strong>Direccion: </strong> '+val.Direccion+'</span><br>'+
                                  '<span> <strong>Ciudad: </strong> '+val.Ciudad+'</span><br>'+
                                  '<span> <strong>Teléfono: </strong> '+val.Telefono+'</span><br>'+
                                  '<span> <strong>Código Postal: </strong> '+val.Codigo_Postal+'</span><br>'+
                                  '<span> <strong>Tipo: </strong> '+val.Tipo+'</span><br>'+
                                  '<span> <strong>Precio: </strong> '+val.Precio+'</span><br>'+
                                '</div>');
        }else {
        if (precio >= minimo && precio <= maximo) {
          if (valorCiudad != -1 && valorTipo == -1) {
            if (ciudad == val.Ciudad) {
                $( ".tituloContenido" ).after( '<div class="imagen" style="width:30%; padding:10px 10px 10px 10px;" style="display:flex;direction:row;"> '+
                                        '<img src="img/home.jpg" style="width:100%;"> '+
                                      '</div>' +
                                      '<div class="datos" style="width:70%; padding:10px 10px 10px 10px;">'+
                                        '<span> <strong>Direccion: </strong> '+val.Direccion+'</span><br>'+
                                        '<span> <strong>Ciudad: </strong> '+val.Ciudad+'</span><br>'+
                                        '<span> <strong>Teléfono: </strong> '+val.Telefono+'</span><br>'+
                                        '<span> <strong>Código Postal: </strong> '+val.Codigo_Postal+'</span><br>'+
                                        '<span> <strong>Tipo: </strong> '+val.Tipo+'</span><br>'+
                                        '<span> <strong>Precio: </strong> '+val.Precio+'</span><br>'+
                                      '</div>');
            }
          }else if (valorCiudad == -1 && valorTipo != -1) {
            if (tipo == val.Tipo) {
              $( ".tituloContenido" ).after( '<div class="imagen" style="width:30%; padding:10px 10px 10px 10px;" style="display:flex;direction:row;"> '+
                                      '<img src="img/home.jpg" style="width:100%;"> '+
                                    '</div>' +
                                    '<div class="datos" style="width:70%; padding:10px 10px 10px 10px;">'+
                                      '<span> <strong>Direccion: </strong> '+val.Direccion+'</span><br>'+
                                      '<span> <strong>Ciudad: </strong> '+val.Ciudad+'</span><br>'+
                                      '<span> <strong>Teléfono: </strong> '+val.Telefono+'</span><br>'+
                                      '<span> <strong>Código Postal: </strong> '+val.Codigo_Postal+'</span><br>'+
                                      '<span> <strong>Tipo: </strong> '+val.Tipo+'</span><br>'+
                                      '<span> <strong>Precio: </strong> '+val.Precio+'</span><br>'+
                                    '</div>');
            }
          }else if (valorCiudad != -1 && valorTipo != -1) {
            if (tipo == val.Tipo && ciudad == val.Ciudad) {
              $( ".tituloContenido" ).after( '<div class="imagen" style="width:30%; padding:10px 10px 10px 10px;" style="display:flex;direction:row;"> '+
                                      '<img src="img/home.jpg" style="width:100%;"> '+
                                    '</div>' +
                                    '<div class="datos" style="width:70%; padding:10px 10px 10px 10px;">'+
                                      '<span> <strong>Direccion: </strong> '+val.Direccion+'</span><br>'+
                                      '<span> <strong>Ciudad: </strong> '+val.Ciudad+'</span><br>'+
                                      '<span> <strong>Teléfono: </strong> '+val.Telefono+'</span><br>'+
                                      '<span> <strong>Código Postal: </strong> '+val.Codigo_Postal+'</span><br>'+
                                      '<span> <strong>Tipo: </strong> '+val.Tipo+'</span><br>'+
                                      '<span> <strong>Precio: </strong> '+val.Precio+'</span><br>'+
                                    '</div>');
            }
          }else {
            $( ".tituloContenido" ).after( '<div class="imagen" style="width:30%; padding:10px 10px 10px 10px;" style="display:flex;direction:row;"> '+
                                    '<img src="img/home.jpg" style="width:100%;"> '+
                                  '</div>' +
                                  '<div class="datos" style="width:70%; padding:10px 10px 10px 10px;">'+
                                    '<span> <strong>Direccion: </strong> '+val.Direccion+'</span><br>'+
                                    '<span> <strong>Ciudad: </strong> '+val.Ciudad+'</span><br>'+
                                    '<span> <strong>Teléfono: </strong> '+val.Telefono+'</span><br>'+
                                    '<span> <strong>Código Postal: </strong> '+val.Codigo_Postal+'</span><br>'+
                                    '<span> <strong>Tipo: </strong> '+val.Tipo+'</span><br>'+
                                    '<span> <strong>Precio: </strong> '+val.Precio+'</span><br>'+
                                  '</div>');
          }
        }
      }
      })
    }
  })
}

$( "#submitButton" ).click(function(e) {
  e.preventDefault;
  todos = 0;
  $( ".tarjeta" ).show();
  $( ".imagen" ).remove();
  $( ".datos" ).remove();
  minimo = $('#rangoPrecio').data().from;
  maximo = $('#rangoPrecio').data().to;
  ciudad = $( "#selectCiudad option:selected" ).text();
  valorCiudad = $( "#selectCiudad" ).val();
  tipo = $( "#selectTipo option:selected" ).text();
  valorTipo = $( "#selectTipo" ).val();

  if (valorCiudad == -1 && valorTipo == -1 && todos == 0) {
    mostrarResultados(minimo, maximo);
  }else if (valorCiudad != -1 && valorTipo == -1 && todos == 0) {
    mostrarResultados(minimo, maximo);
  }else if (valorCiudad == -1 && valorTipo != -1 && todos == 0) {
    mostrarResultados(minimo, maximo);
  }else if (valorCiudad != -1 && valorTipo != -1 && todos == 0) {
    mostrarResultados(minimo, maximo);
  }else {
    mostrarResultados(minimo, maximo)
  }

});

$( "#mostrarTodos" ).click(function(e) {
  e.preventDefault;
  todos = 1;
  $( ".tarjeta" ).show();
  $( ".imagen" ).remove();
  $( ".datos" ).remove();
  minimo = $('#rangoPrecio').data().from;
  maximo = $('#rangoPrecio').data().to;
  mostrarResultados(minimo, maximo);
});

inicializarSlider();
playVideoOnScroll();
cargarSelects();
