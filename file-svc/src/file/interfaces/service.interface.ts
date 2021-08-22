import { IFile } from "../models";
import { AddFileDto, GetFilesByIdDto, GetFilesDto } from "../dto";
import { GetFilesByIdResponse, GetFilesResponse } from "./response.interface";

export interface IFileService {
    addFile(file: AddFileDto): Promise<IFile>;
    getFiles(pag: GetFilesDto): Promise<GetFilesResponse>;
    getFilesById(data: GetFilesByIdDto): Promise<GetFilesByIdResponse>;
}
