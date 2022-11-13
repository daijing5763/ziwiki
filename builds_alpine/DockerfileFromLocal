# Build stage
FROM golang:1.19-alpine3.16 AS builder
WORKDIR /app
COPY . .
# RUN go env -w GO111MODULE=on 
# RUN go env -w GOPROXY=https://goproxy.cn,direct
RUN echo "export GOPROXY=https://goproxy.cn/" >> ~/.bashrc 
RUN export GOPROXY=https://goproxy.cn/ && go mod tidy
RUN go build -o main main.go

# Run stage
FROM alpine:3.16
WORKDIR /app
COPY --from=builder /app/main .
COPY app.env .
COPY start.sh .
COPY wait-for.sh .
COPY db/migration ./db/migration

EXPOSE 8080
CMD [ "/app/main" ]
ENTRYPOINT [ "/app/start.sh" ]