// vite.config.ts
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { join, resolve } from "path";
import {
  bytecodePlugin,
  defineConfig,
  externalizeDepsPlugin
} from "electron-vite";
import { statSync } from "fs";
var __electron_vite_injected_dirname = "D:\\a_repos\\hyperplay3\\hyperplay-desktop-client";
var srcAliases = ["backend", "frontend", "common"].map((aliasName) => {
  return {
    find: aliasName,
    replacement: join(__electron_vite_injected_dirname, "src", aliasName)
  };
});
try {
  statSync(join(__electron_vite_injected_dirname, "node_modules", "@hyperplay", "proxy-server"));
} catch (err) {
  srcAliases.push(
    {
      find: "@hyperplay/providers",
      replacement: join(__electron_vite_injected_dirname, "src", "empty.js")
    },
    {
      find: "@hyperplay/proxy-server",
      replacement: join(__electron_vite_injected_dirname, "src", "empty.js")
    },
    {
      find: "@hyperplay/extension-importer",
      replacement: join(__electron_vite_injected_dirname, "src", "empty.js")
    },
    {
      find: "@hyperplay/extension-provider",
      replacement: join(__electron_vite_injected_dirname, "src", "empty.js")
    },
    {
      find: "@hyperplay/overlay",
      replacement: join(__electron_vite_injected_dirname, "src", "empty.js")
    }
  );
}
var dependenciesToNotExternalize = ["@hyperplay/check-disk-space"];
var preloads = [
  "src/backend/preload.ts",
  "src/backend/proxy/providerPreload.ts",
  "src/backend/hyperplay_store_preload.ts",
  "src/backend/webview_style_preload.ts",
  "src/backend/auth_provider_preload.ts"
];
try {
  statSync(join(__electron_vite_injected_dirname, "node_modules", "@hyperplay", "extension-provider"));
  preloads.push(
    "node_modules/@hyperplay/extension-provider/src/extensionPreload.ts"
  );
} catch (err) {
}
var vite_config_default = defineConfig(({ mode }) => ({
  main: {
    build: {
      rollupOptions: {
        input: "src/backend/main.ts"
      },
      outDir: "build/main",
      minify: mode === "production",
      sourcemap: mode === "development" ? "inline" : false
    },
    resolve: { alias: srcAliases },
    plugins: [
      externalizeDepsPlugin({ exclude: dependenciesToNotExternalize }),
      bytecodePlugin()
    ]
  },
  preload: {
    build: {
      rollupOptions: {
        input: preloads
      },
      outDir: "build/preload",
      minify: mode === "production",
      sourcemap: mode === "development" ? "inline" : false
    },
    resolve: { alias: srcAliases },
    plugins: [externalizeDepsPlugin({ exclude: dependenciesToNotExternalize })]
  },
  renderer: {
    root: ".",
    build: {
      rollupOptions: {
        input: resolve("index.html")
      },
      target: "esnext",
      outDir: "build",
      emptyOutDir: false,
      minify: mode === "production",
      sourcemap: mode === "development" ? "inline" : false
    },
    resolve: { alias: srcAliases },
    plugins: [svgr(), react()]
  },
  resolve: {
    alias: srcAliases
  },
  plugins: [svgr()]
}));

// electron.vite.config.ts
var electron_vite_config_default = vite_config_default;
export {
  electron_vite_config_default as default
};
