import { Injectable } from '@angular/core';
import { CONTATOS } from './contatos.mok';
import { Contato } from './contato.module';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { ServiceInterface } from './../interfaces/service.interface';

@Injectable()
export class ContatoService implements ServiceInterface<Contato> {

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    constructor(
        private http: Http
    ){}
    
    findAll(): Promise<Contato[]> {
       return this.http.get(this.contatosUrl)
           .toPromise()
           .then(response => response.json().data as Contato[])
           .catch(this.handleError);
    }

    find(id: number): Promise<Contato>{
        return this.findAll()
         .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }

    create(contato: Contato): Promise<Contato>{
      return this.http
        .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then((response: Response) => response.json().data as Contato)
        .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`; 
        return this.http
          .put(url, JSON.stringify(contato), {headers: this.headers})
          .toPromise()
          .then(() => contato as Contato)
          .catch(this.handleError);
      }

    delete(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`; 
        return this.http
        .delete(url, {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);

    }

    search(term: string): Observable<Contato[]> {
        return this.http
         .get(`${this.contatosUrl}/?nome=${term}`)
         .map((res: Response) => res.json().data as Contato[])
    }

    getContatoSlowly(): Promise<Contato[]>{

        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        }).then(() => {
            console.log('Primeiro then');
            return 'Daniel fazendo';
        }).then((params: string) => {
            console.log('Segundo then');
            console.log(params);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('continuando depois de 4 segundos...');
                    resolve2();
                }, 4000);
            });
        }).then(() => {
            console.log('Terceiro then');
            return this.findAll();
        });
    }

}