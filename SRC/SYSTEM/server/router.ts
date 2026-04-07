import { createServer } from "http";
import e from "express";

export const expressTools = e;
export const router = e();
export const hub = createServer(router);
export const server = {
    running: false,
    port: 0,
};

export async function startServer() {
    hub.listen();
    const address = hub.address();
    if (!address || typeof address === "string") throw new Error("Could not resolve server address: " + address);

    server.port = address.port;
    server.running = true;
    console.log(server);
}

export function serverPath(path: string) {
    if (!server.running) throw new Error("Cannot build url before server is running!");
    if (!path.startsWith("/")) path = `/${path}`;
    return `http://localhost/${server.port}${path}`;
}
