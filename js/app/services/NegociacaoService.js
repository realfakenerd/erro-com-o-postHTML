'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDAO', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDAO, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDAO) {
            NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'getNegociacaoSemana',
                    value: function getNegociacaoSemana() {
                        return this._http.get('negociacoes/semana').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível obter as negociações da semana!');
                        });
                    }
                }, {
                    key: 'getNegociacaoSemanaPassada',
                    value: function getNegociacaoSemanaPassada() {
                        return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível obter as negociações da semana passada!');
                        });
                    }
                }, {
                    key: 'getNegociacaoSemanaRetrasada',
                    value: function getNegociacaoSemanaRetrasada() {
                        return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível obter as negociações da semana retrasada!');
                        });
                    }
                }, {
                    key: 'getNegociacao',
                    value: function getNegociacao() {
                        return Promise.all([this.getNegociacaoSemana(), this.getNegociacaoSemanaPassada(), this.getNegociacaoSemanaRetrasada()]).then(function (periodos) {
                            var negociacoes = periodos.reduce(function (dados, periodo) {
                                return dados.concat(periodo);
                            }, []);
                            return negociacoes;
                        }).catch(function (err) {
                            throw new Error(err);
                        });
                    }
                }, {
                    key: 'cadastraService',
                    value: function cadastraService(negociacao) {
                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDAO(conexao).adiciona(negociacao);
                        }).then(function () {
                            return console.log('Negociação cadastrada com sucesso');
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error("Não foi possível adicionar a negociação");
                        });
                    }
                }, {
                    key: 'listService',
                    value: function listService() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection).listAll();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível obter as negociações');
                        });
                    }
                }, {
                    key: 'delService',
                    value: function delService() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection).delAll();
                        }).then(function () {
                            return 'Negociações apagadas com sucesso!';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível apagar as negociações');
                        });
                    }
                }, {
                    key: 'importService',
                    value: function importService(listaAtual) {
                        return this.getNegociacao().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return negociacao.isEquals(negociacaoExistente);
                                });
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('Não foi possível importar as negociações');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map