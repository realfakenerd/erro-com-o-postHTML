'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController, $;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }],
    execute: function () {
      negociacaoController = currentInstance();
      $ = document.querySelector.bind(document);


      $('#formulario').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      $('#btnRemove').onclick = negociacaoController.remove.bind(negociacaoController);
      $('#btnImport').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map