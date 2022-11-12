// Compilation example for GCC (v8 and up), Clang (v7 and up) and MSVC
// g++ -std=c++17 -Wall -pedantic test_fs_watcher.cpp -o test_fs_watcher -lstdc++fs
// clang++ -std=c++17 -stdlib=libc++ -Wall -pedantic test_fs_watcher.cpp -o test_fs_watcher -lc++fs
// cl /W4 /EHsc /std:c++17 /permissive- test_fs_watcher.cpp

#include <iostream>
#include "FileWatcher.h"
#include "golib.h"
int main(int argc, char *argv[]) {
  std::cout << "______start monitor gen md_______\n";
  std::string src_path = "";
  if (argc == 2) {
    src_path = argv[1];
    std::cout << "monitor src_path:" << src_path << std::endl;
  } else {
    std::cout << " monitor src_path not give , program exit\n";
    return 0;
  }
  // Create a FileWatcher instance that will check the current folder for changes every 5 seconds
  FileWatcher fw{src_path, std::chrono::milliseconds(10)};
  fw.start([src_path](std::string path_to_watch, FileStatus status) -> void {
    // Process only regular files, all other file types are ignored
    if (!fs::is_regular_file(fs::path(path_to_watch)) && status != FileStatus::erased) {
      return;
    }
    switch (status) {
      case FileStatus::created: {
        std::cout << "File created: " << path_to_watch << '\n';
        renderMd(const_cast<char *>(path_to_watch.c_str()), 0);
        break;
      }

      case FileStatus::modified: {
        std::cout << "File modified: " << path_to_watch << '\n';
        renderMd(const_cast<char *>(path_to_watch.c_str()), 1);
        break;
      }

      case FileStatus::erased: {
        std::cout << "File erased: " << path_to_watch << '\n';
        renderMd(const_cast<char *>(path_to_watch.c_str()), 2);
        break;
      }
      default:
        std::cout << "Error! Unknown file status.\n";
    }
  });
}