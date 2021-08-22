import { Injectable } from "@nestjs/common";
import { AddFileDto, GetFilesByIdDto, GetFilesDto } from "../dto";
import { GetFilesByIdResponse, GetFilesResponse, IFileService } from "../interfaces";
import { IFile } from "../models";
import { FileRepository } from "../repositories";

@Injectable()
export class FileService implements IFileService {
    constructor(private readonly fileRepository: FileRepository) {}

    async addFile(file: AddFileDto): Promise<IFile> {
        return this.fileRepository.addFile(file);
    }
    async getFiles(pag: GetFilesDto): Promise<GetFilesResponse> {
        return this.fileRepository.getFiles(pag);
    }
    async getFilesById(data: GetFilesByIdDto): Promise<GetFilesByIdResponse> {
        return this.fileRepository.getFilesById(data);
    }
}
