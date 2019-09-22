import { InMemoryDbService } from 'angular-in-memory-web-api'; 
import { Contato } from './contatos/contato.module';

export class InMemoryDataService implements InMemoryDbService{

    createDb(): {} {
        let contatos: Contato[] = [
            {id: 1, nome: 'Daniel', email: 'danielzinhors@gmail.com', telefone: '(48) 98422-5898'},
            {id: 2, nome: 'Carline', email: 'carlinesilveira@gmail.com', telefone: '(48) 98463-9842'},
            {id: 3, nome: 'Kainah', email: 'kainahnunes@gmail.com', telefone: '(48) 98422-5895'},
            {id: 4, nome: 'Davi', email: 'davinunes@gmail.com', telefone: '(48) 98422-5896'}
        ]
        return {contatos};
    }

}