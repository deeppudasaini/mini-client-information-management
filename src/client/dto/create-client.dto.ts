import { IsBoolean, IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    
    first_name: string;
    @IsNotEmpty()
    @IsString()
    
    last_name:string;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;
    
    @IsNotEmpty()
    @IsUrl()
    
    profileUrl: string;
    @IsNotEmpty()
    @IsUrl()

    department: string;
    @IsNotEmpty()
    @IsInt()
    facebook_id:number;
    @IsNotEmpty()
    @IsInt()
    user_id:number;
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
