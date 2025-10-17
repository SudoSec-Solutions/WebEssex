# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS build
ARG API_BASE_URL=http://backend:8000
ENV VITE_API_BASE_URL=${API_BASE_URL}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
