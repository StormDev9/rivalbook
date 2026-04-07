import { BrowserWindow, app } from "electron";

import { PROJECT } from "./main.js";
import updateLib from "electron-updater";

const { autoUpdater } = updateLib;

console.log(PROJECT.root);
app.on("ready", async () => {
    const win = new BrowserWindow();
    win.loadFile(PROJECT.getFilePath("test.html"));

    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on("update-downloaded", (info) => {
        autoUpdater.quitAndInstall(); // forces install
    });
});
