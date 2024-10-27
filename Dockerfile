FROM ghcr.io/puppeteer/puppeteer:23.6.0
FROM node:18-slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_CACHE_DIR=/opt/render/project/.chrome

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "index.js"]

