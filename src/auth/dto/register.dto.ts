import { IsBoolean,  IsDefined,  IsInt, IsNotEmpty,  IsString,  MinLength } from "class-validator";
import { Type } from 'class-transformer';
export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    
    first_name: string;
    @IsNotEmpty()
    @IsString()
    
    last_name:string;
    @IsNotEmpty()
    @MinLength(8)
    username:string;
    @IsNotEmpty()
    @MinLength(8)
    password:string;
    
    @IsNotEmpty()
    @IsInt()
    
    role:number;
    @IsNotEmpty()
    @IsBoolean()
    status:boolean;
    
}
