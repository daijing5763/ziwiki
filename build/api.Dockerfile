# Build stage
FROM deps_image_alpine AS builder
WORKDIR /app
COPY backend .
RUN export GOPROXY=https://goproxy.cn/ \
  && export PATH="$PATH:$HOME/bin" \
  && bazel run //:gazelle \
  && bazel run //:gazelle -- update-repos -from_file=go.mod -to_macro=deps.bzl%go_dependencies \
  && bazel run //:gazelle \
  && bazel build //cmd/server:all 

# Run stage
FROM alpine:3.16
WORKDIR /app
COPY --from=builder /app/bazel-bin/cmd/server/server_/server .
COPY ./build/util/migrate.linux-amd64 /usr/bin/migrate
COPY backend/app.env .
COPY backend/start.sh .
COPY backend/wait-for.sh .
COPY cert/bundle.crt .
COPY cert/bundle.key .
COPY backend/db/migration migration
RUN chmod +x ./start.sh \
  && chmod +x ./wait-for.sh 
EXPOSE 8080
CMD [ "/app/server" ]
ENTRYPOINT [ "/app/start.sh" ]