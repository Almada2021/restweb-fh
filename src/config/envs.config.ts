import "dotenv/config";

import { get } from "env-var";

export const envs = {
  // PORT LISTEN
  PORT: get("PORT").required().asPortNumber(),
  //Public folders
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};
