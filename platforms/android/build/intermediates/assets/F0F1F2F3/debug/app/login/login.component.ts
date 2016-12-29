import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

import firebase = require('nativescript-plugin-firebase');

import cameraModule = require("camera");
import imageModule = require("ui/image");

@Component({
    selector:'login',
    templateUrl: 'login/login.component.html',
    styleUrls: ['login/login.component.css']
})
export class LoginComponent{

    email:string;
    password:string;

    constructor(private routerExt: RouterExtensions ){}

    ngOnInit(){
        // chequeo si la persona esta logueada!
        firebase.getCurrentUser().then(
            (user)=>{
                this.routerExt.navigate(["/chatListado"],{
                    transition:{
                        name: "flip",
                        duration:500,
                        curve:"linear"
                    }
                });
            },
            (error)=>{
                TNSFancyAlert.showSuccess('Login!', error, 'Entrar!');
            }
        )
    }

    takePicture(){
        cameraModule.takePicture().then(picture => {
            console.log("Result is an image source instance");
            var image = new imageModule.Image();
            image.imageSource = picture;
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
                TNSFancyAlert.showSuccess('Error!', 'Wow, ocurrio un error.', 'retry');
            }
        );
    }

}