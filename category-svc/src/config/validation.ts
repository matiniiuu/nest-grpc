import * as joi from "joi";

export const validationSchema = joi.object({
    NODE_ENV: joi.string().required(),
    CAT_MONGODB_URL: joi.string().required(),
});
