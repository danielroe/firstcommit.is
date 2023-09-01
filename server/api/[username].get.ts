import * as v from "valibot";
import type { H3Event } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const username = getRouterParam(event as H3Event<any>, "username");

  if (!username || !username.match(/^[\w\-\d]+$/))
    throw createError({ message: "username is required" });

  const results = await $fetch(`/users/${username}`, {
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `Bearer ${config.github.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
  }).catch((e) => {
    // Still output the error in case you pipe the error stream to
    // a loggin service
    console.error(e);
    return {
      login: false,
    };
  });

  const commit = ResultsSchema._parse(results);

  return {
    exists: Boolean(commit.output?.login) || false,
  };
});

const ResultsSchema = v.object({
  login: v.string(),
});
