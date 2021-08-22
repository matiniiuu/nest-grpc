import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryModule } from "./category/category.module";
import { config, validationSchema } from "./config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>(config.CAT_MONGODB_URL),
            }),
            inject: [ConfigService],
        }),
        CategoryModule,
    ],
})
export class AppModule {}
