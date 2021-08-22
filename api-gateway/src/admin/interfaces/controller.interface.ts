import { IAdmin } from "../models";
import { LoginDto } from "../dto";

export interface IAdminController {
    login(admin: LoginDto): Promise<IAdmin>;
}
