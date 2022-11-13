
# apk add g++ unzip zip ca-certificates bash 
apk update
apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ bazel5 && bazel --version
apk add clang lld musl-dev compiler-rt compiler-rt-static