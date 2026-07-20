import * as v from 'valibot'
import type { H3Event } from 'h3'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const owner = getRouterParam(event as H3Event, 'owner')
  const repo = getRouterParam(event as H3Event, 'repo')
  if (!owner || !repo || !owner.match(/^[\w\-\d]+$/) || !repo.match(/^[\w\-.\d]+$/)) {
    throw createError({ message: 'owner/repo is required' })
  }

  const ghHeaders = {
    'Authorization': `Bearer ${config.github.token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: 'application/vnd.github+json'
  }

  const $gh = $fetch.create({ baseURL: 'https://api.github.com', headers: ghHeaders })

  // Fetch repo info and first page of commits to get pagination Link header
  const repoPath = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
  const [repoInfo, firstPage] = await Promise.allSettled([
    $gh(repoPath),
    $fetch.raw(`https://api.github.com${repoPath}/commits`, {
      query: { per_page: 1 },
      headers: ghHeaders,
    })
  ])
  if (repoInfo.status === 'rejected') {
    throw createError({ statusCode: 404, message: 'repository not found' })
  }
  if (firstPage.status === 'rejected') {
    throw createError({ statusCode: 500, message: 'github api error' })
  }

  // Extract last page from Link header to find the oldest commit
  const linkHeader = firstPage.value.headers.get('link') || ''
  const lastPageMatch = linkHeader.match(/[&?]page=(\d+)>;\s*rel="last"/)
  let commitData
  if (lastPageMatch) {
    const lastPage = lastPageMatch[1]
    commitData = await $gh(`${repoPath}/commits`, { query: { per_page: 1, page: lastPage } })
  } else {
    // Only one page of commits
    commitData = firstPage.value._data
  }

  const [commit] = v.parse(CommitsSchema, commitData)
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

const CommitsSchema = v.array(v.object({
  html_url: v.string(),
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

const RepoSchema = v.object({
  full_name: v.string(),
  html_url: v.string(),
  description: v.nullable(v.string()),
  owner: v.object({
    login: v.string(),
    avatar_url: v.string(),
  }),
})
