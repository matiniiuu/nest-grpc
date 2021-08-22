import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";
import { IFile } from "../models";

export type FileDocument = File & Document;

@Schema({ timestamps: true, versionKey: "version" })
export class File extends Document implements IFile {
    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    path: string;

    @Prop({ required: true })
    mimetype: string;

    @Prop({ required: true, default: "1" })
    status: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
