import { currentInstance } from './controllers/NegociacaoController';

let negociacaoController = currentInstance();
let $ = document.querySelector.bind(document);

$('#formulario').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
$('#btnRemove').onclick = negociacaoController.remove.bind(negociacaoController);
$('#btnImport').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);