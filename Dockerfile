FROM node:22 AS build

ENV NODE_ENV=production

WORKDIR /app

COPY ./client/package*.json ./

RUN npm ci --include=dev

COPY ./client/ ./

RUN npm run build

# Final image
FROM nginx:1.27

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
