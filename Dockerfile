ARG PLAYWRIGHT_VERSION=v1.60.0-noble
FROM mcr.microsoft.com/playwright:${PLAYWRIGHT_VERSION}

WORKDIR /app

ENV CI=true

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]