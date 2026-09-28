# ui-ecommerce-js

**Evara** — a responsive, multi-page e-commerce front-end built with plain HTML, CSS and vanilla JavaScript. No framework and no build step: open a page and it runs.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home: header with search + burger menu, hero slider, popular categories carousel, tabbed product grid (Featured / Popular / New added), newsletter, footer |
| `shop.html` | Product listing page |
| `details.html` | Product details: image gallery + thumbnails, brand/price/discount, description, colour & size pickers, quantity, add to cart / wishlist, info tabs |
| `detials-1.html` | Legacy single-product details variant (static markup, same styles) |
| `cart.html` | Cart page: items, quantity, remove, order summary |
| `checkout.html` | Billing details, additional information / order note, payment method, place order + printable receipt |
| `compare.html` | Product comparison page |
| `wishlist.html` | Saved products page |
| `accounts.html` | Account dashboard with an orders table (update payment status, delete order) |
| `login-register.html` | Login and registration forms |

## Project structure

```
.
├── index.html, shop.html, details.html, detials-1.html, cart.html,
├── checkout.html, compare.html, wishlist.html, accounts.html, login-register.html
├── .gitignore
└── assets/
    ├── css/styles.css     # single stylesheet, CSS custom properties
    ├── js/main.js         # all page behaviour: product rendering, cart, wishlist, orders, tabs, sliders
    ├── js/db-pic.js       # product data set (not referenced by any page yet)
    └── img/               # 70 product / category / avatar images
```

## Features

- **Cart, wishlist and order history** persist in `localStorage` under the keys `cart`, `wishlist` and `orders`.
- Live cart / wishlist badge counters in the header.
- Tabbed product sections, quantity steppers, quantity validation, and null-safe page scripts so every page can load the same `main.js`.
- Order confirmation renders a printable receipt (`window.print()`).
- Swiper 11 (jsDelivr CDN) powers the hero slider and category carousel.
- Fully responsive layout — verified with no horizontal overflow from 320px up to 1440px.

## Running locally

No installation is required. Double-click `index.html`, or serve the folder so page-relative paths and `localStorage` behave exactly like production:

```bash
python -m http.server 8000
# then open http://127.0.0.1:8000/index.html
```

## Notes

- Front-end only: there is no back end, so all data lives in the browser's `localStorage`.
- `assets/js/db-pic.js` holds an alternative product data set that is not currently loaded by any page; `assets/js/main.js` carries its own product list.
