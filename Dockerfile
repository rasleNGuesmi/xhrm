# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16-alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY . /usr/local/app/

RUN npm install -g npm@9.6.1

# Install all the dependencies for avoid dependencies conflict
#RUN npm install --legacy-peer-deps
RUN npm install

# Install ng 14
#RUN npm install -g @angular/cli@14.0.6

# Generate the build of the application
RUN npm run build --configuration=production


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.23.3-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/xtend_hrm_front /usr/share/nginx/html

# Copy nginx configuration file.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80