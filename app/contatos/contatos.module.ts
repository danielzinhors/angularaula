import { Contato } from './contato.module';
import { NgModule } from '@angular/core';
import { ContatosListaComponent } from './contatos-lista.component';
import { CommonModule } from '@angular/common';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoDetalheComponent } from './contato-detalhe.component';
import { ContatoService } from './contato.service';
import { FormsModule } from '@angular/forms';    
import { ContatoBuscaComponent } from './contato-busca.component';

@NgModule({
   imports:[
       CommonModule,
       ContatoRoutingModule,
       FormsModule
   ],
   declarations:[
       ContatoBuscaComponent,   
       ContatoDetalheComponent,
       ContatosListaComponent
   ],
   exports:[
       ContatoBuscaComponent,
       ContatosListaComponent
   ],
   providers: [
       ContatoService,
       ContatoBuscaComponent
   ]
})
export class ContatosModule {}