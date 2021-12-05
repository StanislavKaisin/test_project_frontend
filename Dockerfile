FROM node:14-alpine as build

WORKDIR /app
COPY package.json .
RUN npm install
# RUN npm install --no-optional
# RUN npm uninstall fsevents
COPY . .
RUN npm run build

FROM nginx:1.21.0

COPY ./nginx/nginx.conf /etc/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

# docker build -t digis-intern-task-frontend .
