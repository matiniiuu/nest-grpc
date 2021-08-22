import { IFile } from "../models";

export interface GetFilesResponse {
    result: IFile[];
    count: number;
}
export interface GetFilesByIdResponse {
    files: IFile[];
}
