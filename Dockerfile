FROM golang:1.21-alpine

WORKDIR /app
COPY . .
RUN apk update && apk add nodejs npm
RUN npm i -g yarn
RUN yarn build
RUN go build server/main.go

EXPOSE 8080
CMD ["/app/main"]
