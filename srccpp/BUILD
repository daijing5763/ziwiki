package(default_visibility = ["//visibility:public"])

load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")


cc_binary(
    name = "monitor_fs",
    srcs = [
        "FileWatcher.h",
        "test_monitor.cpp",
    ],
    copts = [
        "-std=c++17",
    ],
    linkstatic=False,
    deps = [
        "//:golib",
    ],
)

