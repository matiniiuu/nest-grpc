import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document, Types } from "mongoose";
import { ICategory, IFile } from "../models";
import { FileSchema } from "./file.schema";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, versionKey: "version" })
export class Category extends Document implements ICategory {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    slug: string;

    // @Prop({ type: IFile })
    @Prop({ type: FileSchema })
    image: IFile;

    @Prop({ type: Types.ObjectId, ref: "Category" })
    parent: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: "Category" }] })
    children: string[];

    @Prop({ type: [{ type: Types.ObjectId }] })
    products: string[];

    @Prop({ required: true, default: "1" })
    status: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
