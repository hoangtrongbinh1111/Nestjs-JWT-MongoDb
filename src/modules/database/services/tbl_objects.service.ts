import { Injectable, Type } from '@nestjs/common';
import { IModelDbService } from '../interface'
import { tblRolesDocument, tbl_user } from '../schema/index';
import { tbl_objects_dto } from '../dto/index'
import { tbl_objects } from '../schema/tbl_objects.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';

@Injectable()
export class TblObjectsService implements IModelDbService<tbl_objects, tbl_objects_dto>{

    constructor(
        @InjectModel(tbl_objects.name) private readonly objectsModel: Model<tblRolesDocument>,
    ) { }

    async getAll(): Promise<tbl_objects[]> {
        return this.objectsModel.find().exec()
    }

    async getOneById(id: Types.ObjectId): Promise<tbl_objects> {
        return this.objectsModel.findById(id).exec();
    }

    async findOne(
        data: FilterQuery<Partial<tblRolesDocument>>,
      ): Promise<tblRolesDocument> {
        return this.objectsModel.findOne(data);
      }

    async update(id: Types.ObjectId, entity: tbl_objects_dto) {
        return this.objectsModel
            .updateMany({
                _id: id
            },
                entity)
            .exec();
    }

    async remove(id: Types.ObjectId) {
        return this.objectsModel.remove({ _id: id})
    }

    async insert(entity: any): Promise<tbl_objects> {
        const roles_entity = new this.objectsModel(entity)
        return roles_entity.save();
    }
    
    async insertMany(entity: any): Promise<tbl_objects[]> {
        return this.objectsModel.insertMany(entity);
    }
}