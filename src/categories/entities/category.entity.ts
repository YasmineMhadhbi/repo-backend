import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })

export class CategoryEntity extends Document {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ required: true })
    description: string;


   
}
export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);