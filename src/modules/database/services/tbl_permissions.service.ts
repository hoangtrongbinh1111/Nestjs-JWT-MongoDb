import { Injectable, Type } from '@nestjs/common';
import { IModelDbService } from '../interface'
import { tblPermissionsDocument } from '../schema/index';
import { tbl_permissions_dto } from '../dto';
import { tbl_permissions } from '../schema/tbl_permissions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
const ObjectId = Types.ObjectId;
@Injectable()
export class TblPermissionsService implements IModelDbService<tbl_permissions, tbl_permissions_dto>{

    constructor(
        @InjectModel(tbl_permissions.name) private readonly permissionsModel: Model<tblPermissionsDocument>,
    ) { }

    async getAll(): Promise<tbl_permissions[]> {
        return this.permissionsModel.find().exec()
    }

    async getOneById(id: Types.ObjectId): Promise<tbl_permissions> {
        return this.permissionsModel.findById(id).exec();
    }

    async findOne(
        data: FilterQuery<Partial<tblPermissionsDocument>>,
      ): Promise<tblPermissionsDocument> {
        return this.permissionsModel.findOne(data);
      }

    async update(id: Types.ObjectId, entity: tbl_permissions_dto) {
        entity.objectId = new ObjectId(entity.objectId); 
        return this.permissionsModel
            .updateMany({
                _id: id
            }, entity)
            .exec();
    }

    async remove(id: Types.ObjectId) {
        return this.permissionsModel.remove({ _id: id})
    }

    async insert(entity: any): Promise<tbl_permissions> {
        const permission_entity = new this.permissionsModel(entity)
        return permission_entity.save();
    }

    async insertMany(entity: any): Promise<tbl_permissions[]> {
        return this.permissionsModel.insertMany(entity);
    }
}