# gazelle

bazel run //ziwiki:gazelle
bazel run //ziwiki:gazelle -- update-repos -from_file=ziwiki/go.mod -to_macro=deps.bzl%go_dependencies
bazel run //ziwiki:gazelle
