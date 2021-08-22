import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { AddFileDto, GetFilesByIdDto, GetFilesDto } from "../dto";
import { GetFilesByIdResponse, GetFilesResponse, IFileController } from "../interfaces";
import { IFile } from "../models";
import { FileService } from "../services";

@Controller()
export class FileController implements IFileController {
    constructor(private fileService: FileService) {}

    @GrpcMethod("FileService", "AddFile")
    async addFile(file: AddFileDto): Promise<IFile> {
        return this.fileService.addFile(file);
    }
    @GrpcMethod("FileService", "GetFiles")
    async getFiles(pag: GetFilesDto): Promise<GetFilesResponse> {
        return this.fileService.getFiles(pag);
    }
    @GrpcMethod("FileService", "GetFilesById")
    async getFilesById(data: GetFilesByIdDto): Promise<GetFilesByIdResponse> {
        return this.fileService.getFilesById(data);
    }
}
