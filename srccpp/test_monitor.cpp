// Compilation example for GCC (v8 and up), Clang (v7 and up) and MSVC
// g++ -std=c++17 -Wall -pedantic test_fs_watcher.cpp -o test_fs_watcher -lstdc++fs
// clang++ -std=c++17 -stdlib=libc++ -Wall -pedantic test_fs_watcher.cpp -o test_fs_watcher -lc++fs
// cl /W4 /EHsc /std:c++17 /permissive- test_fs_watcher.cpp

#include <iostream>
#include "FileWatcher.h"
#include "golib.h"
int main(int argc, char *argv[]) {
  std::cout << "______watcher_____\n";
  std::string src_path = "";
  std::string dest_path = "";
  if (argc == 3) {
    src_path = argv[1];
    dest_path = argv[2];
    std::cout << "monitor src_path:" << src_path << ";dest_path:" << dest_path << std::endl;
  } else {
    return 0;
  }
  std::cout << "______watcher____2_\n";
  // Create a FileWatcher instance that will check the current folder for changes every 5 seconds
  FileWatcher fw{src_path, std::chrono::milliseconds(100)};
  // char src[] = "./wiki/test.md";
  // char dest[] = "./.ziwiki/test.md";
  // cFunc(src, dest);
  // cFunc(const_cast<char *>(src_path.c_str()), const_cast<char *>(src_path.c_str()));
  // Start monitoring a folder for changes and (in case of changes)
  // run a user provided lambda function
  fw.start([src_path, dest_path](std::string path_to_watch, FileStatus status) -> void {
    // Process only regular files, all other file types are ignored
    if (!std::filesystem::is_regular_file(std::filesystem::path(path_to_watch)) && status != FileStatus::erased) {
      return;
    }
    std::cout << "______watcher___3__\n";
    switch (status) {
      case FileStatus::created: {
        std::cout << "File created: " << path_to_watch << '\n';
        std::string target_file = dest_path + "/" + path_to_watch.substr(8, path_to_watch.length() - 8);
        std::cout << "mydebug: src_file:" << path_to_watch << ";target file:" << target_file << std::endl;
        cFunc(const_cast<char *>(path_to_watch.c_str()), const_cast<char *>(target_file.c_str()), 0);
        break;
      }

      case FileStatus::modified: {
        std::cout << "File modified: " << path_to_watch << '\n';
        std::string target_file = dest_path + "/" + path_to_watch.substr(8, path_to_watch.length() - 8);
        std::cout << "mydebug modify: src_file:" << path_to_watch << ";target file:" << target_file << std::endl;
        cFunc(const_cast<char *>(path_to_watch.c_str()), const_cast<char *>(target_file.c_str()), 1);
        break;
      }

      case FileStatus::erased: {
        std::cout << "File erased: " << path_to_watch << '\n';
        std::string target_file = dest_path + "/" + path_to_watch.substr(8, path_to_watch.length() - 8);
        std::cout << "mydebug earse: src_file:" << path_to_watch << ";target file:" << target_file << std::endl;
        cFunc(const_cast<char *>(path_to_watch.c_str()), const_cast<char *>(target_file.c_str()), 2);
        break;
      }
      default:
        std::cout << "Error! Unknown file status.\n";
    }
  });
}