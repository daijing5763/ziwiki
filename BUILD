load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library")
load("@bazel_gazelle//:def.bzl", "gazelle")
load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")

# gazelle:prefix github.com/zdlpsina/ziwiki
gazelle(
    name = "gazelle",
)

go_library(
    name = "ziwiki_lib",
    srcs = ["main.go"],
    cgo = True,
    importpath = "github.com/zdlpsina/ziwiki",
    visibility = ["//visibility:private"],
    deps = [
        "//api",
        "//db/sqlc",
        "//lute",
        "//util",
        "@com_github_lib_pq//:pq",
    ],
)

go_binary(
    name = "ziwiki",
    embed = [":ziwiki_lib"],
    visibility = ["//visibility:public"],
)

go_binary(
    name = "golib",
    srcs = ["main.go"],
    cgo = True,
    importpath = "github.com/zdlpsina/ziwiki",
    linkmode = "c-archive",
    visibility = ["//visibility:public"],
    deps = [
        "//api",
        "//db/sqlc",
        "//lute",
        "//util",
        "@com_github_lib_pq//:pq",
    ],
)
