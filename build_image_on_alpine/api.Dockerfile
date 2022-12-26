# Build stage
FROM deps_image_alpine AS builder
WORKDIR /app
COPY ziwiki .
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
COPY ./build_image_on_alpine/util/migrate.linux-amd64 /usr/bin/migrate
COPY ziwiki/app.env .
COPY ziwiki/start.sh .
COPY ziwiki/wait-for.sh .
COPY ziwiki/bundle.crt .
COPY ziwiki/bundle.key .
COPY ziwiki/db/migration migration
RUN chmod +x ./start.sh \
  && chmod +x ./wait-for.sh 
EXPOSE 8080
CMD [ "/app/server" ]
ENTRYPOINT [ "/app/start.sh" ]