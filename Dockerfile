FROM ghcr.io/puppeteer/puppeteer:19.11.1
FROM oven/bun:1.0.22-slim


ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
CMD ["bun", "run", "src/index.ts"]