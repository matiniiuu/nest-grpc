import { IsOptional, IsNumber } from "class-validator";

export class GetFilesDto {
    @IsOptional()
    // @IsNumber()
    readonly page: string;

    @IsOptional()
    // @IsNumber()
    readonly limit: string;

    @IsOptional()
    // @IsNumber()
    readonly status: string;
}
