import { IsArray, IsMongoId } from "class-validator";

export class GetFilesByIdDto {
    @IsArray()
    @IsMongoId({ each: true })
    readonly ids: string[];
}
