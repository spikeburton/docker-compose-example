FROM node:10-alpine
RUN mkdir /app
WORKDIR /app
COPY index.js .
COPY package.json .
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]
