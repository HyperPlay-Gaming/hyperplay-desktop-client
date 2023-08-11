# HyperPlay

HyperPlay is an Open Source Game Launcher for Linux, Windows and macOS with Web3 features.
It was conceived as a fork of [Heroic Games Launcher](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher), so it keeps its features but also add new ones.
Right now it supports launching games from the Epic Games Store using [Legendary](https://github.com/derrod/legendary) and GOG Games using [gogdl](https://github.com/App-Games-Launcher/heroic-gogdl).
HyperPlay is built with Web3 and Web2 Technologies like: TypeScript, React, NodeJS, and Electron.

## Index

- [HyperPlay](#hyperplay)
  - [Index](#index)
  - [Supported Operating Systems](#supported-operating-systems)
  - [Installation](#installation)
    - [Linux](#linux)
      - [Debian, Ubuntu and Derivatives](#debian-ubuntu-and-derivatives)
      - [Other Distributions (TAR.XZ)](#other-distributions-tarxz)
    - [Windows](#windows)
    - [macOS](#macos)
  - [Testing with Docker](#testing-with-docker)
  - [Credits](#credits)

## Supported Operating Systems

- Linux:
  - Ubuntu 20.04LTS or newer
  - Fedora 33 or newer
  - Arch Linux (Manjaro and Garuda as well)
  - HyperPlay will still work on most distros but we do not give official support for them. So do not open Issues here in these cases, instead, open a Discussion or try our Discord.
- SteamOS (downloading using Discover only)
- Windows 8+ (might work on Win7 if you have the latest PowerShell but we do not give support for it)
- macOS 10.15 or higher

## Installation

### Linux

#### Debian, Ubuntu and Derivatives

Download the `hyperplay.x.x.x_amd64.deb` from the Releases section

```bash
sudo dpkg -i hyperplay.x.x.x_amd64.deb
```

#### Other Distributions (TAR.XZ)

Since these two distribution formats don't have a form of dependency management, make sure the `curl` command is available. You might run into weird issues if it's not.

For the tar.xz file, you need first to extract it somewhere, enter the folder and run:

```bash
chmod +x hyperplay
```

To run it use:

```bash
./hyperplay
```

### Windows

Download HyperPlay_Setup.x.x.x.exe or the Portable HyperPlay-x.x.x.exe file and run it. It will install it to the start menu and desktop, use those to run it.

### macOS

Download HyperPlay-x.x.x.dmg and move the HyperPlay App to the Applications folder.

## Screenshots

[//]: # 'Easy way to upload screenshots: https://stackoverflow.com/a/26601810'

<img width="1840" alt="Hyperplay main page" src="https://github.com/HyperPlay-Gaming/hyperplay-desktop-client/assets/38574891/18c94466-8511-4f47-8de7-e74bc9b54ddf">
<img width="1840" alt="Hyperplay wallet signature during game" src="https://github.com/HyperPlay-Gaming/hyperplay-desktop-client/assets/38574891/a56d34c6-f1a8-46dc-9a18-5e0c6035e468">
<img width="1840" alt="Hyperplay game detail page" src="https://github.com/HyperPlay-Gaming/hyperplay-desktop-client/assets/38574891/a4a2ffe9-2e2a-4f88-be34-8903d900385b">

### Local Development

This projects uses submodules, so you need to clone it with the `--recurse-submodules` flag or run `git submodule update --init --recursive` after cloning.

```bash
yarn setup
yarn start
```

### Testing with Docker

It is recommended to run end to end tests with Docker so you don't alter your local config files or have your local config files interfere with the tests.

To run e2e tests on the unpackaged app running in dev mode.
From the root of your local Heroic directory, run:

```bash
yarn test:e2e
```

To run e2e tests on the packaged app.
From the root of your local Heroic directory, run:

```bash
yarn test:e2ePackaged
```

## Credits

### Those Awesome Guys: Gamepad prompts images

- URL: https://thoseawesomeguys.com/prompts/
