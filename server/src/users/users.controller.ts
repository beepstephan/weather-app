import { Controller, Post, Delete, Get, Body, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddFavoriteCityDto } from './dto/add-favorite-city.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    return this.usersService.create(createUserDto.username, createUserDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username/favorites')
  async addFavoriteCity(@Param('username') username: string, @Body() addFavoriteCityDto: AddFavoriteCityDto) {
    return this.usersService.addFavoriteCity(username, addFavoriteCityDto.city);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username/favorites')
  async removeFavoriteCity(@Param('username') username: string, @Body() addFavoriteCityDto: AddFavoriteCityDto) {
    return this.usersService.removeFavoriteCity(username, addFavoriteCityDto.city);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/favorites')
  async getFavoriteCities(@Param('username') username: string) {
    return this.usersService.getFavoriteCities(username);
  }
}
