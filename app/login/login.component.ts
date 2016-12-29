import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

import firebase = require('nativescript-plugin-firebase');

import cameraModule = require("camera");
import imageModule = require("ui/image");

import geolocation = require("nativescript-geolocation");

import { MyService } from '../shared/services';

import * as LocalNotifications from "nativescript-local-notifications";
var admob = require("nativescript-admob");
var mapbox = require("nativescript-mapbox");
var socialShare = require("nativescript-social-share");
var Calendar = require("nativescript-calendar");


@Component({
    selector:'login',
    templateUrl: 'login/login.component.html',
    styleUrls: ['login/login.component.css']
})
export class LoginComponent{

    email:string;
    password:string;

    constructor(private routerExt: RouterExtensions, private _MyService:MyService ){}

    ngOnInit(){

        console.log( this._MyService.getUno() );
        this._MyService.setUno("hola soy jorge");

        this.createMiniBanner();
        // chequeo si la persona esta logueada!
        firebase.getCurrentUser().then(
            (user)=>{
                /*this.routerExt.navigate(["/chatListado"],{
                    transition:{
                        name: "flip",
                        duration:500,
                        curve:"linear"
                    }
                });*/
            },
            (error)=>{
                //TNSFancyAlert.showSuccess('Login!', error, 'Entrar!');
            }
        );

        LocalNotifications.schedule([{
            id: 1,
            title: 'The title',
            body: 'Recurs every minute until cancelled',
            ticker: 'The ticker',
            badge: 1,
            ongoing: true, // makes the notification ongoing (Android only)
            interval: 'minute',
            sound: null, // suppress the default sound
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
        }]).then(
            function() {
                console.log("Notification scheduled");
            },
            function(error) {
                console.log("scheduling error: " + error);
            }
        );
    }

    createMiniBanner(){
        admob.createBanner({
            // if this 'view' property is not set, the banner is overlayed on the current top most view
            // view: ..,
            testing: true, // set to false to get real banners
            size: admob.AD_SIZE.SMART_BANNER, // anything in admob.AD_SIZE, like admob.AD_SIZE.SMART_BANNER
            iosBannerId: "ca-app-pub-XXXXXX/YYYYYY", // add your own
            androidBannerId: "ca-app-pub-AAAAAAAA/BBBBBBB", // add your own
            // Android automatically adds the connected device as test device with testing:true, iOS does not
            iosTestDeviceIds: ["yourTestDeviceUDIDs", "canBeAddedHere"],
            margins: {
                // if both are set, top wins
                //top: 10
                bottom: 50
            }
            }).then(
                function() {
                console.log("admob createBanner done");
                },
                function(error) {
                console.log("admob createBanner error: " + error);
                }
        );
    }


    hideBanner(){
        // the .then(.. bit is optional btw
        admob.hideBanner().then(
                function() {
                console.log("admob hideBanner done");
                },
                function(error) {
                console.log("admob hideBanner error: " + error);
                }
        );
    }

    createInterstitial(){
        admob.createInterstitial({
            testing: true,
            iosInterstitialId: "ca-app-pub-XXXXXX/YYYYY2", // add your own
            androidInterstitialId: "ca-app-pub-AAAAAAAA/BBBBBB2", // add your own
            // Android automatically adds the connected device as test device with testing:true, iOS does not
            iosTestDeviceIds: ["ce97330130c9047ce0d4430d37d713b2"]
            }).then(
                function() {
                console.log("admob createInterstitial done");
                },
                function(error) {
                console.log("admob createInterstitial error: " + error);
                }
        )
    };


    enableLocationTap() { 
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
            this.prenderCoordenadas(1);
        }
        
    }

    prenderCoordenadas(minutos:number){
        geolocation.watchLocation(
        (loc)=>{
            if (loc) {
                console.dir("Latitud: " + loc.latitude);
                console.dir("Longitud: " + loc.longitude);
                console.dir("Speed: " + loc.speed);
                
            }
        }, 
        (e)=>{
            console.log("Error: " + e.message);
        }, 
        {desiredAccuracy: 3, updateDistance: 10, minimumUpdateTime : 1000 * (minutos * 60)}); // Should update every 20 seconds according to Googe documentation. Not verified.
    }



    takePicture(){
        cameraModule.takePicture().then(
            picture => {
            console.log("Result is an image source instance");
            var image = new imageModule.Image();
            image.imageSource = picture;
            console.dir(image.imageSource);
        });
    }



    login(){
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: this.email,
            password: this.password
        }).then(
            (result)=>{
                TNSFancyAlert.showSuccess('Login!', 'Bienvenido de nuevo', 'Entrar!');
                this.routerExt.navigate(["/chatListado"],{
                    transition:{
                        name: "flip",
                        duration:500,
                        curve:"linear"
                    }
                });
            },
            (errorMessage)=>{
                TNSFancyAlert.showError('Error!', 'Wow, ocurrio un error.', 'retry');
            }
        );
    }

    showMap(){
        mapbox.show({
            accessToken: 'pk.eyJ1Ijoiam9yZ2V1Y2FubyIsImEiOiJjaXdoeTRieXUwMTgwMnpsZmZ4ZWkyb3VnIn0.HeD4lSi6JuA4BofTThGGyQ', // see 'Prerequisites' above
            style: mapbox.MapStyle.DARK, // mapbox.MapStyle enum in the source for other options, default mapbox.MapStyle.STREETS
            margins: {
                left: 40, // default 0
                right: 40, // default 0
                top: 450, // default 0
                bottom: 40 // default 0
            },
            center: { // optional without a default
                lat: 52.3702160,
                lng: 4.8951680
            },
            zoomLevel: 9.25, // 0-20, default 0
            showUserLocation: true, // default false - requires location permissions on Android which you can remove from AndroidManifest.xml if you don't need them
            hideAttribution: false, // default false, Mapbox requires this default if you're on a free plan
            hideLogo: false, // default false, Mapbox requires this default if you're on a free plan
            hideCompass: false, // default false
            disableRotation: false, // default false
            disableScroll: false, // default false
            disableZoom: false, // default false
            markers: [ // optional without a default
                {
                lat: 52.3732160, // mandatory
                lng: 4.8941680, // mandatory
                title: 'Nice location', // recommended to pass in
                subtitle: 'Really really nice location', // one line is available on iOS, multiple on Android
                onTap: function(marker) { console.log("This marker was tapped"); },
                onCalloutTap: function(marker) { console.log("The callout of this marker was tapped"); }
                }
            ]
            }).then(
                function(result) {
                console.log("Mapbox show done");
                },
                function(error) {
                console.log("mapbox show error: " + error);
                }
            )
    }


    socialShare(){
        socialShare.shareText("I love NativeScript!", "How would you like to share this text?");
    }

    createCalendar(){
        // Only the title, startDate and endDate are mandatory, so this would suffice:
        var options:any = {
        title: 'Get groceries',
        // Make sure these are valid JavaScript Date objects.
        // In this case we schedule an Event for now + 1 hour, lasting 1 hour.
        startDate: new Date(new Date().getTime() + (60*60*1000)),
        endDate: new Date(new Date().getTime() + (2*60*60*1000))
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
        frequency: Calendar.RecurrenceFrequency.DAILY, // DAILY|WEEKLY|MONTHLY|YEARLY
        interval: 2, // once every 2 days
        endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days
        };

        // Want to use a custom calendar for your app? Pass in the 'id' or 'name'.
        // If the name doesn't yet exist the plugin will create it for you.
        options.calendar = {
        // id: 3,
        name: "NativeScript Cal"
        };

        Calendar.createEvent(options).then(
            function(createdId) {
            console.log("Created Event with ID: " + createdId);
            },
            function(error) {
            console.log("Error creating an Event: " + error);
            }
        );
    }

}