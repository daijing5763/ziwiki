sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
apk update
apk add g++ 
apk add --allow-untrusted bazel5-5.3.2-r0.apk
# apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ bazel5 && bazel --version
