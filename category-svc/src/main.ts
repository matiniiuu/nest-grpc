import { join } from "path";

import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: "category",
            url: `0.0.0.0:50051`,
            protoPath: join(__dirname, "../../_proto/category.proto"),
        },
    });

    await app.listen();
}
bootstrap();
