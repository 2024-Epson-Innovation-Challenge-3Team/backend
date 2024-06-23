import { Controller } from "@nestjs/common";
import { TypedRoute } from "@nestia/core";
import { UserService } from "./user.service";
import { CurrentUser } from "../auth/jwt/getUser.decorator";
import { UserLoginType } from "../auth/userLogin.type";
import { ApiTags } from "@nestjs/swagger";

type LoginRes = { id: number; name: string };

@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Get()
  async currentUserInfo(
    @CurrentUser() { id }: UserLoginType,
  ): Promise<LoginRes> {
    const userEntities = await this.userService.currentUserInfo(id);
    return { id: userEntities!.id, name: userEntities!.name };
  }
}
