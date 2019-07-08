import { Views } from './Views';
import { DateHelper } from '../helpers/DateHelper';
import { currentInstance } from '../controllers/NegociacaoController';

export class NegociacoesView extends Views {
    constructor(elemento) {
        super(elemento)
        elemento.addEventListener('click', function (event) {
            if (event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());
        })
    }
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead class="thead-light">
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            <tbody>
                ${model.negociacoes.map(n => `
                    <tr>
                        <td>${DateHelper.formataData(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <td colspan='3'></td>
                <td>
                    ${model.volumeTotal}
                </td>
            </tfoot>
        </table>
        `;
    }
}