## Overlay

### Overview

To enable an electron app to have the ability to show its web browser window in another game process, we need to injecting a module (dll in Windows) to the game, make an IPC connection with our electron process, copy the screenshot of our electron app's browser window and render it over the game's surface.

Then, since we also want our injected web page can reponse to user's input, we need to intercept the game's input so that we can pass the input to out electron app and send it to the browser window.

## modules

### hyperplay-dx-hook repo

#### `n_overlay.dll`(`n_overlay.x64.dll` for x64)

This is the most important module (a dll), it will be injected into game process so that we can communicate with a game process and draw our own stuff on game window.

#### `n_ovhelper.exe`(`n_ovhelper.x64.exe` for x64)

This is a helper process which do the real dll injecting work for use.

### hyperplay-desktop-client linked node C++ addon modules

#### `electron-overlay`

This is the node addon used in our electron app, use it to communicate with game process (`n_overlay.dll`), like sending electron webview framebuffer and recieve game input data.

#### `node-ovhook`

This is also a helper nodule, it's the node addon used it our electron app which uses `n_ovhelper.exe` to do injecting, it also can get the system's foreground window(we can check if it's the game window to decide when we will do injecting).

## how to use

so with the modules, basicly what we need to do is

0. make sure your compile x86 and x64 version native modules for the game you want to inejct
   1. build `game-overlay.sln` with Release config for x86 or x64 version, you'll get `n_ovhelper.exe` and `n_overlay.dll` for x86 version (or `n_ovhelper.x64.exe` and `n_overlay.x64.dll` for the x64 version)
   2. add `node-ovhook` and `electron-overlay` addons to your electron ap's dependency, nodejs should automatically build them, if not cd to their directory and build them manually.
   3. symoblically link `node-ovhook` and `electron-overlay` with `link-overlay-deps` so that changes made in the project's root are reflected in the node_modules/ module
   4. copy `n_ovhelper.exe` and `n_overlay.dll` to `node_modules/node-ovhook/build/Release` so node-ovhook can find them.
1. the electron app
   1. import `electron-overlay` addon (as `IOverlay` for example),
      1. use `IOverlay.start()` to start the overlay server
      2. set up hotkeys and event callbacks (`game.input` is the most important one)
   2. create a transparent browser window (so we can capture it surface and pass it to the game)
      1. after create the transparent browser window, use `IOverlay.addWindow(...)` to add it to the overlay windows
      2. listen on its paint event and send the framebuffer to overlay use `IOverlay.sendFrameBuffer`
   3. on `game.input` event, translate the event to electron's format use `IOverlay.translateInputEvent`, and pass to electorn's window `window.webContents.sendInputEvent(inputEvent)`
   4. don't forget to handle window's `resize` events
2. inject
   1. import `node-ovhook` addon (as `IOVhook` for example) to help us inject the `n_overlay.dll` module to the game process
   2. get the game process's process id and do injecting use `IOVhook.injectProcess`
3. if everything is ok ,you should see the injected browser window in game process

## feature

- [x] electron offscreen window overlay in game
- [x] dx12 api support
- [x] dx11 api support
- [x] dx10 api support
- [x] dx9 api support
- [ ] OpenGL api support
- [ ] native draw overlay
- [ ] hardware acc osr bitmap transport
- [x] multi windows support
- [x] window z-index and focus
- [x] in game sync drag and resize
- [ ] in game defered drag and resize
- [x] window draw policy
- [x] input intercepting by manually control
- [x] custom shaped window (alpha test for mouse handling)
- [ ] detailed injecting configuration
- [x] input intercepting by auto mouse check

## todo

- [ ] brwoser window state manage
- [x] better hotkey
- [x] session reconnect

## known game compatible issues

Since we need to inject a dll into an existing game process, it will definitely has some compatible issues.

known issues:

#### Origin overlay and Steam overlay

It can work together with Steam overlay, but unfortunately did not work with Origin overlay.

#### Games that I played and tested

Some of the games can use multiple versions of graphics API, make sure set graphics api to one of dx9, dx10, dx11

- [x] League of Legends
- [x] Dota 2
- [x] CS:GO
- [x] Team Fortress 2
- [x] Life Is Strange
- [x] Ori
- [x] GTA 5
- [x] Fallout 4
- [x] Rise Of The Tomb Raider
- [x] Guts and Glory
- [x] PlayerUnknown's Battlegrounds
- [x] Life is Strange Before the Storm
- [x] Child of Light
- [x] Borderlands 2
- [x] Cuphead
- [x] Witcher 3
- [x] WORLD OF FINAL FANTASY®
- [x] Left 4 Dead 2
- [x] Tom Clancy's The Division
- [x] Tom Clancy's Rainbow Six Siege
- [x] Half-Life 2

#### games that have issues for now

- [ ] Battlefield 1
- [ ] Star Wars battlefront 2
