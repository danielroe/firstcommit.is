import * as v from 'valibot'
import type { H3Event } from 'h3'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const owner = getRouterParam(event as H3Event, 'owner')
  const repo = getRouterParam(event as H3Event, 'repo')
  if (!owner || !repo || !owner.match(/^[\w\-\d]+$/) || !repo.match(/^[\w\-.\d]+$/)) {
    throw createError({ message: 'owner/repo is required' })
  }

  const fullName = `${owner}/${repo}`

  const $gh = $fetch.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': `Bearer ${config.github.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      Accept: 'application/vnd.github+json'
    },
  })

  const [repoInfo, results] = await Promise.allSettled([
    $gh(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`),
    $gh('/search/commits', {
      query: {
        q: `repo:${encodeURIComponent(fullName)}`,
        order: 'asc',
        sort: 'committer-date',
        per_page: 1
      }
    })
  ])
  if (repoInfo.status === 'rejected') {
    throw createError({ statusCode: 404, message: 'repository not found' })
  }
  if (results.status === 'rejected') {
    throw createError({ statusCode: 500, message: 'github api error' })
  }
  const [commit] = v.parse(ResultsSchema, results.value).items
  if (!commit) {
    throw createError({ statusCode: 404, message: 'no commits to show' })
  }
  const parsedRepo = v.parse(RepoSchema, repoInfo.value)

  return {
    date: commit.commit.author.date,
    link: commit.html_url,
    message: commit.commit.message,
    author: commit.commit.author.name,
    authorAvatar: commit.author.avatar_url,
    authorLogin: commit.author.login,
    authorUrl: commit.author.html_url,
    repo: {
      fullName: parsedRepo.full_name,
      description: parsedRepo.description,
      avatar: parsedRepo.owner.avatar_url,
      owner: parsedRepo.owner.login,
      url: parsedRepo.html_url,
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

const RepoSchema = v.object({
  full_name: v.string(),
  html_url: v.string(),
  description: v.nullable(v.string()),
  owner: v.object({
    login: v.string(),
    avatar_url: v.string(),
  }),
})
