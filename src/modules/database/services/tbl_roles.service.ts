import { Injectable, Type } from '@nestjs/common';
import { IModelDbService } from '../interface'
import { tblRolesDocument, tbl_user } from '../schema/index';
import { tbl_roles_dto } from '../dto/index'
import { tbl_roles } from '../schema/tbl_roles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';

@Injectable()
export class TblRolesService implements IModelDbService<tbl_roles, tbl_roles_dto>{

    constructor(
        @InjectModel(tbl_roles.name) private readonly rolesModel: Model<tblRolesDocument>,
    ) { }

    async getAll(): Promise<tbl_roles[]> {
        return this.rolesModel.find().exec()
    }

    async getOneById(id: Types.ObjectId): Promise<tbl_roles> {
        return this.rolesModel.findById(id).exec();
    }

    async findOne(
        data: FilterQuery<Partial<tblRolesDocument>>,
      ): Promise<tblRolesDocument> {
        return this.rolesModel.findOne(data);
      }

    async update(id: Types.ObjectId, entity: tbl_roles_dto) {
        return this.rolesModel
            .updateMany({
                _id: id
            },
                entity)
            .exec();
    }

    async remove(id: Types.ObjectId) {
        return this.rolesModel.remove({ _id: id})
    }

    async insert(entity: any): Promise<tbl_roles> {
        const roles_entity = new this.rolesModel(entity)
        return roles_entity.save();
    }

    async insertMany(entity: any): Promise<tbl_roles[]> {
        return this.rolesModel.insertMany(entity);
    }
}