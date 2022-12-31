# 相关Docker镜像构建&使用

> 涉及api镜像、postgres镜像、monitor镜像、nginx镜像，其中api镜像&postgres镜像基于一个基础镜像：deps

## 1. build deps

从当前目录`build`:

```shell
docker build -t deps_image_alpine -f ./deps.Dockerfile .
```

## 2. api 镜像

- 从ziwiki目录:

  ```shell
  docker build -t local_api -f ./build/api.Dockerfile .
  ```

- docker-compose中构建

## 3. monitor 镜像

- 从ziwiki目录:

  ```shell
  docker build -t local_monitor -f ./build/monitor.Dockerfile .
  ```

- docker-compose中构建

## 4. postgres 镜像

- docker-compose中构建

## 5. 前端next 镜像

- front fronted:

  ```shell
  docker build -t nextdev . -f prod.Dockerfile
  ```

- docker-compose中构建

## postgres

1. 首先 git clone postgresSQL扩张pg_jieba到util目录（支持中文分词）

2. 构建：
   - 从build目录:

     ```shell
     docker build -t local_postgres -f ./postgres.Dockerfile .
     ```

   - docker-compose中构建

3. 附录： postgres 基本语法

- 选择database:
  
  `\psql ziwiki`
- \l 列表 \c 选择

## nginx

- docker-compose中构建
