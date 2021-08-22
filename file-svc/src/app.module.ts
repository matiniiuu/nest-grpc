import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { FileModule } from "./file/file.module";
import { config, validationSchema } from "./config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>(config.FILE_MONGODB_URL),
            }),
            inject: [ConfigService],
        }),
        FileModule,
    ],
})
export class AppModule {}
