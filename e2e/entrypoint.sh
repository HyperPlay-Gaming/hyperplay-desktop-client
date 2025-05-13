#!/bin/bash

echo "Clearing display lock for Xvfb"
rm -rf /tmp/.X99-lock

echo "Starting Xvfb"
Xvfb :99 -ac &
sleep 2

export DISPLAY=:99
echo "Executing command $@"

exec "$@"

echo
echo "#########"
echo "# Build #"
echo "#########"
echo

# get os
os="win"
if [[ "$OSTYPE" == *"linux"* ]]
then
    os="linux"

elif [[ "$OSTYPE" == *"darwin"* ]]
then
    os="mac"
fi
echo "OS is $os"

pnpm run setup

# build
if [[ "$TEST_PACKAGED" == "true" ]]
then
    if [[ "$os" == "mac" ]]
    then
        echo "Running pnpm run dist:mac:x64"
        pnpm run dist:mac:x64
    else
        echo "Running pnpm run dist:$os"
        pnpm run dist:$os
    fi
else
    pnpm electron-vite build
fi

echo
echo "########"
echo "# Test #"
echo "########"
echo

# tests must be run sequentially because two hp clients cannot be open at the same time
if [[ "$os" == "linux" ]]
then
    pnpm playwright test .*/api.spec.ts
    # xvfb-run -a -e /dev/stdout -s "-screen 0 1280x960x24" pnpm playwright test .*hpStoreApi.spec.ts
else
    pnpm playwright test .*/api.spec.ts
    # pnpm playwright test .*hpStoreApi.spec.ts
fi
