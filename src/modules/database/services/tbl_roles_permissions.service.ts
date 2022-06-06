import { Injectable, Type } from '@nestjs/common';
import { IModelDbService } from '../interface'
import { tblRolePermissionDocument } from '../schema/index';
import { tbl_roles_permissions_dto } from '../dto';
import { tbl_role_permissions } from '../schema/tbl_role_permissions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
const ObjectId = Types.ObjectId;
@Injectable()
export class TblRolesPermissionsService implements IModelDbService<tbl_role_permissions, tbl_roles_permissions_dto>{

    constructor(
        @InjectModel(tbl_role_permissions.name) private readonly rolepermissionsModel: Model<tblRolePermissionDocument>,
    ) { }

    async getAll(): Promise<tbl_role_permissions[]> {
        return this.rolepermissionsModel.find().exec()
    }

    async getOneById(id: Types.ObjectId): Promise<tbl_role_permissions> {
        return this.rolepermissionsModel.findById(id).exec();
    }

    async findOne(
        data: FilterQuery<Partial<tblRolePermissionDocument>>,
    ): Promise<tblRolePermissionDocument> {
        return this.rolepermissionsModel.findOne(data);
    }

    async update(id: Types.ObjectId, entity: tbl_roles_permissions_dto) {
        entity.permissionId = new ObjectId(entity.permissionId);
        entity.roleId = new ObjectId(entity.roleId);
        return this.rolepermissionsModel
            .updateMany({
                _id: id
            },
                entity)
            .exec();
    }

    async remove(id: Types.ObjectId) {
        return this.rolepermissionsModel.remove({ _id: id })
    }

    async insert(entity: any): Promise<tbl_role_permissions> {
        entity.permissionId = new ObjectId(entity.permissionId);
        entity.roleId = new ObjectId(entity.roleId);
        const rolepermission_entity = new this.rolepermissionsModel(entity)
        return rolepermission_entity.save();
    }

    async insertMany(entity: any): Promise<tbl_role_permissions[]> {
        const entitytemp = entity.map(item => {
            let temp: tbl_role_permissions = {
                roleId: new ObjectId(item.roleId),
                permissionId: new ObjectId(item.permissionId)
            }
            return temp;
        });
        return this.rolepermissionsModel.insertMany(entitytemp);
    }
}
