# Image assets

All page images are served locally from `public/images/`. WebP versions are the runtime assets; original downloads are retained for replacement or reprocessing.

## Generated hero

Built-in image generation tool, saved as `public/images/mediterranean.png`, optimized to `public/images/mediterranean.webp`.

Prompt:
> Use case: photorealistic-natural. Create a single premium editorial travel photograph for a boutique personal travel planner website hero. Landscape 3:2 composition. View from an elegant ivory Mediterranean terrace over an intimate turquoise coastal cove, distant mountains, cream beach umbrellas and a tiny sailboat. Bougainvillea branches frame upper right, sunwashed stone steps in foreground, calm rich blue sea. Natural afternoon sunlight, fine photographic grain, understated luxury travel magazine photography, believable architectural detail, warm sand and deep navy tones. No people, no words, no logos, no collage, no borders. Full bleed photograph.

This is illustrative travel imagery, not an actual destination or property listing.

## Prototype photography

Downloaded at 1200px wide from Unsplash's image host. These are replaceable visual placeholders; no endorsement or affiliation is implied.

| Asset | Source |
| --- | --- |
| beach | https://images.unsplash.com/photo-1519046904884-53103b34b206 |
| resort | https://images.unsplash.com/photo-1571896349842-33c89424de2d |
| parks | https://images.unsplash.com/photo-1597466599360-3b9775841aec |
| cruise | https://images.unsplash.com/photo-1548574505-5e239809ee19 |
| europe | https://images.unsplash.com/photo-1514890547357-a9ee288728e0 |
| newyork | https://images.unsplash.com/photo-1485871981521-5b1fd3805eee |

No Disney or Universal logos are included. The portrait slot deliberately shows travel inspiration instead of inventing Dianita's appearance.

## Real photography redesign

All nine user-supplied originals in `public/imagenes/imagenes/` were inspected. Their untouched filenames and dimensions are recorded in `qa/photos/inventory.json`; their descriptive asset names are mapped in `qa/photos/assignments.json`. Runtime derivatives are served from `public/imagenes/dianita/`. `src/travelPhotos.js` is the source of truth for placement metadata and alt text.

The generated Mediterranean hero and generic stock destination images are no longer used in the hero, about, Disney, diary or real-photo destination postcards. Resort and cruise placeholders remain for services not represented in the supplied photos. No new AI imagery was generated for this redesign.

## Supplied dreamy sky

Source: `public/imagenes/Imagen de ChatGPT 28 sept 2026, 03_14_22 a.m..png`.
Copied unchanged to `public/images/dianita-bg.png` and optimized to `dianita-bg-800.webp` and `dianita-bg-1600.webp`. The hero uses those responsive derivatives with separate slow CSS motion and a contrast overlay. Original artwork and photographs remain intact.
