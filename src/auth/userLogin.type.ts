import { UserEntity } from '../entities/user.entity';

export type UserLoginType = {
  id: UserEntity['id'];
  username: string;
};
