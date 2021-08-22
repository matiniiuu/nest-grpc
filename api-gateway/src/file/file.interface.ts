import { Observable } from "rxjs";

import { AddFileDto, GetFilesByIdDto, GetFilesDto } from "./dto";
import { IFile } from "./model.interface";
export interface GetFilesResponse {
    result: IFile[];
    count: number;
}
export interface GetFilesByIdResponse {
    files: IFile[];
}

export interface IFileService {
    addFile(file: AddFileDto): Observable<IFile>;
    getFiles(pag: GetFilesDto): Observable<GetFilesResponse>;
    getFilesById(data: GetFilesByIdDto): Observable<GetFilesByIdResponse>;
}
