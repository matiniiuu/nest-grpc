import { ConfigService } from "@nestjs/config";
import { v2 } from "cloudinary";
import { config } from "src/config";
import { CLOUDINARY } from "./constants";
export const CloudinaryProvider = {
    provide: CLOUDINARY,
    // useFactory: () => {
    //     return v2.config({
    //         cloud_name: process.env.CLD_CLOUD_NAME,
    //         api_key: process.env.CLD_API_KEY,
    //         api_secret: process.env.CLD_API_SECRET,
    //     });
    // },
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
        v2.config({
            cloud_name: configService.get<string>(config.CLD_CLOUD_NAME),
            api_key: configService.get<string>(config.CLD_API_KEY),
            api_secret: configService.get<string>(config.CLD_API_SECRET),
        }),
};
//14:01:52:F8:0F:16
