import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";
import { config } from "./config";
import { RpcExceptionFilter } from "./filter/rpc-exception.filter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get(config.PANEL_PORT);
    app.enableCors({
        origin: "*",
    });
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("panel");
    app.useGlobalFilters(new RpcExceptionFilter());
    await app.listen(port);
}
bootstrap();
