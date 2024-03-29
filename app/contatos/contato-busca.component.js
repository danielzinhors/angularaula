"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("../util/rxjs-extensions");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
const core_1 = require("@angular/core");
const contato_service_1 = require("./contato.service");
const router_1 = require("@angular/router");
let ContatoBuscaComponent = class ContatoBuscaComponent {
    constructor(contatoService, router) {
        this.contatoService = contatoService;
        this.router = router;
        this.buscaChange = new core_1.EventEmitter();
        this.termosDaBusca = new Subject_1.Subject();
    }
    ngOnInit() {
        this.getContatos();
    }
    ngOnChanges(change) {
        let busca = change['busca'];
        this.search(busca.currentValue);
    }
    getContatos(prBusca = "") {
        let term;
        if (prBusca != "") {
            term = prBusca;
            console.log(" prBusca ", term);
        }
        this.contatos = this.termosDaBusca
            .debounceTime(1000) // atrasar os pedidos
            .distinctUntilChanged() // ignora se a proxima for igual a busca anterior
            .switchMap(term => {
            console.log('Buscou ', term);
            return term ? this.contatoService.search(term) :
                Observable_1.Observable.of([]);
        }).catch(err => {
            console.log('Erro ', err);
            return Observable_1.Observable.of([]);
        });
        this.contatos.subscribe((contatos) => {
            console.log('retornou do servidor', contatos);
        });
        return this.contatos;
    }
    newMethod() {
        return this.termosDaBusca;
    }
    search(term, prEmit = true) {
        this.termosDaBusca.next(term);
        if (prEmit) {
            this.buscaChange.emit(term);
        }
    }
    verDatalhe(contato) {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContatoBuscaComponent.prototype, "busca", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ContatoBuscaComponent.prototype, "buscaChange", void 0);
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato.busca.component.html',
        styles: [`
      .cursor-point:hover {
          cursor: pointer;
      }
    `]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.Router])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map