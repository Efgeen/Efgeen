#!/bin/sh
cd emsdk
./emsdk install latest
./emsdk activate latest
. ./emsdk_env.sh
cd -
if [ ! -d ninja ]; then
  mkdir ninja
fi
cd ninja
if [ -f "ninja.zip" ]; then
  rm "ninja.zip"
fi
if ! command -v curl &/dev/null; then
  apt install curl -y
fi
curl -L "https://github.com/ninja-build/ninja/releases/latest/download/ninja-linux.zip" -o "ninja.zip"
if [ -f "ninja.zip" ]; then
  if ! command -v unzip &/dev/null; then
    apt install unzip -y
  fi
  if [ -f "ninja" ]; then
    rm "ninja"
  fi
  unzip "ninja.zip"
  rm "ninja.zip"
fi
cd -
chmod u+x build.sh
