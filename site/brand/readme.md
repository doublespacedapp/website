# Marks

Derived. These are copies, and the originals live in `brand/assets` in the application repository, beside the specification that measures them.
Edit them there and copy them here; a change made in this folder is lost the next time the two are reconciled, and nothing will say so.

`greatbook-icon.svg` is a copy of that repository's `public/icon.svg`, which is itself written by its `scripts/make-icons.mjs` — so it carries the rounded corners the app's favicon has, rather than the square tile the drawing is.

A directory under `site/` is invisible to the passthrough copy in `build.mjs`, which is files only.
Nothing here reaches the built site by being here: `build.mjs` writes each root's favicon explicitly and inlines the two wordmarks into the page template.
