import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {

  @IsString({ message: 'The name must be a string.' })
  @IsNotEmpty({ message: 'The name is required.' })
  @MinLength(3, { message: 'The name must be at least 3 characters long.' })
  @MaxLength(30, { message: 'The name must not exceed 30 characters.' })
  readonly name: string;

  @IsString({ message: 'The description must be a string.' })
  @IsNotEmpty({ message: 'The description is required.' })
  @MinLength(5, { message: 'The description must be at least 5 characters long.' })
  @MaxLength(200, { message: 'The description must not exceed 200 characters.' })
  readonly description: string;
}
