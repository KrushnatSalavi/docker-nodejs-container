FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 80

ENV MONGO_USER=max
ENV MONGO_PASSWORD=secret123

CMD ["npm", "start"]