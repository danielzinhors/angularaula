import '../util/rxjs-extensions';
import { Contato } from './contato.module';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { 
    Component,
    EventEmitter,
    Input,
    Injectable, 
    OnInit,
    Output, 
    style,  
    OnChanges, 
    SimpleChanges, 
    SimpleChange, 
    Inject} from '@angular/core';
import { ContatoService } from './contato.service';
import { start } from 'repl';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato.busca.component.html',
    styles: [`
      .cursor-point:hover {
          cursor: pointer;
      }
    `]
})
@Injectable()

export class ContatoBuscaComponent implements OnInit, OnChanges {

    @Input() busca: String;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;

    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router){
     }

    ngOnInit(): void { 
        this.getContatos();
    }

    ngOnChanges(change: SimpleChanges): void {
        let busca: SimpleChange = change['busca'];
        this.search(busca.currentValue);
    }

    public getContatos(prBusca: string = ""): Observable<Contato[]> {
        let term: string;
        if (prBusca != ""){
           term = prBusca;
           console.log(" prBusca ", term)
        }
        
        this.contatos = this.termosDaBusca
        .debounceTime(1000) // atrasar os pedidos
        .distinctUntilChanged() // ignora se a proxima for igual a busca anterior
        .switchMap(term => {
            console.log('Buscou ', term)
            return term ? this.contatoService.search(term) : 
            Observable.of<Contato[]>([]);
        }).catch(err => {
            console.log('Erro ', err);
            return Observable.of<Contato[]>([]);
        });

        this.contatos.subscribe((contatos: Contato[]) => {
            console.log('retornou do servidor', contatos);
        });
       return this.contatos;
    }

    private newMethod() {
        return this.termosDaBusca;
    }

    search(term: string, prEmit: boolean = true): void{
        this.termosDaBusca.next(term);
        if (prEmit) {
            this.buscaChange.emit(term);
        }
    }

    verDatalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}