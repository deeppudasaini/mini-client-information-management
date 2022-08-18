import { IsBoolean, IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateFacebookDto {
    @IsNotEmpty()
    @IsString()
    profile_name: string;
    @IsNotEmpty()
    @IsUrl()
    profile_url: string;
    @IsNotEmpty()
    @IsInt()
    user_id: number;
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
