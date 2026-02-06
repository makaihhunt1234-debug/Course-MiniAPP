# Course MiniApp

Telegram-native course platform: sell access, take payments, deliver video + quizzes, and manage everything from an admin panel. Built for **Telegram Mini Apps**, also works as standalone web.

## What it does

- Turn your Telegram audience into paying students
- Accept payments: **PayPal** or **Telegram Stars**
- Deliver lessons: video (Cloudflare Stream) + markdown
- Quizzes to keep students engaged (and measure progress)
- Admin panel: users, content, basic analytics/support flows
- Multi-language: `en` / `ru` / `uk`

## Case

You run a Telegram community and want to monetize it:
1. Upload lessons (markdown + video)
2. Set a price (PayPal / Stars)
3. Users pay -> get instant access -> watch -> pass quizzes
4. You manage everything in admin (users, activity, feedback)

## Live Demo

**[democourse.cookiewhite.beer](https://democourse.cookiewhite.beer)** - full platform in demo mode.
<img src="https://i.imgur.com/wNCdnj1.gif" alt="Course MiniApp UI preview" width="900" />

## Reliab1ty

Goal: keep prod **predictable** (no "works on my machine").

- `config.yaml` + env are validated with Zod (bad config fails fast)
- PayPal webhooks: signature verification (when `env.paypal.webhookId` is set) + rate limiting
- Repeated webhooks won't grant access **2x**
- `GET /health` for monitoring (uptime, memory, env)
- Logs for key flows (DB migrations, payments, errors)
- Signed video tokens; frontend retries signed URL fetch with backoff
- `botShield` blocks common scanners/bots (less noise on the server)

Want more? Enable Redis (caching) and `features.hidePublic` (gate access: only Telegram entry, no public web).

<details>
<summary><b>For developers (setup / docs)</b></summary>

### Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind, Framer Motion
- Backend: Express, TypeScript, SQLite, Redis (optional)
- Integrations: Telegram Bot API, PayPal REST API, Cloudflare Stream

### Quick Start

#### Requirements

- Node.js >= 20
- npm (or pnpm)

#### Install

```bash
git clone https://github.com/CookieWhiteBear/Course-MiniAPP.git
cd Course-MiniAPP

npm install
cd server
npm install
cd ..
```

#### Dev

```bash
npm run dev:cli
```

Or run directly:

```bash
npm run dev:cli demo   # demo mode, Telegram not required
npm run dev:cli dev    # dev mode, Telegram auth required
```

This starts both: frontend `5173` and backend `3001`.

Open `http://localhost:5173` (demo mode works without Telegram).

### Configuration

Main config lives in `config.yaml` (root). You can also use env vars (they take priority).

#### Minimal example

```yaml
app:
  name: My Course Platform
  defaultCurrency: USD

env:
  nodeEnv: production
  demoMode: false
  frontendUrl: https://your-domain.com

  telegram:
    botToken: "your-bot-token"
    adminIds: [123456789]

  paypal:
    clientId: "your-client-id"
    secret: "your-secret"
    webhookId: "your-webhook-id"
    mode: live

courses:
  - id: 1
    title: My First Course
    authorId: main
    price: 29.99
    starsPrice: 500
    visibility: public

authors:
  - id: main
    name: Your Name
```

Full reference: [docs/configuration.md](docs/configuration.md)

### Course Content Structure

Courses live in `courses/`:

```
courses/
|-- 1/
|   |-- 1.md      # Lesson 1
|   |-- 2.md      # Lesson 2
|   `-- 3.md      # Quiz
`-- 2/
    `-- ...
```

#### Lesson Types

**Text:**

```md
# Welcome to the Course

Your content in **markdown**.
```

**Video:**

```md
# Video Lesson

<vid:cloudflare-video-id>

# or local
<vid:video.mp4>
```

**Quiz:**

```md
<quiz:single>

# What is 2+2?

1. Three
2. Four
3. Five

<q:2>
```

Full format: [docs/courses.md](docs/courses.md)

### Payments (quick)

- **PayPal:** set `env.paypal.webhookId` + webhook URL `https://your-domain.com/paypal-hook`
- **Telegram Stars:** enable payments in @BotFather and set `starsPrice` per course

Details: [docs/payments.md](docs/payments.md)

### Deploy

```bash
npm run build:deploy
```

Healthcheck:

```bash
curl https://your-domain.com/health
```

Guide: [docs/deployment.md](docs/deployment.md)

### Docs

- [Configuration](docs/configuration.md) - `config.yaml` reference
- [Courses](docs/courses.md) - content format
- [API](docs/api.md) - REST endpoints
- [Frontend](docs/frontend.md) - UI architecture
- [Database](docs/database.md) - SQLite schema
- [Payments](docs/payments.md) - PayPal + Stars
- [Video](docs/video.md) - Cloudflare Stream
- [Deployment](docs/deployment.md) - production setup

### Scripts

```bash
npm run dev:cli
npm run build
npm run lint

cd server
npm run dev
npm test
```

</details>

## License

MIT
