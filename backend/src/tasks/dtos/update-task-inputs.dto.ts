import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { IsString, MinLength } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: "Task name must not be less than 5 characters",
  })
  @MaxLength(200,
    {
      message: "Task name must not be more than 160 characters",
    }
  )
  @ApiProperty({ required: false, example: 'Heunets Career Module' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
   @MinLength(50, {
    message: "Task description must not be less than 50 characters",
  })
  @ApiProperty({ required: false, example: 'This is Heunets Career Module new tasks that I am testing to see what happens with the DTO' })
  description?: string;
}
