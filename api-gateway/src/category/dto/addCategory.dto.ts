import { IsNotEmpty, IsMongoId, IsOptional, IsArray } from "class-validator";

export class AddCategoryDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly slug: string;

    @IsNotEmpty()
    readonly image: string;

    @IsOptional()
    @IsMongoId()
    readonly parent?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly children?: string[];
}
