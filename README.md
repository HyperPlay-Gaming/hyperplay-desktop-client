# HyperPlay

HyperPlay is an Open Source Game Launcher for Linux, Windows and macOS with Web3 features.
It was conceived as a fork of [Heroic Games Launcher](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher), so it keeps it is features but also add new ones.
Right now it supports launching games from the Epic Games Store using [Legendary](https://github.com/derrod/legendary) and GOG Games using [gogdl](https://github.com/App-Games-Launcher/heroic-gogdl).
HyperPlay is built with Web3 and Web2 Technologies like: TypeScript, React, NodeJS, and Electron.

## Index

- [HyperPlay](#hyperplay)
  - [Index](#index)
  - [Features available right now](#features-available-right-now)
  - [Planned features](#planned-features)
  - [Supported Operating Systems](#supported-operating-systems)
  - [Language Support](#language-support)
    - [Help with Translations Here](#help-with-translations-here)
  - [Installation](#installation)
    - [Linux](#linux)
      - [Flatpak](#flatpak)
      - [Debian, Ubuntu and Derivatives](#debian-ubuntu-and-derivatives)
      - [Debian (third party `apt` repository)](#debianubuntu-third-party-apt-repository)
      - [Arch (AUR)](#arch-aur)
      - [Fedora](#fedora)
      - [Other Distributions (AppImage and TAR.XZ)](#other-distributions-appimage-and-tarxz)
    - [Windows](#windows)
    - [macOS](#macos)
    - [Build binaries locally (All platforms)](#build-binaries-locally-all-platforms)
    - [Any OS (development environment)](#any-os-development-environment)
    - [Building with VS Code](#building-with-vs-code)
    - [Development Using a Container](#development-using-a-container)
    - [Any OS (development environment)](#any-os-development-environment)
    - [Building with VS Code](#building-with-vs-code)
    - [Development Using a Container](#development-using-a-container)
  - [Screenshots](#screenshots)
  - [Credits](#credits)

## Features available right now

- Login with an existing Epic Games account or GOG account
- Install, uninstall, update, repair and move Games
- Import an already installed game
- Play Epic games online [AntiCheat on macOS and on Linux depends on the game]
- Play games using Wine or Proton [Linux]
- Play games using Crossover [macOS]
- Download custom Wine and Proton versions [Linux]
- Access to Epic and GOG stores directly from HyperPlay
- Search for the game on ProtonDB for compatibility information [Linux]
- Sync installed games with an existing Epic Games Store installation
- Sync saves with the cloud
- Theming Support

## Planned features

- Download queue
- Add Games outside GOG and Epic Games
- Support Other Store (Amazon Gaming, IndieGala, etc)
- Play GOG games online

## Supported Operating Systems

- Linux:
  - Ubuntu 20.04LTS or newer
  - Fedora 33 or newer
  - Arch Linux (Manjaro and Garuda as well)
  - HyperPlay will still work on most distros but we do not give official support for them. So do not open Issues here in these cases, instead, open a Discussion or try our Discord.
- SteamOS (downloading using Discover only)
- Windows 8+ (might work on Win7 if you have the latest PowerShell but we do not give support for it)
- macOS 10.15 or higher

## Language Support

Thanks to the community Heroic was translated to almost 40 different languages so far:

- English
- Azerbaijani
- Basque
- Belarussian
- Bosnian
- Bulgarian
- Catalan
- Czech
- Croatian
- Simplified Chinese
- Traditional Chinese
- Dutch
- Estonian
- Finnish
- French
- German
- Greek
- Japanese
- Korean
- Hungarian
- Italian
- Indonesian
- Malayalam
- Norwegian Bokmål
- Persian
- Polish
- Portuguese
- Portuguese (Brazil)
- Romanian
- Russian
- Spanish
- Slovak
- Swedish
- Tamil
- Turkish
- Ukrainian
- Vietnamese

## Installation

### Linux

#### Debian, Ubuntu and Derivatives

Download the `hyperplay.x.x.x_amd64.deb` from the Releases section

```bash
sudo dpkg -i hyperplay.x.x.x_amd64.deb
```

#### Other Distributions (AppImage and TAR.XZ)

Since these two distribution formats don't have a form of dependency management, make sure the `curl` command is available. You might run into weird issues if it's not.

To make the AppImage it executable use:

```bash
chmod +x hyperplay-x.x.x.AppImage
```

To run it use:

```bash
./hyperplay-x.x.x.AppImage
```

For the tar.xz file, you need first to extract it somewhere, enter the folder and run:

```bash
chmod +x hyperplay
```

To run it use:

```bash
./hyperplay
```

### Windows

Download Hyperplay_Setup.x.x.x.exe or the Portable HyperPlay-x.x.x.exe file and run it. It will install it to the start menu and desktop, use those to run it.

### macOS

Download HyperPlay-x.x.x.dmg and move the HyperPlay App to the Applications folder.

### Build binaries locally (All platforms)

- All Platforms:
  Requires NodeJS to build \
  Use yarn. npm conflicts with existing build scripts

```bash
git clone https://github.com/G7DAO/HyperPlay.git

cd HyperPlay
```

- Build for Linux:

```bash
yarn

yarn dist:linux {package to create} (eg: deb, pacman, tar.xz, rpm, AppImage)
```

- Build for Windows (Beta):

```bash
yarn.cmd

yarn.cmd dist:win
```

- Build for Mac (Alpha):

```bash
yarn

yarn dist:mac
```

### Any OS (development environment)

1. Download Yarn and Node.js
2. Download the dependencies with `yarn`
3. Run `yarn start` on the terminal

If you want to quickly test a change, or you're implementing features that require a lot of restarts, you can use Vite's development server to speed up the process:  
Go to the "Run and Debug" tab of VSCode and start the "Launch Heroic (HMR & HR)" task (alternatively, if you're not using VSCode or just prefer the terminal, run `yarn start`). Heroic will start up after a short while, and once you make any change to the code, it'll reload/restart.

Note: If you do not need the React developer tools while testing changes, you can skip their install by setting the `HEROIC_NO_REACT_DEVTOOLS` environment variable before running `yarn start` (for example with `HEROIC_NO_REACT_DEVTOOLS=1 yarn start`).

### Development Using a Container

If you would prefer, we have a docker container defined to develop / build HyperPlay with (a potential reason being to avoid loading tons of dependencies on your host filesystem). There are two methods, based on whether you use VS Code.

**VS Code**

There is a `.devcontainer` directory containing a definition that VS Code will recognize for automatically opening your local HyperPlay directory in a container in VS Code.

**NOTE: this requires that you install the 'Remote - Containers' extension.**

1. Open the root of your local HyperPlay directory in VS Code.
2. You should get a prompt in the bottom right to build and open the project in the dev container.
3. If the above prompt does not occur, on the bottom left, there is a green icon that should be there if the remote extension is installed. Click on it, and select "Reopen in container".
4. The bottom left green icon should now say: "Dev Container: HyperPlay".

After the container's package manager runs, open a new terminal session and you should be able to run bash commands from within the container. Any yarn dist:linux builds should also now show up on your host filesystem.

**Manually Building the Docker Image**

If you don't use VS Code or don't want it integrated with the container, you can build and run the container manually using either Docker or Podman.

1. From the root of your local HyperPlay directory, run:

```bash
docker build -t hyperplaydevcontainer -f Dockerfile .
```

2. Assuming all went well, you can now enter the container:

```bash
docker run -it -v ./:/tmp/hyperplay/localhost/hyperplaydevcontainer:latest
```

3. The above command will mount your local HyperPlay dir to `/tmp/hyperplay` in the container (unless you used a different path).

```
cd /tmp/hyperplay
```

And you should be good to go, code and build away!

## Screenshots

![image](https://user-images.githubusercontent.com/26871415/185743122-e63a65d5-224b-45a4-a9d3-d37e2890e0a2.png)

[![jump](https://img.shields.io/badge/Back%20to%20top-%20?style=flat&color=grey&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTQgMTJsMS40MSAxLjQxTDExIDcuODNWMjBoMlY3LjgzbDUuNTggNS41OUwyMCAxMmwtOC04LTggOHoiLz48L3N2Zz4=)](#hyperplay)

## Credits

### Weblate: Localization platform

- URL: https://weblate.org/en/

### Those Awesome Guys: Gamepad prompts images

- URL: https://thoseawesomeguys.com/prompts/
