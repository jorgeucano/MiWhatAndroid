"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
//router
var router_1 = require('./shared/router');
var router_2 = require('nativescript-angular/router');
//components
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var create_user_component_1 = require('./login/create.user.component');
var listado_component_1 = require('./chats/listado.component');
var chat_component_1 = require('./chat/chat.component');
var firebase = require("nativescript-plugin-firebase");
var services_1 = require('./shared/services');
//telerik plugin
var admob = require("nativescript-admob");
var mapbox = require("nativescript-mapbox");
var socialShare = require("nativescript-social-share");
var Calendar = require("nativescript-calendar");
var Sqlite = require("nativescript-sqlite");
mapbox.hasFineLocationPermission().then(function (granted) {
    // if this is 'false' you probably want to call 'requestFineLocationPermission' now
    console.dir("Has Location Permission? " + granted);
});
// if no permission was granted previously this wil open a user consent screen
mapbox.requestFineLocationPermission().then(function () {
    console.log("Location permission requested");
});
firebase.init({}).then(function (instance) {
    console.log("firebase.init done");
}, function (error) {
    console.log("firebase.init error: " + error);
});
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                create_user_component_1.CreateUserComponent,
                listado_component_1.ChatListadoComponent,
                chat_component_1.ChatComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                router_2.NativeScriptRouterModule,
                router_2.NativeScriptRouterModule.forRoot(router_1.router)
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [
                services_1.MyService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map