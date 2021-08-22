import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "src/config";
import { AdminController } from "./controllers";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";
import { JwtStrategy } from "./guards/jwtStrategy.guard";
import { AdminRepository } from "./repositories";
import { Admin, AdminSchema } from "./schemas";
import { AdminService } from "./services";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>(config.AD_SECRET_KEY),
                    signOptions: {
                        expiresIn: configService.get<string>(config.AD_JWT_TOKEN_EXPIRY_TIME),
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AdminController],
    providers: [AdminService, AdminRepository, JwtAuthGuard, JwtStrategy],
})
export class AdminModule {}
