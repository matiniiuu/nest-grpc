import { join } from "path";

import { ClientOptions, Transport } from "@nestjs/microservices";

export const FileMicroserviceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: "file",
        url: `0.0.0.0:50052`,
        protoPath: join(__dirname, "../../../_proto/file.proto"),
    },
};
