#!/usr/bin/expect
# need chmod +x, install expect
set timeout 30

spawn git clone https://gitee.com/zizdlp/wiki.git

expect "*Username*" {send "zizdlp\r"}
expect "*Password*" {send "zzz123\r"}

interact