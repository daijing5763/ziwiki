# 后端Docker镜像构建&使用

> 后端涉及api镜像、postgres镜像、monitor镜像，其中api镜像&postgres镜像基于一个基础镜像：deps

## 1. build deps

从当前目录`build_image_on_alpine`:

```shell
docker build -t deps_image_alpine -f ./deps.Dockerfile .
```

## 2. api 镜像

从ziwiki目录:

```shell
docker build -t local_api -f ./build_image_on_alpine/api.Dockerfile .
```

docker-compose中构建

## 3. monitor 镜像

从ziwiki目录:

```shell
docker build -t local_monitor -f ./build_image_on_alpine/monitor.Dockerfile .
```

docker-compose中构建

## 4. postgres 镜像

docker-compose中构建

## 5. 前端next 镜像

front fronted:

```shell
docker build -t nextdev . -f prod.Dockerfile
```

## postgres

1. 选择database:
\psql ziwiki
