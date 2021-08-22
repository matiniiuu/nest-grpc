import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

import { IFile } from "../models";
import { IFileRepository } from "../interfaces";
import { File } from "../schemas";
import { AddFileDto, GetFilesByIdDto, GetFilesDto } from "../dto";
import { GetFilesByIdResponse, GetFilesResponse } from "../interfaces/response.interface";

export class FileRepository implements IFileRepository {
    constructor(@InjectModel(File.name) private readonly fileModel: Model<File>) {}

    async addFile(file: AddFileDto): Promise<IFile> {
        const { filename, path, mimetype } = file;
        try {
            const newFile = await this.fileModel.create({
                filename: filename,
                path: path,
                mimetype: mimetype,
            });

            return {
                _id: newFile._id,
                filename: newFile.filename,
                path: newFile.path,
                mimetype: newFile.mimetype,
                status: newFile.status,
            };
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
    async getFiles(pag: GetFilesDto): Promise<GetFilesResponse> {
        const status = pag.status || "1";
        const page = +pag.page || 1;
        const limit = +pag.limit || 0;
        try {
            const result = await this.fileModel
                .find({
                    status: status.toString(),
                })
                .sort({ _id: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
            const count = await this.fileModel.countDocuments({ status: status.toString() });
            return { result, count };
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
    async getFilesById(data: GetFilesByIdDto): Promise<GetFilesByIdResponse> {
        try {
            const result = await this.fileModel.find({
                _id: data.ids,
                status: "1",
            });
            console.log({ result });
            return { files: result };
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
}
//TODO! create tests
//TODO add flunted
