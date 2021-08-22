import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";

import * as bcryptjs from "bcryptjs";

import { IAdminService } from "../interfaces";
import { LoginDto } from "../dto";
import { AdminRepository } from "../repositories";
import { IAdmin } from "../models";

@Injectable()
export class AdminService implements IAdminService {
    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService
    ) {}
    async login(admin: LoginDto): Promise<IAdmin> {
        const { password } = admin;
        try {
            const foundedAdmin = await this.adminRepository.login(admin);
            if (!foundedAdmin) {
                throw new RpcException({
                    details: "The email address or password is incorrect",
                    code: 6,
                });
            }
            const isCorrectPassword = await bcryptjs.compare(password, foundedAdmin.password);
            if (!isCorrectPassword) {
                throw new RpcException({
                    details: "The email address or password is incorrect",
                    code: 6,
                });
            }
            const accessCode = await this.adminRepository.addAcessCode(foundedAdmin._id);
            const accessToken = await this.jwtService.signAsync({
                adminId: foundedAdmin._id,
                email: foundedAdmin.email,
                key: "PANEL",
                type: "admin",
                accessCode,
            });
            return {
                _id: foundedAdmin._id,
                email: foundedAdmin.email,
                status: foundedAdmin.status,
                accessToken,
            };
        } catch (error) {
            console.log(error);
            throw new RpcException({
                details: error?.error?.details || "something went worng",
                code: error?.error?.code || 13,
            });
        }
    }
}
