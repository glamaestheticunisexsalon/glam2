# GLAM — Razorpay payments & shop server

The website is static (HTML/CSS/JS). Taking real payments safely needs a small server, because the Razorpay **secret key** must never be placed in website files. This folder is that server. It has **no dependencies** — you only need [Node.js 18+](https://nodejs.org).

## What it does
| Endpoint | Purpose |
|---|---|
| `POST /api/razorpay/order` | Re-prices the bag from `data/catalog.js` (the browser cannot change prices), checks stock, creates the Razorpay order |
| `POST /api/razorpay/verify` | Verifies Razorpay's payment signature, marks the order **paid** |
| `POST /api/razorpay/webhook` | Razorpay → server confirmation (safety net if the customer closes the tab after paying) |
| `/api/admin/*` | Admin panel API (login, products, stock, orders, image upload). Needs the admin password |
| `GET /api/health` | Shows whether Razorpay keys are set |

It also serves the website itself, so one process runs everything.

## 1 · Try it locally (test mode)
1. Create a free Razorpay account → Dashboard → switch to **Test Mode** → *Account & Settings → API Keys → Generate Test Key*.
2. Copy `server/.env.example` to `server/.env` and paste the key id and secret.
3. In `data/site-config.js` set `payments.keyId` to the same **key id** (the public one; `rzp_test_…`). Leave `mode: "server"`.
4. Run: `node server/server.js` and open <http://localhost:3000>.
5. Add a product → Checkout → pay with Razorpay's [test cards / UPI](https://razorpay.com/docs/payments/payments/test-card-details/).
6. Paid orders are logged in the terminal and stored in `server/data/orders.json`.

## 2 · Set the webhook (recommended)
Razorpay Dashboard → *Webhooks → Add*: URL `https://YOUR-DOMAIN/api/razorpay/webhook`, a secret of your choice (put the same value in `RAZORPAY_WEBHOOK_SECRET`), events **payment.captured**, **order.paid**, **payment.failed**.
Also keep **Auto-capture** on (Dashboard → Settings → Payment Capture) so successful payments are captured automatically.

## 3 · Go live
1. Complete Razorpay KYC / account activation (they will review the website: it already has Privacy, Terms, Cancellation and **Shipping & Returns** pages — fill the `[brackets]` in `shipping-returns.html` first).
2. Generate **Live** keys, put them in the server's environment (`RAZORPAY_KEY_ID=rzp_live_…`) and in `payments.keyId`.
3. Host over **HTTPS** (Razorpay requires it for live payments). Any Node host works: a VPS, Render, Railway, Fly.io, etc. Start command: `node server/server.js`.
4. Store `orders.json` on a persistent disk (`DATA_DIR`) — some hosts wipe the disk on every deploy.
5. Replace the **sample products & prices** in `data/catalog.js` with your real ones, and swap the placeholder artwork in `images/products/`.

### Static host + separate API (optional)
If the website sits on Netlify/GitHub Pages/etc. and this server runs elsewhere, set `payments.apiBase` to the server URL (e.g. `https://api.yourdomain.com`) and `ALLOWED_ORIGIN` in `.env` to the website's origin.

### No server at all? ("client" mode)
Set `payments.mode: "client"` and `payments.keyId`. Razorpay Checkout opens with the amount from the browser and the Razorpay dashboard becomes your only record. This works on any static host but **prices are not verified server-side and payments cannot be signature-checked**, so use it only for very small shops.

## Admin panel (products & inventory)
Set `ADMIN_PASSWORD` in `server/.env` (12+ random characters), restart, and open **`/admin/`**.
* **Inventory** – search/filter, low-stock and out-of-stock flags, +/− or exact quantity adjustments, CSV export.
* **Edit / add / delete products** – name, prices, stock, low-stock alert, description, usage, ingredients, image upload, featured, show/hide in the shop.
* **Orders** – paid orders with fulfilment status; cancelling can put the items back in stock (refunds are still done in Razorpay).
* **Stock history** – every change with reason and time.
Products are stored in `server/data/products.json` (set `DATA_DIR` to a persistent disk in production). The first time the server runs it copies the sample products from `data/catalog.js`; after that the admin store is the source of truth, and the shop reads it through `/data/catalog.js`. The admin only works when the Node server is running — not on static-only hosting. Uploaded photos go to `images/products/uploads/`.

## Stock
Stock is now live: it drops automatically when a payment is confirmed and the server refuses to oversell. Restock or correct it in the admin panel.

## Security notes
* Never put `RAZORPAY_KEY_SECRET` in any file outside `server/.env` / host environment variables.
* `/server`, dotfiles and `.md` files are never served by this server. If you host the files elsewhere (Apache/Nginx/Netlify), do **not** upload `server/`.
* This server is intentionally small. For high volume add a database, e-mail/WhatsApp order alerts and an admin screen.
