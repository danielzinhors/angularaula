export interface ServiceInterface<T>{

    findAll(): Promise<T[]>;
    find(id: number): Promise<T>;
    update(objeto: T): Promise<T>;
    create(objeto: T): Promise<T>;
    delete(objeto: T): Promise<T>;
}