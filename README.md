# V2 Rehab — website

A single-page site for Vignesh's physiotherapy practice (V2 Rehab), Vellore.
Plain HTML/CSS/JS — no build step, no framework, no hosting cost beyond a
domain.

## Before this goes live

Every real-world fact on this site (phone, address, fees, qualifications,
hours) is a placeholder pulled from **[js/config.js](js/config.js)**. Open
that file and fill in every line marked `// TODO`. Nothing else needs to be
touched for day-to-day updates.

Specifically confirm with Vignesh:
- Real phone number and clinic address
- His actual qualification (currently placeholder `"BPT"`) and Tamil Nadu
  Physiotherapy Council registration number, if he has one
- Where he trained — his Instagram bio shows `#psg IMSR`, read here as
  **PSG Institute of Medical Sciences & Research** — confirm the exact name
- Fees (or decide to keep them hidden — see `fees` in config.js)
- Real home-visit coverage areas in Vellore (placeholders are guesses)
- A real photo, dropped in as `img/vignesh.jpg` and swapped into the
  `.about__photo` block in `index.html` (currently a placeholder card)

The **About** section wraps two lines in a soft yellow highlight
(`.ph` class) wherever content is still unconfirmed — that's intentional,
so nothing fabricated slips onto the live site unnoticed. Once confirmed,
those lines render as plain text automatically (the highlight is just a
visual flag for placeholder values pulled from config).

## Structure

```
index.html        — all content and markup
css/styles.css     — all styling (single file, CSS variables for theming)
js/config.js       — every editable fact: phone, address, hours, fees, links
js/i18n.js          — English + Tamil copy (edit translations here)
js/app.js           — behaviour: nav, language switch, form, WhatsApp links
img/logo-mark.svg   — redrawn V2 Rehab badge (favicon + header + footer)
```

## Common edits

- **Change the phone number, address, or hours** → `js/config.js`
- **Change any English or Tamil wording** → `js/i18n.js` (matching keys in
  both `en` and `ta` objects — keep both in sync)
- **Add/remove a service, condition, or FAQ item** → edit the relevant
  section in `index.html`, then add matching `en`/`ta` entries in
  `js/i18n.js`

## Contact form

The form works without any setup — it opens WhatsApp pre-filled with the
enquiry if no backend is configured. To have submissions land in email
instead:

1. Go to [web3forms.com](https://web3forms.com), sign up with Vignesh's
   email, and copy the access key it gives you.
2. Paste it into `web3formsKey` in `js/config.js`.

That's it — no server needed.

## Google Map

Get an embeddable map link: Google Maps → search the clinic → **Share** →
**Embed a map** → copy the `src="..."` URL → paste into `clinic.mapEmbed`
in `js/config.js`. Leave it blank to hide the map block.

## Deploying

This is static files — any of these work and are free for a site this size:

- **Netlify / Vercel**: drag the folder into their dashboard, or connect a
  GitHub repo
- **GitHub Pages**: push this folder to a repo, enable Pages in settings

Point the domain (e.g. `v2rehab.in`) at whichever host is chosen, and
update `siteUrl` in `js/config.js`.

## Notes

- The Tamil translations in `js/i18n.js` are a first pass — have Vignesh
  read the Tamil tab before launch, since it's health information reaching
  real patients.
- The Google-rating stat and the fee amounts are hidden automatically until
  real values are added to `config.js` — no fabricated numbers ship by
  default.
