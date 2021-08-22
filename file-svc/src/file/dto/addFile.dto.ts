import { IsNotEmpty, IsMongoId, IsOptional, IsArray, ValidateNested } from "class-validator";

export class AddFileDto {
    @IsNotEmpty()
    readonly filename: string;

    @IsNotEmpty()
    readonly path: string;

    @IsNotEmpty()
    readonly mimetype: string;
}
