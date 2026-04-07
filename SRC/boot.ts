import { BrowserWindow, app } from "electron";

import { PROJECT } from "./main.js";
import { startServer } from "./SYSTEM/server/router.js";
import updateLib from "electron-updater";

const { autoUpdater } = updateLib;

console.log(PROJECT.root);
app.on("ready", async () => {
    await startServer();
});
