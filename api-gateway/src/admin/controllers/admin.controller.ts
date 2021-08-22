import { Body, Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { LoginDto } from "../dto";
import { IAdminController } from "../interfaces";
import { IAdmin } from "../models";
import { AdminService } from "../services";

@Controller("admin")
export class AdminController implements IAdminController {
    constructor(private readonly adminService: AdminService) {}
    @Post("login")
    login(@Body() admin: LoginDto): Promise<IAdmin> {
        return this.adminService.login(admin);
    }
}
