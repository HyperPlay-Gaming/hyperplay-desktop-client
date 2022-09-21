echo "copy dlls to node-addon dir"
copy /y .\overlayDeps\dlls\n_overlay.dll .\overlayDeps\node-ovhook\build\Release
copy /y .\overlayDeps\dlls\n_overlay.x64.dll .\overlayDeps\node-ovhook\build\Release
copy /y .\overlayDeps\dlls\n_ovhelper.exe .\overlayDeps\node-ovhook\build\Release
copy /y .\overlayDeps\dlls\n_ovhelper.x64.exe .\overlayDeps\node-ovhook\build\Release
