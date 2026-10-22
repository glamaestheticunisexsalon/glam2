# GLAM website — backend migration roadmap

Version 1 is a static HTML, CSS and vanilla JavaScript website. It has no server-side code, database, account system or payment processing. Local catalog data is deliberately separated from page rendering behind `DataService` in `js/data-service.js`.

## Recommended evolution

1. **API contract first:** define versioned JSON shapes for services, products, offers, team, gallery, FAQs, settings, bookings and orders. Preserve the current IDs and slugs where practical.
2. **Backend/API:** introduce a REST API (or GraphQL if justified) for public catalog reads and protected booking/order operations. Keep credentials, validation and business rules server-side. Never place private API keys in browser JavaScript.
3. **Database:** use PostgreSQL or MySQL for authoritative services, inventory, appointments, offers and orders. Supabase can be considered if its security rules and operational requirements fit. Store uploaded media in managed object storage/CDN.
4. **Data adapter:** implement an `ApiDataService` with the same async methods as `DataService` (`getServices`, `getService`, `getProducts`, `getProduct`, `getOffers`, `getTestimonials`, `getGallery`, `getTeam`, `getFAQs`, `getSiteConfig`). Select the adapter through a non-secret public configuration flag; retain a local adapter for previews and offline content.
5. **Booking:** replace `requestBooking()` transport in `js/app.js` with `POST /api/bookings`. Validate dates, availability, consent and contact details on the server. Return a booking reference and confirmation state; keep WhatsApp/email as fallback channels.
6. **Orders and payments:** add order creation and inventory checks through an API, then integrate Razorpay/Stripe using the provider's server-created order/payment-intent flow. Verify payment callbacks/webhooks server-side. Never simulate a successful payment on the client.
7. **Authentication/admin:** if customer accounts or staff administration are needed, use a maintained authentication provider with secure session handling, role-based authorization, MFA for staff and audit logging. Do not build custom password storage in the static site.
8. **CMS:** connect a secure CMS or admin UI for approved services, guides, FAQs and offers. Sanitize rich content, review structured data, and ensure unpublished items are not indexed.
9. **Privacy/operations:** document retention, consent, backups, deletion requests, monitoring, rate limits, spam controls, secrets management and applicable privacy/payment requirements before launch.

## Suggested endpoint surface

- `GET /api/services`, `GET /api/services/{slug}`
- `GET /api/products`, `GET /api/products/{slug}`
- `GET /api/offers`, `GET /api/settings`, `GET /api/content/{slug}`
- `POST /api/bookings` (server-side availability and validation)
- `POST /api/orders` then provider-specific payment initialization
- Optional protected customer and staff endpoints, never exposed without authorization

## Migration checklist

- Keep UI renderers consuming data objects only; do not embed backend response logic into HTML.
- Normalize API failures, loading and empty states in the data adapter.
- Add server-side validation and tests before enabling write operations.
- Use HTTPS, restrictive CORS, CSP, secure cookies, CSRF protection where applicable, and rate limiting.
- Update sitemap, canonical URLs, schema, privacy notices, analytics consent and deployment configuration with the real production domain/business details.
