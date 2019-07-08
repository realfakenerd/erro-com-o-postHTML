'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Views;

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

            _export('Views', Views = function () {
                function Views(elemento) {
                    _classCallCheck(this, Views);

                    this._elemento = elemento;
                }

                _createClass(Views, [{
                    key: 'template',
                    value: function template() {
                        throw new Error('O método template deve ser implementado!');
                    }
                }, {
                    key: 'update',
                    value: function update(model) {
                        this._elemento.innerHTML = this.template(model);
                    }
                }]);

                return Views;
            }());

            _export('Views', Views);
        }
    };
});
//# sourceMappingURL=Views.js.map