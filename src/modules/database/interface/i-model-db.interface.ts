import { Types, FilterQuery } from "mongoose";

export interface IModelDbService<T, dtoT> {
    
    getAll(): Promise<T[]>;
    
    getOneById(id: Types.ObjectId): Promise<T>;

    findOne(data: FilterQuery<Partial<T>>): Promise<T>;

    update(id: Types.ObjectId, entity: dtoT);

    remove(id: Types.ObjectId);

    insert(entity: dtoT): Promise<T>;

    insertMany(entity: dtoT[]): Promise<T[]>;
}