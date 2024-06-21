import type { Primitive } from "@nestia/fetcher";
import typia from "typia";

import api from "../../../../src/api";
import type { aa } from "../../../../src/app.controller";

export const test_api_aa_getHello = async (connection: api.IConnection) => {
  const output: Primitive<aa> = await api.functional.aa.getHello(connection);
  typia.assert(output);
};
