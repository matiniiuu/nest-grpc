import { ICategory } from "../models";

export interface GetCategoriesResponse {
    result: ICategory[];
    count: number;
}
