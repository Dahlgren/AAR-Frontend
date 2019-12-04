FROM node:lts-alpine AS builder
WORKDIR /build/
COPY package.json /build/
RUN npm install
COPY index.html /build/
COPY src/ /build/src/
RUN npm run build

FROM node:lts-alpine
WORKDIR /app/
COPY package.json /app/
RUN npm install --production
COPY --from=builder /build/build/ /app/build/
COPY favicon.ico server.js /app/
EXPOSE 8080
CMD node server.js