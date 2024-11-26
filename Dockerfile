FROM node:22-alpine AS build

ENV NODE_ENV=production

WORKDIR /app

COPY ./client/package*.json ./

RUN npm ci --include=dev

COPY ./client/ ./

RUN npm run build

FROM caddy:2.9-alpine AS final-stage

COPY --from=build /app/dist /srv

CMD [ "caddy", "file-server" ]
