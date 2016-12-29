import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

//router
import { router } from './shared/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

//components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CreateUserComponent } from './login/create.user.component';
import { ChatListadoComponent } from './chats/listado.component';
import { ChatComponent } from './chat/chat.component';


import firebase = require("nativescript-plugin-firebase");
import cameraModule = require("camera");
import geolocation = require("nativescript-geolocation");


import { MyService } from './shared/services';


//telerik plugin
var admob = require("nativescript-admob");
var mapbox = require("nativescript-mapbox");
var socialShare = require("nativescript-social-share");
var Calendar = require("nativescript-calendar");
var Sqlite = require( "nativescript-sqlite" );


import * as LocalNotifications from "nativescript-local-notifications";


mapbox.hasFineLocationPermission().then(
    function(granted) {
      // if this is 'false' you probably want to call 'requestFineLocationPermission' now
      console.dir("Has Location Permission? " + granted);
    }
);

// if no permission was granted previously this wil open a user consent screen
mapbox.requestFineLocationPermission().then(
    function() {
      console.log("Location permission requested");
    }
);

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);

@NgModule({
    declarations: [
            AppComponent,
            LoginComponent,
            CreateUserComponent,
            ChatListadoComponent,
            ChatComponent
        ],
    bootstrap: [AppComponent],
    imports: [
            NativeScriptModule,
            NativeScriptFormsModule,
            NativeScriptRouterModule,
            NativeScriptRouterModule.forRoot(router)
            ],
    schemas: [NO_ERRORS_SCHEMA],
    providers : [
      MyService
    ]
})
export class AppModule { }
