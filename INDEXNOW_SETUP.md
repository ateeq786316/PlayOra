# IndexNow (Bing/Copilot crawl boost) — PlayOra

This repo includes a helper script to submit URLs to IndexNow. This can speed up Bing discovery, which can help Bing-based experiences (including Copilot Search) cite your pages.

## 1) Generate an IndexNow key (Bing Webmaster Tools)
Go to Bing's IndexNow guide and generate a key:
https://www.bing.com/indexnow/getstarted

## 2) Host your key file on your site (Vercel + Vite)
1. Download the key from Bing (or copy it).
2. Create a file:
   - `public/<KEY>.txt`
3. Put the KEY as the **only content** inside that file (UTF-8).
4. Deploy to Vercel.

After deploy, this URL should work:
`https://www.playoraapp.com/<KEY>.txt`

## 3) Submit your URLs
Run locally:
```bash
node scripts/indexnow_submit.mjs <KEY>
```

This sends a POST request to `api.indexnow.org` as shown in Bing's docs.

## Notes
- IndexNow helps search engines discover changes faster, but it does not guarantee indexing immediately.
