# aubrika.github.io

Personal site, built with [Zola](https://www.getzola.org/) 0.19.2 and published to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Add a post

Drop a Markdown file in `content/blog/` with a front-matter block, then push to `main`:

```toml
+++
title = "Post title"
date = 2026-11-02
description = "One sentence for the blog index, the feed and search results."
+++
```

The file name becomes the URL: `content/blog/my-post.md` is published at `/blog/my-post/`. Posts are listed newest first and appear in the Atom feed at `/blog/atom.xml`. To keep a post unpublished while you work on it, add `draft = true` to its front matter.

## Preview locally

```bash
zola serve
```

Then open http://127.0.0.1:1111. It rebuilds on save. `zola build` writes the site to `public/` (ignored by git), and `zola check` also checks links.

## Deploy

Pushing to `main` runs the workflow, which builds the site and deploys it to Pages. It can also be run by hand from the Actions tab ("Deploy site" → "Run workflow").

**First-time setup:** in the repository's Settings → Pages, set Source to **GitHub Actions**. Until then, Pages keeps serving the branch, and nothing the workflow builds goes live.

## Layout

- `templates/base.html`: the sidebar layout shared by every page. The nav link for the current top-level section is marked active.
- `templates/hero.html`: the landing page and the About, Projects and Contact pages; the hero text is `extra.hero` in each `content/<section>/_index.md`.
- `templates/blog.html`, `templates/page.html`: the blog index and posts.
- `static/style.css`: the site design (dark). `static/blog.css`: long-form reading, loaded only on blog pages, including the light color scheme.
- `static/wave.js`: the click pulse-wave through the hero text.

## Custom domain later

1. Change `base_url` in `config.toml` to the new address, e.g. `https://example.com`.
2. Add a file `static/CNAME` containing just the domain, e.g. `example.com`.
3. Add the domain in Settings → Pages → Custom domain, and set up DNS as GitHub describes there.
