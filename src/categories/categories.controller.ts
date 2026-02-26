import { Controller, Get, Post, Res, Body, Put, Param, Delete, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // CREATE
  @Post()
  async createCategory(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoriesService.createCategory(createCategoryDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        status: HttpStatus.CREATED,
        data: newCategory,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.response || err.message || 'Error: Category not created',
        status: err.status || HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // UPDATE
  @Put('/:id')
  async updateCategory(@Res() response, @Param('id') CategoryId: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoriesService.updateCategory(CategoryId, updateCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        status: HttpStatus.OK,
        data: updatedCategory,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.response || err.message || 'Error updating category',
        status: err.status || HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // GET ALL
  @Get()
  async getCategories(@Res() response) {
    try {
      const categories = await this.categoriesService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message: 'All categories retrieved successfully',
        status: HttpStatus.OK,
        data: categories,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.response || err.message || 'Error retrieving categories',
        status: err.status || HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // GET ONE
  @Get('/:id')
  async getCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const category = await this.categoriesService.getCategory(CategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Category retrieved successfully',
        status: HttpStatus.OK,
        data: category,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.response || err.message || 'Error retrieving category',
        status: err.status || HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // DELETE
  @Delete('/:id')
  async deleteCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const deletedCategory = await this.categoriesService.deleteCategory(CategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Category deleted successfully',
        status: HttpStatus.OK,
        data: deletedCategory,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.response || err.message || 'Error deleting category',
        status: err.status || HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
