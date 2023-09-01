# firstcommit.is

> Find your first open-source commit on GitHub

<p align="center">
  <a href="https://firstcommit.is/" target="_blank">
    <img width="1090" alt="Screenshot of firstcommit.is showing @danielroe's first commit" src="https://github.com/danielroe/firstcommit.is/assets/28706372/0117c4e2-aa2f-482d-ac58-a7195e5c4902">
  </a>
</p>

- [👉 &nbsp;Check it out](https://firstcommit.is/)

## Features

- Built on [Nuxt](https://nuxt.com/)
- [Nitro server API routes](https://nuxt.com/docs/guide/concepts/server-engine#server-engine)
- [GitHub API](https://docs.github.com/en/rest) and [OAuth](https://docs.github.com/en/apps/oauth-apps)
- [Cal Sans](https://github.com/calcom/font) font
- [Tailwind CSS](https://tailwindcss.com/)
- [nuxt-og-image](https://github.com/harlan-zw/nuxt-og-image), powered by [Satori](https://github.com/vercel/satori)
- Deployed on [Vercel](http://vercel.com), using ISR with [route rules](https://nitro.unjs.io/guide/cache#route-rules) to persist images, HTML and API requests permanently to a global CDN.

## Try it out locally

You will need to generate a new GitHub token [here](https://github.com/settings/tokens), as well as an OAuth client secret and client ID [here](https://github.com/settings/developers).

```env
NUXT_GITHUB_TOKEN=
NUXT_GITHUB_CLIENT_SECRET=
NUXT_GITHUB_CLIENT_ID=
```

### Setup

```bash
# install dependencies
corepack enable
pnpm install

# serve in dev mode, with hot reload at localhost:3000
pnpm dev

# build for production
pnpm build

# preview in production mode
pnpm preview
```

## Credits

Thanks to [**@beerose**](https://github.com/beerose) for the domain name suggestion!

## License

Made with ❤️

Published under [MIT License](./LICENCE).
