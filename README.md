# playwright_seed

Playwright + TypeScript automation framework boilerplate.

## Stack

- [Playwright](https://playwright.dev/) — test runner
- TypeScript
- Docker + Docker Compose

## Prerequisites

- Node.js 22+
- Docker Desktop

## Quick start

```bash
npm install
npx playwright test --project=setup --project=api
```

Tests run against the remote dev environment by default (`ENV=dev`).

## Environments

| ENV     | URL                                 |
| ------- | ----------------------------------- |
| `dev`   | https://practicesoftwaretesting.com |
| `local` | http://localhost:4200               |

Switch with `ENV=<name>` prefix or set in `src/common/config/envs/.env`.

## Running against local services

Spin up [Practice Software Testing](https://github.com/testsmith-io/practice-software-testing) locally:

```bash
# 1. Create a directory for PST and download compose config
mkdir ~/pst-local && cd ~/pst-local
curl -O https://raw.githubusercontent.com/testsmith-io/practice-software-testing/main/docker-compose.prod.yml
curl -O https://raw.githubusercontent.com/testsmith-io/practice-software-testing/main/.env

# 2. Start all services (~1.5 GB images, first run takes 3-5 min)
docker compose -f docker-compose.prod.yml up -d

# 3. Seed the database (run as www-data to avoid permission issues)
docker exec -u www-data pst-local-laravel-api-1 php artisan migrate:fresh --seed
```

Services started:

| Service                     | URL                                     |
| --------------------------- | --------------------------------------- |
| Frontend (Angular)          | http://localhost:4200                   |
| API (Laravel)               | http://localhost:8091                   |
| API docs (Swagger)          | http://localhost:8091/api/documentation |
| Database admin (PHPMyAdmin) | http://localhost:8000                   |

Run tests against local services:

```bash
# From the auto-practice project directory
ENV=local npx playwright test
```

Stop services:

```bash
docker compose -f ~/pst-local/docker-compose.prod.yml down
```

Reset database (clean state):

```bash
docker exec -u www-data pst-local-laravel-api-1 php artisan migrate:fresh --seed
```

## Running in Docker

```bash
# Build and run tests in container (mirrors CI environment)
docker compose up && docker compose down

# Or with docker run
docker run --rm \
  --env-file src/common/config/envs/.env \
  -v $(pwd)/playwright-report:/app/playwright-report \
  -v $(pwd)/test-results:/app/test-results \
  auto-practice
```

## CI/CD

GitHub Actions pipeline runs on every push to `main` and on pull requests.

Jobs:

- **Code Quality** (PR only) — ESLint, Prettier, TypeScript check
- **test** — setup + API tests in Playwright Docker container
- **Test Report** — publishes JUnit results to GitHub Checks

Scheduled runs: Mon–Fri at 09:00 Kyiv time (06:00 UTC).

Manual trigger available via GitHub Actions → Run workflow (select environment).

## Reports

After a local run:

```bash
npm run report
```

HTML report opens at `http://localhost:9323`.
