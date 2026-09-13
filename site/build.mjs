// Turns the markdown under docs/ into the published site.
//
// Every page a teacher reads is markdown, so changing the wording is editing prose and
// nothing else. This script is the whole build: a template, a stylesheet, and one pass
// over the files. There is no framework here on purpose, because a documentation site
// that needs maintaining is a documentation site that stops being written.
//
// The web app itself is not built here. It is built from the private source repository
// and published as a release asset, which the Pages workflow unpacks into app/ beside
// these pages. Keeping the built app out of this repository's history is what stops
// every release from adding a few hundred generated files to it.

import { mkdir, cp, copyFile, readFile, writeFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { marked } from 'marked'

// Substitution through a function rather than a string, because a string replacement
// treats $& and $` as instructions to paste part of the match back in. The prose poured
// in here is written by hand and may contain either.
function fill(text, marker, value) {
  return text.replaceAll(marker, () => value)
}

// The descriptions below are prose, and they go into an attribute rather than into the
// body, where an apostrophe or a quotation mark would end the attribute early and put the
// rest of the sentence into the markup as if it were more attributes.
function escapeAttribute(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, '_site')

// Doublespaced is the company and Greatbook is a product of it, so the root of the site
// belongs to the company and every page about the app sits one level down. A second
// product would take a directory beside this one and nothing here would have to move.
//
// The whole subtree moves together, which is why this costs one constant rather than a
// rewrite: every link between these pages is relative, so their depth relative to each
// other is unchanged and `./install.html`, `./app/` and `../page.css` all still resolve.
const PRODUCT = 'Greatbook'
const UMBRELLA = 'Doublespaced'
const productDir = 'greatbook'
const productOut = join(out, productDir)

// The repository the downloads come from, which is NOT the repository this site is built
// from: releases are published to doublespacedapp/greatbook and the site lives in
// doublespacedapp/website. So this deliberately does not read GITHUB_REPOSITORY, which
// on a Pages run names the site repository and would send this at a repository with no
// releases in it -- and the failure is a download table that quietly says there is no
// release yet rather than an error anybody sees.
const repo = process.env.RELEASES_REPOSITORY ?? 'doublespacedapp/greatbook'

// The site's own address, needed in exactly one place: the sharing tags below, which are
// read by other people's servers and so cannot be the relative links everything else here
// is built from.
const SITE = 'https://doublespaced.app'

// Where buying happens, and what it costs.
//
// Both are written once here and poured into the prose at <!--buy--> and <!--price-->, the
// way the download table already is, because the alternative is a price that appears on
// four pages and is right on three of them.
//
// The app deliberately knows neither: the price and the number of computers a key covers
// are settings in the shop's dashboard, so changing them does not need a release. This
// site does have to name the price, because a page that will not say what something costs
// is not a page anyone buys from.
const BUY_URL = 'https://buy.polar.sh/polar_cl_f3W79wDbGpq4tljxGl0XRe3wTF0om7H1iGXnk2a7l5h'
const PRICE = '$14.99'

// Where donations go, which is deliberately not where purchases go.
//
// Ko-fi cannot hand back a key, so nothing here is sold: a donation buys the donor nothing
// and is not a purchase. That is the whole reason the two are separate addresses, and the
// donate page says so in as many words, because a donation that came with something in
// return would be a sale, with the tax question that Polar is carrying for the shop.
//
// Written here for the same reason the price is: a Ko-fi username can be changed, and the
// old address is not redirected, so the one that has to be edited should be one line rather
// than however many pages mention it.
const KOFI_URL = 'https://ko-fi.com/justindelano'

// The picture shown when a link to one of these pages is pasted somewhere that unfurls it.
//
// One per identity, and that is the point of it. Every page used to unfurl the same
// screenshot of the product's grid, the company's own page included -- so sharing the
// company showed a picture of its product, which is the one thing the two-level structure
// exists not to say. Each root now carries its own card, drawn from its own mark by
// scripts/site-brand-assets.mjs in the application repository.
//
// Written to the same filename at both roots, so the template holds one string and the
// build decides which picture is behind it.
const SHARE_IMAGE = 'card.png'

// Order is the order of the navigation bar. Pages after the divider are reachable from
// the footer instead, because a teacher looking for help should not have to read past
// two policies to find it.
// A page with neither `nav` nor `footer` is built and is reachable by its address, and is
// simply not linked from the chrome. That is what `thanks` is: it is reached from the
// shop's receipt and from nowhere on the site, so putting it in the navigation would only
// offer a page about a purchase to people who have not made one.
//
// `description` is the sentence search results and chat previews show. It is written per
// page rather than once for the site, because a teacher sent a link to the help page and
// shown a description of the whole app has been told nothing.
const pages = [
  {
    slug: 'index',
    title: PRODUCT,
    nav: 'Home',
    description: `A gradebook for teachers of any grade, from kindergarten through twelfth. It works offline and keeps every score in a file you own.`,
  },
  {
    slug: 'install',
    title: `Installing ${PRODUCT}`,
    nav: 'Install',
    description: `How to install ${PRODUCT} on Windows, on a Mac, or on a Chromebook, and what to do about the warning an unsigned installer brings.`,
  },
  {
    slug: 'guide',
    title: `Using ${PRODUCT}`,
    nav: 'Guide',
    description: `What each part of ${PRODUCT} is for, from setting up a class in September to printing report cards.`,
  },
  {
    slug: 'data',
    title: 'Where your work is kept',
    nav: 'Your data',
    description: `Where ${PRODUCT} keeps your gradebook, how its backups work, and how to get one back.`,
  },
  {
    slug: 'drive',
    title: 'Google Drive backup',
    nav: 'Google Drive',
    description: `Keep a copy of your gradebook in your own Google Drive and pick it up on any computer. One payment of ${PRICE}.`,
  },
  {
    slug: 'help',
    title: 'When something goes wrong',
    nav: 'Help',
    description: `Answers to what goes wrong most often in ${PRODUCT}.`,
  },
  {
    slug: 'thanks',
    title: 'Thank you',
    description: `Your key is on its way. How to turn on Google Drive backup in ${PRODUCT}.`,
  },
  {
    slug: 'donate',
    title: 'Supporting the work',
    footer: 'Support',
    description: `Ways to pay for ${PRODUCT}: buy the premium version, or donate what you think it is worth.`,
  },
  {
    slug: 'privacy',
    title: 'Privacy policy',
    footer: 'Privacy',
    description: `What ${PRODUCT} collects about you and your students, which is nothing.`,
  },
  {
    slug: 'terms',
    title: 'Terms of use',
    footer: 'Terms',
    description: `The terms for using ${PRODUCT}, written to be read rather than to be impressive.`,
  },
]

// What the latest release offers, or nothing at all before the first one exists.
//
// Asked of GitHub at build time rather than written into the pages, so the version number
// on the download buttons is never the one someone last remembered to edit. A release
// publishes and then asks this site to rebuild, which is when this runs.
async function latestRelease() {
  const url = `https://api.github.com/repos/${repo}/releases/latest`
  const headers = { accept: 'application/vnd.github+json' }
  // Actions runners are rate limited hard without one; a laptop building locally is not.
  const token = process.env.GITHUB_TOKEN
  if (token !== undefined && token !== '') headers.authorization = `Bearer ${token}`

  try {
    const response = await fetch(url, { headers })
    if (!response.ok) return undefined
    const release = await response.json()
    return { version: release.tag_name, assets: release.assets ?? [] }
  } catch {
    // A build with no network still produces a site; it just sends people to the
    // releases page instead of straight at a file.
    return undefined
  }
}

// The one generated block on any page: the download table on the install page, written
// where the marker sits so the prose around it stays prose.
function downloadTable(release) {
  const releasesPage = `https://github.com/${repo}/releases`
  if (release === undefined) {
    return `<p class="notice">There is no published release yet. When there is one it will be on the <a href="${releasesPage}">releases page</a>, and this table will name the file to download.</p>`
  }

  const find = (suffix) => release.assets.find((asset) => asset.name.endsWith(suffix))
  const rows = [
    { system: 'Windows 10 or 11', asset: find('.exe'), note: 'Installs for you alone, so it needs no administrator.' },
    { system: 'macOS, Intel or Apple Silicon', asset: find('.dmg'), note: `Open it and drag ${PRODUCT} to Applications.` },
  ].filter((row) => row.asset !== undefined)

  if (rows.length === 0) {
    return `<p class="notice">Release ${release.version} has no installer attached to it. The <a href="${releasesPage}">releases page</a> has everything that was published.</p>`
  }

  const body = rows
    .map(
      (row) =>
        `<tr><th scope="row">${row.system}</th><td><a class="download" href="${row.asset.browser_download_url}">Download ${row.asset.name}</a><br><span class="note">${row.note}</span></td></tr>`,
    )
    .join('\n')

  return `<table class="downloads"><caption>Version ${release.version}</caption><tbody>\n${body}\n</tbody></table>`
}

// Opening the app, which is the one thing the site offers that costs nothing: a tab, with
// no download, no account and no administrator. The same shape as the buy button below and
// deliberately no louder, for the reason given there.
//
// Takes the path because the two pages this can appear on sit at different depths: the app
// is ./app/ from a Greatbook page and ./greatbook/app/ from the company's. Wired into both
// fills rather than only the page using it today, because a marker reaching a page nothing
// fills survives into the HTML as a comment -- invisible from the page itself, and so the
// kind of mistake that is found by a reader rather than by a build.
function openButton(appPath) {
  return `<p class="buy"><a class="buy-button" href="${appPath}">Open the web app</a> <span class="note">In your browser, with nothing to download and nothing to sign up for.</span></p>`
}

// The one thing on the site that asks for money, so it is written once and looks the same
// wherever the prose puts it.
function buyButton() {
  return `<p class="buy"><a class="buy-button" href="${BUY_URL}">Get the premium version</a> <span class="note">${PRICE} once. Your key arrives by email.</span></p>`
}

// The other thing that asks for money, and the quieter of the two on purpose: a donation is
// worth less to the reader than a purchase, because a purchase gets them something.
function donateButton() {
  return `<p class="buy"><a class="buy-button" href="${KOFI_URL}">Donate on Ko-fi</a> <span class="note">Any amount, once or every month. It does not unlock anything.</span></p>`
}

function navigation(current) {
  return pages
    .filter((page) => page.nav !== undefined)
    .map((page) => {
      const href = page.slug === 'index' ? './' : `./${page.slug}.html`
      const here = page.slug === current ? ' aria-current="page"' : ''
      return `<a href="${href}"${here}>${page.nav}</a>`
    })
    .join('\n        ')
}

function footerLinks() {
  return pages
    .filter((page) => page.footer !== undefined)
    .map((page) => `<a href="./${page.slug}.html">${page.footer}</a>`)
    .join('\n        ')
}

// The header and footer differ between the company's page and the product's, which is the
// only reason the template carries these as placeholders rather than as markup.
//
// On a product page the wordmark is the product and leads to its own home; the company is
// named in the footer, one level up. On the company's page there is no app to open, so the
// button that would say so is left out rather than pointed at nothing.
// The marks are put into the page rather than linked from it.
//
// An <img> would be the obvious way and it is the wrong one. An SVG loaded through <img>
// is an isolated document: currentColor and the custom properties on this page never
// reach inside it, and nothing reports it. The two-tone wordmark would keep the light
// mode's blue and paint "book" in near-black, which against the dark page these colours
// switch to at night is a name nobody can read. Inlined, it follows --link like
// everything else here.
//
// site/brand holds copies. The originals live in the application repository beside the
// specification that measures them; site/brand/readme.md says so.
const mark = async (name) => (await readFile(join(root, 'site', 'brand', name), 'utf8')).trim()

const greatbookLockup = await mark('greatbook-lockup-twotone-themed.svg')
// The full three-rule lockup, not the compact wordmark. Its middle rule is left empty and
// that empty rule is the whole design: without it the mark shows two words set far apart
// and a reader has to take the name on trust. It needs the height to say so, and the
// company's page is the one header with the room.
const doublespacedLockup = await mark('doublespaced-lockup.svg')

// The link carries the name for a reader who cannot see the drawing. The SVG has a <title>
// of its own, but a link whose only content is an image is announced by its own accessible
// name, and without this it would have none.
const productChrome = {
  siteName: PRODUCT,
  shareBase: `/${productDir}`,
  shareAlt: `The ${PRODUCT} mark: a pencil that has just drawn a check, with a plus.`,
  wordmark: `<a class="wordmark" href="./" aria-label="${PRODUCT}">${greatbookLockup}</a>`,
  actions: `<a class="open-app" href="./app/">Open the web app</a>`,
  colophon: `${PRODUCT} is made by <a href="../">${UMBRELLA}</a>. Copyright {{year}}.`,
}

// Both marks, in the order the company is built: the studio, then the one product under
// it. The product's mark is the link into the product, which is what the single text link
// in the navigation used to be and says more plainly than a word could.
//
// A rule between them rather than a gap alone -- it is the studio's own device, and it
// keeps two marks of different weights from reading as one composite mark.
const umbrellaChrome = {
  siteName: UMBRELLA,
  shareBase: '',
  shareAlt: `The ${UMBRELLA} mark: the two words set on ruled lines, with a line skipped between them.`,
  wordmark:
    `<a class="wordmark studio" href="./" aria-label="${UMBRELLA}">${doublespacedLockup}</a>` +
    `<span class="mark-divider" aria-hidden="true"></span>` +
    `<a class="wordmark" href="./${productDir}/" aria-label="${PRODUCT}">${greatbookLockup}</a>`,
  actions: '',
  colophon: `${UMBRELLA} is Justin Delano. Copyright {{year}}.`,
}

// One page, with the chrome it belongs to. Split out of the loop below so the company's
// page and the standing app page can be written the same way rather than each unpicking
// the template on its own.
function render({ title, description, nav, footer, content, chrome }) {
  let page = fill(template, '{{wordmark}}', chrome.wordmark)
  page = fill(page, '{{actions}}', chrome.actions)
  page = fill(page, '{{colophon}}', chrome.colophon)
  // Which of the two this page belongs to, which is what a chat window prints above the
  // title when someone pastes the link. Without it every page unfurls as though it came
  // from nowhere in particular.
  page = fill(page, '{{siteName}}', chrome.siteName)
  page = fill(page, '{{title}}', title)
  page = fill(page, '{{description}}', escapeAttribute(description))
  // Absolute, and the only absolute link on the site. Everything a reader clicks is
  // relative so the whole subtree can move; this one is read by other people's servers,
  // which have no page to be relative to.
  //
  // The chrome says which root the page belongs to, so the company's page unfurls the
  // company's card and the product's pages unfurl the product's.
  page = fill(page, '{{shareImage}}', `${SITE}${chrome.shareBase}/${SHARE_IMAGE}`)
  page = fill(page, '{{shareImageAlt}}', escapeAttribute(chrome.shareAlt))
  page = fill(page, '{{nav}}', nav)
  page = fill(page, '{{footer}}', footer)
  page = fill(page, '{{content}}', content)
  // Last, so that a year inside the colophon is filled in too.
  return fill(page, '{{year}}', String(new Date().getFullYear()))
}

const template = await readFile(join(root, 'site', 'page.html'), 'utf8')

const release = await latestRelease()

await mkdir(productOut, { recursive: true })

for (const page of pages) {
  const source = await readFile(join(root, 'docs', `${page.slug}.md`), 'utf8')
  const body = marked.parse(source, { async: false })
  let html = fill(body, '<!--downloads-->', downloadTable(release))
  html = fill(html, '<!--buy-->', buyButton())
  html = fill(html, '<!--donate-->', donateButton())
  html = fill(html, '<!--open-->', openButton('./app/'))
  html = fill(html, '<!--price-->', PRICE)

  await writeFile(
    join(productOut, `${page.slug}.html`),
    render({
      title: page.title,
      description: page.description,
      nav: navigation(page.slug),
      footer: footerLinks(),
      content: html,
      chrome: productChrome,
    }),
  )
}

// The company's own page, at the root, above every product.
//
// Written here rather than as another entry in `pages`, because that list describes one
// flat directory of pages that link to each other with `./name.html`, and this one is not
// in it: it sits a level up and points down into it.
// Through the same markers as every other page. Nothing on it uses the download table
// today, but a price written here and left unfilled would reach the site as an HTML
// comment -- invisible, and wrong in the one place the reader most needs it right.
let home = marked.parse(await readFile(join(root, 'docs', 'home.md'), 'utf8'), { async: false })
home = fill(home, '<!--downloads-->', downloadTable(release))
home = fill(home, '<!--buy-->', buyButton())
home = fill(home, '<!--donate-->', donateButton())
home = fill(home, '<!--open-->', openButton(`./${productDir}/app/`))
home = fill(home, '<!--price-->', PRICE)
await writeFile(
  join(out, 'index.html'),
  render({
    title: UMBRELLA,
    description: `${UMBRELLA} makes software for teachers. A teacher's work belongs to the teacher.`,
    // Empty. This navigation held exactly one link, to the product, and the product's own
    // lockup in the header beside the company's is now that link -- said once rather than
    // twice on a page with only two things on it.
    nav: '',
    footer: pages
      .filter((page) => page.footer !== undefined)
      .map((page) => `<a href="./${productDir}/${page.slug}.html">${page.footer}</a>`)
      .join('\n        '),
    content: home,
    chrome: umbrellaChrome,
  }),
)

// Everything in site/ that is not part of the build itself is served as it stands, and is
// copied twice because the template asks for `./page.css` beside the page: the company's
// page and the product's pages are at different depths, so one copy cannot serve both.
const passthrough = (await readdir(join(root, 'site'), { withFileTypes: true })).filter(
  (entry) => entry.isFile() && !entry.name.endsWith('.mjs') && entry.name !== 'page.html',
)
for (const entry of passthrough) {
  await copyFile(join(root, 'site', entry.name), join(out, entry.name))
  await copyFile(join(root, 'site', entry.name), join(productOut, entry.name))
}

// The favicons, one per identity, written rather than passed through.
//
// The passthrough above copies every loose file in site/ to both roots, which is exactly
// what a single icon.svg must not do: the company and the product are not the same thing
// and cannot wear the same face. That is what the site did until now -- the product's
// gradebook glyph was the company's mark too, at a root whose entire purpose is to say
// the company is bigger than the one product under it.
//
// The company's is black and white and the product's is blue. site/brand is a directory,
// so the loop above cannot see it and these are the only copies that reach the output.
await copyFile(join(root, 'site', 'brand', 'doublespaced-icon.svg'), join(out, 'icon.svg'))
await copyFile(
  join(root, 'site', 'brand', 'doublespaced-icon-dark.svg'),
  join(out, 'icon-dark.svg'),
)
await copyFile(join(root, 'site', 'brand', 'greatbook-icon.svg'), join(productOut, 'icon.svg'))
// The product's tile is a white mark on its own blue and needs no second version; the
// dark name is still written so that the one link in the template resolves at both roots.
await copyFile(join(root, 'site', 'brand', 'greatbook-icon.svg'), join(productOut, 'icon-dark.svg'))

// The rasters, which the site cannot make for itself: this build is marked, one pass, no
// image tooling. They are rendered from the same drawings by scripts/site-brand-assets.mjs
// in the application repository and committed into site/brand.
//
// Same three names at both roots, different pictures behind them, so the template holds
// one string for each and the build decides which identity it means.
const rasters = [
  ['card', 'card.png'],
  ['apple-touch', 'apple-touch-icon.png'],
  ['favicon', 'favicon-32.png'],
]
for (const [prefix, name] of rasters) {
  await copyFile(join(root, 'site', 'brand', `${prefix}-doublespaced.png`), join(out, name))
  await copyFile(join(root, 'site', 'brand', `${prefix}-greatbook.png`), join(productOut, name))
}

// The screenshots, which are the one thing here that is not copied twice.
//
// They are pictures of Greatbook, only Greatbook's pages ask for them, and they are nearly
// all of the weight of the built site, so a second copy at the company's root would double
// the published artifact to serve files nothing links to. That is also why they sit in a
// directory of their own rather than beside page.css: the loop above is files only, and a
// screenshot dropped into site/ would land at the company root as well.
await cp(join(root, 'site', 'shots'), join(productOut, 'shots'), { recursive: true })

// Tells GitHub Pages not to run its own Jekyll pass over the output, which would
// otherwise drop any file or folder whose name begins with an underscore. Vite names
// its build output that way.
await writeFile(join(out, '.nojekyll'), '')

// The custom domain, which has to be written into the build rather than set once in the
// repository's settings.
//
// Pages deployments that come from a workflow artifact, as this one does, serve exactly
// what the artifact contains. A domain configured in settings alone is dropped the first
// time an artifact without this file is published, and the site quietly goes back to its
// github.io address. Written here rather than passed through from site/ so it lands at the
// root and only at the root, which is the only place Pages reads it.
await writeFile(join(out, 'CNAME'), 'doublespaced.app\n')

console.log(
  release === undefined
    ? `Built ${pages.length} pages. No release found, so downloads point at the releases page.`
    : `Built ${pages.length} pages with downloads for ${release.version}.`,
)

// A standing page at app/, so that the link every page carries in its top bar always
// leads somewhere.
//
// Written on every build and overwritten by the real thing when there is one: the Pages
// workflow unpacks the released web bundle over this directory, and its index.html
// replaces this file. So this is what a reader sees only in the window before the first
// release, or if a release ever goes out without the browser build attached.
await mkdir(join(productOut, 'app'), { recursive: true })
await writeFile(
  join(productOut, 'app', 'index.html'),
  render({
    title: 'The web app is not published yet',
    description: `${PRODUCT} runs in the browser, and this is where it will be.`,
    // One level down, so the links back up have to say so.
    nav: navigation('').replaceAll('href="./', 'href="../'),
    footer: footerLinks().replaceAll('href="./', 'href="../'),
    content: `<p>${PRODUCT} runs in the browser, and this is where it will be. It is not published here yet.</p>
<p>The app is put here by the first release. Until then there is nothing to open, and the rest of the site is written and ready: start with <a href="../install.html">installing it</a>, or read <a href="../guide.html">the guide</a>.</p>
<p>If you are expecting it to be here, the <a href="https://github.com/${repo}/releases">releases page</a> says what has been published so far.</p>`,
    chrome: {
      ...productChrome,
      // Everything the chrome points at is one level further up from here, including the
      // company's page in the footer, which is now two.
      wordmark: productChrome.wordmark.replace('href="./"', 'href="../"'),
      actions: productChrome.actions.replace('href="./app/"', 'href="./"'),
      colophon: productChrome.colophon.replace('href="../"', 'href="../../"'),
    },
  })
    // Every href in the head, one at a time. This page is a level deeper than any other
    // and nothing checks these: a head asset added to the template without a line here
    // resolves on every page but this one, and 404s with no error anywhere.
    .replaceAll('href="./page.css"', 'href="../page.css"')
    .replaceAll('href="./icon.svg"', 'href="../icon.svg"')
    .replaceAll('href="./icon-dark.svg"', 'href="../icon-dark.svg"')
    .replaceAll('href="./favicon-32.png"', 'href="../favicon-32.png"')
    .replaceAll('href="./apple-touch-icon.png"', 'href="../apple-touch-icon.png"'),
)
