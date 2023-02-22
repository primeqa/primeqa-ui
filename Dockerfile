# This allows us to run the build in a node image and server the app using an nginx image.
# the final Docker image will just contain the build folder and nothing else 
# - the project files were only used by to build the project in the builder layer, which then gets thrown away - 
# it's just an intermmediary step.

# ==== SET ENV APP =====
# Image with build folder
FROM node:18-alpine as builder
ENV NODE_ENV production

# Create application user to fix appscan issues
# RUN useradd -c "Application User" -U -u 2000 -d /app -m app

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
FROM nginxinc/nginx-unprivileged:1.23.3-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
COPY deployment.sh docker-entrypoint.d/.

# ==== NGINX CONF =====
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 8000

# ==== START SERVER =====
# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# needed for chmod
USER root

# needed for write access for deployment.sh
RUN mkdir /tmp/proxy_temp && chmod 0757 /usr/share/nginx/html/

# needed to mitigate CVE-2023-23914, CVE-2023-23915 and CVE-2023-23916
RUN apk update && \
    apk upgrade && \
    apk add libcurl>=7.87.0-r2 curl>=7.87.0-r2

# reinstate the user
USER nginx
