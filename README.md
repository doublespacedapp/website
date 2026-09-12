# Doublespaced

The website for Doublespaced, at [doublespaced.app](https://doublespaced.app).

Doublespaced makes software for teachers.
Today that is one product, Greatbook, a gradebook for teachers of any grade from kindergarten through twelfth.

**[Install Greatbook](https://doublespaced.app/greatbook/install.html)** or **[open the web app](https://doublespaced.app/greatbook/app/)**.

## This repository, and the two beside it

Three repositories, and the two public ones are easy to confuse.
This one holds the site and nothing else.
The releases people download live next door, and the application source is kept privately.

| Where                                                                        | What                                                                 |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [The site](https://doublespaced.app)                                          | This repository: the company page and Greatbook's documentation      |
| [Releases](https://github.com/doublespacedapp/greatbook/releases)             | The Windows and macOS installers, and the web bundle the site serves  |
| [Issues](https://github.com/doublespacedapp/greatbook/issues)                 | Problems, questions, and requests                                     |

Please do not put real student names or scores in an issue.
Issues are public.

## How the site is laid out

The root belongs to the company and each product sits one level down, so Greatbook's pages are under `/greatbook/` and the web app is at `/greatbook/app/`.
A second product would take a directory beside it and nothing would have to move.

The pages are markdown under `docs/`, each published at the matching address under `/greatbook/`.
`docs/home.md` is the exception: it is the company's own page, and it is published at the root.

- [Installing Greatbook](docs/install.md)
- [Using Greatbook](docs/guide.md)
- [Where your work is kept](docs/data.md)
- [Google Drive backup](docs/drive.md), which is also where the premium version is sold
- [When something goes wrong](docs/help.md)
- [Thank you](docs/thanks.md), where the shop sends a buyer afterwards, and linked from nowhere on the site
- [Privacy policy](docs/privacy.md)
- [Terms of use](docs/terms.md)

Corrections to any of them are welcome as a pull request.
They are written one sentence per line, which keeps a change to a sentence looking like a change to a sentence rather than to a paragraph.

### Adding a page

Two steps, and missing the second means the file is simply never read.

Write `docs/<slug>.md` starting at `##`, because the `<h1>` comes from the template and a page that opens with its own `#` ends up with two titles.
Then add `{ slug, title, description, nav }` to the `pages` array in `site/build.mjs`, in the position the navigation should show it.
`footer` in place of `nav` puts it with the policies, and a page with neither is built without being linked anywhere, which is what `thanks` is.

### The markers the build fills in

Three HTML comments are replaced as a page is rendered, so that what they stand for is written down once in `site/build.mjs` rather than in the prose of four pages.

`<!--downloads-->` becomes the download table, built from the latest release.
`<!--buy-->` becomes the button that goes to the shop, and `<!--price-->` becomes the price.

### Screenshots

They live in `site/shots/`, and are the one thing in `site/` that is not also copied to the company's root, because only Greatbook's pages ask for them.

They are taken by `scripts/site-shots.mjs` in the application's own repository, against its sample class, so no real student appears in one.
The filenames that script writes are what the prose here asks for, so retaking them is a matter of running it rather than of anything in this repository.

## Building the site

```sh
pnpm install
pnpm build        # render docs/ into _site/
pnpm preview      # render it and serve it at http://127.0.0.1:4321/
```

The build reads the latest release from the GitHub API to write the download table, so a local build with no network still works and simply points at the releases page instead.
It reads that from `doublespacedapp/greatbook` rather than from this repository, which has no releases in it.

The web app is not built here.
It comes from the private source repository, is attached to each release as `greatbook-web.zip`, and is unpacked into `/greatbook/app/` when the site is published.
That is why `_site/` is not committed and why publishing happens on a release as well as on a push.

The custom domain is written into the build as a `CNAME` file rather than set only in the repository's settings, because a Pages deployment made from a workflow artifact serves exactly what the artifact holds.
