import { ICategory } from "../models";
import { AddCategoryDto, GetCategoriesDto } from "../dto";
import { GetCategoriesResponse } from "./response.interface";

export interface ICategoryService {
    addCategory(category: AddCategoryDto): Promise<ICategory>;
    getCategories(pag: GetCategoriesDto): Promise<GetCategoriesResponse>;
}
