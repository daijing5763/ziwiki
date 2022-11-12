#include <fstream>
#include <iostream>
#include <filesystem>
namespace fs = std::filesystem;
using namespace std;
int main() {
  for (auto& file : fs::recursive_directory_iterator("./wiki")) {
    if (fs::is_regular_file(file.symlink_status())) {
      std::string file_path = file.path().string();
      std::string file_type = file_path.substr(file_path.length() - 3, 3);
      if (file_type == ".md") {
        cout << file_path << endl;
      }
    }
  }
}
