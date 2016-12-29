"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var firebase = require('nativescript-plugin-firebase');
var CreateUserComponent = (function () {
    function CreateUserComponent(routerExt) {
        this.routerExt = routerExt;
    }
    CreateUserComponent.prototype.create = function () {
        var _this = this;
        firebase.createUser({
            email: this.email,
            password: this.password
        }).then(function (result) {
            _this.routerExt.navigate(["/chatListado"], {
                transition: {
                    name: "flip",
                    duration: 500,
                    curve: "linear"
                }
            });
        }, function (errorMessage) {
            alert('error: ' + errorMessage);
        });
    };
    CreateUserComponent = __decorate([
        core_1.Component({
            selector: 'create-user',
            template: "\n                <StackLayout>\n                    <Label class=\"titulo\" text=\"Create User\"></Label>\n                    <TextField hint=\"Email\" keyboardType=\"text\" [(ngModel)]=\"email\"\n                        autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n                    <TextField hint=\"Password\" secure=\"true\" [(ngModel)]=\"password\"\n                        autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n                    <Button class=\"submit-botton\" (tap)=\"create()\" text=\"Crear usuario\"></Button>\n                </StackLayout>\n        ",
            styleUrls: ['login/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions])
    ], CreateUserComponent);
    return CreateUserComponent;
}());
exports.CreateUserComponent = CreateUserComponent;
//# sourceMappingURL=create.user.component.js.map