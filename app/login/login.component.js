"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var nativescript_fancyalert_1 = require('nativescript-fancyalert');
var firebase = require('nativescript-plugin-firebase');
var cameraModule = require("camera");
var imageModule = require("ui/image");
var geolocation = require("nativescript-geolocation");
var services_1 = require('../shared/services');
var LocalNotifications = require("nativescript-local-notifications");
var admob = require("nativescript-admob");
var mapbox = require("nativescript-mapbox");
var socialShare = require("nativescript-social-share");
var Calendar = require("nativescript-calendar");
var LoginComponent = (function () {
    function LoginComponent(routerExt, _MyService) {
        this.routerExt = routerExt;
        this._MyService = _MyService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log(this._MyService.getUno());
        this._MyService.setUno("hola soy jorge");
        this.createMiniBanner();
        // chequeo si la persona esta logueada!
        firebase.getCurrentUser().then(function (user) {
            /*this.routerExt.navigate(["/chatListado"],{
                transition:{
                    name: "flip",
                    duration:500,
                    curve:"linear"
                }
            });*/
        }, function (error) {
            //TNSFancyAlert.showSuccess('Login!', error, 'Entrar!');
        });
        LocalNotifications.schedule([{
                id: 1,
                title: 'The title',
                body: 'Recurs every minute until cancelled',
                ticker: 'The ticker',
                badge: 1,
                ongoing: true,
                interval: 'minute',
                sound: null,
                at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
            }]).then(function () {
            console.log("Notification scheduled");
        }, function (error) {
            console.log("scheduling error: " + error);
        });
    };
    LoginComponent.prototype.createMiniBanner = function () {
        admob.createBanner({
            // if this 'view' property is not set, the banner is overlayed on the current top most view
            // view: ..,
            testing: true,
            size: admob.AD_SIZE.SMART_BANNER,
            iosBannerId: "ca-app-pub-XXXXXX/YYYYYY",
            androidBannerId: "ca-app-pub-AAAAAAAA/BBBBBBB",
            // Android automatically adds the connected device as test device with testing:true, iOS does not
            iosTestDeviceIds: ["yourTestDeviceUDIDs", "canBeAddedHere"],
            margins: {
                // if both are set, top wins
                //top: 10
                bottom: 50
            }
        }).then(function () {
            console.log("admob createBanner done");
        }, function (error) {
            console.log("admob createBanner error: " + error);
        });
    };
    LoginComponent.prototype.hideBanner = function () {
        // the .then(.. bit is optional btw
        admob.hideBanner().then(function () {
            console.log("admob hideBanner done");
        }, function (error) {
            console.log("admob hideBanner error: " + error);
        });
    };
    LoginComponent.prototype.createInterstitial = function () {
        admob.createInterstitial({
            testing: true,
            iosInterstitialId: "ca-app-pub-XXXXXX/YYYYY2",
            androidInterstitialId: "ca-app-pub-AAAAAAAA/BBBBBB2",
            // Android automatically adds the connected device as test device with testing:true, iOS does not
            iosTestDeviceIds: ["ce97330130c9047ce0d4430d37d713b2"]
        }).then(function () {
            console.log("admob createInterstitial done");
        }, function (error) {
            console.log("admob createInterstitial error: " + error);
        });
    };
    ;
    LoginComponent.prototype.enableLocationTap = function () {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
            this.prenderCoordenadas(1);
        }
    };
    LoginComponent.prototype.prenderCoordenadas = function (minutos) {
        geolocation.watchLocation(function (loc) {
            if (loc) {
                console.dir("Latitud: " + loc.latitude);
                console.dir("Longitud: " + loc.longitude);
                console.dir("Speed: " + loc.speed);
            }
        }, function (e) {
            console.log("Error: " + e.message);
        }, { desiredAccuracy: 3, updateDistance: 10, minimumUpdateTime: 1000 * (minutos * 60) }); // Should update every 20 seconds according to Googe documentation. Not verified.
    };
    LoginComponent.prototype.takePicture = function () {
        cameraModule.takePicture().then(function (picture) {
            console.log("Result is an image source instance");
            var image = new imageModule.Image();
            image.imageSource = picture;
            console.dir(image.imageSource);
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: this.email,
            password: this.password
        }).then(function (result) {
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess('Login!', 'Bienvenido de nuevo', 'Entrar!');
            _this.routerExt.navigate(["/chatListado"], {
                transition: {
                    name: "flip",
                    duration: 500,
                    curve: "linear"
                }
            });
        }, function (errorMessage) {
            nativescript_fancyalert_1.TNSFancyAlert.showError('Error!', 'Wow, ocurrio un error.', 'retry');
        });
    };
    LoginComponent.prototype.showMap = function () {
        mapbox.show({
            accessToken: 'pk.eyJ1Ijoiam9yZ2V1Y2FubyIsImEiOiJjaXdoeTRieXUwMTgwMnpsZmZ4ZWkyb3VnIn0.HeD4lSi6JuA4BofTThGGyQ',
            style: mapbox.MapStyle.DARK,
            margins: {
                left: 40,
                right: 40,
                top: 450,
                bottom: 40 // default 0
            },
            center: {
                lat: 52.3702160,
                lng: 4.8951680
            },
            zoomLevel: 9.25,
            showUserLocation: true,
            hideAttribution: false,
            hideLogo: false,
            hideCompass: false,
            disableRotation: false,
            disableScroll: false,
            disableZoom: false,
            markers: [
                {
                    lat: 52.3732160,
                    lng: 4.8941680,
                    title: 'Nice location',
                    subtitle: 'Really really nice location',
                    onTap: function (marker) { console.log("This marker was tapped"); },
                    onCalloutTap: function (marker) { console.log("The callout of this marker was tapped"); }
                }
            ]
        }).then(function (result) {
            console.log("Mapbox show done");
        }, function (error) {
            console.log("mapbox show error: " + error);
        });
    };
    LoginComponent.prototype.socialShare = function () {
        socialShare.shareText("I love NativeScript!", "How would you like to share this text?");
    };
    LoginComponent.prototype.createCalendar = function () {
        // Only the title, startDate and endDate are mandatory, so this would suffice:
        var options = {
            title: 'Get groceries',
            // Make sure these are valid JavaScript Date objects.
            // In this case we schedule an Event for now + 1 hour, lasting 1 hour.
            startDate: new Date(new Date().getTime() + (60 * 60 * 1000)),
            endDate: new Date(new Date().getTime() + (2 * 60 * 60 * 1000))
        };
        // You can however add lots of properties to enrich the Event:
        options.location = 'The shop';
        options.notes = 'This event has reminders';
        // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field.
        options.url = 'http://my.shoppinglist.com';
        // You can also override the default reminder(s) of the Calendar (in minutes):
        options.reminders = {
            first: 30,
            second: 10
        };
        // You can make this Event recurring (this one repeats every other day for 10 days):
        options.recurrence = {
            frequency: Calendar.RecurrenceFrequency.DAILY,
            interval: 2,
            endDate: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)) // 10 days
        };
        // Want to use a custom calendar for your app? Pass in the 'id' or 'name'.
        // If the name doesn't yet exist the plugin will create it for you.
        options.calendar = {
            // id: 3,
            name: "NativeScript Cal"
        };
        Calendar.createEvent(options).then(function (createdId) {
            console.log("Created Event with ID: " + createdId);
        }, function (error) {
            console.log("Error creating an Event: " + error);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'login/login.component.html',
            styleUrls: ['login/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions, services_1.MyService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map