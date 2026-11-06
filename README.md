# Dev & Prachi

A single-page wedding invitation. Guests choose a side, then scroll through the celebration. It is a static site, ready for GitHub Pages at `https://<owner>.github.io/<repository>/`.

## Personalise

Edit [src/content/wedding.ts](src/content/wedding.ts). Names, the wedding date, city, venue, celebrations, family labels, notes, and the Instagram handle all live in that file.

- `dateISO` drives the countdown and the scratch card. Keep the `+05:30` offset if the celebration is in India.
- `instagram` is the handle without a full URL. Leave it empty until you have one.
- `wishesUrl` is the Google Sheet guestbook. Leave it empty and each guest's wishes stay in their own browser. Paste the Apps Script URL from [scripts/guestbook.gs](scripts/guestbook.gs) to show the same wishes to every visitor.

Wishes are shared only after `wishesUrl` is set. Until then they stay in the guest's browser. GitHub Pages has no database of its own.

## Run it locally

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

1. Create a repository and push this project to `main`.
2. In the repository, open Settings → Pages → Build and deployment, and choose **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/pages.yml` builds the site and publishes it.
4. Open `https://<owner>.github.io/<repository>/`.

Assets use relative paths, so the same build works for a user site or a project site.
