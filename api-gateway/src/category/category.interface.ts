import { Observable } from "rxjs";

import { AddCategoryDto, GetCategoriesDto } from "./dto";
import { ICategory } from "./model.interface";
export interface GetCategoriesResponse {
    result: ICategory[];
    count: number;
}

export interface ICategoryService {
    // addCategory(category: AddCategoryDto): Observable<ICategory>;
    addCategory(category: any): Observable<ICategory>;
    getCategories(pag: GetCategoriesDto): Observable<GetCategoriesResponse>;
}
