import type { Primitive } from "@nestia/fetcher";
import typia from "typia";

import api from "../../../../src/api";
import type { UserEntity } from "../../../../src/entities/user.entity";

export const test_api_insertIpnitValue_insertInitValue = async (
  connection: api.IConnection,
) => {
  const output: Primitive<UserEntity> =
    await api.functional.insertIpnitValue.insertInitValue(connection);
  typia.assert(output);
};
