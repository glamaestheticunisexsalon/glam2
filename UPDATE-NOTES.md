# GLAM website — update notes

## Where each image folder is used
| Folder | Used in |
|---|---|
| `images/Slider/` | Homepage hero slider (logo, services board, hair colour, brand board) and the skin-care spotlight |
| `images/services/` | Services cards (home + services page + service detail), gallery |
| `images/services/crops/` | Crops of your brand boards (LED, carbon laser, chemical peel, skin rejuvenation, microblading) used as their service cards |
| `images/interiors/` | "Inside GLAM" collage, gallery, offers banner, grooming card |
| `images/exterior/` | "Inside GLAM" collage, Contact page "Find us", About page, gallery |
| `images/gallery/` | Gallery page (Photo1 also used for the Shop banner) |
| `images/optimized/` | Web-sized copies of the 3 heavy PNGs + a cleaned brand board (blue guide lines removed). Originals are untouched |
| `images/products/` | **Placeholder** product artwork (SVG) — replace with real product photos |
| `images/Others/` | Not used (duplicates of other folders) |

## Shop & payments
* Products, prices and stock: `data/catalog.js` (**sample products/prices — replace with real ones**).
* Razorpay settings, shipping fee, pick-up: `data/site-config.js` (`payments`, `shop`).
* Payment server + setup guide: `server/README.md`. Run with `node server/server.js`.
* New pages: `checkout.html`, `shipping-returns.html` (fill the [brackets] before going live).
* Styling for all of this: `css/update.css`. Checkout logic: `js/checkout.js`.

## Slider, calendar & contact update
* Hero slider now has 9 slides that cross-fade (transparent fade) and change every **2 seconds**. Change the speed with `media.slider.slideMs` in `data/site-config.js` (milliseconds).
* The five new slides use softened, colour-graded versions of your images in `images/Slider/soft/` (your originals are untouched).
* Date fields (home booking form and booking page) now open a calendar picker; past dates are disabled.
* Contact details updated in `data/site-config.js`: phone, address, email. WhatsApp is set to the same number (9345101346) — change `whatsapp` / `booking.whatsappNumber` if different.

## Services, SEO & admin update
* **Removed** `Glam_Services.jpeg` (all copies) and every reference to it. The home "skin care" spotlight now uses `images/Slider/skin-spotlight.jpg` (made from your carbon laser / LED / peel / skin rejuvenation crops); social-share images use the brand board.
* **Services** (`data/catalog.js`): 13 categories with 147 types — Hair Colors, Hair Extension, Makeups, Hair Cut & Styling, Hair Spa, Hair Treatment, Detan, Facial, Pedicure / Manicure, Waxing, Threading, MicroBlading, Skin Rejuvenation. Each category page lists its types (each links to booking with the type pre-selected), and the booking forms now have a "Type of service" dropdown. Old links (e.g. `carbon-laser`, `beard-grooming`) still work through `aliases`.
* **Images**: existing photos were mapped to each category. New: `images/services/crops/` has `hair-spa.jpg`, `hair-treatment.jpg`, `detan.jpg` (crops of your photos) and `makeup.svg`, `threading.svg` (placeholder brand tiles). **Replace those two SVGs with real photos** (keep or change the path in `catalog.js`).
* **SEO / AEO**: unique title + description per service, `keywords` (every type, your original wording, plus Chennai/Pallikaranai variants) in `<meta name="keywords">` and JSON-LD, a direct-answer paragraph at the top of each service, 2–5 FAQs per service with FAQPage schema, Service + OfferCatalog schema, extra site-wide FAQs, updated sitemap. Set the real website URL in `data/site-config.js` (`websiteUrl`) and replace `[WEBSITE URL]` in the HTML/sitemap before launch.
* **Admin panel**: open `/admin/` on the running server (`node server/server.js`). Set `ADMIN_PASSWORD` in `server/.env`. See `server/README.md`.
