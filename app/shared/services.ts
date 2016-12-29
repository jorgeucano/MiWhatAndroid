import { Injectable } from '@angular/core';

@Injectable()
export class MyService{

    miVariableUno:string = "uno";

    getUno(){
        return this.miVariableUno;
    }
    setUno(uno:string){
        this.miVariableUno = uno;
    }


}