FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY server.js db.js ./
COPY public ./public
COPY views ./views
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "server.js"]
