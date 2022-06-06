import { Injectable, Logger, Type } from '@nestjs/common';
import { IModelDbService } from '../interface'
import { tblUserDocument, tbl_user } from '../schema/index';
import { tbl_user_dto } from '../dto/index'
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { tbl_role_permissions } from '../schema/tbl_role_permissions.schema';
import { tbl_roles } from "../schema/tbl_roles.schema";
import { tbl_permissions } from '../schema/tbl_permissions.schema';
import { tbl_objects } from '../schema/tbl_objects.schema';
import { Types } from "mongoose"

const ObjectId = Types.ObjectId

@Injectable()
export class TblUsersService implements IModelDbService<tbl_user, tbl_user_dto>{

    constructor(
        @InjectModel(tbl_user.name) private readonly userModel: Model<tblUserDocument>,
    ) { }

    async getAll(): Promise<tbl_user[]> {
        return this.userModel.find().exec()
    }

    async getOneById(id: Types.ObjectId): Promise<tbl_user> {
        return this.userModel.findById(id).exec();
    }

    async findOne(
        data: FilterQuery<Partial<tblUserDocument>>,
    ): Promise<tblUserDocument> {
        return this.userModel.findOne(data);
    }

    async update(id: Types.ObjectId, entity: tbl_user_dto) {
        entity.roleId = new ObjectId(entity.roleId);
        return this.userModel
            .updateMany({
                _id: id
            },
                entity)
            .exec();
    }

    async remove(id: Types.ObjectId) {
        return this.userModel.remove({ _id: id })
    }

    async insert(entity: any): Promise<tbl_user> {
        const users_entity = new this.userModel(entity)
        return users_entity.save();
    }

    async insertMany(entity: any): Promise<tbl_user[]> {
        return this.userModel.insertMany(entity);
    }
    async findAllPermissionsOfUser(user: any) {
        const userData = await this.userModel.aggregate([
            {
                $match: {
                    _id: Types.ObjectId(user._id)
                }
            },
            {
                $lookup: {
                    from: tbl_roles.name,
                    localField: "roleId",
                    foreignField: "_id",
                    as: 'roles',
                },
            },
            {
                $lookup: {
                    from: tbl_role_permissions.name,
                    localField: "roleId",
                    foreignField: "roleId",
                    as: "role_permissions"
                }
            },
            {
                $set: {
                    role_permissions: "$role_permissions",
                },
            },
            {
                $lookup: {
                    from: tbl_permissions.name,
                    localField: "role_permissions.permissionId",
                    foreignField: "_id",
                    as: "role_permissions.permissions"
                }
            },
            {
                $set: {
                    resource: "$role_permissions.permissions",
                },
            },
            {
                $lookup: {
                    from: tbl_objects.name,
                    localField: "resource.objectId",
                    foreignField: "_id",
                    as: "resource.resources"
                }
            },
        ]);
        Logger.log({ userData });
        return [
            {
                permission: "VIEW",
                resource: "Student"
            }
        ]
    }
}