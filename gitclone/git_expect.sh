#!/usr/bin/expect
# need chmod +x, install expect
set gitpath [lindex $argv 0];
set username [lindex $argv 1];
set access_token [lindex $argv 2];
set timeout 30
spawn git clone $gitpath

expect "*Username*" {send "$username\r"}
expect "*Password*" {send "$access_token\r"}

interact