import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { IsString, MinLength } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MinLength(5, {
    message: "Project name must not be less than 5 characters",
  })
  @MaxLength(200,
    {
      message: "Project name must not be more than 160 characters",
    }
  )
  @ApiProperty({ required: true, example: 'Heunets Career Module' })
  name!: string;

  @IsString()
  @IsNotEmpty()
   @MinLength(50, {
    message: "Project description must not be less than 50 characters",
  })
  @ApiProperty({ required: true, example: 'This is Heunets Career Module new projects that I am testing to see what happens with the DTO' })
  description!: string;
}
