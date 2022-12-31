# Build stage
FROM deps_image_alpine AS builder
WORKDIR /app
COPY backend .
RUN export GOPROXY=https://goproxy.cn/ \
  && export PATH="$PATH:$HOME/bin" \
  && bazel run //:gazelle \
  && bazel run //:gazelle -- update-repos -from_file=go.mod -to_macro=deps.bzl%go_dependencies \
  && bazel run //:gazelle \
  && bazel build //cmd/monitor:all 

# Run stage
FROM alpine:3.16
WORKDIR /app
COPY --from=builder /app/bazel-bin/cmd/monitor/monitor_/monitor .
COPY backend/app.env .
COPY backend/start_monitor.sh .
COPY backend/wait-for.sh .
RUN chmod +x ./start_monitor.sh \
  && chmod +x ./wait-for.sh 
EXPOSE 8080
CMD [ "/app/monitor" ]
ENTRYPOINT [ "/app/start_monitor.sh" ]