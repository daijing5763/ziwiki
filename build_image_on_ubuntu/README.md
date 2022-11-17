# software

apt-get update
apt install -y g++ unzip zip

## bazel

chmod +x bazel-5.3.2-installer-linux-x86_64.sh

./.sh --user

export PATH="$PATH:$HOME/bin"

docker build -t base_ziwiki .