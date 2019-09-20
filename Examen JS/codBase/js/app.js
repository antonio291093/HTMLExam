var Calculadora = (function(){

  var botones = document.getElementsByClassName("tecla");
  var operacionAritmetica;
  var numero1;
  var numero2;
  var resultado;

    for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("mousedown", function () {

      botones[i].style.transform = "scale(.95, .95)";

      var display = document.getElementById('display');
      var validacionContenido = display.innerHTML;
      var contenidoDOM = botones[i].id;

      if (contenidoDOM == 'on') {
        display.innerHTML = "0";
      }

      if (contenidoDOM == 'punto') {
        if (validacionContenido.includes(".")) {
          display.innerHTML = display.innerHTML;
        } else {
          display.innerHTML = display.innerHTML + ".";
        }
      }

      if (contenidoDOM == 'sign') {
        if (display.innerHTML == "0") {
          Sumar();
        }else {
          if (validacionContenido.includes("-")) {
            display.innerHTML = validacionContenido.replace("-","");
          }else {
            display.innerHTML = "-" + display.innerHTML;
          }
        }
      }

      if (validacionContenido.length <= 7) {
        if (!isNaN(contenidoDOM)) {
          var inicioDisplay = validacionContenido.substring(0,2);
          if (inicioDisplay == "0.") {
              display.innerHTML = display.innerHTML + botones[i].id;
          }else {
            if (inicioDisplay == "0") {
              display.innerHTML = botones[i].id;
            }else {
              display.innerHTML = display.innerHTML + botones[i].id;
            }
          }
        }
      }

      if (contenidoDOM == 'mas') {
        operacionAritmetica = 1;
        numero1 = Number(display.innerHTML);
        display.innerHTML = "";
      }

      if (contenidoDOM == 'menos') {
        operacionAritmetica = 2;
        numero1 = Number(display.innerHTML);
        display.innerHTML = "";
      }

      if (contenidoDOM == 'por') {
        operacionAritmetica = 3;
        numero1 = Number(display.innerHTML);
        display.innerHTML = "";
      }

      if (contenidoDOM == 'dividido') {
        operacionAritmetica = 4;
        numero1 = Number(display.innerHTML);
        display.innerHTML = "";
      }

      if (contenidoDOM == 'igual') {
        numero2 = Number(display.innerHTML);
        switch (operacionAritmetica) {
          case 1:
            resultado = Sumar(numero1,numero2);
            display.innerHTML = resultado;
            break;
          case 2:
            resultado = Restar(numero1,numero2);
            display.innerHTML = resultado;
            break;
          case 3:
            resultado = Multiplicar(numero1,numero2);
            display.innerHTML = resultado;
            break;
          case 4:
            resultado = Dividir(numero1,numero2);
            resultado = resultado.toFixed(6);
            display.innerHTML = resultado;
          default:
            //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;
        }
      }

    });
    botones[i].addEventListener("mouseup", function () {
      botones[i].setAttribute("style", "transform:scale(1, 1)");
    });
  };

  function Sumar(numero1, numero2) {
    return numero1 + numero2;
  }

  function Restar(numero1, numero2) {
    return numero1 - numero2;
  }

  function Multiplicar(numero1, numero2) {
    return numero1 * numero2;
  }

  function Dividir(numero1, numero2) {
    return numero1 / numero2;
  }

  return{
    resultado : function(){
        Sumar();
        Restar();
        Multiplicar();
        Dividir();
    }

  }

})();
