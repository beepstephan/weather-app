import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ username, password: hashedPassword });
    return this.usersRepository.save(newUser);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async addFavoriteCity(username: string, city: string): Promise<User> {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.favorites.includes(city)) {
      throw new BadRequestException('City is already in favorites');
    }
    user.favorites.push(city);
    return this.usersRepository.save(user);
  }

  async removeFavoriteCity(username: string, city: string): Promise<User> {
    const user = await this.findOne(username);
    user.favorites = user.favorites.filter(favCity => favCity !== city);
    return this.usersRepository.save(user);
  }

  async getFavoriteCities(username: string): Promise<string[]> {
    const user = await this.findOne(username);
    return user.favorites;
  }
}