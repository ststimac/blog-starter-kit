# Blog Starter Kit

Netlify + [Eleventy (11ty)](https://www.11ty.dev/) **starter templates** for lifestyle, food, and style bloggers. Fork one, customize it, and deploy to Netlify in minutes.

These are generic starter kits — not a live site. For a real-world example built from the lifestyle template, see [thehermeshomestead.com](https://thehermeshomestead.com).

## Templates

| Template | Description | Dev command |
|---|---|---|
| [**Lifestyle**](templates/lifestyle/) | Travel, garden, home — warm cream & gold editorial layout | `npm run dev:lifestyle` |
| [**Food Blogger**](templates/food-blogger/) | Recipes with structured recipe cards, seasonal categories | `npm run dev:food` |
| [**Style Blogger**](templates/style-blogger/) | Editorial grid, shop-the-post blocks, affiliate disclosure | `npm run dev:style` |

## Quick start

```bash
git clone <your-repo-url>
cd blog-starter-kit
npm install
npm run dev:lifestyle
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy to Netlify

1. Push to GitHub.
2. Import the repo in [Netlify](https://app.netlify.com/).
3. Set **base directory** to `templates/lifestyle` (or your chosen template).
4. Build command: `npm install && npm run build`
5. Publish directory: `_site`

See the full [setup guide](docs/setup-guide.md) for customization, custom domains, and WordPress migration.

## What's included

- Responsive layout with featured hero, 2-column post grid, and sidebar
- Category archive pages generated from post front matter
- RSS feed at `/feed.xml`
- Recipe cards (food template) and shop-the-post grids (style template)
- Netlify Forms on Contact and newsletter widgets
- CSS variable theming — swap colors per template in `theme.css`
- Sample posts with Unsplash placeholder images

## Customize

Edit `templates/<name>/src/_data/site.json` for site title, navigation, social links, and author info. Write posts as Markdown in `src/posts/`.

## License

MIT
