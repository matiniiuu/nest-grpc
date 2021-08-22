import { IsNotEmpty, IsMongoId, IsOptional, IsArray } from "class-validator";
import { IFile } from "../models";

export class AddCategoryDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly slug: string;

    @IsNotEmpty()
    readonly image: IFile;

    @IsOptional()
    @IsMongoId()
    readonly parent?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly children?: string[];
}
