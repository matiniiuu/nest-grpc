import * as joi from "joi";

export const validationSchema = joi.object({
    NODE_ENV: joi.string().required(),
    PANEL_PORT: joi.number().required(),
    CLD_CLOUD_NAME: joi.string().required(),
    CLD_API_KEY: joi.string().required(),
    CLD_API_SECRET: joi.string().required(),
    GATEWAY_MONGODB_URL: joi.string().required(),
    AD_SECRET_KEY: joi.string().required(),
    AD_JWT_TOKEN_EXPIRY_TIME: joi.string().required(),
});
