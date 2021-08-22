import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileController } from "./controllers/file.controller";
import { FileRepository } from "./repositories";
import { File, FileSchema } from "./schemas";
import { FileService } from "./services";

@Module({
    imports: [MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])],
    controllers: [FileController],
    providers: [FileService, FileRepository],
})
export class FileModule {}
