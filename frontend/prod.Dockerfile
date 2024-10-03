# Use the official Node.js image as the base image
FROM node:20 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Copy the rest of the application code
COPY . .

RUN corepack enable

RUN corepack prepare pnpm@8.6.2 --activate

RUN #npm install -g pnpm@10.8.3;

RUN pnpm install;

RUN pnpm i --frozen-lockfile;

# Build vue.js based on the preferred package manager
RUN pnpm run dev;

# Use Nginx as the production server
FROM nginx:stable-alpine

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Vue.js files to the Nginx web server directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
