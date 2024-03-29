FROM mhart/alpine-node
ARG NEXT_PUBLIC_INFURA_ID
ARG NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL
ARG NEXT_PUBLIC_HUGS_LIMITED_CONTRIBUTION_API_URL
ARG NEXT_PUBLIC_HUGBUNTERS_WIDGET_URL
ARG NEXT_PUBLIC_HUGS_APP_ID
ARG NEXT_PUBLIC_X_CURATOR_TOKEN
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]