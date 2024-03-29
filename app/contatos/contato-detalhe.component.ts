import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ContatoService } from './contato.service';
import { Contato } from './contato.module';

@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html'
})
export class ContatoDetalheComponent implements OnInit {

    contato: Contato;
    private isNew: boolean = true;

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.contato = new Contato(0, '', '', '');
        this.route.params.forEach((params: Params) => {
            let id: number = + params['id'];
            console.log('Passou no metodo 2', id);
            if (id) {
                this.isNew = false;
                this.contatoService.find(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                });
            }
        });
    }

    teste(): void {
        console.log(this.contato);
    }

    getFormGroupClass(isValid: boolean, isPristine: boolean){
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        }; 
    }

    getControlClass(isValid: boolean, isPristine: boolean){
        return {
            'form-control': true,
            'has-control-danger': !isValid && !isPristine,
            'has-control-success': isValid && !isPristine
        }; 
    }

    onSubmit(): void{
        let promise;

        if (this.isNew){
            promise = this.contatoService.create(this.contato);
       } else {
            promise = this.contatoService.update(this.contato);
       }

       promise.then(contato => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}