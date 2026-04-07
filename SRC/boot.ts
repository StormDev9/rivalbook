import { BrowserWindow, app } from "electron";

import { PROJECT } from "./main.js";

console.log(PROJECT.root);
app.on("ready", async () => {
    const win = new BrowserWindow();
    win.loadFile(PROJECT.getFilePath("test.html"));
});
