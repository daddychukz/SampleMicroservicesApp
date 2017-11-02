FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY public /app/public
COPY routes /app/routes
COPY views /app/views
COPY app.js /app
CMD node app.js
EXPOSE 80
EXPOSE 5671