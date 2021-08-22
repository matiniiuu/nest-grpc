import { join } from "path";

import { ClientOptions, Transport } from "@nestjs/microservices";

export const CategoryMicroserviceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: "category",
        url: `0.0.0.0:50051`,
        protoPath: join(__dirname, "../../../_proto/category.proto"),
    },
};
