import { ContatoBuscaComponent } from './contatos/contato-busca.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Contato } from './contatos/contato.module';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app-component.html'
})

export class AppComponent implements OnInit {

    contatos: Observable<Contato[]>;

    constructor(
       private contatoBusca: ContatoBuscaComponent){
    }
 
    ngOnInit(){
        
    }

    refreshBusca(prBusca: string): void{
       console.log("Olha aqui " + prBusca);
      // this.contatoBusca.ngOnInit();
    }
}