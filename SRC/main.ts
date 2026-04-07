import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const PROJECT = {
    root: fileURLToPath(dirname(import.meta.url)).replaceAll("\\", "/"),
    getFilePath: (path: string) => {
        if (!path.startsWith("/")) path = "/" + path;
        return `${PROJECT.root}${path}`;
    },
};
