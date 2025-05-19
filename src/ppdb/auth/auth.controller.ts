import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post('register')
    async register(@Body()payload:RegisterDto){
        return this.authService.register(payload);
    }

    @Post('login')
    async login(@Body()payload:LoginDto){
        return this.authService.login(payload);
    }

    @UseGuards(JwtGuard)
    @Get('profile')
    async profile(){
        return this.authService.profile();
    }
}
