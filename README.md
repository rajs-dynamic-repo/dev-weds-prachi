# Dev & Prachi

A single-page wedding invitation. Guests choose a side, then scroll through the celebration. It is a static site, ready for GitHub Pages at `https://<owner>.github.io/<repository>/`.

## Personalise

Edit [src/content/wedding.ts](src/content/wedding.ts). Names, the wedding date, city, venue, celebrations, family labels, notes, Instagram handle, and the RSVP address all live in that file.

- `dateISO` drives the countdown and the scratch card. Keep the `+05:30` offset if the celebration is in India.
- `rsvpEndpoint` can be a Formspree (or similar) URL that accepts a JSON post. Leave it empty to open a mail draft instead.
- `rsvpEmail` is the address used in that draft.
- `instagram` is the handle without a full URL. Leave it empty until you have one.
- Replace `public/audio/ambient.wav` if you want a different loop. Use a track you have the right to share. `npm run audio` rebuilds the included soft loop.

Wishes are saved in the guest's browser only. GitHub Pages has no database.

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
