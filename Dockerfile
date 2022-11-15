# This allows us to run the build in a node image and server the app using an nginx image.
# the final Docker image will just contain the build folder and nothing else 
# - the project files were only used by to build the project in the builder layer, which then gets thrown away - 
# it's just an intermmediary step.

# ==== SET ENV APP =====
# Image with build folder
FROM node:18-alpine as builder
ENV NODE_ENV production
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .

# ==== BUILD =====
# Install dependencies
RUN yarn cache clean 
RUN yarn install 
# Build the app
RUN yarn run build

# ==== SET ENV NGINX =====
# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
COPY deployment.sh docker-entrypoint.d/.

# ==== NGINX CONF =====
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 82

# ==== START SERVER =====
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
