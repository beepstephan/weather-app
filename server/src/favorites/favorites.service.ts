import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
  ) {}

  async addFavorite(username: string, city: string) {
    const favorite = this.favoritesRepository.create({ username, city });
    return this.favoritesRepository.save(favorite);
  }

  async removeFavorite(username: string, city: string) {
    const favorite = await this.favoritesRepository.findOne({ where: { username, city } });
    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }
    return this.favoritesRepository.remove(favorite);
  }

  async getFavorites(username: string) {
    return this.favoritesRepository.find({ where: { username } });
  }
}
