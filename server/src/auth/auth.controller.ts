import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
      if (!user) {
        throw new BadRequestException('Invalid username or password');
      }
      return this.authService.login(user);
    } catch (error) {
      console.error('Login error:', error);
      throw new BadRequestException('Invalid username or password');
    }
  }
}