import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    OnModuleInit,
    Post,
    Query,
    Res,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { Client, ClientGrpc, RpcException } from "@nestjs/microservices";

import { Response } from "express";
import { firstValueFrom } from "rxjs";

import { ICategoryService } from "./category.interface";
import { CategoryMicroserviceOptions } from "./category-svc.options";
import { AddCategoryDto, GetCategoriesDto } from "./dto";
import { FileMicroserviceOptions } from "src/file/file-svc.options";
import { IFileService } from "src/file/file.interface";
import { JwtAuthGuard } from "src/admin/guards/jwtAuth.guard";

@Controller("category")
@UseGuards(JwtAuthGuard)
export class CategoryController implements OnModuleInit {
    constructor() {}

    @Client(CategoryMicroserviceOptions)
    private client: ClientGrpc;

    private categoryService: ICategoryService;

    @Client(FileMicroserviceOptions)
    private fileClient: ClientGrpc;

    private fileService: IFileService;

    onModuleInit() {
        this.categoryService = this.client.getService<ICategoryService>("CategoryService");
        this.fileService = this.fileClient.getService<IFileService>("FileService");
    }
    @Post("/addCategory")
    async addCategory(@Body() category: AddCategoryDto, @Res() res: Response) {
        console.log("askdjhakjsdhkjahsdkj");
        try {
            const { files } = await this.fileService
                .getFilesById({ ids: [category.image] })
                .toPromise();
            console.log(files, category.image);
            if (!files || files.length != 1) {
                throw new BadRequestException("Image Not Found!");
            }
            console.log({
                title: category.title,
                slug: category.slug,
                parent: category.parent,
                children: category.children,
                imageId: files[0]._id,
                imageFilename: files[0].filename,
                imagePath: files[0].path,
                imageMimetype: files[0].mimetype,
                imageStatus: files[0].status,
            });

            const result = await this.categoryService
                .addCategory({
                    // title: category.title,
                    // slug: category.slug,
                    // parent: category.parent,
                    // children: category.children,
                    // imageId: files[0]._id,
                    // imageFilename: files[0].filename,
                    // imagePath: files[0].path,
                    // imageMimetype: files[0].mimetype,
                    // imageStatus: files[0].status,
                    ...category,
                    image: files[0],
                })
                .toPromise();
            return res.status(HttpStatus.CREATED).send({
                category: result,
            });
        } catch (error) {
            console.log(error);
            if (error.code && error.details) {
                throw new RpcException(error);
            }
            throw error;
        }
    }

    @Get("/getCategories")
    async getCategories(@Query() pag: GetCategoriesDto) {
        try {
            // const result = [];
            const categories = await this.categoryService.getCategories(pag).toPromise();
            // const fileIds = categories.result?.map((category) => category.image);
            // console.log({ fileIds });
            // const { files } = await this.fileService.getFilesById({ ids: fileIds }).toPromise();
            // console.log("files => ", files);
            // categories.result?.map((category) => {
            //     const image = files.find((file) => {
            //         return file._id.toString() === category.image.toString();
            //     });
            //     console.log("res => ", { ...category, image });
            //     result.push({ ...category, image });
            // });
            return categories;
        } catch (error) {
            console.log("error=>", error);
            throw new RpcException(error);
        }
    }
}
