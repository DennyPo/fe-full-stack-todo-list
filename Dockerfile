FROM node:12-alpine

EXPOSE 3000

WORKDIR /frontend

ENV NEXT_PUBLIC_API_URL="http://127.0.0.1:3001/graphql"
ENV API_URL="http://backend:3001/graphql"

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

CMD ["yarn", "dev"]
