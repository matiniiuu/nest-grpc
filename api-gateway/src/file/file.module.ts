import { Module } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { FileController } from "./file.controller";
import { FileService } from './file.service';

@Module({
    controllers: [FileController],
    providers: [CloudinaryService, FileService],
})
export class FileModule {}
