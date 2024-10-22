import { IsNotEmpty, IsString } from 'class-validator';

export class AddFavoriteCityDto {
  @IsNotEmpty()
  @IsString()
  readonly city: string;
}