#!/bin/sh -e
# ssh ubuntu@18.195.185.237

git pull
npm build
sudo kill `sudo lsof -i :80 | grep LISTEN | awk '{print $2}'`
