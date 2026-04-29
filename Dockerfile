FROM node:20-alpine

# Install iputils for ping
RUN apk add --no-cache iputils

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]