'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Mensagens;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export('Mensagens', Mensagens = function () {
                function Mensagens(texto) {
                    _classCallCheck(this, Mensagens);

                    this._texto = texto || '';
                }

                _createClass(Mensagens, [{
                    key: 'texto',
                    get: function get() {
                        return this._texto;
                    },
                    set: function set(texto) {
                        this._texto = texto;
                    }
                }]);

                return Mensagens;
            }());

            _export('Mensagens', Mensagens);
        }
    };
});
//# sourceMappingURL=Mensagens.js.map