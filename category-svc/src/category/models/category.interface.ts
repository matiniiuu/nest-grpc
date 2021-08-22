import { IFile } from "./file.interface";

export interface ICategory {
    _id?: any;
    title: string;
    slug: string;
    image: IFile;
    status: string;
    parent?: string;
    children?: string[];
    products?: string[];
    createdAt?: string;
    updatedAt?: string;
    version?: number;
}
