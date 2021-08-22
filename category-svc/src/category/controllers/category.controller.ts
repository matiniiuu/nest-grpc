import { Controller } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { AddCategoryDto, GetCategoriesDto } from "../dto";
import { GetCategoriesResponse } from "../interfaces";
import { ICategoryController } from "../interfaces/controller.interface";
import { ICategory } from "../models";
import { CategoryService } from "../services";

@Controller("category")
export class CategoryController implements ICategoryController {
    constructor(private categoryService: CategoryService) {}

    @GrpcMethod("CategoryService", "AddCategory")
    // async addCategory(category: AddCategoryDto): Promise<ICategory> {
    async addCategory(category: any): Promise<ICategory> {
        console.log("askdjhakjsdhkjahsdkj", category);
        try {
            return this.categoryService.addCategory(category);
        } catch (error) {
            throw new RpcException({
                details: error?.error?.details || "something went worng",
                code: error?.error?.code || 13,
            });
        }
    }
    @GrpcMethod("CategoryService", "GetCategories")
    async getCategories(pag: GetCategoriesDto): Promise<GetCategoriesResponse> {
        return this.categoryService.getCategories(pag);
    }
}
