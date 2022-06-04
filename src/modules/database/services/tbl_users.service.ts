import { Injectable, Type } from '@nestjs/common';
import { IModelDbService } from '../interface'
import { tblUserDocument, tbl_user } from '../schema/index';
import { tbl_user_dto } from '../dto/index'
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';

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
}