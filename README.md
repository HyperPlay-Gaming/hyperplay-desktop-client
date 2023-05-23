# HyperPlay

HyperPlay is an Open Source Game Launcher for Linux, Windows and macOS with Web3 features.
It was conceived as a fork of [Heroic Games Launcher](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher), so it keeps it is features but also add new ones.
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
  - [Development environment](#development-environment)
    - [Building Heroic Binaries](#building-heroic-binaries)
    - [Building with VS Code](#building-with-vs-code)
    - [Quickly testing/debugging Heroic on your own system](#quickly-testingdebugging-heroic-on-your-own-system)
    - [Development Using a Container](#development-using-a-container)
  - [Testing with Docker](#testing-with-docker)
  - [Sponsors](#sponsors)
  - [Screenshots](#screenshots)
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

<img width="1427" alt="image" src="https://user-images.githubusercontent.com/26871415/221288765-41a7981c-4112-4881-a88b-c2ed08929090.png">
<img width="1417" alt="image" src="https://user-images.githubusercontent.com/26871415/221288900-aa7c3168-d610-4598-8011-7f6c4dc4148f.png">
<img width="1427" alt="image" src="https://user-images.githubusercontent.com/26871415/221288973-eb897dec-34fe-4edf-8c3d-32836ca59a04.png">

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
