import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service'; 
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addFavorite(@Body() body: { username: string; city: string }) {
    return this.favoritesService.addFavorite(body.username, body.city);
  }

  @Delete()
  removeFavorite(@Body() body: { username: string; city: string }) {
    return this.favoritesService.removeFavorite(body.username, body.city);
  }

  @Get(':username')
  getFavorites(@Param('username') username: string) {
    return this.favoritesService.getFavorites(username);
  }
}