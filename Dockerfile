FROM golang:1.21-alpine

WORKDIR /app
COPY . .
RUN go build server/main.go

EXPOSE 8080
CMD ["./main"]
