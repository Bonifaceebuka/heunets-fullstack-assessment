import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignupInputsDto {
    @ApiProperty({ required: true, example: 'boniface.ebuka@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ required: true, example: 'AgboBonifaceEbuka' })
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty({ required: true, example: 'Agbo Boniface Ebuka' })
    @IsString()
    @IsNotEmpty()
    full_name!: string;
}