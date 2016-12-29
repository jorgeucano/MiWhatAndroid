"use strict";
var core_1 = require('@angular/core');
var MyService = (function () {
    function MyService() {
        this.miVariableUno = "uno";
    }
    MyService.prototype.getUno = function () {
        return this.miVariableUno;
    };
    MyService.prototype.setUno = function (uno) {
        this.miVariableUno = uno;
    };
    MyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyService);
    return MyService;
}());
exports.MyService = MyService;
//# sourceMappingURL=services.js.map