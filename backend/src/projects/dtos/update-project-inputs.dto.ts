import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { IsString, MinLength } from "class-validator";

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: "Project name must not be less than 5 characters",
  })
  @MaxLength(200,
    {
      message: "Project name must not be more than 160 characters",
    }
  )
  @ApiProperty({ required: false, example: 'Heunets Career Module' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
   @MinLength(50, {
    message: "Project description must not be less than 50 characters",
  })
  @ApiProperty({ required: false, example: 'This is Heunets Career Module new projects that I am testing to see what happens with the DTO' })
  description?: string;
}
