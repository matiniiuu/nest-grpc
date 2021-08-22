import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { config, validationSchema } from "./config";
import { CategoryModule } from "./category/category.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { FileModule } from "./file/file.module";
import { AdminModule } from "./admin/admin.module";
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
                uri: configService.get<string>(config.GATEWAY_MONGODB_URL),
            }),
            inject: [ConfigService],
        }),
        CategoryModule,
        CloudinaryModule,
        FileModule,
        AdminModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
