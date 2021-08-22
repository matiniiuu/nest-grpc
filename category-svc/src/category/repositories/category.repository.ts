import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";

import { Model, Types } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

import { ICategory } from "../models";
import { ICategoryRepository } from "../interfaces";
import { Category } from "../schemas";
import { AddCategoryDto, GetCategoriesDto } from "../dto";
import { GetCategoriesResponse } from "../interfaces";

export class CategoryRepository implements ICategoryRepository {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async addCategory(category: AddCategoryDto): Promise<ICategory> {
        const { title, slug, image, children, parent } = category;
        const categoryExists: ICategory = await this.getCategoryBySlug(slug);
        if (categoryExists) {
            console.log("categoryExists => ", categoryExists);
            throw new RpcException({ details: "Category Exists!", code: 6 });
        }
        try {
            console.log({ category });
            const newCategory = await this.categoryModel.create({
                // _id: uuidv4(),
                title: title,
                slug: slug,
                image,
                // parent: parent,
                parent: parent && Types.ObjectId(parent),
                children: children,
            });

            // const createdCategory = await newCategory.save();
            return {
                _id: newCategory._id,
                title: newCategory.title,
                slug: newCategory.slug,
                image: newCategory.image,
                parent: newCategory.parent,
                children: newCategory.children,
                status: newCategory.status,
            };
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
    async getCategories(pag: GetCategoriesDto): Promise<GetCategoriesResponse> {
        const status = pag.status || "1";
        const page = +pag.page || 1;
        const limit = +pag.limit || 0;
        try {
            const result = await this.categoryModel
                .find({
                    status: status.toString(),
                })
                .sort({ _id: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
            const count = await this.categoryModel.countDocuments({ status: status.toString() });
            return { result, count };
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
    async getCategoryBySlug(slug: string): Promise<ICategory> {
        try {
            return this.categoryModel.findOne({ slug, status: "1" });
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }

    async getCategoriesById(ids: string[]): Promise<ICategory[]> {
        try {
            return this.categoryModel.find({ _id: ids, status: "1" });
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }

    async addCategoryToParent(category: ICategory): Promise<void> {
        try {
            if (category.parent) {
                await this.categoryModel.findOneAndUpdate(
                    { _id: category.parent, status: "1" },
                    { $addToSet: { children: category._id } }
                );
            }
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }

    async addCategoryToChildern(category: ICategory): Promise<void> {
        try {
            if (category.children?.length) {
                await this.categoryModel.updateMany(
                    { _id: category.children, status: "1" },
                    { $set: { parent: category._id } }
                );
            }
        } catch (error) {
            console.log(error);
            throw new RpcException({ details: "something went worng", code: 13 });
        }
    }
}
//TODO service chek image, !parent, !children exists
//TODO?service check is category exists already
//TODO service add created category to parent and children
//TODO! create tests
//TODO add flunted
//TODO? add status
//TODO* create add products to category
