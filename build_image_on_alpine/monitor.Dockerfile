# Build stage
FROM deps_image_alpine AS builder
WORKDIR /app
COPY ziwiki .
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
COPY ziwiki/app.env .
COPY ziwiki/start_monitor.sh .
COPY ziwiki/wait-for.sh .
RUN chmod +x ./start_monitor.sh \
  && chmod +x ./wait-for.sh 
EXPOSE 8080
CMD [ "/app/monitor" ]
ENTRYPOINT [ "/app/start_monitor.sh" ]