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
