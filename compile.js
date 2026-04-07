import { existsSync, mkdirSync, rmSync } from "fs";

import { execSync } from "child_process";
import fs from "fs-extra";

const srcDir = "SRC";
const buildDir = "APP";

function log(step, message) {
    console.log(`[${step}] ${message}`);
}

console.clear();

try {
    // Clean build directory
    if (existsSync(buildDir)) {
        log("CLEAN", `Removing existing ${buildDir}...`);
        rmSync(buildDir, { recursive: true }, () => {
            console.log("");
        });
    }

    // Create build directory
    if (!existsSync(buildDir)) {
        log("SETUP", `Creating ${buildDir}...`);
        mkdirSync(buildDir);
    }

    // Copy non-ts files
    log("COPY", "Creating static files...");
    fs.copySync(srcDir, buildDir, { recursive: true, filter: (file) => !file.endsWith(".ts") });

    // Run TypeScript compiler
    log("BUILD", "Running TypeScript compiler...");
    execSync("tsc");

    // Completed
    log("SUCCESS", "Compilation completed successfully 🎉");
} catch (err) {
    console.error("\n[ERROR] Build failed 💥");
    if (err.stdout) {
        console.error("\n--- COMPILE ERROR ---");
        console.error(err.stdout.toString());
    }
    if (!err.stdout && err.message) {
        console.error("\n--- COMPILE MESSAGE ---");
        console.error(err.message);
    }
    console.error("\nBuild stopped.\n");
    process.exit(1);
}
