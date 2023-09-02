import * as v from "valibot";
import type { H3Event } from "h3";
import { findUser } from "~/lib/gh";

export default defineEventHandler(async (event) => {
  const username = getRouterParam(event as H3Event<any>, "username");

  if (!username || !username.match(/^[\w\-\d]+$/))
    throw createError({ message: "username is required" });

  const results = await findUser(username);

  return {
    exists: results?.username || false,
  };
});
