import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { AddCategoryDto, GetCategoriesDto } from "../dto";
import { GetCategoriesResponse, ICategoryService } from "../interfaces";
import { ICategory } from "../models";
import { CategoryRepository } from "../repositories";

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async addCategory(category: AddCategoryDto): Promise<ICategory> {
        try {
            if (category.parent) {
                const parentExists = await this.categoryRepository.getCategoriesById([
                    category.parent,
                ]);
                if (!parentExists) {
                    throw new RpcException({ details: "Parent Not Found!", code: 6 });
                }
            }
            if (category.children?.length) {
                const childrenExists = await this.categoryRepository.getCategoriesById(
                    category.children
                );
                if (childrenExists.length != category.children.length) {
                    throw new RpcException({ details: "Children Not Found!", code: 6 });
                }
            }
            const createdCategory = await this.categoryRepository.addCategory(category);
            await this.categoryRepository.addCategoryToParent(createdCategory);
            await this.categoryRepository.addCategoryToChildern(createdCategory);
            return createdCategory;
        } catch (error) {
            console.log(error);
            throw new RpcException({
                details: error?.error?.details || "something went worng",
                code: error?.error?.code || 13,
            });
        }
    }
    async getCategories(pag: GetCategoriesDto): Promise<GetCategoriesResponse> {
        return this.categoryRepository.getCategories(pag);
    }
}
