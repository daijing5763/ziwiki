package(default_visibility = ["//visibility:public"])

load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")


cc_binary(
    name = "monitor_gen_md",
    srcs = [
        "FileWatcher.h",
        "monitorGenMd.cpp",
    ],
    copts = [
        "-std=c++17",
    ],
    linkstatic=False,
    deps = [
        "//:golib",
    ],
)
cc_binary(
    name = "init_gen_md",
    srcs = [
        "FileWatcher.h",
        "initGenMd.cpp",
    ],
    copts = [
        "-std=c++17",
    ],
    linkstatic=False,
    deps = [
        "//:golib",
    ],
)