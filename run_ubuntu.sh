docker stop ziwiki_ubuntu
docker rm ziwiki_ubuntu
docker run  -itd -v /Users/wangxili/github/ziwiki:/root/ziwiki --name ziwiki_ubuntu ubuntu_ziwiki bash 
docker exec -it ziwiki_ubuntu bash