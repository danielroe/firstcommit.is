import * as v from "valibot";

const ResultsSchema = v.object({
  user: v.object({
    username: v.string(),
  }),
});

export const findUser = async (username: string) => {
  const output = await $fetch(`/users/find/${username}`, {
    baseURL: "https://ungh.cc",
  }).catch((e) => {
    // Still output the error in case you pipe the error stream to
    // a loggin service
    console.error(e);
    return {
      user: {
        username: null,
      },
    };
  });

  return ResultsSchema._parse(output).output?.user;
};
