"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'Daniel', email: 'danielzinhors@gmail.com', telefone: '(48) 98422-5898' },
            { id: 2, nome: 'Carline', email: 'carlinesilveira@gmail.com', telefone: '(48) 98463-9842' },
            { id: 3, nome: 'Kainah', email: 'kainahnunes@gmail.com', telefone: '(48) 98422-5895' },
            { id: 4, nome: 'Davi', email: 'davinunes@gmail.com', telefone: '(48) 98422-5896' }
        ];
        return { contatos };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map