import type { Primitive } from "@nestia/fetcher";
import typia from "typia";

import api from "../../../../src/api";
import type { UserEntity } from "../../../../src/entities/user.entity";

export const test_api_sayHello = async (connection: api.IConnection) => {
  const output: Primitive<Array<UserEntity>> =
    await api.functional.sayHello(connection);
  typia.assert(output);
};
