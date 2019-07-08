import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagens } from '../models/Mensagens';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagensView } from '../views/MensagensView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';
import { Negociacao } from '../models/Negociacao';

class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._ordemAtual = '';
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );

        this._mensagem = new Bind(
            new Mensagens(),
            new MensagensView($("#mensagemView")),
            'texto'
        );

        this._service = new NegociacaoService();

        this._init();
    }
    _init() {
        this._service
            .listService()
            .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(err => this._mensagem.texto = err);

        setInterval(() => {
            this.importaNegociacoes();
        }, 5000);
    }
    adiciona(event) {
        event.preventDefault();
        let negociacao = this._criaNegociacao();

        this._service
            .cadastraService(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaForm();
            })
            .catch(err => this._mensagem.texto = err);
    }
    importaNegociacoes() {
        this._service
            .importService(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao)
                this._mensagem.texto = 'Negociação importada com sucesso!'
            }))
            .catch(err => this._mensagem.texto = err)

    }
    remove() {

        this._service
            .delService()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
    }
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value),
        );
    }
    _limpaForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
    ordena(col) {
        if (this._ordemAtual == col) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[col] - b[col]);
        }
        this._ordemAtual = col;
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
    return negociacaoController;
}