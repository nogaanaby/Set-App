#!/bin/sh -e

git pull
npm build
sudo kill `sudo lsof -i :80 | grep LISTEN | awk '{print $2}'`
