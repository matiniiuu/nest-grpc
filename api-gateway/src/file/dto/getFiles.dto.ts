import { IsOptional, IsNumber } from "class-validator";

export class GetFilesDto {
    @IsOptional()
    // @IsNumber()//TODO uncomment
    readonly page: string;

    @IsOptional()
    // @IsNumber()//TODO uncomment
    readonly limit: string;

    @IsOptional()
    // @IsNumber()//TODO uncomment
    readonly status: string;
}
