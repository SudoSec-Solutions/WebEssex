# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS build
ARG API_BASE_URL=http://backend:8000
ARG SITE_URL
ENV VITE_API_BASE_URL=${API_BASE_URL}
ENV VITE_SITE_URL=${SITE_URL}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:ssg

FROM nginx:alpine
RUN apk add --no-cache gettext
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/entrypoint.sh /docker-entrypoint.d/10-envsubst-config.sh
RUN chmod +x /docker-entrypoint.d/10-envsubst-config.sh
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
