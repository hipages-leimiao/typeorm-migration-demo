FROM bitnami/node:14 as builder


WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --prefer-offline --frozen-lockfile

COPY . ./

#RUN yarn test && \
#    yarn build && \
#    yarn install --production --prefer-offline --frozen-lockfile

FROM bitnami/node:14-prod

COPY --from=builder /app /app

WORKDIR /app
EXPOSE 3000

ENV PORT=3000 \
  NODE_ENV=development 


CMD ["yarn", "typeorm"]
