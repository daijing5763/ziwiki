#include <fstream>
#include <iostream>
#include <filesystem>
#include "golib.h"
namespace fs = std::filesystem;
using namespace std;
int main() {
  std::string src_path = "./wiki";
  std::string config_path = ".";
  for (auto &file : fs::recursive_directory_iterator(src_path)) {
    if (fs::is_regular_file(file.symlink_status())) {
      std::string file_path = file.path().string();
      std::string file_type = file_path.substr(file_path.length() - 3, 3);
      if (file_type == ".md") {
        renderMd(const_cast<char *>(config_path.c_str()), const_cast<char *>(file_path.c_str()), 0);
        cout << "file md:" << file_path << " is rendered\n";
      }
    }
  }
}
