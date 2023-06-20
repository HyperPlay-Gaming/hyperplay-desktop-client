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

yarn

# build
if [[ "$TEST_PACKAGED" == "true" ]]
then
    yarn dist:$os
else
    yarn vite build
fi

# mock backend server
cd e2e/__mocks__/hyperplay-mock-backend
yarn
cd ../../../

echo
echo "########"
echo "# Test #"
echo "########"
echo

# tests must be run sequentially because two hp clients cannot be open at the same time
if [[ "$os" == "linux" ]]
then
    yarn playwright test .*/api.spec.ts
    cd e2e/__mocks__/hyperplay-mock-backend && yarn start & sleep 5 && xvfb-run -a -e /dev/stdout -s "-screen 0 1280x960x24" yarn playwright test .*hpStoreApi.spec.ts
else
    yarn playwright test .*/api.spec.ts
    cd e2e/__mocks__/hyperplay-mock-backend && yarn start & sleep 5 && yarn playwright test .*hpStoreApi.spec.ts
fi
