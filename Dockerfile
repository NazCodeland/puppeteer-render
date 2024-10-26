FROM ghcr.io/puppeteer/puppeteer:23.6.0

RUN apt-get update && apt-get install -y google-chrome-stable

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["node", "index.js"]
