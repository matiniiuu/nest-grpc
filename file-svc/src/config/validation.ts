import * as joi from "joi";

export const validationSchema = joi.object({
    NODE_ENV: joi.string().required(),
    FILE_MONGODB_URL: joi.string().required(),
});
