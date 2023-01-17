echo "copy dlls to node-addon dir"
copy /y .\overlayDeps\game-overlay\prebuilt\n_overlay.dll .\overlayDeps\electron-overlay\build\Release
copy /y .\overlayDeps\game-overlay\prebuilt\n_overlay.x64.dll .\overlayDeps\electron-overlay\build\Release
copy /y .\overlayDeps\game-overlay\prebuilt\injector_helper.exe .\overlayDeps\electron-overlay\build\Release
copy /y .\overlayDeps\game-overlay\prebuilt\injector_helper.x64.exe .\overlayDeps\electron-overlay\build\Release
