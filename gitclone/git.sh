#!/bin/bash

# bash git.sh 1 1 https://gitee.com/zizdlp/wiki.git zizdlp zzz123
echo "user_id: $1"
echo "repo_id: $2"
echo "gitpath: $3"
echo "username: $4"
echo "access_token: $5"

if [ ! -d "wiki/$1/$2" ];then

mkdir -p wiki/$1/$2
fi
cd wiki/$1/$2 && /usr/bin/expect /root/ziwiki/git_expect.sh $3 $4 $5