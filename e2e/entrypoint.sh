#!/bin/bash

echo "Host OS is $HOST_OS"

# get os
os=$HOST_OS
# if [[ "$OSTYPE" == *"linux"* ]]
# then
#     os="linux"

# elif [[ "$OSTYPE" == *"darwin"* ]]
# then
#     os="mac"
# fi

if [[ "$os" == "linux" ]]
then
    echo "Clearing display lock for Xvfb"
    rm -rf /tmp/.X99-lock

    echo "Starting Xvfb"
    Xvfb :99 -ac &
    sleep 2
fi

export DISPLAY=:99
echo "Executing command $@"

exec "$@"

echo
echo "#########"
echo "# Build #"
echo "#########"
echo

yarn setup

# build
if [[ "$TEST_PACKAGED" == "true" ]]
then
    if [[ "$os" == "mac" ]]
    then
        echo "Running yarn dist:mac:x64"
        yarn dist:mac:x64
    else
        echo "Running yarn dist:$os"
        yarn dist:$os
    fi
else
    yarn electron-vite build
fi

echo
echo "########"
echo "# Test #"
echo "########"
echo

# tests must be run sequentially because two hp clients cannot be open at the same time
if [[ "$os" == "linux" ]]
then
    yarn playwright test .*/api.spec.ts
    # xvfb-run -a -e /dev/stdout -s "-screen 0 1280x960x24" yarn playwright test .*hpStoreApi.spec.ts
else
    yarn playwright test .*/api.spec.ts
    # yarn playwright test .*hpStoreApi.spec.ts
fi
