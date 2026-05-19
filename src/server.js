import { startDiskClawServer } from "./startServer.js";

startDiskClawServer()
  .then(({ port }) => {
    console.log(`DiskClaw backend listening on http://localhost:${port}`);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
