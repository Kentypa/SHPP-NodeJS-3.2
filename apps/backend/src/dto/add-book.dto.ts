import { IsNotEmpty, IsString } from "class-validator";

export class AddBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
