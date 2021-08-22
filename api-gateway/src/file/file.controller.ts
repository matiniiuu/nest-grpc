import {
    Controller,
    OnModuleInit,
    Post,
    UploadedFile,
    UseInterceptors,
    Query,
    Get,
    ValidationPipe,
    UseGuards,
} from "@nestjs/common";
import { Client, ClientGrpc, RpcException } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/admin/guards/jwtAuth.guard";
import { GetFilesDto } from "./dto";
import { FileMicroserviceOptions } from "./file-svc.options";
import { IFileService } from "./file.interface";
import { FileService } from "./file.service";

@Controller("file")
@UseGuards(JwtAuthGuard)
export class FileController implements OnModuleInit {
    constructor(private readonly fileService: FileService) {}
    @Client(FileMicroserviceOptions)
    private client: ClientGrpc;

    private cfileService: IFileService;

    onModuleInit() {
        this.cfileService = this.client.getService<IFileService>("FileService");
    }
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const uploadedFile = await this.fileService.uploadImageToCloudinary(file);
        console.log(uploadedFile);
        try {
            const createdFile = await this.cfileService
                .addFile({
                    filename: `${uploadedFile.public_id}.${uploadedFile.format}`,
                    path: `${uploadedFile.secure_url}`,
                    mimetype: `${uploadedFile.resource_type}/${uploadedFile.format}`,
                })
                .toPromise();
            return createdFile;
        } catch (error) {
            console.log("error=>", error);
            throw new RpcException(error);
        }
    }

    @Get("getFiles")
    async getFiles(
        // @Query("page") page: GetFilesPageDto,
        // @Query("limit") limit: GetFilesLimitDto,
        // @Query("status") status: GetFilesStatusDto
        @Query() pag: GetFilesDto
        // @Query("limit") limit: GetFilesLimitDto,
        // @Query("status") status: GetFilesStatusDto
    ) {
        try {
            const files = await this.cfileService.getFiles(pag).toPromise();
            return files;
        } catch (error) {
            console.log("error=>", error);
            throw new RpcException(error);
        }
    }
}
// {
//     "asset_id": "5308fe486210735f7bcd98b1a670031b",
//     "public_id": "ua6scnulqg0uqvl2qp67",
//     "version": 1626853285,
//     "version_id": "c0293769fa03ecda45d674911cbad778",
//     "signature": "70d11e52fcf64edc34d165601358861994a6f07d",
//     "width": 64,
//     "height": 64,
//     "format": "png",
//     "resource_type": "image",
//     "created_at": "2021-07-21T07:41:25Z",
//     "tags": [],
//     "bytes": 680,
//     "type": "upload",
//     "etag": "440946f64cf582b15a5f58b9899aeff4",
//     "placeholder": false,
//     "url": "http://res.cloudinary.com/matihan/image/upload/v1626853285/ua6scnulqg0uqvl2qp67.png",
//     "secure_url": "https://res.cloudinary.com/matihan/image/upload/v1626853285/ua6scnulqg0uqvl2qp67.png",
//     "original_filename": "file",
//     "api_key": "542184243772588"
// }
