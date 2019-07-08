import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDAO } from '../dao/NegociacaoDAO';
import { Negociacao } from '../models/Negociacao';
export class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }
    getNegociacaoSemana() {
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana!');
            });
    }
    getNegociacaoSemanaPassada() {
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana passada!');
            });
    }
    getNegociacaoSemanaRetrasada() {
        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana retrasada!');
            });
    }
    getNegociacao() {
        return Promise.all([
            this.getNegociacaoSemana(),
            this.getNegociacaoSemanaPassada(),
            this.getNegociacaoSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        }).catch(err => {
            throw new Error(err)
        })
    }
    cadastraService(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDAO(conexao).adiciona(negociacao))
            .then(() => console.log('Negociação cadastrada com sucesso'))
            .catch(err => {
                console.log(err);
                throw new Error("Não foi possível adicionar a negociação")
            });
    }
    listService() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection).listAll())
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações')
            });
    }
    delService() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection).delAll())
            .then(() => 'Negociações apagadas com sucesso!')
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível apagar as negociações')
            });
    }
    importService(listaAtual) {
        return this.getNegociacao()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente))))
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível importar as negociações');
            });
    }
}
