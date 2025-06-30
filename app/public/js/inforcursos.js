document.addEventListener('DOMContentLoaded', function() {
  var modulos = document.querySelectorAll('.modulo');

  modulos.forEach(function(modulo) {
    modulo.addEventListener('click', function() {
      var aulas = this.querySelector('.aulas');
      toggleDisplay(aulas);

      // Esconder as aulas de outros módulos
      var outrosModulos = document.querySelectorAll('.modulo');
      outrosModulos.forEach(function(outroModulo) {
        if (outroModulo !== modulo) {
          var outrasAulas = outroModulo.querySelector('.aulas');
          outrasAulas.style.display = 'none';
        }
      });
    });
  });
});

function toggleDisplay(element) {
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}
