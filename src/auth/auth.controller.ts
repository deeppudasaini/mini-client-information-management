import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    )
    {}
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto:AuthDto){
        return this.authService.login(dto);
    }
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() dto:RegisterDto)
    {
        const a =this.authService.register(dto)
        
        return a;
    }
}
