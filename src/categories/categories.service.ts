import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interface/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories')
    private CategoryModel: Model<ICategory>,
  ) {}

  // CREATE CATEGORY
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const categoryExist = await this.CategoryModel.findOne({
      name: { $regex: new RegExp(`^${createCategoryDto.name}$`, 'i') },
    });

    if (categoryExist) {
      throw new BadRequestException('Category already exists');
    }

    return await this.CategoryModel.create(createCategoryDto);
  }

  // UPDATE CATEGORY
  async updateCategory(
    CategoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    // Vérifier que l'ID est valide
    if (!Types.ObjectId.isValid(CategoryId)) {
      throw new BadRequestException(`Invalid category ID: ${CategoryId}`);
    }

    const existingCategory = await this.CategoryModel.findById(CategoryId);
    if (!existingCategory) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }

    // Vérifier si le nouveau name existe déjà dans une autre catégorie
    if (updateCategoryDto.name) {
      const duplicateCategory = await this.CategoryModel.findOne({
        _id: { $ne: CategoryId },
        name: { $regex: new RegExp(`^${updateCategoryDto.name}$`, 'i') },
      });

      if (duplicateCategory) {
        throw new BadRequestException('Category name already exists');
      }
    }

    Object.assign(existingCategory, updateCategoryDto);

    return await existingCategory.save();
  }

  // GET ALL CATEGORIES
  async getAllCategories(): Promise<ICategory[]> {
    const categories = await this.CategoryModel.find();
    if (!categories || categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  // GET ONE CATEGORY
  async getCategory(CategoryId: string): Promise<ICategory> {
    if (!Types.ObjectId.isValid(CategoryId)) {
      throw new BadRequestException(`Invalid category ID: ${CategoryId}`);
    }

    const category = await this.CategoryModel.findById(CategoryId);
    if (!category) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }

    return category;
  }

  // DELETE CATEGORY
  async deleteCategory(CategoryId: string): Promise<ICategory> {
    if (!Types.ObjectId.isValid(CategoryId)) {
      throw new BadRequestException(`Invalid category ID: ${CategoryId}`);
    }

    const deletedCategory =
      await this.CategoryModel.findByIdAndDelete(CategoryId);
    if (!deletedCategory) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }

    return deletedCategory;
  }
}
