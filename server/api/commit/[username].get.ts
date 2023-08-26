import * as v from 'valibot'
import type { H3Event } from 'h3'

export default defineCachedEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const username = getRouterParam(event as H3Event<any>, 'username')
  if (!username || !username.match(/^[\w\d]+$/)) throw createError({ message: 'username is required' })

  const results = await $fetch('/search/commits', {
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': `Bearer ${config.github.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      Accept: 'application/vnd.github+json'
    },
    query: {
      q: `author:${username}`,
      order: 'asc',
      sort: 'committer-date',
      per_page: 1
    }
  })
  const firstCommit = ResultsSchema._parse(results).output?.items[0]
  if (!firstCommit) {
    // @ts-expect-error unknown
    if (results?.total_count) {
      console.log(JSON.stringify(ResultsSchema._parse(results).issues))
    }
    throw createError({ statusCode: 404, message: 'no commits found' })
  }

  return firstCommit
})

const ResultsSchema = v.object({
  total_count: v.number(),
  items: v.array(v.object({
    html_url: v.string(),
    repository: v.object({
      full_name: v.string(),
      html_url: v.string(),
      owner: v.object({
        avatar_url: v.string(),
        login: v.string(),
      })
    }),
    commit: v.object({
      message: v.string(),
      author: v.object({
        date: v.string(),
        name: v.string(),
        email: v.string(),
      }),
    }),
    author: v.object({
      login: v.string(),
      avatar_url: v.string(),
      html_url: v.string(),
    })
  }))
})

