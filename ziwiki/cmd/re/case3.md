# heading

## code

```python
import numpy as np
import pandas as pd

def func(a,b):
  c=a+b
  d=np.array([1,2,3])
  return d;

```

```c++
// Compilation example for GCC (v8 and up), Clang (v7 and up) and MSVC
// g++ -std=c++17 -Wall -pedantic test_fs_watcher.cpp -o test_fs_watcher -lstdc++fs
// clang++ -std=c++17 -stdlib=libc++ -Wall -pedantic test_fs_watcher.cpp -o test_fs_watcher -lc++fs
// cl /W4 /EHsc /std:c++17 /permissive- test_fs_watcher.cpp

#include <iostream>
#include "monitor.h"
#include "cmd/export_monitor/monitor_lib.h"
int main(int argc, char *argv[]) {
  std::cout << "______start monitor gen md_______\n";
  std::string src_path = "/tmp/wiki";
  std::string config_path = ".";
  FileWatcher fw{src_path, std::chrono::milliseconds(1000)};
  std::cout << "______0_______\n";
  fw.start([src_path, config_path](std::string path_to_watch, FileStatus status) -> void {
    std::cout << "______1_______\n";
    // Process only regular files, all other file types are ignored
    if (!fs::is_regular_file(fs::path(path_to_watch)) && status != FileStatus::erased) {
      return;
    }
    switch (status) {
      case FileStatus::created: {
        std::cout << "File created: " << path_to_watch << '\n';
        ExportRenderLogic(const_cast<char *>(config_path.c_str()), const_cast<char *>(path_to_watch.c_str()), 1);
        break;
      }
      // hello
      case FileStatus::modified: {
        std::cout << "File modified: " << path_to_watch << '\n';
        ExportRenderLogic(const_cast<char *>(config_path.c_str()), const_cast<char *>(path_to_watch.c_str()), 2);
        break;//ok
      }

      case FileStatus::erased: {
        std::cout << "File erased: " << path_to_watch << '\n';
        ExportRenderLogic(const_cast<char *>(config_path.c_str()), const_cast<char *>(path_to_watch.c_str()), 3);
        break;
      }
      default:
        std::cout << "Error! Unknown file status.\n";
    }
  });
}
```

```python
def func(a,b):
  c=a+b
  return c
```

## math span

this is:$A_i + B_i$ you known

## math block

$$y=\frac{x-E(x)}{\sqrt{ Var(x)+\epsilon}}*\gamma+\beta$$
