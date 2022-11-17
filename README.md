# ZIWIKI self-host 


## 1. go module init

```shell
go mod init github.com/zdlpsina/ziwiki #init
go mod tidy  #install deps
```

## database

> database 用于存储用户表、markdown表等，本repo选择postgres，可以使用sqlc等工具

### 安装依赖

> database 使用sqlc、golang migrate等



# ziwiki

## proxy

连不上github时使用代理

### wsl1

```shell
export https_proxy="http://127.0.0.1:1080"
export http_proxy="http://127.0.0.1:1080"
```

### wsl2

```shell
export hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
alias www="https_proxy=\"http://${hostip}:1080\" http_proxy=\"http://${hostip}:1080\""

# or set it global
export hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
export https_proxy="http://${hostip}:1080" 
export http_proxy="http://${hostip}:1080"
```


# testgo

## go module init

1. go mod init github.com/zdlpsina/testgo
2. go mod tidy

## go run

  go run main.go

## go build

  go build main.go

## go test

  go test -v -cover ./...

## go export cgo

go build -o golib.so -buildmode=c-shared main.go

## bazel& gazelle

### run

```shell
bazel run //:gazelle
```

### 添加依赖

```shell
bazel run //:gazelle -- update-repos -from_file=go.mod -to_macro=deps.bzl%go_dependencies
bazel run //:gazelle
```

### test

```shell
bazel test //srcgo:srcgo_test
```

## POST MAN

### CREATE_USE

```shell
post: 0.0.0.0:8080/users 
json:-->body-->json
{
    "username":"guestwhat",
    "password":"guestwhat",
    "email":"guestwhat@zizdlp.com"
}
```

### LOGIN

```shell
post: 0.0.0.0:8080/users/login
json: -->body-->json
{
    "username":"guestwhat",
    "password":"guestwhat",
}
```

### CREATE_REPO

auth:-->bear_token

```shell
post: 0.0.0.0:8080/repos
json: -->body-->json
{

				"repo_name": "test"
}
```

docker build -t b_ziwiki -f baseDockerfile .
docker build -t alpine_ziwiki -f alpineDockerfile .

//
sed -i "s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g" /etc/apk/repositories \
  &&

&& bazel run //:gazelle \
&& bazel run //:gazelle -- update-repos -from_file=go.mod -to_macro=deps.bzl%go_dependencies \
&& bazel run //:gazelle \
bazel run //:gazelle
bazel test ... && bazel build ...