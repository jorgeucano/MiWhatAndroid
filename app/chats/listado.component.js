"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var firebase = require('nativescript-plugin-firebase');
var services_1 = require('../shared/services');
var ChatListadoComponent = (function () {
    function ChatListadoComponent(routerExt, ngZone, _MyService) {
        var _this = this;
        this.routerExt = routerExt;
        this.ngZone = ngZone;
        this._MyService = _MyService;
        this.mockChat = [];
        firebase.addChildEventListener(function (result) {
            _this.ngZone.run(function () {
                _this.onQueryEvent(result);
            });
        }, "/chats");
    }
    ChatListadoComponent.prototype.newChat = function () {
        firebase.push('/chats', {
            "id": 3,
            "nombre": "nuevo grupo con boton",
            "usuarios": {
                "usuario_1": "jorgeucano",
                "usuario_2": "jorgeucano2"
            },
            "creacion": "12/12/2016",
            "dialogo": []
        }).then(function (result) {
            console.log("created key: " + result.key);
        });
    };
    ChatListadoComponent.prototype.onQueryEvent = function (result) {
        console.log("Event type: " + result.type);
        console.log("Key: " + result.key);
        console.log("Value: " + JSON.stringify(result.value));
        if (result) {
            if (result.error) {
                console.dir("error");
            }
            else if (result.value) {
                if (result.type == "ChildRemoved") {
                    this.mockChat.push(result.value);
                }
                if (result.type == "ChildAdded") {
                    this.mockChat.push(result.value);
                }
                else if (result.type == "ChildChanged") {
                    this.mockChat.push(result.value);
                }
            }
        }
    };
    ChatListadoComponent.prototype.ngOnInit = function () {
        console.log(this._MyService.getUno());
    };
    ChatListadoComponent.prototype.elegirChat = function (id) {
        this.routerExt.navigate(["/chat", id]);
    };
    ChatListadoComponent = __decorate([
        core_1.Component({
            selector: 'chat-listado',
            templateUrl: 'chats/listado.component.html',
            styleUrls: ['chats/listado.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions, core_1.NgZone, services_1.MyService])
    ], ChatListadoComponent);
    return ChatListadoComponent;
}());
exports.ChatListadoComponent = ChatListadoComponent;
//# sourceMappingURL=listado.component.js.map