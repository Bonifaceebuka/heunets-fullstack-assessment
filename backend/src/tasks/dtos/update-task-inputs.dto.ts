import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { IsString, MinLength } from "class-validator";

export class UpdateTaskDto {
  @IsString()
  @MinLength(5, {
    message: "Task name must not be less than 5 characters",
  })
  @MaxLength(200,
    {
      message: "Task name must not be more than 160 characters",
    }
  )
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'Heunets Career Module' })
  title!: string;

  @IsString()
  @IsNotEmpty()
   @MinLength(50, {
    message: "Task description must not be less than 50 characters",
  })
  @ApiProperty({ required: true, example: 'This is Heunets Career Module new tasks that I am testing to see what happens with the DTO' })
  description!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false, example: 'low' })
  priority!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false, example: 'pending' })
  status!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: '2026-06-29' })
  end_date?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: '2026-06-29' })
  start_date?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 'low' })
  assigned_to?: string;
}
