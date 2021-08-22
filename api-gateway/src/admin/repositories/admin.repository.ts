import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

import { Model, Types } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

import { IAdmin } from "../models";
import { IAdminRepository } from "../interfaces";
import { Admin } from "../schemas";
import { LoginDto } from "../dto";
export class AdminRepository implements IAdminRepository {
    constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {}

    async login(admin: LoginDto): Promise<IAdmin> {
        const { email } = admin;
        try {
            const standardEmail = email.toLowerCase();
            const admin = await this.adminModel.findOne({ email: standardEmail, status: "1" });
            // const accessToken = await generateToken.generateAccessToken(
            //     {
            //         adminId: admin._id,
            //         email: admin.email,
            //         key: "PANEL",
            //     },
            //     "admin", // type of token
            //     serverConfigs.ACCESS_TOKEN_EXPIRY_TIME // expire time
            // );
            return admin;
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
    async addAcessCode(adminId: string): Promise<any> {
        try {
            const accessCode: any = Math.floor(Math.random() * 8999 + 1000);
            await this.adminModel.findOneAndUpdate({
                _id: adminId,
                accessCode,
                status: "1",
            });
            return accessCode;
            // const accessToken = await generateToken.generateAccessToken(
            //     {
            //         adminId: admin._id,
            //         email: admin.email,
            //         key: "PANEL",
            //     },
            //     "admin", // type of token
            //     serverConfigs.ACCESS_TOKEN_EXPIRY_TIME // expire time
            // );
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
    async findByToken(adminId: string, email: string, accessCode: string): Promise<IAdmin> {
        try {
            const admin = await await this.adminModel.findOne({
                _id: adminId,
                email,
                accessCode: accessCode.toString(),
                status: "1",
            });
            return admin;
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
}
