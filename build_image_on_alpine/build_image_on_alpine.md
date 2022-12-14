# build image based on alpine docker

## build postgres image

from project root path run(proxy):

```shell
docker build -t postgres_image_alpine -f DockerfilePostgres .
```

## build deps image

from project root path run(proxy):

```shell
docker build -t deps_image_alpine -f ./build_image_on_alpine/DockerfileDeps .
```

## build gazelle image

from project root path run:

```shell
docker build -t gazelle_image_alpine -f ./build_image_on_alpine/DockerfileGazelle .
```

## build run image

from project root path run:

```shell
docker build -t run_image_alpine -f ./build_image_on_alpine/DockerfileRun .
```

## build run image monitor

from project root path run:

```shell
docker build -t monitor_image_alpine -f ./build_image_on_alpine/DockerfileMonitor .
```

front fronted:

```shell
docker build -t nextdev . -f dev.Dockerfile
```
