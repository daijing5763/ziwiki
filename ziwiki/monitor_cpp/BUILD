package(default_visibility = ["//visibility:public"])

load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")

cc_binary(
    name = "monitor",
    srcs = [
        "monitor.cc",
        "monitor.h",
    ],
    copts = [
        "-std=c++17",
    ],
    linkstatic = False,
    deps = [
        "//cmd/export_monitor:monitor_lib",
    ],
)

