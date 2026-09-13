# Marks

Derived. These are copies, and the originals live in `brand/assets` in the application repository, beside the specification that measures them.
Edit them there and copy them here; a change made in this folder is lost the next time the two are reconciled, and nothing will say so.

`greatbook-icon.svg` is a copy of that repository's `public/icon.svg`, which is itself written by its `scripts/make-icons.mjs` — so it carries the rounded corners the app's favicon has, rather than the square tile the drawing is.

The PNGs are rendered, not drawn: `scripts/site-brand-assets.mjs` in the application repository writes them here from the same SVGs.
Re-run it there after any change to a mark.
There is one of each per identity — `card-*.png` is the 1200×630 picture a link unfurls as, `apple-touch-*.png` is what a home screen shows, and `favicon-*.png` is for anything that will not take the SVG.

A directory under `site/` is invisible to the passthrough copy in `build.mjs`, which is files only.
Nothing here reaches the built site by being here: `build.mjs` copies each root's icons and rasters explicitly under a shared name, and inlines the wordmarks into the page template.
