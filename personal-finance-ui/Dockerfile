# Stage 1: Build the angular application
FROM node:14 as build
WORKDIR /app
COPY personal-finance-app/package.json personal-finance-app/package-lock.json ./
RUN npm ci
COPY personal-finance-app/ .
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine
COPY --from=build /app/dist/personal-finance-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
