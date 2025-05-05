FROM nginx:alpine

# Copy the built app to the nginx html directory
COPY /dist/personal-finance-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]