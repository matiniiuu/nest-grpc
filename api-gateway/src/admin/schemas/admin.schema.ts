import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";
import { IAdmin } from "../models";

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true, versionKey: "version" })
export class Admin extends Document implements IAdmin {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    accessCode: string;

    @Prop({ required: true, default: "1" })
    status: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
