# SPI — Satta Panchayat Iyakkam

News, blog and daily-activity site for சட்ட பஞ்சாயத்து இயக்கம் (Satta Panchayat Iyakkam), with an admin CMS and Razorpay donations.

## Features

- Public site: Home, News, Blog, Daily Activity, Donate — Tamil/English language toggle
- Admin CMS at `/admin` (login required): create/edit/delete posts, voice dictation for post content
- Donations via Razorpay Checkout, recorded in the database
- Admin donations list with **Excel (.xlsx) export**

## Getting started

```bash
npm install
cp .env.example .env   # fill in real values — see below
npx prisma migrate dev
npm run seed            # creates the admin account + sample content
npm run dev
```

Visit `http://localhost:3000`. Admin login: `http://localhost:3000/admin/login`.

## Environment variables (`.env`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | SQLite file path for local dev. Swap for a hosted Postgres URL in production. |
| `SESSION_SECRET` | Random secret used to sign the admin session cookie. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Used once by `npm run seed` to create the first admin login. Change the password after first login. |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay **key_id** (safe to expose to the browser). Replace with this organization's own Razorpay key before going live with real fundraising. |

`.env` is git-ignored — never commit real secrets.

## Production notes

- Swap SQLite for a hosted Postgres database (e.g. Neon, Supabase, Railway) by changing `datasource db { provider = "postgresql" }` in `prisma/schema.prisma` and updating `DATABASE_URL`.
- Voice dictation on the post editor uses the browser's Web Speech API (best support in Chrome).
