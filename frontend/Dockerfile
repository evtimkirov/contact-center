FROM node:20

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
