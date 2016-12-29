import { Component, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import firebase = require('nativescript-plugin-firebase');

import { MyService } from '../shared/services';

@Component({
    selector:'chat-listado',
    templateUrl: 'chats/listado.component.html',
    styleUrls: ['chats/listado.component.css']
})
export class ChatListadoComponent{

    email:string;
    password:string;


    mockChat:Array<any> = [];

    constructor(private routerExt: RouterExtensions, private ngZone: NgZone , private _MyService:MyService ){


        firebase.addChildEventListener((result:any)=>{
            this.ngZone.run(() => {
                this.onQueryEvent(result);
            });
        }, "/chats");

    }


    newChat(){
        firebase.push(
            '/chats',
            {
                "id": 3, 
                "nombre": "nuevo grupo con boton",
                "usuarios": {
                    "usuario_1": "jorgeucano",
                    "usuario_2": "jorgeucano2"
                },
                "creacion": "12/12/2016",
                "dialogo": []
            }
        ).then(
            function (result) {
                console.log("created key: " + result.key);
            }
        );
    }


    onQueryEvent(result:any){
        console.log("Event type: " + result.type);
        console.log("Key: " + result.key);
        console.log("Value: " + JSON.stringify(result.value));
        if(result){
            if(result.error){
                console.dir("error");
            }
            else if (result.value){
                if (result.type == "ChildRemoved"){
                    this.mockChat.push(result.value);
                }
                if(result.type == "ChildAdded"){
                    this.mockChat.push(result.value);
                }
                else if (result.type=="ChildChanged") {
                    this.mockChat.push(result.value);
                }
                
            }
        }
    }



    ngOnInit(){
         console.log(this._MyService.getUno()) ;
    }

    elegirChat(id){
        this.routerExt.navigate(["/chat", id]);
    }

}