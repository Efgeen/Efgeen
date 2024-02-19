#!/bin/sh
ninja="../ninja/ninja"
if [ ! -d bin/ ]; then
    mkdir -p bin
fi
cd bin/
$ninja -f ../build.ninja
if [ ! -d ../../docs ]; then
    mkdir -p ../../docs
fi
if ls *.js 1> /dev/null 2>&1; then
    cp *.js ../../docs/
fi
if ls *.wasm 1> /dev/null 2>&1; then
    cp *.wasm ../../docs/
fi
cd -
