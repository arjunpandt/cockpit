FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
# ENVIRONMENT is placeholder for qa or prod environments
# It will change dynamically according to deployment on corresponding environments
RUN npm run-script build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/custom-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/cockpit/ /usr/share/nginx/html/
