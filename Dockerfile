FROM node:14.15.1
WORKDIR /code
ENV PORT 3000
COPY package.json /code/package.json
RUN npm install
COPY . /code
CMD ["node", "server/index.js"]
