# Dianita's Travel World

A Spanish-language personal travel website, built with React and Vite. The redesign uses all nine supplied photographs alongside the existing trip inquiry experience.

## Run

```sh
npm install
npm run dev -- --port 5175 --strictPort
```

Open http://127.0.0.1:5175/.

```sh
npm run build
npm run preview -- --port 4175
npm test
node scripts/check-redesign.mjs
node scripts/check-route.mjs
```

The browser tests use installed Google Chrome in headless mode and expect the development server on port 5175. Reports and screenshots live in `qa/redesign/`.

## Main files

- `src/TravelWorld.jsx`: interactive hero, real-photo postcards, personal introduction, service previews, Disney section, scroll-driven route, diary, draggable destinations, finale and accessible photo viewer.
- `src/travelPhotos.js`: all nine photographs, location labels, alt text, crop positions and asset URLs.
- `src/travel-world.css`: scrapbook compositions, color blocks, responsive layouts and interaction styles.
- `src/App.jsx`: preserved navigation, process, cruises, inquiry form, footer and theme controls.
- `src/styles.css`: shared foundations and retained form/navigation/footer styling.
- `src/inquiry.js`: validation and inquiry formatting.
- `src/content.js`: contact placeholders, service descriptions and remaining stock photo sources.

## Photography

The originals were discovered in `public/imagenes/imagenes/` (an extra nested folder). They are untouched. All nine were visually reviewed before designing. Responsive WebP derivatives are in `public/imagenes/dianita/` at 480, 800 and 1200px widths.

| Photo | Visible context | Primary use |
| --- | --- | --- |
| paris-night | Eiffel Tower at night | Hero |
| disney-pink | Disney castle, pink top | Hero / Disney preview |
| brooklyn | Brooklyn Bridge | Hero / destination postcard |
| louvre | Louvre pyramid | About Dianita |
| disney-castle | Disney castle among trees | Disney experience |
| puerto-rico | Puerto Rican flag doorway | Travel diary |
| paris-fountains | Eiffel Tower and fountains | Travel diary |
| baseball | Baseball stadium | Travel diary, no unverified city label |
| overlook | Lakes and mountains | Travel diary / closing invitation, no unverified destination label |

Repetition is deliberate: the hero previews trips that can later be explored in the destination selector; the Disney section combines her two actual visits; the final photograph echoes the diary as an invitation to create the next memory. The full-screen viewer browses all nine images. Resort and cruise stock images remain only where no matching real photograph was supplied.

## Interaction and accessibility

- Hero depth responds to pointer position using CSS variables, without React updates on every frame.
- Polaroids straighten, lift and reveal locations on hover/focus. Visible captions remain available on touch devices.
- Native `dialog` contains keyboard focus, supports Escape, previous/next arrows and restores focus on close.
- Services respond to mouse hover, keyboard focus and touch.
- Destination postcards support native touch scrolling, desktop drag, arrow buttons and keyboard arrows.
- One marquee with pause/resume, pause on hover/focus and a static reduced-motion variant.
- Airplanes use CSS view timelines and offset paths. Unsupported browsers get a static route; reduced motion also gets a static route.
- Scroll reveals use IntersectionObserver. No scroll event listeners or animation dependencies were added.
- Existing light/dark themes, visible focus styles, form labels, validation and downloadable summaries remain.

## Remaining placeholders

Add the real WhatsApp number (international digits only), Instagram and Facebook URLs in `src/content.js`. Replace the explicitly labeled sample testimonial and add verified certification/agency information. The inquiry form validates and downloads a summary; it does not submit or persist personal information. Once a real WhatsApp number is configured, the summary can be opened in WhatsApp for the visitor to send.

## Design direction

Variance 8, motion 6, density 3. Pink, blue, white, yellow details, Polaroids and handwritten serif annotations follow the new brief. The brief explicitly overrides the generic Taste Skill restrictions on multicolor sections, photo labels, decorative travel details, emojis and the requested English diary title. Existing anchors and navigation labels are preserved.

## Final dreamy-sky direction

The supplied sky artwork was found as `public/imagenes/Imagen de ChatGPT 28 sept 2026, 03_14_22 a.m..png`. It was copied unchanged to `public/images/dianita-bg.png`; responsive WebP derivatives are used for the hero. No new generated art was substituted.

The hero has three independent 8/11/13-second floating animations, separate cursor-depth transforms, and distinct Polaroid, rounded, and taped frames. The headline remains still. Photo hover/focus pauses and straightens the selected frame. Background drift, clouds, hearts and stars use restrained CSS animations. A global pause/resume control and `prefers-reduced-motion` stop ongoing motion; offscreen ambient sections pause automatically.

The final direction also adds the blue cruise interlude with scroll-linked imagery, a route drawing between planning steps, horizontal diary browsing on mobile, conversational form labels and a final pink invitation after the form. Existing inquiry validation, local download, gallery focus handling, destination prefilling, and navigation remain intact.

Run `node scripts/check-final-direction.mjs` for idle-animation, hover-pause, global-pause, reduced-motion, mobile, tablet and dark-mode checks. Results are saved in `qa/final/`.

Latest verification: `qa/final/VERIFICATION.md` and `qa/final/lighthouse.json`. Final local Lighthouse scores: 86 performance, 100 accessibility, 100 best practices, 100 SEO. This does not represent field performance on a deployed host.
