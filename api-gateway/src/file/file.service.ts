import { Injectable, BadRequestException } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class FileService {
    constructor(private cloudinary: CloudinaryService) {}
    async uploadImageToCloudinary(file: Express.Multer.File) {
        return await this.cloudinary.uploadImage(file).catch(() => {
            throw new BadRequestException("Invalid file type.");
        });
    }
}
