FROM golang:1.23-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY backend/go.mod backend/go.sum ./
RUN go mod download

CMD ["air", "-c", ".air.toml"]