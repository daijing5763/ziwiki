# GOLANG comment backend for both web and app

##### pre accquire:

1. download & install go:

```shell
    wget https://golang.google.cn/dl/go1.19.1.linux-amd64.tar.gz
    sudo rm -rf /usr/local/go &&sudo tar -C /usr/local -xzf go1.19.1.linux-amd64.tar.gz
    export PATH=$PATH:/usr/local/go/bin
    go version
```
2. golang proxy
```shell
go env -w GO111MODULE=on 
go env -w GOPROXY=https://goproxy.cn,direct
```
3. golang extension vscode
```shell
go install -v golang.org/x/tools/gopls@latest
go install -v github.com/ramya-rao-a/go-outline@latest
go install -v golang.org/x/tools/cmd/goimports@latest
go install -v github.com/stamblerre/gocode@latest
go install -v github.com/rogpeppe/godef@latest
```
4. golang migrate
```shell
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz
sudo mv migrate.linux-amd64 /usr/bin/migrate
which migrate
```
5. proxy
```shell
#### wsl1:
export https_proxy="http://127.0.0.1:1080"
export http_proxy="http://127.0.0.1:1080"
### wsl2:
export hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
alias www="https_proxy=\"http://${hostip}:1080\" http_proxy=\"http://${hostip}:1080\""

# or set it global
export hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
export https_proxy="http://${hostip}:1080" 
export http_proxy="http://${hostip}:1080"
```
#### 1. run migrate
    migrate create -ext sql -dir db/migration -seq init_schema
#### 2. sqlc
    1. wget https://downloads.sqlc.dev/sqlc_1.15.0_linux_amd64.tar.gz
    2. tar -xvzf sqlc_1.15.0_linux_amd64.tar.gz
    3. sudo mv sqlc /usr/local/bin
### 3. go module
    1. go mod init github.com/zdlpsina/gocomment
    2. go mod tidy  
### 4. unittest
    1. go get github.com/lib/pq
    2. go get github.com/stretchr/testify
    3. go get golang.org/x/crypto/bcrypt    
    4. viper(LOCAL CONFIG)  go get github.com/spf13/viper 
### 5. gin http
    1. go get -u github.com/gin-gonic/gin
    2. go run main.go
### 6. jwt&pasteo
  1. go get -u github.com/golang-jwt/jwt/v4
  2. go get -u github.com/o1egl/paseto 
### 7. MOCK db
  1. go install github.com/golang/mock/mockgen@v1.6.0
  2. .bashrc:export PATH=$PATH:~/go/bin
  3. source .bashrc 
  4. go get github.com/golang/mock/mockgen@v1.6.0 (optional)
  5. mockgen -package mockdb -destination db/mock/store.go github.com/zdlpsina/gocomment/db/sqlc Store
### 8. add session
    1. migrate create -ext sql -dir db/migration -seq add_sessions
