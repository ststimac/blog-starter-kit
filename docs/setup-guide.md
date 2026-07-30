# How to Set Up Your Blog on Netlify

This guide walks you through deploying one of the blog-starter-kit templates to Netlify — no WordPress, no server maintenance, just Markdown files in Git.

## Choose a template

| Template | Best for | Folder |
|---|---|---|
| **Lifestyle** | Travel, garden, home — inspired by [The Hermes Homestead](https://thehermeshomestead.com) | `templates/lifestyle` |
| **Food Blogger** | Recipes, seasonal cooking, kitchen stories | `templates/food-blogger` |
| **Style Blogger** | Outfits, fashion finds, shop-the-post | `templates/style-blogger` |

## Option A: Deploy to Netlify (recommended)

1. Push this repo to GitHub.
2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site → Import an existing project**.
3. Connect your GitHub repo.
4. Configure the build settings:

   | Setting | Value |
   |---|---|
   | **Base directory** | `templates/lifestyle` (or `food-blogger` / `style-blogger`) |
   | **Build command** | `npm install && npm run build` |
   | **Publish directory** | `_site` |
   | **Node version** | 20 |

5. Click **Deploy site**. Netlify builds and hosts your blog automatically on every git push.

## Option B: Run locally first

From the repo root:

```bash
npm install
npm run dev:lifestyle   # or dev:food / dev:style
```

Open [http://localhost:8080](http://localhost:8080) to preview.

To build for production:

```bash
npm run build:lifestyle
```

Output goes to `templates/lifestyle/_site/`.

## Customize your site

All site-wide settings live in one file:

```
templates/lifestyle/src/_data/site.json
```

Edit this to change:

- **title** — your blog name
- **tagline** — subtitle under the logo
- **url** — your live domain (needed for RSS)
- **navigation** — top menu links
- **social** — social media links in the header
- **author** — name, bio, and photo for the sidebar
- **newsletter** — subscribe widget text
- **affiliateDisclosure** — footer disclosure text

### Colors and fonts

Each template has a theme file you can edit:

```
templates/lifestyle/src/assets/css/theme.css
```

This overrides CSS variables like `--color-cream`, `--color-accent`, and `--color-text`. The lifestyle template uses the same warm cream and gold palette as The Hermes Homestead.

### Logo

Add your logo image to `src/assets/images/` and set the path in `site.json`:

```json
"logo": "/assets/images/my-logo.svg"
```

If you leave `logo` empty, the site title displays as text instead.

## Write posts

Create a new Markdown file in `src/posts/`:

```markdown
---
layout: layouts/post.njk
title: "My New Post"
description: "A short summary for the homepage and RSS feed."
date: 2024-10-15
categories:
  - travel
tags:
  - scotland
featured: true
image: /assets/images/my-photo.jpg
imageAlt: Description of the image
permalink: /posts/my-new-post/
---

Your post content goes here. Write in Markdown.
```

### Food posts with recipes

Add a `recipe` block to the front matter (see `roasted-tomato-basil-soup.md` for a full example):

```yaml
recipe:
  title: "Recipe Name"
  prepTime: "15 min"
  cookTime: "45 min"
  servings: "4"
  ingredients:
    - "2 cups flour"
  instructions:
    - "Mix and bake."
```

### Style posts with shop links

Add `shopItems` to the front matter:

```yaml
shopItems:
  - name: "Wool Coat"
    url: "https://shop-link.com"
    image: "/assets/images/coat.jpg"
```

## Pages

Static pages (About, Contact) go in `src/pages/`. The Contact page includes a Netlify Forms example — forms work automatically once deployed to Netlify.

## Connect a custom domain

1. In Netlify, go to **Site settings → Domain management**.
2. Add your custom domain (e.g. `thehermeshomestead.com`).
3. Update DNS at your registrar to point to Netlify (Netlify shows you the exact records).
4. Update `site.json` → `url` to match your domain (for RSS and canonical links).

## Migrate from WordPress

Your WordPress site exposes posts via its REST API. A one-time export script can pull posts into Markdown:

```
GET https://yoursite.com/wp-json/wp/v2/posts?per_page=100&page=1
```

Each post returns `title.rendered`, `content.rendered`, `date`, `categories`, and featured image URLs. A migration script maps these to the front matter format above.

If you want help building that migration script for The Hermes Homestead specifically, that's a natural next step.

## Project structure

```
blog-starter-kit/
├── shared/                    # Shared layouts, CSS, and 11ty config
│   ├── _includes/
│   │   ├── layouts/           # base, home, post, page
│   │   └── partials/        # nav, sidebar, post-card, recipe, shop
│   └── assets/css/base.css    # Core design system
├── templates/
│   ├── lifestyle/             # Hermes Homestead-inspired theme
│   ├── food-blogger/          # Recipe-focused theme
│   └── style-blogger/         # Fashion / shop-the-post theme
├── docs/setup-guide.md        # This file
└── netlify.toml               # Default Netlify config
```

## Troubleshooting

**Build fails on Netlify:** Make sure the base directory is set correctly (`templates/lifestyle`, not the repo root).

**Images not showing:** Use paths starting with `/assets/` for local images, or full URLs for external images (Unsplash, etc.).

**RSS feed empty:** Set `url` in `site.json` to your live domain.

**Categories 404:** Posts need a `categories` array in front matter. Category pages are generated automatically from those values.
