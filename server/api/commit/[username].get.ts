import * as v from 'valibot'
import type { H3Event } from 'h3'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const username = getRouterParam(event as H3Event, 'username')
  if (!username || !username.match(/^[\w\-\d]+$/)) throw createError({ message: 'username is required' })

  const $gh = $fetch.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': `Bearer ${config.github.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      Accept: 'application/vnd.github+json'
    },
  })

  const [user, results] = await Promise.allSettled([
    $gh(`/users/${encodeURIComponent(username)}`),
    $gh('/search/commits', {
      query: {
        q: `author:${encodeURIComponent(username)}`,
        order: 'asc',
        sort: 'committer-date',
        per_page: 1
      }
    })
  ])
  if (user.status === 'rejected') {
    throw createError({ statusCode: 404, message: 'user not found' })
  }
  if (results.status === 'rejected') {
    throw createError({ statusCode: 500, message: 'github api error' })
  }
  const [commit] = v.parse(ResultsSchema, results.value).items
  if (!commit) {
    // @ts-expect-error unknown property
    if (results?.total_count) {
      console.log(JSON.stringify(v.safeParse(ResultsSchema, results).issues))
    }
    throw createError({ statusCode: 404, message: 'no commits to show' })
  }
  const parsedUser = v.parse(UserSchema, user.value)

  return {
    date: commit.commit.author.date,
    avatar: parsedUser?.avatar_url || commit.author.avatar_url,
    link: commit.html_url,
    message: commit.commit.message,
    username: parsedUser?.login || commit.author.login,
    author: parsedUser?.name || commit.commit.author.name,
    authorUrl: commit.author.html_url,
    org: {
      avatar: commit.repository.owner.avatar_url,
      name: commit.repository.owner.login,
      repository: commit.repository.full_name
    }
  }
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

const UserSchema = v.object({
  login: v.string(),
  name: v.string(),
  html_url: v.string(),
  avatar_url: v.string(),
})
