import { IAdmin } from "../models";
import { LoginDto } from "../dto";

export interface IAdminService {
    login(admin: LoginDto): Promise<IAdmin>;
}
