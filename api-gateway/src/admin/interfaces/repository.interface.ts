import { IAdmin } from "../models";
import { LoginDto } from "../dto";

export interface IAdminRepository {
    login(admin: LoginDto): Promise<IAdmin>;
    addAcessCode(adminId: string): Promise<any>;
    findByToken(adminId: string, email: string, accessCode: string): Promise<IAdmin>;
}
