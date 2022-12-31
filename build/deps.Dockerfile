FROM  golang:1.19.3-alpine3.16
WORKDIR /tmp
COPY util/deps.sh .
COPY util/bazel5-5.3.2-r0.apk .
RUN chmod +x deps.sh  \
  && sh deps.sh 