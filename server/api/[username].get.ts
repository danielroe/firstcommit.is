import * as v from 'valibot'
import type { Output } from 'valibot'
import type { EventHandler, H3Event } from 'h3'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

  const $gh = $fetch.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': `Bearer ${config.github.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      Accept: 'application/vnd.github+json'
    }
  })

  async function getEvents(username: string) {
    const events = []
    let page = 1
    let data: Array<Output<typeof ghEvent>>
    do {
      data = await $gh(`/users/${username}/events`, {
        query: {
          per_page: 100,
          page
        },
      })
      // events.push(...data.map(e => ghEvent._parse(e).output).filter(Boolean))
      events.push(...data)
      page++
    } while (data?.length)
    return events
  }

  return defineCachedEventHandler(async event => {
    const username = getRouterParam(event as H3Event<any>, 'username')
    if (!username) throw createError({ message: 'username is required' })

    const events = await getEvents(username)
    const oldestCommit = events.filter(e => e?.type === 'PushEvent' || e?.type === 'PullRequestEvent').sort((a, b) => new Date(a!.created_at).valueOf() - new Date(b!.created_at).valueOf())[0]

    return oldestCommit
  }) as EventHandler<{}, Output<typeof ghEvent>>
})

const ghEvent = v.object({
  type: v.string(),
  actor: v.object({
    login: v.string(),
    avatar_url: v.string(),
    display_login: v.string()
  }),
  repo: v.object({
    name: v.string(),
    url: v.string()
  }),
  created_at: v.string(),
  payload: v.object({
    commits: v.array(v.object({
      message: v.string(),
      sha: v.string(),
      url: v.string()
    }))
  })
})
