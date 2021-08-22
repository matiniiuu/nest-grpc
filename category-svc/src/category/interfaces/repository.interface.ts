import { ICategory } from "../models";
import { AddCategoryDto, GetCategoriesDto } from "../dto";
import { GetCategoriesResponse } from "./response.interface";

export interface ICategoryRepository {
    addCategory(category: AddCategoryDto): Promise<ICategory>;
    getCategoryBySlug(slug: string): Promise<ICategory>;
    getCategoriesById(ids: string[]): Promise<ICategory[]>;
    addCategoryToParent(category: AddCategoryDto): Promise<void>;
    addCategoryToChildern(category: AddCategoryDto): Promise<void>;
    getCategories(pag: GetCategoriesDto): Promise<GetCategoriesResponse>;
}
