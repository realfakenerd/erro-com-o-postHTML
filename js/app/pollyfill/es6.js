'use strict';

if (!Array.prototype.includes) {
    console.log('Pollyfill para Array.includes adicionado!');
    Array.prototype.includes = function (elemento) {
        return this.indexOf(elemento) != -1;
    };
}
//# sourceMappingURL=es6.js.map