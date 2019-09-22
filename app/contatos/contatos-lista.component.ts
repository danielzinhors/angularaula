import { Component, OnInit } from '@angular/core';
import { Contato } from './contato.module';
import { ContatoService } from './contato.service';  
import { DialogService } from '../dialog.service';

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})

export class ContatosListaComponent implements OnInit{
    
    contatos: Contato[] = [];
    mensagem: {};
    classesCss: {};
    private currentTimout: any;

    constructor(private contatoService: ContatoService,
        private dialogService: DialogService){

    }

    ngOnInit(): void{
        this.contatoService.findAll()
           .then((contatos: Contato[]) => {
               this.contatos = contatos;
           }).catch(err => {
                this.mostrarMensagem({
                    tipo: 'danger',
                    texto: 'Problema para buscar a lista de contatos!'
                });
           });
    }

    onDelete(contato: Contato): void{
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome + '?')
            .then((canDelete: boolean) => {
                if (canDelete){
                    this.contatoService
                        .delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
                            this.mostrarMensagem({
                                tipo: 'success',
                                texto: 'Contato deletado com sucesso!'
                            });
                        }).catch(err => {
                            this.mostrarMensagem({
                                tipo: 'danger',
                                texto: 'Problema para deletar o contato!'
                            });
                        })
                }
            })

    }

    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void{
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if (mensagem.tipo != 'danger') {

            if (this.currentTimout){
                clearTimeout(this.currentTimout);
            }
            this.currentTimout = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }

    private montarClasses(tipo: string): void{
        this.classesCss = {
            'alert': true
        };
        this.classesCss['alert-' + tipo] = true;
    }
}