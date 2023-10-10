import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'This field must be input' })
  role: string;
}

export class AddPermissionDto {
  @IsNotEmpty({ message: 'This field must be input' })
  idRole: string;
  @IsNotEmpty({ message: 'This field must be input' })
  idPermission: number[];
}
