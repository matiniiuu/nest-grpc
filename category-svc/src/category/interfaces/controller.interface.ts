import { ICategory } from "../models";
import { AddCategoryDto, GetCategoriesDto } from "../dto";
import { GetCategoriesResponse } from "./response.interface";

export interface ICategoryController {
    addCategory(category: AddCategoryDto): Promise<ICategory>;
    getCategories(pag: GetCategoriesDto): Promise<GetCategoriesResponse>;
}
